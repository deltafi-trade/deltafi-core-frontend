import BigNumber from "bignumber.js";
import { max } from "lodash";
import { exponentiatedBy } from "utils/decimal";
import { PoolState, Multiplier } from "../state";

let BN = BigNumber.clone({ DECIMAL_PLACES: 2 });

export class PMM implements PoolState {
  marketPrice = new BN(0);

  slope = new BN(0);

  baseReserve = new BN(0);

  quoteReserve = new BN(0);

  baseTarget = new BN(0);

  quoteTarget = new BN(0);

  totalSupply = new BN(0);

  multiplier = Multiplier.One;

  lastPythPrice = new BN(0);

  lastValidPythPriceSlot = new BN(0);

  constructor(state: PoolState, marketPrice: BigNumber) {
    this.marketPrice = new BN(marketPrice);
    this.slope = new BN(state.slope);
    this.baseReserve = new BN(state.baseReserve);
    this.quoteReserve = new BN(state.quoteReserve);
    this.baseTarget = new BN(state.baseTarget);
    this.quoteTarget = new BN(state.quoteTarget);
    this.totalSupply = new BN(state.totalSupply);
    this.lastPythPrice = new BN(state.lastPythPrice);
    this.lastValidPythPriceSlot = new BN(state.lastValidPythPriceSlot);
    this.multiplier = state.multiplier;

    this.adjustTarget();
  }

  baseTotalValue(basePrice: number, decimals: number): BigNumber {
    return exponentiatedBy(this.baseReserve.multipliedBy(basePrice), decimals);
  }

  quoteTotalValue(quotePrice: number, decimals: number): BigNumber {
    return exponentiatedBy(this.quoteReserve.multipliedBy(quotePrice), decimals);
  }

  tvl(
    basePrice: number,
    quotePrice: number,
    baseDecimals: number,
    quoteDecimals: number,
  ): BigNumber {
    return this.baseTotalValue(basePrice, baseDecimals).plus(
      this.quoteTotalValue(quotePrice, quoteDecimals),
    );
  }

  basePercent(
    basePrice: number,
    quotePrice: number,
    baseDecimals: number,
    quoteDecimals: number,
  ): BigNumber {
    const tvl = this.tvl(basePrice, quotePrice, baseDecimals, quoteDecimals);
    const baseTotalValue = this.baseTotalValue(basePrice, baseDecimals);
    return baseTotalValue.dividedBy(tvl).multipliedBy(100);
  }

  quotePercent(
    basePrice: number,
    quotePrice: number,
    quoteDecimals: number,
    baseDecimals,
  ): BigNumber {
    const tvl = this.tvl(basePrice, quotePrice, baseDecimals, quoteDecimals);
    const quoteTotalValue = this.quoteTotalValue(quotePrice, quoteDecimals);
    return quoteTotalValue.dividedBy(tvl).multipliedBy(100);
  }

  baseShareRate(base: number, share: BigNumber): BigNumber {
    return new BigNumber(base).multipliedBy(100).div(this.baseReserve.multipliedBy(share));
  }

  quoteShareRate(quote: number, share: BigNumber): BigNumber {
    return new BigNumber(quote).multipliedBy(100).div(this.quoteReserve.multipliedBy(share));
  }

  quoteFromBase(base: number): BigNumber {
    return this.quoteReserve.multipliedBy(new BigNumber(base).div(this.baseReserve));
  }

  baseFromQuote(quote: number): BigNumber {
    return this.baseReserve.multipliedBy(new BigNumber(quote).div(this.quoteReserve));
  }

  poolTokenFromAmount(
    baseAmount: BigNumber,
    quoteAmount: BigNumber,
    poolTokenAmount: BigNumber,
    share: 0 | BigNumber,
  ): BigNumber {
    console.info("poolTokenAmount", poolTokenAmount);
    const basePercent = baseAmount
      .multipliedBy(100)
      .div(share)
      .multipliedBy(100)
      .div(this.baseReserve);
    const quotePercent = quoteAmount
      .multipliedBy(100)
      .div(share)
      .multipliedBy(100)
      .div(this.quoteReserve);
    const poolTokenPercentage = max([basePercent.toNumber(), quotePercent.toNumber()]);

    return new BigNumber(poolTokenAmount).multipliedBy(poolTokenPercentage).div(100);
  }

  amountFromShare(
    share: number,
    baseDecimals: number,
    quoteDecimals: number,
  ): [BigNumber, BigNumber] {
    const base = exponentiatedBy(this.baseReserve.multipliedBy(share / 100), baseDecimals);
    const quote = exponentiatedBy(this.quoteReserve.multipliedBy(share / 100), quoteDecimals);
    return [base, quote];
  }

