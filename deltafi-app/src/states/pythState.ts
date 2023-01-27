import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { PublicKey, Connection } from "@solana/web3.js";
import { PriceData, ProductData, parsePriceData } from "@pythnetwork/client";
import BigNumber from "bignumber.js";

import { tokenConfigsWithPyth } from "constants/deployConfig";
import { getMultipleAccounts } from "utils/account";
import { PoolInfo } from "providers/types";

type PythData = {
  symbol: string;
  priceKey: PublicKey;
  productData: ProductData;
  priceData: PriceData;
};
type SymbolToPythData = Record<string, PythData>;

export interface PythState {
  symbolToPythData: SymbolToPythData;
}

const initialState: PythState = {
  symbolToPythData: {},
};

export const fetchPythDataThunk = createAsyncThunk(
  "pyth/fetchPythData",
  async (connection: Connection) => {
    const symbolToPythData: SymbolToPythData = {};
    const pythDataList = await getPythDataList(connection);
    for (const pythData of pythDataList) {
      symbolToPythData[pythData.symbol] = pythData;
    }
    return {
      symbolToPythData,
    };
  },
);

export const pythReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchPythDataThunk.fulfilled, (state, action) => {
    state.symbolToPythData = action.payload.symbolToPythData;
  });
});

async function getPythDataList(connection: Connection) {
  const pythPriceKeys = tokenConfigsWithPyth.map(({ pyth }) => new PublicKey(pyth.price));
  const priceInfos = await getMultipleAccounts(connection, pythPriceKeys, "confirmed");
  const pythDataList = [];
  for (let i = 0; i < priceInfos.keys.length; i++) {
    const priceKey = priceInfos.keys[i];
    const priceData = parsePriceData(priceInfos.array[i].data as Buffer);
    const symbol = tokenConfigsWithPyth[i].symbol;
    pythDataList.push({
      priceKey,
      symbol,
      priceData,
    });
  }
  return pythDataList;
}

export function getPythPriceBySymbol(
  symbolToPythData: SymbolToPythData,
  tokenSymbol: string | null | undefined,
) {
  let result = { priceData: null, priceAccountKey: null, price: null };
  if (!tokenSymbol) {
    return result;
  }

  if (!symbolToPythData[tokenSymbol]) {
    return result;
  }

  const priceData = symbolToPythData[tokenSymbol].priceData;
  result.priceData = priceData;
  result.priceAccountKey = symbolToPythData[tokenSymbol].priceKey;
  result.price = priceData.price ? priceData.price : priceData.previousPrice;
  return result;
}

export function getPythMarketPrice(symbolToPythData: SymbolToPythData, pool: PoolInfo) {
  const { price: basePrice } = getPythPriceBySymbol(symbolToPythData, pool?.baseTokenInfo.symbol);
  const { price: quotePrice } = getPythPriceBySymbol(symbolToPythData, pool?.quoteTokenInfo.symbol);
  const marketPrice =
    basePrice && quotePrice ? new BigNumber(basePrice / quotePrice) : new BigNumber(NaN);
  return {
    marketPrice,
    basePrice,
    quotePrice,
  };
}
