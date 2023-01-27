import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appState";
import { farmUserReducer } from "./farmUserState";
import { farmPoolReducer } from "./farmPoolState";
import { poolReducer } from "./poolState";
import { pythReducer } from "./pythState";
import { serumReducer } from "./serumState";
import { tokenAccountReducer } from "./tokenAccountState";

import { swapV2Reducer } from "./v2/swapV2State";
import { farmV2Reducer } from "./v2/farmV2State";
import { liquidityProviderV2Reducer } from "./v2/liqudityProviderV2State";
import { userV2Reducer } from "./v2/userV2State";

export const store = configureStore({
  reducer: {
    app: appReducer,
    farmUser: farmUserReducer,
    farmPool: farmPoolReducer,
    pool: poolReducer,
    pyth: pythReducer,
    tokenAccount: tokenAccountReducer,
    serum: serumReducer,
    swapV2: swapV2Reducer,
    farmV2: farmV2Reducer,
    liquidityProviderV2: liquidityProviderV2Reducer,
    userV2: userV2Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // We need to disable it, because PublicKey is not serializable.
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
