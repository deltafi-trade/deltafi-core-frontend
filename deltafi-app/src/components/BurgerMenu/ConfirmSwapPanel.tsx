import { ReactElement, ReactNode, useMemo } from "react";
import { Box, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { ConnectButton } from "components";

import { useModal } from "providers/modal";
import { getSwapOutAmount } from "utils/swap";
import { fixedNumber } from "utils/utils";
import { useSelector } from "react-redux";
import { selectMarketPriceByPool } from "states/selectors";
import { selectPoolBySymbols } from "states/selectors";

interface IConfirmSwapPanelProps {
  children?: ReactNode;
}

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  header: {},
  content: {
    marginTop: 32,
  },
  sectionDesktop: {
    display: "none",
    [breakpoints.up("md")]: {
      width: 450,
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    width: "auto",
    [breakpoints.up("md")]: {
      display: "none",
    },
  },
  img: {
    marginRight: 4,
    width: 24,
    height: 24,
    borderRadius: "50%",
  },
  bottomText: {
    marginBottom: 52,
    marginTop: 52,
    maxWidth: 400,
    textAlign: "center",
  },
  estimatedAmount: {
    marginBottom: 36,
  },
  row: {
    marginBottom: 24,
  },
  success: {
    color: palette.text.success,
  },
  footer: {},
}));

const ConfirmSwapPanel = (props: IConfirmSwapPanelProps): ReactElement => {
  const classes = useStyles(props);
  const { setMenu, data } = useModal();

  const pool = useSelector(
    selectPoolBySymbols(data?.tokenFrom.token.symbol, data?.tokenTo.token.symbol),
  );
  const { marketPrice } = useSelector(selectMarketPriceByPool(pool));

  const swapOut = useMemo(() => {
    if (pool && data) {
      const { tokenFrom, tokenTo, slippage } = data;
      return getSwapOutAmount(
        pool,
        tokenFrom.token.mint,
        tokenTo.token.mint,
        tokenFrom.amount,
        parseFloat(slippage),
        marketPrice,
      );
    }
    return null;
  }, [pool, data, marketPrice]);

  const handleConfirm = () => {
    data?.callback();
    setMenu(false, "");
  };

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between" className={classes.header}>
        <Typography variant="h6" color="textSecondary">
          Review Swap
        </Typography>
        <IconButton size="small" onClick={() => setMenu(false, "")}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box className={classes.content}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className={classes.estimatedAmount}
        >
          <Typography color="textSecondary" variant="body2">
            Estimated Received
          </Typography>
          <Typography>{`${fixedNumber(swapOut.amountOut) ?? 0} ${
            data?.tokenTo.token.symbol
          }`}</Typography>
        </Box>
        <Box>
          <Box display="flex" justifyContent="space-between" className={classes.row}>
            <Typography color="textSecondary">Swap From</Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                src={data?.tokenFrom.token.logoURI}
                alt={`${data?.tokenFrom.token.symbol} coin`}
                className={classes.img}
              />
              <Typography>{`${data?.tokenFrom.amount ?? 0} ${
                data?.tokenFrom.token.symbol
              }`}</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" className={classes.row}>
            <Typography color="textSecondary">Transaction Fee</Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                src={data?.tokenTo.token.logoURI}
                alt={`${data?.tokenFrom.token.symbol} coin`}
                className={classes.img}
              />
              <Typography>{`${fixedNumber(swapOut?.fee) ?? 0} ${
                data?.tokenTo.token.symbol
              }`}</Typography>
            </Box>
          </Box>
        </Box>
        <Typography color="textSecondary" className={classes.bottomText}>
          You may be asked to confirm the transaction via your wallet.
        </Typography>
      </Box>
      <Box className={classes.footer}>
        <ConnectButton fullWidth onClick={handleConfirm}>
          Confirm Swap
        </ConnectButton>
      </Box>
    </Box>
  );
};

export default ConfirmSwapPanel;