  adjustTarget() {
    if (this.multiplier === Multiplier.BelowOne) {
      this.quoteTarget = this.getTargetReserve(
        this.quoteReserve,
        this.baseReserve.minus(this.baseTarget),
        this.marketPrice,
        this.slope,
      );
    } else if (this.multiplier === Multiplier.AboveOne) {
      this.baseTarget = this.getTargetReserve(
        this.baseReserve,
        this.quoteReserve.minus(this.quoteTarget),
        this.marketPrice,
        this.slope,
      );
    }
  }

  getTargetReserve(
    currentReserve: BigNumber,
    quoteAmount: BigNumber,
    marketPrice: BigNumber,
    slope: BigNumber,
  ): BigNumber {
    if (currentReserve.isZero()) return new BigNumber(0);
    if (slope.isZero()) return quoteAmount.multipliedBy(marketPrice).plus(currentReserve);

    if (slope.isGreaterThan(1)) return new BigNumber(0);

    let priceOffset = marketPrice.multipliedBy(slope).multipliedBy(4);
    let squareRoot: BigNumber;
    if (priceOffset.isZero()) {
      squareRoot = new BigNumber(1);
    } else if (
      priceOffset.multipliedBy(quoteAmount).dividedBy(priceOffset).isEqualTo(quoteAmount)
    ) {
      squareRoot = priceOffset.multipliedBy(quoteAmount).dividedBy(currentReserve).plus(1).sqrt();
    } else {
      squareRoot = priceOffset.dividedBy(currentReserve).multipliedBy(quoteAmount).plus(1).sqrt();
    }

    const premium = squareRoot.minus(1).dividedBy(2).dividedBy(slope).plus(1);
    return premium.multipliedBy(currentReserve);
  }

  sellBaseToken(baseAmount: BigNumber): BigNumber {
    let quoteAmount: BigNumber;
    switch (this.multiplier) {
      case Multiplier.One:
      case Multiplier.BelowOne:
        quoteAmount = this.sellBaseTokenWithMultiplier(baseAmount, this.multiplier);
        break;
      case Multiplier.AboveOne:
        {
          const backToOnePayBase = this.baseTarget.minus(this.baseReserve);
          const backToOneReceiveQuote = this.quoteReserve.minus(this.quoteTarget);
          if (backToOnePayBase.isGreaterThan(baseAmount)) {
            quoteAmount = BigNumber.min(
              backToOneReceiveQuote,
              this.sellBaseTokenWithMultiplier(baseAmount, this.multiplier),
            );
          } else if (backToOnePayBase.isEqualTo(baseAmount)) {
            quoteAmount = backToOneReceiveQuote;
          } else if (backToOnePayBase.isLessThan(baseAmount)) {
            quoteAmount = backToOneReceiveQuote.plus(
              this.sellBaseTokenWithMultiplier(baseAmount.minus(backToOnePayBase), Multiplier.One),
            );
          }
        }
        break;
    }

    return quoteAmount;
  }

  sellBaseTokenWithMultiplier(baseAmount: BigNumber, multiplier: Multiplier): BigNumber {
    if (this.slope.isGreaterThan(1)) return new BigNumber(0);

    switch (multiplier) {
      case Multiplier.One:
        return this.getTargetAmountReserveDirection(
          this.quoteTarget,
          this.quoteTarget,
          baseAmount,
          this.marketPrice,
          this.slope,
        );
      case Multiplier.AboveOne:
        return this.getTargetAmount(
          this.baseTarget,
          this.baseReserve.minus(baseAmount),
          this.baseReserve,
          this.marketPrice,
          this.slope,
        );
      case Multiplier.BelowOne:
        return this.getTargetAmountReserveDirection(
          this.quoteTarget,
          this.quoteReserve,
          baseAmount,
          this.marketPrice,
          this.slope,
        );
    }
  }

  sellQuoteToken(quoteAmount: BigNumber): BigNumber {
    let baseAmount: BigNumber;
    switch (this.multiplier) {
      case Multiplier.One:
      case Multiplier.AboveOne:
        baseAmount = this.sellQuoteTokenWithMultiplier(quoteAmount, this.multiplier);
        break;
      case Multiplier.BelowOne:
        {
          const backToOnePayQuote = this.quoteTarget.minus(this.quoteReserve);
          const backToOneReceiveBase = this.baseReserve.minus(this.baseTarget);
          if (backToOnePayQuote.isGreaterThan(quoteAmount)) {
            baseAmount = BigNumber.min(
              this.sellQuoteTokenWithMultiplier(quoteAmount, this.multiplier),
              backToOneReceiveBase,
            );
          } else if (backToOnePayQuote.isEqualTo(quoteAmount)) {
            baseAmount = backToOneReceiveBase;
          } else if (backToOnePayQuote.isLessThan(quoteAmount)) {
            baseAmount = backToOneReceiveBase.plus(
              this.sellQuoteTokenWithMultiplier(
                quoteAmount.minus(backToOnePayQuote),
                Multiplier.One,
              ),
            );
          }
        }
        break;
    }

    return baseAmount;
  }

