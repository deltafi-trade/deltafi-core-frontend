import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { Connection, PublicKey } from "@solana/web3.js";
import { deployConfigV2 } from "constants/deployConfigV2";
import { getDeltafiDexV2, makeProvider } from "anchor/anchor_utils";

const initialState = {
  user: null,
  fetched: false,
};

type FetchUserV2ThunkArg = {
  connection: Connection;
  walletAddress: PublicKey;
};

export const fetchUserV2Thunk = createAsyncThunk(
  "v2/fetchUser",
  async (arg: FetchUserV2ThunkArg) => {
    const program = getDeltafiDexV2(
      new PublicKey(deployConfigV2.programId),
      makeProvider(arg.connection, arg.walletAddress),
    );

    const [deltafiUserPubkey] = await PublicKey.findProgramAddress(
      [
        Buffer.from("User"),
        new PublicKey(deployConfigV2.marketConfig).toBuffer(),
        arg.walletAddress.toBuffer(),
      ],
      program.programId,
    );

    const deltafiUser = await program.account.deltafiUser.fetchNullable(deltafiUserPubkey);
    console.info("user", deltafiUser);
    return {
      user: deltafiUser,
    };
  },
);

export const userV2Reducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchUserV2Thunk.fulfilled, (state, action) => {
    state.user = action.payload.user;
    state.fetched = true;
  });
});
