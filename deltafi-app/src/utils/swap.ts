import BigNumber from "bignumber.js";
import { PoolInfo } from "providers/types";
import { PMMState, PMMHelper } from "lib/calc/pmm/index";
import { exponentiatedBy } from "./decimal";

export function getSwapOutAmount(
  pool: PoolInfo,
  fromTokenMint: string,
  toTokenMint: string,
  amount: string,
  slippage: number,
  marketPrice: BigNumber,
) {
  const { poolState, fees, baseTokenInfo, quoteTokenInfo } = pool;
  const pmmHelper = new PMMHelper();
  const {
    tradeFeeNumerator,
    tradeFeeDenominator,
    adminTradeFeeNumerator,
    adminTradeFeeDenominator,
  } = fees;
  const tradeFeeNumerator1 = new BigNumber(tradeFeeNumerator.toString());
  const tradeFeeDenominator1 = new BigNumber(tradeFeeDenominator.toString());
  const adminFeeNumerator1 = new BigNumber(adminTradeFeeNumerator.toString());
  const adminFeeDenominator1 = new BigNumber(adminTradeFeeDenominator.toString());
  const pmmState = new PMMState({
    B: exponentiatedBy(poolState.baseReserve, baseTokenInfo.decimals),
    Q: exponentiatedBy(poolState.quoteReserve, quoteTokenInfo.decimals),
    B0: exponentiatedBy(poolState.baseTarget, baseTokenInfo.decimals),
    Q0: exponentiatedBy(poolState.quoteTarget, quoteTokenInfo.decimals),
    R: poolState.multiplier as number,
    i: marketPrice,
    K: poolState.slope,
    mtFeeRate: tradeFeeNumerator1.dividedBy(tradeFeeDenominator1),
    lpFeeRate: adminFeeDenominator1.minus(adminFeeNumerator1).dividedBy(adminFeeDenominator1),
  });

  if (fromTokenMint === baseTokenInfo.mint && toTokenMint === quoteTokenInfo.mint) {
    const baseAmount = new BigNumber(amount);
    const quoteAmount = pmmHelper.querySellBase(baseAmount, pmmState);
    const fee = quoteAmount.multipliedBy(pmmState.mtFeeRate);
    const quoteAmountWithSlippage = quoteAmount.multipliedBy(100 - slippage).dividedBy(100);
    /**
     * calc price impact
     */
    const baseBalance = poolState.baseReserve.plus(baseAmount);
    const quoteBalance = poolState.quoteReserve.minus(quoteAmount);
    const beforePrice = poolState.quoteReserve.dividedBy(poolState.baseReserve);

    const afterPrice = quoteBalance.dividedBy(baseBalance);

    const priceImpact = beforePrice
      .minus(afterPrice)
      .abs()
      .dividedBy(beforePrice)
      .multipliedBy(100)
      .toNumber();
    return {
      amountIn: parseFloat(amount),
      amountOut: quoteAmount.toNumber(),
      amountOutWithSlippage: quoteAmountWithSlippage.toNumber(),
      fee: fee.toNumber(),
      priceImpact,
    };
  } else {
    const quoteAmount = new BigNumber(amount);
    const baseAmount = pmmHelper.querySellQuote(quoteAmount, pmmState);
    const fee = baseAmount.multipliedBy(tradeFeeNumerator1).dividedBy(tradeFeeDenominator1);
    const baseAmountWithSlippage = baseAmount.multipliedBy(100 - slippage).dividedBy(100);
    const baseBalance = poolState.baseReserve.minus(baseAmount);
    const quoteBalance = poolState.quoteReserve.plus(quoteAmount);
    const beforePrice = poolState.quoteReserve.dividedBy(poolState.baseReserve);

    const afterPrice = quoteBalance.dividedBy(baseBalance);

    const priceImpact = beforePrice
      .minus(afterPrice)
      .abs()
      .dividedBy(beforePrice)
      .multipliedBy(100)
      .toNumber();
    return {
      amountIn: parseFloat(amount),
      amountOut: baseAmount.toNumber(),
      amountOutWithSlippage: baseAmountWithSlippage.toNumber(),
      fee: fee.toNumber(),
      priceImpact,
    };
  }
}