  sellQuoteTokenWithMultiplier(quoteAmount: BigNumber, multiplier: Multiplier): BigNumber {
    if (this.slope.isGreaterThan(1)) return new BigNumber(0);

    switch (multiplier) {
      case Multiplier.One:
        return this.getTargetAmountReserveDirection(
          this.baseTarget,
          this.baseTarget,
          quoteAmount,
          new BigNumber(1).dividedBy(this.marketPrice),
          this.slope,
        );
      case Multiplier.BelowOne:
        return this.getTargetAmount(
          this.quoteTarget,
          this.quoteReserve.minus(quoteAmount),
          this.quoteReserve,
          new BigNumber(1).dividedBy(this.marketPrice),
          this.slope,
        );
      case Multiplier.AboveOne:
        return this.getTargetAmountReserveDirection(
          this.baseTarget,
          this.baseReserve,
          quoteAmount,
          new BigNumber(1).dividedBy(this.marketPrice),
          this.slope,
        );
    }
  }

  getTargetAmountReserveDirection(
    targetReserve: BigNumber,
    currentReserve: BigNumber,
    quoteAmount: BigNumber,
    marketPrice: BigNumber,
    slope: BigNumber,
  ): BigNumber {
    if (targetReserve.isLessThanOrEqualTo(0)) return new BigNumber(0);
    if (quoteAmount.isZero()) return new BigNumber(0);
    if (slope.isGreaterThan(1)) return;

    const fairAmount = quoteAmount.multipliedBy(marketPrice);
    if (slope.isZero()) return BigNumber.min(fairAmount, currentReserve);
    if (slope.isEqualTo(1)) {
      let adjustedRatio: BigNumber;
      if (fairAmount.isZero()) adjustedRatio = new BigNumber(1);
      else if (
        fairAmount.multipliedBy(currentReserve).dividedBy(fairAmount).isEqualTo(currentReserve)
      ) {
        adjustedRatio = fairAmount
          .multipliedBy(currentReserve)
          .dividedBy(targetReserve)
          .dividedBy(targetReserve);
      } else {
        adjustedRatio = quoteAmount
          .multipliedBy(currentReserve)
          .dividedBy(targetReserve)
          .multipliedBy(marketPrice)
          .dividedBy(targetReserve);
      }

      return currentReserve.multipliedBy(adjustedRatio).dividedBy(adjustedRatio.plus(1));
    }

    const futureReserve = slope
      .multipliedBy(targetReserve)
      .dividedBy(currentReserve)
      .multipliedBy(targetReserve)
      .plus(fairAmount);
    let adjustedReserve = new BigNumber(1).minus(slope).multipliedBy(currentReserve);

    let isSmaller: boolean;
    if (adjustedReserve.isLessThan(futureReserve)) {
      isSmaller = true;
      adjustedReserve = futureReserve.minus(adjustedReserve);
    } else {
      isSmaller = false;
      adjustedReserve = adjustedReserve.minus(futureReserve);
    }

    let squareRoot = new BigNumber(1)
      .minus(slope)
      .multipliedBy(4)
      .multipliedBy(slope)
      .multipliedBy(targetReserve.pow(2));
    squareRoot = adjustedReserve.multipliedBy(adjustedReserve).plus(squareRoot).sqrt();
    const denominator = new BigNumber(1).minus(slope).multipliedBy(2);
    const numerator = isSmaller
      ? squareRoot.minus(adjustedReserve)
      : adjustedReserve.plus(squareRoot);
    const candidateReserve = numerator.dividedBy(denominator);

    if (candidateReserve.isGreaterThan(currentReserve)) return new BigNumber(0);

    return currentReserve.minus(candidateReserve);
  }

  getTargetAmount(
    targetReserve: BigNumber,
    futureReserve: BigNumber,
    currentReserve: BigNumber,
    marketPrice: BigNumber,
    slope: BigNumber,
  ): BigNumber {
    if (
      currentReserve.isNegative() ||
      futureReserve.isLessThan(currentReserve) ||
      futureReserve.isGreaterThan(targetReserve)
    )
      return new BigNumber(0);

    if (slope.isGreaterThan(1)) return new BigNumber(0);
    const fairAmount = futureReserve.minus(currentReserve).multipliedBy(marketPrice);
    if (slope.isZero) return fairAmount;

    // const penaltyRatio = targetReserve.multipliedBy(targetReserve).dividedBy(futureReserve).dividedBy(currentReserve)
    const penalty = targetReserve
      .multipliedBy(targetReserve)
      .dividedBy(futureReserve)
      .dividedBy(currentReserve)
      .multipliedBy(slope);
    return fairAmount.multipliedBy(penalty.plus(1).minus(slope));
  }
}
