import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import BN from "bn.js";

import { createNativeSOLHandlingTransactions } from "./utils";
import {
  createApproveInstruction,
  createSwapInstruction,
  SwapData,
  SWAP_DIRECTION,
  createStableSwapInstruction,
} from "lib/instructions";
import { MarketConfig, PoolInfo } from "providers/types";

import { SWAP_PROGRAM_ID } from "constants/index";
import { createTokenAccountTransaction, mergeTransactions, signTransaction } from ".";
import { AccountLayout } from "@solana/spl-token";
import { checkOrCreateReferralDataTransaction } from "./utils";
import { TokenAccountInfo } from "states/tokenAccountState";

export const dummyAddress = "66666666666666666666666666666666666666666666";

/**
 * alter normal swap and stable swap
 */
function createSwapInstructionMethod(
  isStable: boolean,
  config: PublicKey,
  tokenSwap: PublicKey,
  marketAuthority: PublicKey,
  swapAuthority: PublicKey,
  userTransferAuthority: PublicKey,
  source: PublicKey,
  swapSource: PublicKey,
  sourceMint: PublicKey,
  swapDestination: PublicKey,
  destination: PublicKey,
  destinationMint: PublicKey,
  rewardToken: PublicKey,
  sourceRewardToken: PublicKey,
  adminFeeDestination: PublicKey,
  pythA: PublicKey,
  pythB: PublicKey,
  swapData: SwapData,
  programId: PublicKey,
  userReferrerData: PublicKey | null,
  referrer: PublicKey | null,
): TransactionInstruction {
  if (isStable) {
    return createStableSwapInstruction(
      config,
      tokenSwap,
      marketAuthority,
      swapAuthority,
      userTransferAuthority,
      source,
      swapSource,
      sourceMint,
      swapDestination,
      destination,
      destinationMint,
      rewardToken,
      sourceRewardToken,
      adminFeeDestination,
      swapData,
      programId,
      userReferrerData,
      referrer,
    );
  } else {
    return createSwapInstruction(
      config,
      tokenSwap,
      marketAuthority,
      swapAuthority,
      userTransferAuthority,
      source,
      swapSource,
      sourceMint,
      swapDestination,
      destination,
      destinationMint,
      rewardToken,
      sourceRewardToken,
      adminFeeDestination,
      pythA,
      pythB,
      swapData,
      programId,
      userReferrerData,
      referrer,
    );
  }
}

