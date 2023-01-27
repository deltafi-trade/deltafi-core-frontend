import React, { ReactElement } from "react";
import { Box, Link, makeStyles, Theme, Typography } from "@material-ui/core";

import Page from "components/layout/Page";
import { LinkIcon } from "components";
import FarmCard from "./components/Card";
import { useDarkMode } from "providers/theme";
import { PoolConfig, poolConfigs } from "constants/deployConfig";

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  root: {
    width: "100%",
    flex: 1,
    padding: `0px ${spacing(2)}px`,
    [breakpoints.up("sm")]: {
      maxWidth: 600,
      padding: 0,
    },
  },
  title: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 500,
    color: "#FFFFFF",
    marginBottom: spacing(2),
    [breakpoints.up("sm")]: {
      fontSize: 21,
    },
  },
  link: {
    fontSize: 12,
    fontWeight: 500,
    marginLeft: spacing(1),
    [breakpoints.up("sm")]: {
      fontSize: 18,
      fontWeight: 500,
    },
  },
  linkIcon: {
    marginLeft: spacing(1),
    width: 12,
    height: 12,
    [breakpoints.up("sm")]: {
      width: 16,
      height: 16,
    },
  },
  descContainer: {
    border: "2px solid #3E3E3E",
    padding: spacing(2),
    borderRadius: spacing(2),
    [breakpoints.up("sm")]: {
      padding: spacing(4),
      borderRadius: spacing(3),
      marginBottom: spacing(3),
    },
  },
  description: {
    fontSize: 12,
    lineHeight: "18px",
    fontWeight: 400,
    color: "#F6F6F6",
    [breakpoints.up("sm")]: {
      fontSize: 14,
      lineHeight: "21px",
      fontWeight: 500,
    },
  },
  list: {
    background: palette.background.primary,
    borderRadius: spacing(2),
    marginBottom: spacing(2),
    padding: `${spacing(3)}px ${spacing(2)}px`,
    [breakpoints.up("sm")]: {
      padding: `${spacing(5)}px ${spacing(4)}px`,
      borderRadius: spacing(3),
    },
  },
  iconGroup: {
    display: "flex",
    alignItems: "center",
    marginRight: spacing(2),
  },
  coinIcon: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    boxShadow: "rgb(0 0 0 / 8%) 0px 6px 10px",
    color: "rgb(86, 90, 105)",
  },
  firstCoin: {
    marginRight: -5,
    zIndex: 1,
  },
  yourFarms: {
    backgroundColor: palette.background.primary,
    borderRadius: 24,
    padding: spacing(4),
    marginBottom: spacing(2),
  },
  yourFarmsCard: {
    backgroundColor: palette.background.secondary,
    padding: spacing(3),
    borderRadius: 24,
    marginBottom: spacing(4),
    marginTop: spacing(2),
  },
  yourFarmsCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing(3),
  },
}));

const Home: React.FC = (props): ReactElement => {
  const classes = useStyles(props);
  const { isDark } = useDarkMode();

  return (
    <Page>
      <Box className={classes.root}>
        <Typography variant="h5" color="primary" paragraph>
          Farms
        </Typography>
        <Box className={classes.descContainer}>
          <Typography variant="h6" className={classes.title}>
            DeltaFi Liquidity Mining
          </Typography>
          <Typography className={classes.description}>
            Deposit your Liquidity Provider tokens to receive DELFI, the DeltaFi governance token.
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <Typography className={classes.description}>Read more about</Typography>
            <Link
              href="https://coinmarketcap.com/currencies/deltafi/"
              target="_blank"
              rel="noreferrer noopener"
              underline="always"
              className={classes.link}
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Farms, target: DELFI"
            >
              DELFI
              <LinkIcon className={classes.linkIcon} isDark={isDark} />
            </Link>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography className={classes.title}>Last DELFI Price: Coming Soon</Typography>
        </Box>

        <Box className={classes.list}>
          <Typography variant="h6" color="primary" paragraph>
            Active Farms
          </Typography>
          {poolConfigs.map((poolConfig: PoolConfig) => (
            <FarmCard key={poolConfig.farm} poolConfig={poolConfig} />
          ))}
        </Box>
      </Box>
    </Page>
  );
};

export default Home;
