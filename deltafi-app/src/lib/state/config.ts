import { AccountInfo, PublicKey, Connection } from "@solana/web3.js";
import { struct, u8, blob } from "buffer-layout";
import { loadAccount } from "utils/account";
import { AccountParser, publicKey } from "utils/layout";

import { Fees, FeesLayout } from "./fees";
import { Rewards, RewardsLayout } from "./rewards";

export interface ConfigInfo {
  version: number;
  bumpSeed: number;
  adminKey: PublicKey;
  deltafiMint: PublicKey;
  oracleProgramId: PublicKey;
  fees: Fees;
  rewards: Rewards;
  deltafiToken: PublicKey;
}

/** @internal */
export const ConfigInfoLayout = struct<ConfigInfo>(
  [
    u8("version"),
    u8("bumpSeed"),
    publicKey("adminKey"),
    publicKey("deltafiMint"),
    publicKey("oracleProgramId"),
    FeesLayout("fees"),
    RewardsLayout("rewards"),
    publicKey("deltafiToken"),
    blob(128, "reserved"),
  ],
  "configInfo",
);

export const CONFIG_SIZE = ConfigInfoLayout.span;

export const isConfigInfo = (info: AccountInfo<Buffer>): boolean => {
  return info.data.length === CONFIG_SIZE;
};

export const parserConfigInfo: AccountParser<ConfigInfo> = (info: AccountInfo<Buffer>) => {
  if (!isConfigInfo(info)) return;

  const buffer = Buffer.from(info.data);
  const configInfo = ConfigInfoLayout.decode(buffer);

  if (!configInfo.version) return;

  return {
    info,
    data: configInfo,
  };
};

export const loadConfig = async (
  connection: Connection,
  address: PublicKey,
  programId: PublicKey,
): Promise<ConfigInfo> => {
  const accountInfo = await loadAccount(connection, address, programId);

  const parsed = parserConfigInfo(accountInfo);

  if (!parsed) throw new Error("Failed to load configuration account");

  return parsed.data;
};
