import BigNumber from "bignumber.js";

const BN = BigNumber.clone({
  FORMAT: {
    decimalSeparator: ".",
    groupSeparator: ",",
    groupSize: 3,
  },
});

export function exponentiatedBy(num: BigNumber | string, decimals: number): BigNumber {
  const wrap = new BN(num);
  return wrap.div(new BN(`1e+${decimals}`));
}

export function exponentiate(num: BigNumber | string, decimals: number): BigNumber {
  return new BigNumber(num).multipliedBy(new BigNumber(`1e+${decimals}`));
}

export function rate(numerator: BigNumber, denominator: BigNumber): BigNumber {
  return new BN(numerator).multipliedBy(100).div(denominator);
}
