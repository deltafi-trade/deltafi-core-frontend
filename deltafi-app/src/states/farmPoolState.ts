import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { AccountInfo, PublicKey, Connection } from "@solana/web3.js";

import { FarmPoolInfo } from "providers/types";
import { deployConfig } from "constants/deployConfig";
import { getMultipleAccounts } from "utils/account";
import { parseFarmInfo } from "lib/state/farm";

type FarmPoolKeyToFarmPoolInfo = Record<string, FarmPoolInfo>;

export interface FarmPoolState {
  farmPoolKeyToFarmPoolInfo: FarmPoolKeyToFarmPoolInfo;
}

const initialState: FarmPoolState = {
  farmPoolKeyToFarmPoolInfo: {},
};

type FetchFarmPoolsThunkArg = {
  connection: Connection;
};

export const fetchFarmPoolsThunk = createAsyncThunk(
  "farmPool/fetchFarmPools",
  async (arg: FetchFarmPoolsThunkArg) => {
    const farmPoolKeyToFarmPoolInfo: FarmPoolKeyToFarmPoolInfo = {};
    const farmPools = await getFarmPools(arg.connection);
    for (const farmPool of farmPools) {
      farmPoolKeyToFarmPoolInfo[farmPool.publicKey.toBase58()] = farmPool;
    }
    return {
      farmPoolKeyToFarmPoolInfo,
    };
  },
);

export const farmPoolReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchFarmPoolsThunk.fulfilled, (state, action) => {
    state.farmPoolKeyToFarmPoolInfo = action.payload.farmPoolKeyToFarmPoolInfo;
  });
});

async function getFarmPools(connection: Connection) {
  const poolInfoList = deployConfig.poolInfo;
  const farmAddressList = poolInfoList.map(({ farm }) => new PublicKey(farm));
  const farmInfos = await getMultipleAccounts(connection, farmAddressList, "confirmed");

  const farmPools = [];
  for (let i = 0; i < farmInfos.keys.length; i++) {
    let key = farmInfos.keys[i];
    let farmPoolInfo = farmInfos.array[i];
    const { data } = parseFarmInfo(farmPoolInfo as AccountInfo<Buffer>);
    const poolInfo = poolInfoList.find(({ farm }) => farm === key.toBase58());
    farmPools.push({
      name: poolInfo.name,
      publicKey: new PublicKey(key),
      bumpSeed: data.bumpSeed,
      poolAddress: new PublicKey(poolInfo.swap),
      poolMintKey: data.poolMint,
      poolToken: data.poolToken,
      reservedAmount: data.reservedAmount,
      aprNumerator: data.aprNumerator,
      aprDenominator: data.aprDenominator,
    });
  }
  return farmPools;
}
