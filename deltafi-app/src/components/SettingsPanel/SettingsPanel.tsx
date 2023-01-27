import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Box, Divider, IconButton, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CurrencyInput from "react-currency-input-field";

import { Button, SwitchButton } from "components/Button";
import { SettingsProps } from "./types";

const PRICE_LIST = ["0.5", "1.0", "2.0"];

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  root: {
    background: palette.background.secondary,
    padding: spacing(2),
    borderRadius: 16,
    [breakpoints.up("sm")]: {
      padding: spacing(3),
    },
  },
  currencyInput: {
    textAlign: "center",
    outline: "none",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Inter",
    width: "100%",
    border: "none",
    backgroundColor: palette.text.crypto,
    color: palette.text.dark,
    borderRadius: 2,

    "&::placeholder": {
      color: palette.text.dark,
    },
    "&:focus": {
      border: "1px solid #9D9D9D",
      backgroundColor: "#000",
      color: palette.text.primary,
    },
  },
  priceImpact: {
    padding: `${spacing(1.5)}px 0px`,
    [breakpoints.up("sm")]: {
      padding: `${spacing(2)}px 0px`,
    },
  },
  description: {
    fontFamily: "Inter",
    fontSize: 12,
    lineHeight: "15px",
    color: "#F7F7F7",
    marginBottom: spacing(1.5),
    [breakpoints.up("sm")]: {
      fontSize: 16,
      lineHeight: "19px",
      marginBottom: spacing(2),
    },
  },
}));

const PriceList = styled.ul`
  padding: 0px;
  margin: 0px;
  display: grid;
  gap: 6px;
  width: 100%;
  grid-template-columns: 0.5fr 0.5fr 0.5fr 2fr;
  margin-top: ${({ theme }) => theme.spacing(1.5)}px;
  &.small {
    grid-template-columns: 1fr 1fr 1fr;
  }

  ${({ theme }) => theme.muibreakpoints.up("sm")} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`;
const PriceItem = styled.li`
  list-style: none;
  background: ${({ theme }) => theme.palette.text.crypto};
  border-radius: 2px;
  box-shadow: rgb(0 0 0 / 8%) 0px 20px 100px;
  box-sizing: border-box;

  &:last-child {
    grid-column: auto;

    &.small {
      grid-column: 1 / 4;
    }
    ${({ theme }) => theme.muibreakpoints.down("md")} {
      grid-column: 1 / 4;
    }
  }

  &.active {
    background: ${({ theme }) => theme.palette.background.black};
    border: 1px solid #9d9d9d;
  }
`;

const SettingsPanel = (props: SettingsProps): JSX.Element => {
  const {
    priceImpact,
    isIncludeDecimal,
    isSmall,
    handleChangeImpact,
    handleChangeInclude,
    handleClose,
  } = props;
  const classes = useStyles(props);
  const currencyInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (props.isOpen && !PRICE_LIST.includes(priceImpact)) {
      currencyInputRef.current?.focus();
    }
  }, [props.isOpen, priceImpact]);

  const handleChangeInput = (value: string) => {
    if (isNaN(parseFloat(value)) && value !== "") return;
    if (parseFloat(value) > 100) return;
    handleChangeImpact(value);
  };

  return (
    <Paper className={classes.root}>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Typography variant="subtitle1" color="textPrimary">
          Settings
        </Typography>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box className={classes.priceImpact}>
        <Typography variant="body1" color="textPrimary">
          Max Price Impact
        </Typography>
        <PriceList className={isSmall ? "small" : ""}>
          {PRICE_LIST.map((price) => (
            <PriceItem
              key={`item-${price}`}
              className={`${priceImpact === price ? "active" : ""} ${isSmall ? "small" : ""}`}
              onClick={() => handleChangeImpact(price)}
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs={`page: Settings, target: MaxPriceImpact(${price})}`}
            >
              <Button variant="text" fullWidth>{`${price}%`}</Button>
            </PriceItem>
          ))}
          <CurrencyInput
            ref={currencyInputRef}
            name="price impact"
            autoFocus
            className={classes.currencyInput}
            defaultValue={0}
            autoComplete="off"
            placeholder="0.00"
            allowNegativeValue={false}
            suffix="%"
            decimalScale={1}
            decimalsLimit={1}
            value={priceImpact}
            onValueChange={handleChangeInput}
          />
        </PriceList>
      </Box>
      <Box>
        <Typography className={classes.description}>
          Always include decimal wrapped tokens in list?
        </Typography>
        <SwitchButton
          checked={isIncludeDecimal}
          onChange={handleChangeInclude}
          name="checkedB"
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs={`page: Settings, target: IncludeDecimal(${!isIncludeDecimal})}`}
        />
      </Box>
    </Paper>
  );
};

SettingsPanel.defaultProps = {
  priceImpact: "2.0%",
  isIncludeDecimal: true,
  isSmall: false,
  handleChangeImpact: () => {},
  handleChangeInclude: () => {},
  handleClose: () => {},
};

export default SettingsPanel;
