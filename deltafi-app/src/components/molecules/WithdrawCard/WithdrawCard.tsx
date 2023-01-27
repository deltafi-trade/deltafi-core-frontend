import React, { useMemo } from "react";
import CurrencyInput from "react-currency-input-field";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import clx from "classnames";

import { DropDown } from "components";
import useStyles from "./styles";
import { SwapCard } from "views/Swap/components/types";
import { getTokenConfigBySymbol, tokenConfigs } from "constants/deployConfig";

export interface SettingsProps {
  priceImpact: string;
  isIncludeDecimal: boolean;
  isSmall?: boolean;
  handleChangeImpact: any;
  handleChangeInclude: any;
  handleClose: any;
}

export interface CardProps {
  card: SwapCard;
  handleChangeCard: any;
  disableDrop?: boolean;
  withdrawal?: string;
}

const WithdrawCard: React.FC<CardProps> = (props) => {
  const { card, handleChangeCard, disableDrop, withdrawal } = props;
  const classes = useStyles(props);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d.-]/g, "");

    handleChangeCard({ ...card, amount: isNaN(parseFloat(value)) ? "" : value });
  };

  const handleChangeToken = (token) => {
    const newToken = getTokenConfigBySymbol(token.symbol);
    handleChangeCard({ ...card, token: newToken });
  };

  const value = useMemo(() => {
    const pointIdx = card.amount.indexOf(".");
    if (pointIdx > 0) {
      return card.amount.slice(0, pointIdx) + card.amount.slice(pointIdx, pointIdx + 7);
    }
    return card.amount;
  }, [card.amount]);

  return (
    <Paper className={classes.root}>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <DropDown
          value={card.token}
          options={tokenConfigs}
          disableDrop={disableDrop}
          onChange={handleChangeToken}
          inputProps={{ placeholder: "token name, symbol" }}
        />
        <CurrencyInput
          name="currency"
          className={classes.currencyInput}
          autoComplete="off"
          placeholder="0.00"
          minLength={0}
          maxLength={20}
          decimalsLimit={20}
          value={value}
          onChange={inputHandler}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Typography color="primary" variant="body2" className={classes.tokenBalance}>
            Max Withdrawal:
          </Typography>
          &nbsp;
          <Typography className={clx(classes.tokenBalance, classes.withdrawNumber)} variant="body2">
            {`${withdrawal || 0} ${card.token?.symbol}`}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default WithdrawCard;