export async function swap({
  isStable,
  connection,
  walletPubkey,
  config,
  pool,
  source,
  destinationRef,
  rewardTokenRef,
  swapData,
  enableReferral,
  referrer,
}: {
  isStable: boolean;
  connection: Connection;
  walletPubkey: PublicKey;
  config: MarketConfig;
  pool: PoolInfo;
  source: TokenAccountInfo;
  destinationRef?: PublicKey;
  rewardTokenRef?: PublicKey;
  swapData: SwapData;
  enableReferral: boolean;
  referrer: PublicKey | null;
}) {
  if (!connection || !walletPubkey || !pool || !config || !source) {
    console.error("swap failed with null parameter");
    return null;
  }

  let createAccountsCost = 0;
  const createTokenAccountCost = await connection.getMinimumBalanceForRentExemption(
    AccountLayout.span,
  );
  const tempAccountRefKeyPair = Keypair.generate();
  let createWrappedTokenAccountTransaction: Transaction | undefined;
  let initializeWrappedTokenAccountTransaction: Transaction | undefined;
  let closeWrappedTokenAccountTransaction: Transaction | undefined;

  let buySol =
    (pool.quoteTokenInfo.symbol === "SOL" && swapData.swapDirection === SWAP_DIRECTION.SellBase) ||
    (pool.baseTokenInfo.symbol === "SOL" && swapData.swapDirection === SWAP_DIRECTION.SellQuote);

  let sellSol =
    (pool.quoteTokenInfo.symbol === "SOL" && swapData.swapDirection === SWAP_DIRECTION.SellQuote) ||
    (pool.baseTokenInfo.symbol === "SOL" && swapData.swapDirection === SWAP_DIRECTION.SellBase);

  let sourceRef: PublicKey = source.publicKey;

  if (buySol || sellSol) {
    let tmpAccountLamport = buySol
      ? createTokenAccountCost * 2
      : Number(swapData.amountIn) + createTokenAccountCost * 2;

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

    if (buySol) {
      destinationRef = tempAccountRefKeyPair.publicKey;
    } else {
      sourceRef = tempAccountRefKeyPair.publicKey;
    }
  }

  const {
    userReferrerDataPubkey,
    createUserReferrerAccountTransaction,
    referrerPubkey,
    createReferralDataCost,
  } =
    (buySol || sellSol) && (!destinationRef || !rewardTokenRef)
      ? {
          userReferrerDataPubkey: null,
          createUserReferrerAccountTransaction: undefined,
          referrerPubkey: null,
          createReferralDataCost: 0,
        }
      : await checkOrCreateReferralDataTransaction(
          walletPubkey,
          enableReferral,
          referrer,
          config,
          connection,
        );
  createAccountsCost += createReferralDataCost;

  let createDestinationAccountTransaction: Transaction | undefined;
  if (!destinationRef) {
    const result = await createTokenAccountTransaction({
      walletPubkey,
      mintPublicKey: new PublicKey(
        pool.baseTokenInfo.mint === source.mint.toBase58()
          ? pool.quoteTokenInfo.mint
          : pool.baseTokenInfo.mint,
      ),
    });
    destinationRef = result?.newAccountPubkey;
    createDestinationAccountTransaction = result?.transaction;
    createAccountsCost += createTokenAccountCost;
  }

  let createRewardAccountTransaction: Transaction | undefined;
  if (!rewardTokenRef) {
    const result = await createTokenAccountTransaction({
      walletPubkey,
      mintPublicKey: config.deltafiMint,
    });
    rewardTokenRef = result?.newAccountPubkey;
    createRewardAccountTransaction = result?.transaction;
    createAccountsCost += createTokenAccountCost;
  }

  const userTransferAuthority = Keypair.generate();
  let nonce = new BN(config.bumpSeed);
  const marketAuthority = await PublicKey.createProgramAddress(
    [config.publicKey.toBuffer(), nonce.toArrayLike(Buffer, "le", 1)],
    SWAP_PROGRAM_ID,
  );
  nonce = new BN(pool.nonce);
  const swapAuthority = await PublicKey.createProgramAddress(
    [pool.publicKey.toBuffer(), nonce.toArrayLike(Buffer, "le", 1)],
    SWAP_PROGRAM_ID,
  );

  let [swapSource, swapDestination, adminFeeDestination] = (function () {
    if (swapData.swapDirection === SWAP_DIRECTION.SellBase) {
      return [pool.base, pool.quote, pool.quoteFee];
    } else {
      return [pool.quote, pool.base, pool.baseFee];
    }
  })();

  let transaction = new Transaction();
  transaction
    .add(
      createApproveInstruction(
        sourceRef,
        userTransferAuthority.publicKey,
        walletPubkey,
        swapData.amountIn,
      ),
    )
    .add(
      createSwapInstructionMethod(
        isStable,
        config.publicKey,
        pool.publicKey,
        marketAuthority,
        swapAuthority,
        userTransferAuthority.publicKey,
        sourceRef,
        swapSource,
        source.mint,
        swapDestination,
        destinationRef,
        new PublicKey(
          pool.baseTokenInfo.mint === source.mint.toBase58()
            ? pool.quoteTokenInfo.mint
            : pool.baseTokenInfo.mint,
        ),
        rewardTokenRef,
        config.deltafiToken,
        adminFeeDestination,
        pool.pythBase,
        pool.pythQuote,
        swapData,
        SWAP_PROGRAM_ID,
        userReferrerDataPubkey,
        referrerPubkey,
      ),
    );

  transaction = mergeTransactions([
    createWrappedTokenAccountTransaction,
    initializeWrappedTokenAccountTransaction,
    createDestinationAccountTransaction,
    createRewardAccountTransaction,
    createUserReferrerAccountTransaction,
    transaction,
    closeWrappedTokenAccountTransaction,
  ]);

  const resultTransaction =
    buySol || sellSol
      ? await signTransaction({
          transaction,
          feePayer: walletPubkey,
          signers: [userTransferAuthority, tempAccountRefKeyPair],
          connection,
        })
      : await signTransaction({
          transaction,
          feePayer: walletPubkey,
          signers: [userTransferAuthority],
          connection,
        });

  return { transaction: resultTransaction, createAccountsCost, destinationRef };
}
