import BigNumber from "bignumber.js";

import { PoolInfo } from "providers/types";

export function getOutAmount(
  pool: PoolInfo,
  amount: string,
  fromTokenMint: string,
  toTokenMint: string,
  slippage: number,
) {
  const { baseTokenInfo, quoteTokenInfo } = pool;
  const baseReserve = pool.poolState.baseReserve;
  const quoteReserve = pool.poolState.quoteReserve;
  const price = quoteReserve
    .dividedBy(baseReserve)
    .times(10 ** baseTokenInfo.decimals)
    .dividedBy(10 ** quoteTokenInfo.decimals);
  const fromAmount = new BigNumber(amount);
  let outAmount = new BigNumber(0);
  const percent = new BigNumber(100).plus(slippage).dividedBy(100);

  if (fromTokenMint === baseTokenInfo.mint && toTokenMint === quoteTokenInfo.mint) {
    outAmount = fromAmount.multipliedBy(price);
    outAmount = outAmount.multipliedBy(percent);
  } else if (fromTokenMint === quoteTokenInfo.mint && toTokenMint === baseTokenInfo.mint) {
    outAmount = fromAmount.dividedBy(price);
    outAmount = outAmount.multipliedBy(percent);
  }

  return outAmount.toNumber();
}
