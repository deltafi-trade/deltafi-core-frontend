import { RootState } from "./store";

import { PoolInfo } from "providers/types";
import { getPoolConfigBySymbols } from "constants/deployConfig";
import { getPythMarketPrice, getPythPriceBySymbol } from "./pythState";
import { getserumMarketPrice } from "./serumState";
import { OraclePriority } from "lib/state";

export const appSelector = (state: RootState) => state.app;
export const farmUserSelector = (state: RootState) => state.farmUser;
export const farmPoolSelector = (state: RootState) => state.farmPool;
export const poolSelector = (state: RootState) => state.pool;
export const pythSelector = (state: RootState) => state.pyth;
export const serumSelector = (state: RootState) => state.serum;
export const tokenAccountSelector = (state: RootState) => state.tokenAccount;

export function selectFarmUserByFarmPoolKey(farmPoolKey: string) {
  return (state: RootState) => {
    return state.farmUser.farmPoolKeyToFarmUser[farmPoolKey];
  };
}

export function selectFarmPoolByFarmPoolKey(farmPoolKey: string) {
  return (state: RootState) => {
    return state.farmPool.farmPoolKeyToFarmPoolInfo[farmPoolKey];
  };
}

export function getMarketPrice(symbolToPythData, poolNameToSerumPrice, pool) {
  if (pool?.oraclePriority === OraclePriority.PYTH_ONLY) {
    return getPythMarketPrice(symbolToPythData, pool);
  } else {
    const { price: quotePrice } = getPythPriceBySymbol(
      symbolToPythData,
      pool?.quoteTokenInfo.symbol,
    );
    return getserumMarketPrice(poolNameToSerumPrice, pool, quotePrice);
  }
}

export function selectMarketPriceByPool(pool: PoolInfo) {
  return (state: RootState) => {
    return getMarketPrice(state.pyth.symbolToPythData, state.serum.poolNameToSerumPrice, pool);
  };
}

export function selectPoolByPoolKey(poolKey: string) {
  return (state: RootState) => {
    return state.pool.poolKeyToPoolInfo[poolKey];
  };
}

export function selectPoolBySymbols(baseSymbol: string, quoteSymbol: string) {
  return (state: RootState) => {
    const poolConfig = getPoolConfigBySymbols(baseSymbol, quoteSymbol);
    return state.pool.poolKeyToPoolInfo[poolConfig?.swap];
  };
}

export function selectTokenAccountInfoByMint(mint: string) {
  return (state: RootState) => {
    if (state.tokenAccount.mintToTokenAccountInfo == null) {
      return null;
    }
    return state.tokenAccount.mintToTokenAccountInfo[mint];
  };
}
