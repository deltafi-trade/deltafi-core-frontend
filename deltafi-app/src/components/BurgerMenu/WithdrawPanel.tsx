import { ReactElement, ReactNode } from "react";
import { Box, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { ConnectButton } from "components";

import { useModal } from "providers/modal";
import { useSelector } from "react-redux";
import { selectPoolByPoolKey } from "states/selectors";

interface IWithdrawPanelProps {
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
}));

const WithdrawPanel = (props: IWithdrawPanelProps): ReactElement => {
  const { setMenu, address } = useModal();
  const pool = useSelector(selectPoolByPoolKey(address.toBase58()));

  const classes = useStyles(props);

  const handleWithdrawal = () => {
    setMenu(false, "");
    // handle withdraw
  };

  if (!pool) return null;

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between" className={classes.header}>
        <Typography variant="h6" color="primary">
          Review Withdraw
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
            Total Withdraw
          </Typography>
          <Typography>${0}</Typography>
        </Box>
        <Box>
          <Box display="flex" justifyContent="space-between" className={classes.row}>
            <Typography color="textSecondary">Withdraw Currencies</Typography>
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={pool.baseTokenInfo.logoURI}
                  alt={`${pool.baseTokenInfo.symbol} coin`}
                  className={classes.img}
                />
                <Typography>{0} USDC</Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={pool.quoteTokenInfo.logoURI}
                  alt={`${pool.quoteTokenInfo.symbol} coin`}
                  className={classes.img}
                />
                <Typography>{0} USDT</Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" className={classes.row}>
            <Typography color="textSecondary">New Pool Share</Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                src={pool.baseTokenInfo.logoURI}
                alt={`${pool.baseTokenInfo.symbol} coin`}
                className={classes.img}
              />
              <Typography>{0} USDC</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" className={classes.row}>
            <Typography color="textSecondary">Withdraw Currencies</Typography>
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={pool.baseTokenInfo.logoURI}
                  alt={`${pool.baseTokenInfo.symbol} coin`}
                  className={classes.img}
                />
                <Typography>{0} USDC</Typography>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={pool.quoteTokenInfo.logoURI}
                  alt={`${pool.quoteTokenInfo.symbol} coin`}
                  className={classes.img}
                />
                <Typography>{0} USDT</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography color="primary" className={classes.bottomText}>
          You may be asked to confirm the transaction via your wallet.
        </Typography>
      </Box>
      <Box>
        <ConnectButton fullWidth onClick={handleWithdrawal}>
          Confirm Withdrawal
        </ConnectButton>
      </Box>
    </Box>
  );
};

export default WithdrawPanel;
