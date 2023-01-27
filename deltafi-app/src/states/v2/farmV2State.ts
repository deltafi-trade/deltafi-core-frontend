import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { Connection, PublicKey } from "@solana/web3.js";
import { deployConfigV2 } from "constants/deployConfigV2";
import { getDeltafiDexV2, makeProvider } from "anchor/anchor_utils";

const initialState = {
  farmKeyToFarmInfo: {},
};

type FetchFarmsV2ThunkArg = {
  connection: Connection;
  walletAddress: PublicKey;
};

export const fetchFarmsV2Thunk = createAsyncThunk(
  "v2/fetchFarms",
  async (arg: FetchFarmsV2ThunkArg) => {
    const program = getDeltafiDexV2(
      new PublicKey(deployConfigV2.programId),
      makeProvider(arg.connection, arg.walletAddress),
    );

    const poolInfoList = deployConfigV2.poolInfoList;
    const farmAddressList = deployConfigV2.poolInfoList.map(
      ({ farmInfo }) => new PublicKey(farmInfo),
    );
    const farmInfoList = await program.account.farmInfo.fetchMultiple(farmAddressList);
    const farmKeyToFarmInfo = {};
    for (let i = 0; i < poolInfoList.length; ++i) {
      const poolInfo = poolInfoList[i];
      const farmInfo = farmInfoList[i];
      console.info("farm", poolInfo.name, farmInfo);
      farmKeyToFarmInfo[poolInfo.farmInfo] = farmInfo;
    }

    return {
      farmKeyToFarmInfo,
    };
  },
);

export const farmV2Reducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchFarmsV2Thunk.fulfilled, (state, action) => {
    state.farmKeyToFarmInfo = action.payload.farmKeyToFarmInfo;
  });
});
