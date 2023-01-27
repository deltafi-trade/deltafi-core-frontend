import { useMemo } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useWallet } from "@solana/wallet-adapter-react";
import BigNumber from "bignumber.js";

import Page from "components/layout/Page";
import PoolCard from "./components/Card";
import { convertDollar } from "utils/utils";
import { PMM } from "lib/calc";
import { getTokenConfigBySymbol, PoolConfig, poolConfigs } from "constants/deployConfig";
import { useSelector } from "react-redux";
import {
  pythSelector,
  poolSelector,
  tokenAccountSelector,
  farmUserSelector,
  serumSelector,
  getMarketPrice,
} from "states/selectors";
import { MintToTokenAccountInfo } from "states/tokenAccountState";
import { FarmPoolKeyToFarmUser } from "states/farmUserState";

function hasDeposit(
  mintToTokenAccountInfo: MintToTokenAccountInfo,
  farmPoolKeyToFarmUser: FarmPoolKeyToFarmUser,
  poolConfig: PoolConfig,
) {
  if (mintToTokenAccountInfo == null) {
    return false;
  }
  const tokenInfo = mintToTokenAccountInfo[poolConfig.mint];
  if (tokenInfo && tokenInfo.amount.comparedTo(new BigNumber(0)) > 0) {
    return true;
  }

  if (farmPoolKeyToFarmUser == null) {
    return false;
  }
  const farmUser = farmPoolKeyToFarmUser[poolConfig.farm];
  return farmUser && farmUser.depositedAmount > 0;
}

const useStyles = makeStyles(({ breakpoints, palette, spacing }) => ({
  container: {
    width: "100%",
    flex: 1,
    padding: `0px ${spacing(2)}px`,
    marginBottom: spacing(2),
    [breakpoints.up("sm")]: {
      maxWidth: 560,
    },
  },
  listContainer: {
    background: palette.background.primary,
    borderRadius: spacing(2),
    padding: `${spacing(3)}px ${spacing(2)}px`,
    [breakpoints.up("sm")]: {
      borderRadius: spacing(3),
      padding: `${spacing(5)}px ${spacing(4)}px`,
    },
  },
  poolCardContainer: {
    marginBottom: spacing(2),
    "&:last-child": {
      marginBottom: 0,
    },
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  const poolState = useSelector(poolSelector);
  const pools = useMemo(() => {
    return Object.values(poolState.poolKeyToPoolInfo);
  }, [poolState.poolKeyToPoolInfo]);

  const mintToTokenAccountInfo = useSelector(tokenAccountSelector).mintToTokenAccountInfo;
  const farmPoolKeyToFarmUser = useSelector(farmUserSelector).farmPoolKeyToFarmUser;

  const pythState = useSelector(pythSelector);
  const symbolToPythData = pythState.symbolToPythData;
  const serumState = useSelector(serumSelector);
  const poolNameToSerumPrice = serumState.poolNameToSerumPrice;
  const { connected: isConnectedWallet } = useWallet();
  const tvl = useMemo(() => {
    if (pools.length > 0) {
      return (pools as any).reduce((p, c) => {
        const { marketPrice, basePrice, quotePrice } = getMarketPrice(
          symbolToPythData,
          poolNameToSerumPrice,
          c,
        );
        const pmm = new PMM(c.poolState, marketPrice);

        let volumn = new BigNumber(0);
        if (basePrice && quotePrice) {
          const baseDecimals = getTokenConfigBySymbol(c?.baseTokenInfo.symbol).decimals;
          const quoteDecimals = getTokenConfigBySymbol(c?.quoteTokenInfo.symbol).decimals;
          volumn = pmm.tvl(basePrice, quotePrice, baseDecimals, quoteDecimals);
        }
        return p.plus(volumn);
      }, new BigNumber(0)) as BigNumber;
    }
    return new BigNumber(0);
  }, [pools, symbolToPythData, poolNameToSerumPrice]);

  return (
    <Page>
      <Box className={classes.container}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color="textPrimary" align="center">
            Pools
          </Typography>
          <Typography align="center" color="textPrimary">
            Total Value Locked: {convertDollar(tvl.toFixed(2))}
          </Typography>
        </Box>
        <br />
        {isConnectedWallet && (
          <Box className={classes.listContainer}>
            <Typography>Your Pools</Typography>
            <Box mt={3.5}>
              {poolConfigs
                .filter((poolConfig: PoolConfig) =>
                  hasDeposit(mintToTokenAccountInfo, farmPoolKeyToFarmUser, poolConfig),
                )
                .map((poolConfig: PoolConfig) => (
                  <PoolCard isUserPool key={poolConfig.swap} poolConfig={poolConfig} />
                ))}
            </Box>
          </Box>
        )}
        <Box className={classes.listContainer} mt={isConnectedWallet ? 4 : 0}>
          {isConnectedWallet && (
            <Box mb={3.5}>
              <Typography>Other Pools</Typography>
            </Box>
          )}
          {poolConfigs.length > 0 && (
            <Box className={classes.poolCardContainer}>
              {poolConfigs
                .filter(
                  (poolConfig: PoolConfig) =>
                    !hasDeposit(mintToTokenAccountInfo, farmPoolKeyToFarmUser, poolConfig),
                )
                .map((poolConfig: PoolConfig) => (
                  <Box key={poolConfig.swap}>
                    <PoolCard poolConfig={poolConfig} />
                  </Box>
                ))}
            </Box>
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default Home;
