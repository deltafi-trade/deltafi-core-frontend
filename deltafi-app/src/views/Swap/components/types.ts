import { TokenConfig } from "constants/deployConfig";

export interface SettingsProps {
  priceImpact: string;
  isIncludeDecimal: boolean;
  isSmall?: boolean;
  handleChangeImpact: any;
  handleChangeInclude: any;
  handleClose: any;
}

export interface SwapCard {
  token: TokenConfig | null | undefined;
  amount: string;
  amountWithSlippage: string;
}

export interface CardProps {
  card: SwapCard;
  handleChangeCard: any;
  disabled?: boolean;
  tokens?: TokenConfig[];
  disableDrop?: boolean;
  percentage?: number;
}
