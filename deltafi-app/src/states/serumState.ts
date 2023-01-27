import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { PublicKey, Connection } from "@solana/web3.js";
import { deployConfig, poolConfigsWithSerum } from "constants/deployConfig";
import { Market } from "@project-serum/serum";
import BigNumber from "bignumber.js";
import { PoolInfo } from "providers/types";

const serumProgramId = new PublicKey(deployConfig.serumProgramId);

export type SerumNameToMarketPrice = Record<string, number>;

export interface SerumState {
  poolNameToSerumPrice: SerumNameToMarketPrice;
}

const initialState: SerumState = {
  poolNameToSerumPrice: {},
};

export const fetchSerumDataThunk = createAsyncThunk(
  "serum/fetchSerumData",
  async (connection: Connection) => {
    const poolNameToSerumPrice: SerumNameToMarketPrice = {};
    // Only "mainnet-beta" has serumProgramId
    if (deployConfig.network === "mainnet-beta") {
      const serumMarketNameAndPriceList = await getSerumMarketNameAndPriceList(connection);
      for (const marketNameAndPrice of serumMarketNameAndPriceList) {
        poolNameToSerumPrice[marketNameAndPrice.poolName] = marketNameAndPrice.marketPrice;
      }
    }
    return {
      poolNameToSerumPrice,
    };
  },
);

export const serumReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchSerumDataThunk.fulfilled, (state, action) => {
    state.poolNameToSerumPrice = action.payload.poolNameToSerumPrice;
  });
});

async function getSerumMarketPrice(marketAddress, connection) {
  const marketPubkey = new PublicKey(marketAddress);
  const market = await Market.load(connection, marketPubkey, {}, serumProgramId);
  // Fetching orderbooks
  const bids = await market.loadBids(connection);
  const asks = await market.loadAsks(connection);
  // Asks L2 orderbook data
  const minAskPrice = asks.getL2(1)[0][0];
  // Bids L2 orderbook data
  const maxBidPrice = bids.getL2(1)[0][0];

  return (minAskPrice + maxBidPrice) / 2;
}

async function getSerumMarketNameAndPriceList(connection: Connection) {
  const serumMarketNameAndPriceList = [];
  for (const pool of poolConfigsWithSerum) {
    const marketPrice = await getSerumMarketPrice(pool.serumMarket, connection);
    const poolName = pool.name;
    serumMarketNameAndPriceList.push({
      poolName,
      marketPrice,
    });
  }
  return serumMarketNameAndPriceList;
}

export function getSerumMarketPriceByPoolName(
  poolNameToSerumPrice: SerumNameToMarketPrice,
  poolName: string | null | undefined,
) {
  if (!poolName) {
    return null;
  }
  return poolNameToSerumPrice[poolName];
}

export function getserumMarketPrice(
  serumNameToMarketPrice: SerumNameToMarketPrice,
  pool: PoolInfo,
  quotePrice: any,
) {
  const price = getSerumMarketPriceByPoolName(serumNameToMarketPrice, pool?.name);
  const basePrice = price * quotePrice;
  const marketPrice = new BigNumber(price);
  return {
    marketPrice,
    basePrice,
    quotePrice,
  };
}
