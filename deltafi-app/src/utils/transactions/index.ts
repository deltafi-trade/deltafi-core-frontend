import { ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Commitment,
  Connection,
  Keypair,
  PublicKey,
  RpcResponseAndContext,
  SimulatedTransactionResponse,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { sleep } from "utils";

export async function createTokenAccountTransaction({
  walletPubkey,
  mintPublicKey,
}: {
  walletPubkey: PublicKey;
  mintPublicKey: PublicKey;
}): Promise<{
  transaction: Transaction;
  newAccountPubkey: PublicKey;
}> {
  const ata = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mintPublicKey,
    walletPubkey,
  );
  const transaction = new Transaction();
  transaction.add(
    Token.createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mintPublicKey,
      ata,
      walletPubkey,
      walletPubkey,
    ),
  );

  return { transaction, newAccountPubkey: ata };
}

export function mergeTransactions(transactions: (Transaction | undefined)[]) {
  const transaction = new Transaction();
  transactions
    .filter((t): t is Transaction => t !== undefined && t != null)
    .forEach((t) => {
      transaction.add(t);
    });
  return transaction;
}

export async function signTransaction({
  transaction,
  feePayer,
  signers = [],
  connection,
}: {
  transaction: Transaction;
  feePayer: PublicKey;
  signers?: Array<Keypair>;
  connection: Connection;
}) {
  transaction.recentBlockhash = (await connection.getRecentBlockhash("max")).blockhash;
  transaction.feePayer = feePayer;
  if (signers.length > 0) {
    transaction.partialSign(...signers);
  }
  return transaction;
}

export const getUnixTs = () => {
  return new Date().getTime() / 1000;
};

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_MAX_RETRIES = 3;

export async function sendSignedTransaction({
  signedTransaction,
  connection,
  sendingMessage = "Sending transaction...",
  sentMessage = "Transaction sent",
  successMessage = "Transaction confirmed",
  timeout = DEFAULT_TIMEOUT,
  maxRetries = DEFAULT_MAX_RETRIES,
}: {
  signedTransaction: Transaction;
  connection: Connection;
  sendingMessage?: string;
  sentMessage?: string;
  successMessage?: string;
  timeout?: number;
  maxRetries?: number;
}) {
  const rawTransaction = signedTransaction.serialize();
  const startTime = getUnixTs();

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.info(sendingMessage);
      const txid: TransactionSignature = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: false,
        maxRetries: 5,
      });
      console.info(sentMessage);

      await awaitTransactionSignatureConfirmation(txid, timeout, connection);
      console.info(successMessage);
      console.info("latency", txid, getUnixTs() - startTime);
      return txid;
    } catch (err: any) {
      if (err.timeout) {
        if (attempt < maxRetries - 1) {
          console.warn("Retry on timeout, attempt " + (attempt + 1));
          continue;
        }
        throw new Error("Timed out awaiting confirmation on transaction");
      }

      let simulateResult: SimulatedTransactionResponse | null = null;
      try {
        simulateResult = (await simulateTransaction(connection, signedTransaction, "single")).value;
      } catch (e) {
        console.warn("Failed to execute simulated transaction");
        throw e;
      }

      if (simulateResult && simulateResult.err) {
        if (simulateResult.logs) {
          for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
            const line = simulateResult.logs[i];
            if (line.startsWith("Program log: ")) {
              throw new Error("Transaction failed: " + line.slice("Program log: ".length));
            }
          }
        }

        if (typeof simulateResult.err == "object" && "InstructionError" in simulateResult.err) {
          throw new Error(JSON.stringify(simulateResult.err));
        }
      }

      throw new Error("Transaction failed");
    }
  }
}

async function awaitTransactionSignatureConfirmation(
  txid: TransactionSignature,
  timeout: number,
  connection: Connection,
) {
  let done = false;
  const result = await new Promise((resolve, reject) => {
    (async () => {
      setTimeout(() => {
        if (done) {
          return;
        }

        done = true;
        console.info("Timed out for txid", txid);
        reject({ timeout: true });
      }, timeout);
      try {
        connection.onSignature(
          txid,
          (result) => {
            console.info("WS confirmed", txid, result);
            done = true;
            if (result.err) {
              reject(result.err);
            } else {
              resolve(result);
            }
          },
          "recent",
        );
        console.info("Set up WS connection", txid);
      } catch (e) {
        done = true;
        console.info("WS error in setup", txid, e);
      }
      while (!done) {
        (async () => {
          try {
            const signatureStatuses = await connection.getSignatureStatuses([txid]);
            const result = signatureStatuses && signatureStatuses.value[0];
            if (!done) {
              if (!result) {
                console.info("REST null result for", txid, result);
              } else if (result.err) {
                console.info("REST error for", txid, result);
                done = true;
                reject(result.err);
              } else if (!result.confirmations) {
                console.info("REST no confirmations for", txid, result);
              } else {
                console.info("REST confirmation for", txid, result);
                done = true;
                resolve(result);
              }
            }
          } catch (e) {
            if (!done) {
              console.info("REST connection error: txid", txid, e);
            }
          }
        })();
        await sleep(1000);
      }
    })();
  });
  done = true;
  return result;
}

async function simulateTransaction(
  connection: Connection,
  transaction: Transaction,
  commitment: Commitment,
): Promise<RpcResponseAndContext<SimulatedTransactionResponse>> {
  // @ts-ignore
  transaction.recentBlockhash = await connection._recentBlockhash(
    // @ts-ignore
    connection._disableBlockhashCaching,
  );

  const signData = transaction.serializeMessage();
  // @ts-ignore
  const wireTransaction = transaction._serialize(signData);
  const encodedTransaction = wireTransaction.toString("base64");
  const config: any = { encoding: "base64", commitment };
  const args = [encodedTransaction, config];

  // @ts-ignore
  const res = await connection._rpcRequest("simulateTransaction", args);
  if (res.error) {
    throw new Error("failed to simulate transaction: " + res.error.message);
  }
  return res.result;
}

export * from "./deposit";
export * from "./withdraw";
export * from "./farm";
