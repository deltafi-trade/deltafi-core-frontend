import React, { useMemo, memo } from "react";
import { useHistory } from "react-router-dom";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useWallet } from "@solana/wallet-adapter-react";
import BigNumber from "bignumber.js";
import styled from "styled-components";

import { ConnectButton } from "components";
import { PMM } from "lib/calc";
import { convertDollar } from "utils/utils";
import { rate } from "utils/decimal";
import { CardProps } from "./types";
import { useSelector } from "react-redux";
import {
  selectFarmUserByFarmPoolKey,
  selectPoolByPoolKey,
  selectMarketPriceByPool,
  selectTokenAccountInfoByMint,
} from "states/selectors";
import { getTokenPairByPoolName } from "utils";

const Img = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  &.coin-earning {
    margin-left: -1.2px;
  }
  ${({ theme }) => theme.muibreakpoints.up("sm")} {
    width: 32px;
    height: 32px;
    &.coin-earning {
      margin-left: -5px;
    }
  }
`;

const useStyles = makeStyles(({ breakpoints, palette, spacing }) => ({
  container: {
    width: "100%",
    background: palette.background.secondary,
    marginBottom: spacing(2),
    borderRadius: 8,
    [breakpoints.up("sm")]: {
      padding: `${spacing(3)}px ${spacing(2.5)}px`,
      borderRadius: 16,
    },
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: spacing(2),
    [breakpoints.up("sm")]: {
      marginBottom: spacing(3.5),
    },
  },
  tokenPair: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 500,
    color: palette.primary.main,
    [breakpoints.up("sm")]: {
      fontSize: 18,
    },
  },
  label: {
    fontFamily: "Inter",
    color: "#F7F7F7",
    fontWeight: 400,
    fontSize: 12,
    [breakpoints.up("sm")]: {
      fontSize: 16,
      fontWeight: 500,
    },
  },
}));

function getLpTokenValue(pmm, basePrice, quotePrice, pool, lpTokenAmount) {
  return pmm
    .tvl(basePrice, quotePrice, pool.baseTokenInfo.decimals, pool.quoteTokenInfo.decimals)
    .multipliedBy(rate(lpTokenAmount, pool.poolState.totalSupply))
    .div(100);
}

const PoolCard: React.FC<CardProps> = (props) => {
  const history = useHistory();
  const { connected } = useWallet();
  const classes = useStyles();
  const { poolConfig } = props;

  const pool = useSelector(selectPoolByPoolKey(poolConfig.swap));
  const farmUser = useSelector(selectFarmUserByFarmPoolKey(poolConfig.farm));

  const { marketPrice, basePrice, quotePrice } = useSelector(selectMarketPriceByPool(pool));

  const poolTokenAccount = useSelector(selectTokenAccountInfoByMint(pool?.poolMintKey.toBase58()));

  const pmm = useMemo(() => {
    if (pool) {
      return new PMM(pool.poolState, marketPrice);
    }
    return null;
  }, [pool, marketPrice]);

  const tvl = useMemo(() => {
    if (pmm && basePrice && quotePrice) {
      return pmm.tvl(
        basePrice,
        quotePrice,
        pool.baseTokenInfo.decimals,
        pool.quoteTokenInfo.decimals,
      );
    }
    return new BigNumber(0);
  }, [pmm, basePrice, quotePrice, pool]);

  const sharePrice = useMemo(() => {
    if (pmm && basePrice && quotePrice && poolTokenAccount) {
      return getLpTokenValue(pmm, basePrice, quotePrice, pool, poolTokenAccount.amount);
    }
    return new BigNumber(0);
  }, [pmm, basePrice, quotePrice, poolTokenAccount, pool]);

  const stakingPrice = useMemo(() => {
    if (pmm && basePrice && quotePrice && farmUser) {
      return getLpTokenValue(
        pmm,
        basePrice,
        quotePrice,
        pool,
        new BigNumber(farmUser.depositedAmount.toString()),
      );
    }
    return new BigNumber(0);
  }, [pmm, basePrice, quotePrice, farmUser, pool]);

  if (!pool) return null;

  const [firstTokenInfo, secondTokenInfo] = getTokenPairByPoolName(pool);

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box display="flex" alignItems="center">
          <Img src={firstTokenInfo.logoURI} alt={`${firstTokenInfo.name} coin`} />
          <Img
            src={secondTokenInfo.logoURI}
            alt={`${secondTokenInfo.name} coin`}
            className="coin-earning"
          />
          <Box ml={1.5}>
            <Typography className={classes.tokenPair}>{`${pool.name}`}</Typography>
          </Box>
        </Box>
        <ConnectButton
          onClick={() => history.push(`/deposit/${pool.publicKey.toBase58()}`)}
          variant={props.isUserPool ? "contained" : "outlined"}
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs={`page: Pools, target: Deposit(${pool.baseTokenInfo.symbol} - ${pool.quoteTokenInfo.symbol})`}
        >
          {props.isUserPool ? "MANAGE" : "DEPOSIT"}
        </ConnectButton>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography className={classes.label}>Total Deposits</Typography>
        <Typography className={classes.label}>
          {convertDollar(tvl.toFixed(2).toString())}
        </Typography>
      </Box>
      {connected && props.isUserPool && (
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.label}>Your deposits</Typography>
          <Typography className={classes.label}>
            {convertDollar(sharePrice?.toFixed(2).toString())}
          </Typography>
        </Box>
      )}
      {connected && props.isUserPool && stakingPrice && (
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.label}>Your staking</Typography>
          <Typography className={classes.label}>
            {convertDollar(stakingPrice?.toFixed(2).toString())}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default memo(PoolCard);
