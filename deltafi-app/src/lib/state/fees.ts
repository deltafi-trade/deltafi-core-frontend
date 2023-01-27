import { struct } from "buffer-layout";
import { bool, u64 } from "utils/layout";

export interface Fees {
  isInitialized: boolean;
  adminTradeFeeNumerator: bigint;
  adminTradeFeeDenominator: bigint;
  adminWithdrawFeeNumerator: bigint;
  adminWithdrawFeeDenominator: bigint;
  tradeFeeNumerator: bigint;
  tradeFeeDenominator: bigint;
  withdrawFeeNumerator: bigint;
  withdrawFeeDenominator: bigint;
}

/** @internal */
export const FeesLayout = (property = "fees") =>
  struct<Fees>(
    [
      bool("isInitialized"),
      u64("adminTradeFeeNumerator"),
      u64("adminTradeFeeDenominator"),
      u64("adminWithdrawFeeNumerator"),
      u64("adminWithdrawFeeDenominator"),
      u64("tradeFeeNumerator"),
      u64("tradeFeeDenominator"),
      u64("withdrawFeeNumerator"),
      u64("withdrawFeeDenominator"),
    ],
    property,
  );
