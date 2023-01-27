import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { PublicKey, Connection, AccountInfo } from "@solana/web3.js";

import { PoolInfo } from "providers/types";
import {
  poolConfigs,
  getPoolConfigByPoolKey,
  getTokenConfigBySymbol,
} from "constants/deployConfig";
import { getMultipleAccounts } from "utils/account";
import { parseSwapInfo } from "lib/state";

type PoolKeyToPoolInfo = Record<string, PoolInfo>;

export interface PoolState {
  poolKeyToPoolInfo: PoolKeyToPoolInfo;
}

const initialState: PoolState = {
  poolKeyToPoolInfo: {},
};

type FetchPoolsThunkArg = {
  connection: Connection;
};

export const fetchPoolsThunk = createAsyncThunk(
  "pool/fetchPools",
  async (arg: FetchPoolsThunkArg) => {
    const poolKeyToPoolInfo: PoolKeyToPoolInfo = {};
    const pools = await getPools(arg.connection);
    for (const pool of pools) {
      poolKeyToPoolInfo[pool.publicKey.toBase58()] = pool;
    }
    return {
      poolKeyToPoolInfo,
    };
  },
);

export const poolReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchPoolsThunk.fulfilled, (state, action) => {
    state.poolKeyToPoolInfo = action.payload.poolKeyToPoolInfo;
  });
});

async function getPools(connection: Connection) {
  const poolAddressList = poolConfigs.map(({ swap }) => new PublicKey(swap));
  const poolInfos = await getMultipleAccounts(connection, poolAddressList, "confirmed");

  const pools = [];
  for (let i = 0; i < poolInfos.keys.length; i++) {
    const key = poolInfos.keys[i];
    const poolInfo = poolInfos.array[i];
    const poolConfig = getPoolConfigByPoolKey(key.toBase58());
    pools.push(getPoolFromSwapInfoAccount(poolConfig, key, poolInfo));
  }
  return pools;
}

const getPoolFromSwapInfoAccount = (poolConfig, publicKey, poolInfo) => {
  const { data } = parseSwapInfo(poolInfo as AccountInfo<Buffer>);
  return {
    name: poolConfig.name,
    swapType: data.swapType,
    publicKey: publicKey,
    nonce: data.nonce,
    isPaused: data.isPaused,
    baseTokenInfo: getTokenConfigBySymbol(poolConfig.base),
    quoteTokenInfo: getTokenConfigBySymbol(poolConfig.quote),
    base: data.tokenA,
    quote: data.tokenB,
    pythBase: data.pythA,
    pythQuote: data.pythB,
    poolMintKey: data.poolMint,
    baseFee: data.adminFeeKeyA,
    quoteFee: data.adminFeeKeyB,
    fees: data.fees,
    rewards: data.rewards,
    poolState: data.poolState,
    oraclePriority: data.oraclePriorityFlags,
  };
};
