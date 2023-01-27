import {
  PublicKey,
  Connection,
  AccountInfo,
  sendAndConfirmTransaction as realSendAndConfirmTransaction,
  Keypair,
  Transaction,
  TransactionSignature,
  Commitment,
} from "@solana/web3.js";

import { chunks } from "./utils";

export const loadAccount = async (
  connection: Connection,
  address: PublicKey,
  programId: PublicKey,
): Promise<AccountInfo<Buffer>> => {
  const accountInfo = await connection.getAccountInfo(address);
  if (accountInfo === null) {
    throw new Error("Failed to find account");
  }

  if (!accountInfo.owner.equals(programId)) {
    throw new Error(
      `Invalid owner: expected ${programId.toBase58()}, found ${accountInfo.owner.toBase58()}`,
    );
  }

  return accountInfo;
};

export const getMultipleAccounts = async (
  connection: Connection,
  keys: PublicKey[],
  commitment: Commitment,
) => {
  const result = await Promise.all(
    chunks(keys, 99).map((chunk) => getMultipleAccountsCore(connection, chunk, commitment)),
  );

  const array = result.map((a) => a.array).flat();
  return { keys, array };
};

const getMultipleAccountsCore = async (
  connection: Connection,
  keys: PublicKey[],
  commitment: Commitment,
) => {
  return {
    keys,
    array: await connection.getMultipleAccountsInfo(keys, commitment),
  };
};

export const getMinBalanceRentForExempt = async (
  connection: Connection,
  dataLength: number,
): Promise<number> => {
  return connection.getMinimumBalanceForRentExemption(dataLength);
};

export const sendAndConfirmTransaction = async (
  title: string,
  connection: Connection,
  transaction: Transaction,
  ...signers: Keypair[]
): Promise<TransactionSignature> => {
  console.info(`Sending ${title} transaction`);

  const txSig = await realSendAndConfirmTransaction(connection, transaction, signers, {
    skipPreflight: false,
    commitment: connection.commitment || "recent",
    preflightCommitment: connection.commitment || "recent",
  });
  console.info(`TxSig: ${txSig}`);
  return txSig;
};

export async function getFilteredProgramAccounts(
  connection: Connection,
  programId: PublicKey,
  filters: any,
): Promise<{ publicKey: PublicKey; accountInfo: AccountInfo<Buffer> }[]> {
  // @ts-ignore
  const resp = await connection._rpcRequest("getProgramAccounts", [
    programId.toBase58(),
    {
      commitment: connection.commitment,
      filters,
      encoding: "base64",
    },
  ]);

  // @ts-ignore
  return resp.result.map(({ pubkey, account: { data, executable, owner, lamports } }) => ({
    publicKey: new PublicKey(pubkey),
    accountInfo: {
      data: Buffer.from(data[0], "base64"),
      executable,
      owner: new PublicKey(owner),
      lamports,
    },
  }));
}
