import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { AccountInfo, PublicKey, Connection } from "@solana/web3.js";
import BigNumber from "bignumber.js";

import { deployConfig } from "constants/deployConfig";
import { SWAP_PROGRAM_ID } from "constants/index";
import { FarmUserFlat, FarmUserLayout } from "lib/state/farm";
import { StakeAccount } from "providers/types";
import { getMultipleAccounts } from "utils/account";

export type FarmPoolKeyToFarmUser = Record<string, FarmUserFlat>;

export interface FarmUserState {
  farmPoolKeyToFarmUser: FarmPoolKeyToFarmUser;
}

const initialState: FarmUserState = {
  farmPoolKeyToFarmUser: {},
};

type FetchFarmUsersThunkArg = {
  connection: Connection;
  walletAddress: PublicKey;
};

export const fetchFarmUsersThunk = createAsyncThunk(
  "farmUser/fetchFarmUsers",
  async (arg: FetchFarmUsersThunkArg) => {
    const farmUsers = await getFarmUsers(arg.connection, arg.walletAddress);
    const farmPoolKeyToFarmUser: FarmPoolKeyToFarmUser = {};
    for (const farmUser of farmUsers) {
      farmPoolKeyToFarmUser[farmUser.farmPoolKey.toBase58()] = farmUser;
    }
    return {
      farmPoolKeyToFarmUser,
    };
  },
);

export const farmUserReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchFarmUsersThunk.fulfilled, (state, action) => {
    state.farmPoolKeyToFarmUser = action.payload.farmPoolKeyToFarmUser;
  });
});

const parseFarmUser = (publicKey: PublicKey, info: AccountInfo<Buffer>) => {
  const buffer = Buffer.from(info.data);
  const farmUser = FarmUserLayout.decode(buffer);
  if (!farmUser.isInitialized) {
    return;
  }
  return {
    publicKey,
    ...farmUser,
  };
};

async function getFarmUsers(connection: Connection, walletAddress: PublicKey) {
  const poolInfoList = deployConfig.poolInfo;
  const farmUserAddressList = [];
  for (const poolConfig of poolInfoList) {
    const seed = ("farmUser" + poolConfig.farm).substring(0, 32);
    const publicKey = await PublicKey.createWithSeed(walletAddress, seed, SWAP_PROGRAM_ID);
    farmUserAddressList.push(publicKey);
  }
  const farmUserInfos = await getMultipleAccounts(connection, farmUserAddressList, "confirmed");

  const farmUsers = [];
  for (let i = 0; i < farmUserInfos.keys.length; i++) {
    const key = farmUserInfos.keys[i];
    const accountInfo = farmUserInfos.array[i];
    if (!accountInfo) {
      continue;
    }

    const farmUserInfo = parseFarmUser(new PublicKey(key), accountInfo as AccountInfo<Buffer>);
    if (!farmUserInfo) {
      continue;
    }

    farmUsers.push(farmUserInfo);
  }
  return farmUsers;
}

export function toFarmUserPosition(farmUser: FarmUserFlat) {
  if (farmUser == null) {
    return null;
  }

  const farmUserAddress = farmUser.publicKey;
  const positions: {
    [key: string]: StakeAccount;
  } = {};

  const poolId = farmUser.farmPoolKey.toBase58();
  const depositBalance = new BigNumber(farmUser.depositedAmount.toString());
  positions[poolId] = {
    depositBalance,
    rewardsOwed: new BigNumber(farmUser.rewardsOwed.toString()),
    rewardEstimated: new BigNumber(farmUser.rewardsEstimated.toString()),
    lastUpdateTs: new BigNumber(farmUser.lastUpdateTs.toString()),
    nextClaimTs: new BigNumber(farmUser.nextClaimTs.toString()),
  };

  return { publicKey: farmUserAddress, positions };
}
