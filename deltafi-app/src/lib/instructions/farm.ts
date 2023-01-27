import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, SYSVAR_RENT_PUBKEY, TransactionInstruction } from "@solana/web3.js";
import { struct, u8 } from "buffer-layout";

import { u64 } from "utils/layout";

export enum FarmInstruction {
  Initialize = 20,
  InitializeFarmUser,
  Claim,
  Refresh,
  Deposit,
  Withdraw,
}

export interface FarmDepositData {
  amount: bigint;
}

/** @internal */
export const FarmDepositDataLayout = struct<FarmDepositData>([u64("amount")], "depositData");

// Instruction for deposit farm
export const createFarmDepositInstruction = (
  config: PublicKey,
  farmPool: PublicKey,
  userTransferAuthority: PublicKey,
  source: PublicKey,
  destination: PublicKey,
  farmUser: PublicKey,
  farmOwner: PublicKey,
  depositData: FarmDepositData,
  programId: PublicKey,
): TransactionInstruction => {
  const keys = [
    { pubkey: config, isSigner: false, isWritable: false },
    { pubkey: farmPool, isSigner: false, isWritable: true },
    { pubkey: userTransferAuthority, isSigner: true, isWritable: false },
    { pubkey: source, isSigner: false, isWritable: true },
    { pubkey: destination, isSigner: false, isWritable: true },
    { pubkey: farmUser, isSigner: false, isWritable: true },
    { pubkey: farmOwner, isSigner: true, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ];

  const dataLayout = struct([u8("instruction"), FarmDepositDataLayout]);
  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
    {
      instruction: FarmInstruction.Deposit,
      depositData,
    },
    data,
  );

  return new TransactionInstruction({
    keys,
    programId,
    data,
  });
};

export interface FarmWithdrawData {
  amount: bigint;
}

/** @internal */
export const FarmWithdrawDataLayout = struct<FarmWithdrawData>([u64("amount")], "withdrawData");

// Instruction for withdraw farm
export const createFarmWithdrawInstruction = (
  config: PublicKey,
  farmPool: PublicKey,
  farmUser: PublicKey,
  farmOwner: PublicKey,
  authority: PublicKey,
  source: PublicKey,
  destination: PublicKey,
  withdrawData: FarmWithdrawData,
  programId: PublicKey,
): TransactionInstruction => {
  const keys = [
    { pubkey: config, isSigner: false, isWritable: false },
    { pubkey: farmPool, isSigner: false, isWritable: true },
    { pubkey: farmUser, isSigner: false, isWritable: true },
    { pubkey: authority, isSigner: false, isWritable: false },
    { pubkey: source, isSigner: false, isWritable: true },
    { pubkey: destination, isSigner: false, isWritable: true },
    { pubkey: farmOwner, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ];

  const dataLayout = struct([u8("instruction"), FarmWithdrawDataLayout]);
  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
    {
      instruction: FarmInstruction.Withdraw,
      withdrawData,
    },
    data,
  );

  return new TransactionInstruction({
    keys,
    programId,
    data,
  });
};

// Instruction for initialize farm user
export const createInitFarmUserInstruction = (
  config: PublicKey,
  farmPool: PublicKey,
  farmUser: PublicKey,
  farmOwner: PublicKey,
  programId: PublicKey,
) => {
  const keys = [
    { pubkey: config, isSigner: false, isWritable: false },
    { pubkey: farmPool, isSigner: false, isWritable: false },
    { pubkey: farmUser, isSigner: false, isWritable: true },
    { pubkey: farmOwner, isSigner: true, isWritable: false },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
  ];

  const dataLayout = struct([u8("instruction")]);
  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
    {
      instruction: FarmInstruction.InitializeFarmUser,
    },
    data,
  );

  return new TransactionInstruction({
    keys,
    programId,
    data,
  });
};

// Instruction for claim farm
export const createClaimFarmInstruction = (
  config: PublicKey,
  farmPool: PublicKey,
  farmUser: PublicKey,
  farmOwner: PublicKey,
  marketAuthority: PublicKey,
  claimDestination: PublicKey,
  claimMint: PublicKey,
  programId: PublicKey,
  userReferrerData: PublicKey,
  referrer: PublicKey | null,
) => {
  let extraReferrerAccounts = [];
  if (userReferrerData && referrer) {
    extraReferrerAccounts = [
      { pubkey: userReferrerData, isSigner: false, isWritable: false },
      { pubkey: referrer, isSigner: false, isWritable: true },
    ];
  }

  const keys = [
    { pubkey: config, isSigner: false, isWritable: false },
    { pubkey: farmPool, isSigner: false, isWritable: false },
    { pubkey: farmUser, isSigner: false, isWritable: true },
    { pubkey: farmOwner, isSigner: true, isWritable: false },
    { pubkey: marketAuthority, isSigner: false, isWritable: false },
    { pubkey: claimDestination, isSigner: false, isWritable: true },
    { pubkey: claimMint, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ].concat(extraReferrerAccounts);

  const dataLayout = struct([u8("instruction")]);
  const data = Buffer.alloc(dataLayout.span);
  dataLayout.encode(
    {
      instruction: FarmInstruction.Claim,
    },
    data,
  );

  return new TransactionInstruction({
    keys,
    programId,
    data,
  });
};
