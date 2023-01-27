import BigNumber from "bignumber.js";

import { struct, u8 } from "buffer-layout";
import { decimal, u64 } from "utils/layout";

/** @internal */
export enum Multiplier {
  /// r = 1
  One = 0,
  /// r > 1
  AboveOne,
  /// r < 1
  BelowOne,
}

export interface PoolState {
  slope: BigNumber;
  baseReserve: BigNumber;
  quoteReserve: BigNumber;
  baseTarget: BigNumber;
  quoteTarget: BigNumber;
  totalSupply: BigNumber;
  multiplier: Multiplier;
  lastPythPrice: BigNumber;
  lastValidPythPriceSlot: BigNumber;
}

/** @internal */
export const PoolStateLayout = (property: string) =>
  struct<PoolState>(
    [
      decimal("marketPrice"),
      decimal("slope"),
      decimal("baseReserve"),
      decimal("quoteReserve"),
      decimal("baseTarget"),
      decimal("quoteTarget"),
      u64("totalSupply"),
      u8("multiplier"),
      decimal("lastPythPrice"),
      u64("lastValidPythPriceSlot"),
    ],
    property,
  );
