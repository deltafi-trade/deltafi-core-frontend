import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { Connection, PublicKey } from "@solana/web3.js";
import { deployConfigV2 } from "constants/deployConfigV2";
import { getDeltafiDexV2, makeProvider } from "anchor/anchor_utils";

const initialState = {
  swapKeyToLp: {},
};

type FetchLiquidityProvidersV2ThunkArg = {
  connection: Connection;
  walletAddress: PublicKey;
};

export const fetchLiquidityProvidersV2Thunk = createAsyncThunk(
  "v2/fetchLiquidityProviders",
  async (arg: FetchLiquidityProvidersV2ThunkArg) => {
    const program = getDeltafiDexV2(
      new PublicKey(deployConfigV2.programId),
      makeProvider(arg.connection, arg.walletAddress),
    );

    const poolInfoList = deployConfigV2.poolInfoList;
    const lpAddressList = [];
    for (const poolInfo of poolInfoList) {
      const [lpPublicKey] = await PublicKey.findProgramAddress(
        [
          Buffer.from("LiquidityProvider"),
          new PublicKey(poolInfo.swapInfo).toBuffer(),
          arg.walletAddress.toBuffer(),
        ],
        program.programId,
      );
      lpAddressList.push(lpPublicKey);
    }

    const lpList = await program.account.liquidityProvider.fetchMultiple(lpAddressList);
    const swapKeyToLp = {};
    for (let i = 0; i < poolInfoList.length; ++i) {
      const poolInfo = poolInfoList[i];
      const lp = lpList[i];
      console.info("lp", poolInfo.name, lp);
      swapKeyToLp[poolInfo.swapInfo] = lp;
    }

    return {
      swapKeyToLp,
    };
  },
);

export const liquidityProviderV2Reducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchLiquidityProvidersV2Thunk.fulfilled, (state, action) => {
    state.swapKeyToLp = action.payload.swapKeyToLp;
  });
});
