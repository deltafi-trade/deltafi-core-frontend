import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { PublicKey, Connection } from "@solana/web3.js";
import { UserReferrerDataLayout } from "lib/state";
import { dummyAddress } from "utils/transactions/swap";
import { getReferralDataAccountPublicKey } from "utils/transactions/utils";

export interface AppState {
  referrerPublicKey?: PublicKey | null;
  enableReferral: boolean;
  lastSetTime: number;
  isNewUser?: boolean;
}

const initialState: AppState = {
  referrerPublicKey: undefined,
  enableReferral: false,
  // this flag is for checking if the async process matches the current state
  lastSetTime: 0,
  // if isNewUser is undefined, it means the state if not validated and not ready for use
  isNewUser: undefined,
};

export const setReferrerAction =
  createAction<{ referrerPublicKey: PublicKey | null; enableReferral: boolean }>("app/setReferrer");

type FetchReferrerThunkArg = {
  connection: Connection;
  config: PublicKey;
  walletAddress: PublicKey;
};

export const fetchReferrerThunk = createAsyncThunk(
  "app/fetchReferrer",
  async (arg: FetchReferrerThunkArg) => {
    const timestamp = Date.now();
    const referralAccountPublickey = await getReferralDataAccountPublicKey(arg.walletAddress);
    const referralAccountInfo = await arg.connection.getAccountInfo(referralAccountPublickey);

    let referrerPublicKey: PublicKey = null;
    let isNewUser: boolean = true;
    if (referralAccountInfo) {
      const referralInfo = UserReferrerDataLayout.decode(referralAccountInfo.data);
      if (
        arg.walletAddress !== referralInfo.referrer &&
        referralInfo.referrer.toBase58() !== dummyAddress
      ) {
        referrerPublicKey = referralInfo.referrer;
      }
      isNewUser = false;
    }

    return {
      referrerPublicKey,
      isNewUser,
      timestamp,
    };
  },
);

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setReferrerAction, (state, action) => {
      state.enableReferral = action.payload.enableReferral;
      state.referrerPublicKey = action.payload.referrerPublicKey;
      state.lastSetTime = undefined;
      state.isNewUser = undefined;
    })
    .addCase(fetchReferrerThunk.fulfilled, (state, action) => {
      if (action.payload.timestamp < state.lastSetTime || state.isNewUser !== undefined) {
        return;
      }

      state.isNewUser = action.payload.isNewUser;
      if (!action.payload.isNewUser) {
        // if the current user is not a new user, we set set referrerPublicKey
        // the the payload's value which was fetched from the account data
        state.referrerPublicKey = action.payload.referrerPublicKey;
      }
    });
});
