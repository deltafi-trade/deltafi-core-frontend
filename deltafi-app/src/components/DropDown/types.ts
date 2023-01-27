import { InputBaseProps } from "@material-ui/core";
import { TokenConfig } from "constants/deployConfig";

export interface DropDownProps<T extends TokenConfig> {
  value: T;
  options: Array<T>;
  onChange: (value: T) => void;
  inputProps?: InputBaseProps;
  disableDrop?: boolean;
}
