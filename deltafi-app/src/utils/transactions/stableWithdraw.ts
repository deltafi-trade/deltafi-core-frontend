import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import BN from "bn.js";

import { createNativeSOLHandlingTransactions } from "./utils";
import { PoolInfo } from "providers/types";
import {
  createApproveInstruction,
  createStableWithdrawInstruction,
  WithdrawData,
} from "lib/instructions";
import { createTokenAccountTransaction, mergeTransactions, signTransaction } from ".";
import { SWAP_PROGRAM_ID } from "constants/index";
// import { createFarmUser } from "./farm";
import { AccountLayout } from "@solana/spl-token";
import { TokenAccountInfo } from "states/tokenAccountState";

export async function stableWithdraw({
  connection,
  walletPubkey,
  poolTokenAccount,
  pool,
  baseTokenRef,
  quteTokenRef,
  withdrawData,
}: {
  connection: Connection;
  walletPubkey: PublicKey;
  poolTokenAccount: TokenAccountInfo;
  pool: PoolInfo;
  baseTokenRef?: PublicKey;
  quteTokenRef?: PublicKey;
  withdrawData: WithdrawData;
}) {
  if (!connection || !walletPubkey || !pool || !poolTokenAccount) {
    console.error("stable withdraw failed with null parameter");
    return null;
  }

  const baseSOL = pool.baseTokenInfo.symbol === "SOL";
  const quoteSOL = pool.quoteTokenInfo.symbol === "SOL";

  const lamports = await connection.getMinimumBalanceForRentExemption(AccountLayout.span);
  const tempAccountRefKeyPair = Keypair.generate();
  let createWrappedTokenAccountTransaction: Transaction | undefined;
  let initializeWrappedTokenAccountTransaction: Transaction | undefined;
  let closeWrappedTokenAccountTransaction: Transaction | undefined;

  if (baseSOL || quoteSOL) {
    const tmpAccountLamport = lamports * 2;

    const nativeSOLHandlingTransactions = createNativeSOLHandlingTransactions(
      tempAccountRefKeyPair.publicKey,
      tmpAccountLamport,
      walletPubkey,
    );
    createWrappedTokenAccountTransaction =
      nativeSOLHandlingTransactions.createWrappedTokenAccountTransaction;
    initializeWrappedTokenAccountTransaction =
      nativeSOLHandlingTransactions.initializeWrappedTokenAccountTransaction;
    closeWrappedTokenAccountTransaction =
      nativeSOLHandlingTransactions.closeWrappedTokenAccountTransaction;

    if (baseSOL) {
      baseTokenRef = tempAccountRefKeyPair.publicKey;
    } else {
      quteTokenRef = tempAccountRefKeyPair.publicKey;
    }
  }

  let createBaseTokenTransaction: Transaction | undefined;
  if (!baseTokenRef) {
    const result = await createTokenAccountTransaction({
      walletPubkey,
      mintPublicKey: new PublicKey(pool.baseTokenInfo.mint),
    });
    baseTokenRef = result?.newAccountPubkey;
    createBaseTokenTransaction = result?.transaction;
  }

  let createQuoteTokenTransaction: Transaction | undefined;
  if (!quteTokenRef) {
    const result = await createTokenAccountTransaction({
      walletPubkey,
      mintPublicKey: new PublicKey(pool.baseTokenInfo.mint),
    });
    quteTokenRef = result?.newAccountPubkey;
    createQuoteTokenTransaction = result?.transaction;
  }

  const userTransferAuthority = Keypair.generate();
  const nonce = new BN(pool.nonce);
  const swapAuthority = await PublicKey.createProgramAddress(
    [pool.publicKey.toBuffer(), nonce.toArrayLike(Buffer, "le", 1)],
    SWAP_PROGRAM_ID,
  );

  let transaction = new Transaction();
  transaction
    .add(
      createApproveInstruction(
        poolTokenAccount.publicKey,
        userTransferAuthority.publicKey,
        walletPubkey,
        withdrawData.amountPoolToken,
      ),
    )
    .add(
      createStableWithdrawInstruction(
        pool.publicKey,
        swapAuthority,
        userTransferAuthority.publicKey,
        poolTokenAccount.publicKey,
        pool.base,
        pool.quote,
        baseTokenRef,
        quteTokenRef,
        pool.poolMintKey,
        pool.baseFee,
        pool.quoteFee,
        withdrawData,
        SWAP_PROGRAM_ID,
      ),
    );

  let signers = [userTransferAuthority];

  transaction = mergeTransactions([
    createWrappedTokenAccountTransaction,
    initializeWrappedTokenAccountTransaction,
    createBaseTokenTransaction,
    createQuoteTokenTransaction,
    transaction,
    closeWrappedTokenAccountTransaction,
  ]);
  if (baseSOL || quoteSOL) {
    signers.push(tempAccountRefKeyPair);
  }

  return signTransaction({ transaction, feePayer: walletPubkey, signers, connection });
}
