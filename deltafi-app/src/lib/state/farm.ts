import { AccountInfo, PublicKey, Connection } from "@solana/web3.js";
import { blob, struct, u8 } from "buffer-layout";

import { AccountParser, bool, publicKey, u64 } from "utils/layout";
import { loadAccount } from "utils/account";

export interface FarmInfo {
  isInitialized: boolean;
  bumpSeed: number;
  configKey: PublicKey;
  poolMint: PublicKey;
  poolToken: PublicKey;
  reservedAmount: bigint;
  feeNumerator: bigint;
  feeDenominator: bigint;
  aprNumerator: bigint;
  aprDenominator: bigint;
}

/** @internal */
export const FarmInfoLayout = struct<FarmInfo>(
  [
    bool("isInitialized"),
    u8("bumpSeed"),
    publicKey("configKey"),
    publicKey("poolMint"),
    publicKey("poolToken"),
    u64("reservedAmount"),
    u64("feeNumerator"),
    u64("feeDenominator"),
    u64("aprNumerator"),
    u64("aprDenominator"),
    blob(64, "reserved"),
  ],
  "farmInfo",
);

export const FARM_INFO_SIZE = FarmInfoLayout.span;

export const isFarmInfo = (info: AccountInfo<Buffer>): boolean => {
  return info.data.length === FARM_INFO_SIZE;
};

export const parseFarmInfo: AccountParser<FarmInfo> = (info: AccountInfo<Buffer>) => {
  if (!isFarmInfo(info)) return;

  const buffer = Buffer.from(info.data);
  const farmInfo = FarmInfoLayout.decode(buffer);

  if (!farmInfo.isInitialized) return;

  return {
    info,
    data: farmInfo,
  };
};

export const loadFarmInfo = async (
  connection: Connection,
  key: string,
  farmProgramId: PublicKey,
): Promise<{ key: string; data: FarmInfo }> => {
  const address = new PublicKey(key);
  const accountInfo = await loadAccount(connection, address, farmProgramId);

  const parsed = parseFarmInfo(accountInfo);

  if (!parsed) throw new Error("Failed to load farm info account");

  return {
    key,
    data: parsed.data,
  };
};

export interface FarmUserDataFlat {
  isInitialized: boolean;
  configKey: PublicKey;
  farmPoolKey: PublicKey;
  owner: PublicKey;
  positionLen: number;
  dataFlat: Buffer;
  depositedAmount: bigint;
  rewardsOwed: bigint;
  rewardsEstimated: bigint;
  cumulativeInterest: bigint;
  lastUpdateTs: bigint;
  nextClaimTs: bigint;
}

export interface FarmUserFlat {
  publicKey: PublicKey;
  configKey: PublicKey;
  farmPoolKey: PublicKey;
  owner: PublicKey;
  depositedAmount: bigint;
  rewardsOwed: bigint;
  rewardsEstimated: bigint;
  cumulativeInterest: bigint;
  lastUpdateTs: bigint;
  nextClaimTs: bigint;
}

/** @internal */
export const FarmUserLayout = struct<FarmUserDataFlat>(
  [
    bool("isInitialized"),
    publicKey("configKey"),
    publicKey("farmPoolKey"),
    publicKey("owner"),
    u8("positionLen"),
    publicKey("dummy"),
    u64("depositedAmount"),
    u64("rewardsOwed"),
    u64("rewardsEstimated"),
    u64("cumulativeInterest"),
    u64("lastUpdateTs"),
    u64("nextClaimTs"),
    u64("latestDepositSlot"),
    blob(64, "reserved"),
  ],
  "farmUser",
);

export const FARM_USER_SIZE = FarmUserLayout.span;
