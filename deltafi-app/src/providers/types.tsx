import BigNumber from "bignumber.js";
import { PublicKey } from "@solana/web3.js";

import { Fees, PoolState, Rewards, SwapType } from "lib/state";
import { TokenConfig } from "constants/deployConfig";

export interface ConnectionContextValues {
  endpoint: string;
  network: string;
  setNetwork: (network: string) => void;
}

export interface EndpointInfo {
  name: string;
  endpoint: string;
  custom: boolean;
}

export interface ModalInfo {
  menuOpen: boolean;
  menu: string;
  address: PublicKey | null;
  data: any;
}

export interface ModalContextInfo {
  modalInfo: ModalInfo;
  setMenu: (open: boolean, menu?: string, address?: PublicKey, data?: any) => void;
}

export interface MarketConfig {
  publicKey: PublicKey;
  bumpSeed: number;
  deltafiMint: PublicKey;
  deltafiToken: PublicKey;
}

export interface PoolInfo {
  name: string;
  swapType: SwapType;
  publicKey: PublicKey;
  nonce: number;
  isPaused: boolean;
  baseTokenInfo: TokenConfig;
  quoteTokenInfo: TokenConfig;
  base: PublicKey;
  quote: PublicKey;
  pythBase: PublicKey;
  pythQuote: PublicKey;
  poolMintKey: PublicKey;
  baseFee: PublicKey;
  quoteFee: PublicKey;
  fees: Fees;
  rewards: Rewards;
  poolState: PoolState;
  oraclePriority: number;
}

export interface FarmPoolInfo {
  name: string;
  publicKey: PublicKey;
  bumpSeed: number;
  poolAddress: PublicKey;
  poolMintKey: PublicKey;
  poolToken: PublicKey;
  baseTokenInfo: TokenConfig;
  quoteTokenInfo: TokenConfig;
  reservedAmount: bigint;
  aprNumerator: bigint;
  aprDenominator: bigint;
}

export interface StakeAccount {
  depositBalance: BigNumber;
  rewardsOwed: BigNumber;
  rewardEstimated: BigNumber;
  lastUpdateTs: BigNumber;
  nextClaimTs: BigNumber;
}
