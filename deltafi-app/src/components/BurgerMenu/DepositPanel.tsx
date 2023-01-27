import { ReactElement, ReactNode, useMemo } from "react";
import { Box, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useModal } from "providers/modal";
import { PMM } from "lib/calc";
import { rate } from "utils/decimal";
import { ConnectButton } from "components";
import { useSelector } from "react-redux";
import {
  selectMarketPriceByPool,
  selectPoolByPoolKey,
  selectTokenAccountInfoByMint,
} from "states/selectors";

interface IDepositPanelProps {
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

const DepositPanel = (props: IDepositPanelProps): ReactElement => {
  const classes = useStyles(props);
  const { address, setMenu } = useModal();

  const pool = useSelector(selectPoolByPoolKey(address.toBase58()));

  const poolTokenAccount = useSelector(selectTokenAccountInfoByMint(pool?.poolMintKey.toBase58()));

  const { marketPrice, basePrice, quotePrice } = useSelector(selectMarketPriceByPool(pool));

  const share = useMemo(() => {
    if (pool && poolTokenAccount) {
      return rate(poolTokenAccount.amount, pool.poolState.totalSupply);
    }
    return 0;
  }, [pool, poolTokenAccount]);

  const sharePrice = useMemo(() => {
    if (pool && basePrice && quotePrice) {
      const pmm = new PMM(pool.poolState, marketPrice);
      return pmm
        .tvl(basePrice, quotePrice, pool.baseTokenInfo.decimals, pool.quoteTokenInfo.decimals)
        .multipliedBy(share)
        .div(100);
    }
    return 0;
  }, [pool, basePrice, quotePrice, share, marketPrice]);

  if (!pool) return null;

  const handleDeposit = () => {
    setMenu(false, "");
    // handle deposit
  };

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between" className={classes.header}>
        <Typography variant="h6" color="primary">
          Review Deposit
        </Typography>
        <IconButton size="small" onClick={() => setMenu(false)}>
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
            Total Deposit
          </Typography>
          <Typography>${sharePrice?.toString() || 0}</Typography>
        </Box>
        <Box>
          <Box display="flex" justifyContent="space-between" className={classes.row}>
            <Typography color="textSecondary">Deposit Currencies</Typography>
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={pool.baseTokenInfo?.logoURI}
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
            <Typography color="textSecondary">Estimated lP tokens received</Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography>{0} USDC</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" className={classes.row}>
            <Typography color="textSecondary">Price Impact</Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography className={classes.success}>{0} %</Typography>
            </Box>
          </Box>
        </Box>
        <Typography color="primary" className={classes.bottomText}>
          You may be asked to confirm the transaction via your wallet.
        </Typography>
      </Box>
      <Box>
        <ConnectButton fullWidth onClick={handleDeposit}>
          Confirm Deposit
        </ConnectButton>
      </Box>
    </Box>
  );
};

export default DepositPanel;
