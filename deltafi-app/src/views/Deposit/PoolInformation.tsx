import { FC, useMemo, useCallback } from "react";
import { CopyAddressIcon } from "components";
import { Typography, Paper, Box, makeStyles, Theme } from "@material-ui/core";
import { formatPubkey } from "utils/utils";
import copyToClipboard from "copy-to-clipboard";
import { PublicKey } from "@solana/web3.js";
import { PoolInfo } from "providers/types";

interface PoolInformationProps {
  pool: PoolInfo;
}

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  root: {
    background: palette.background.primary,
    borderRadius: spacing(2),
    marginBottom: spacing(3),
    padding: `${spacing(3)}px ${spacing(2)}px`,
    [breakpoints.up("sm")]: {
      padding: `${spacing(5)}px ${spacing(4)}px`,
      borderRadius: spacing(3),
      marginBottom: spacing(5),
      maxWidth: 560,
    },
  },
  ratePanel: {
    display: "flex",
    flexDirection: "column",
    // marginBottom: 20,
  },
  marketCondition: {
    fontWeight: "bold",
    marginBottom: spacing(3),
    [breakpoints.up("sm")]: {
      marginBottom: spacing(4),
    },
  },
  divider: {
    background: palette.primary.main,
    width: "100%",
    height: 0.5,
    opacity: 0.6,
    marginBottom: spacing(3),
    [breakpoints.up("sm")]: {
      marginBottom: spacing(4),
    },
  },
}));

const useStylesForPoolItem = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  address: {
    marginRight: 4,
    color: palette.text.blue,
    fontSize: 12,
    lineHeight: "14.52px",
    [breakpoints.up("sm")]: {
      fontSize: 14,
      lineHeight: "16.94px",
    },
  },
  addressIcon: {
    cursor: "pointer",
    width: 20,
    height: 20,
  },
  label: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 1.2,
    color: "#f7f7f7",
    [breakpoints.up("sm")]: {
      fontSize: 16,
      lineHeight: 1,
    },
  },
}));

interface PoolItemProps {
  publickey: PublicKey;
  accountName: string;
}

const PoolItem: FC<PoolItemProps> = (props) => {
  const { publickey, accountName } = props;
  const classes = useStylesForPoolItem();
  const handleOnCopy = useCallback(
    () => copyToClipboard(publickey ? publickey.toBase58() : ""),
    [publickey],
  );
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
      <Typography className={classes.label}>{accountName}</Typography>
      <Box display="flex" alignItems="center">
        <Typography color="textSecondary" variant="body1" className={classes.address}>
          {formatPubkey(publickey)}
        </Typography>
        <CopyAddressIcon width="20px" className={classes.addressIcon} onClick={handleOnCopy} />
      </Box>
    </Box>
  );
};

export const PoolInformation: FC<PoolInformationProps> = (props) => {
  const { pool } = props;
  const classes = useStyles();

  const poolItems = useMemo(() => {
    return [
      { accountName: "Swap Account", publickey: pool.publicKey },
      { accountName: "Pool token Address", publickey: pool.poolMintKey },
      {
        accountName: `${pool.baseTokenInfo.symbol} Address`,
        publickey: new PublicKey(pool.baseTokenInfo.mint),
      },
      {
        accountName: `${pool.quoteTokenInfo.symbol} Address`,
        publickey: new PublicKey(pool.quoteTokenInfo.mint),
      },
      { accountName: `${pool.baseTokenInfo.symbol} Reserve Address`, publickey: pool.base },
      { accountName: `${pool.quoteTokenInfo.symbol} Reserve Address`, publickey: pool.quote },
    ];
  }, [pool]);

  return (
    <Paper className={classes.root}>
      <Box className={classes.ratePanel}>
        <Typography className={classes.marketCondition}>ACCOUNT INFORMATION</Typography>
        <div className={classes.divider} />
        {poolItems.map((poolItem, index) => {
          return (
            <PoolItem
              key={index}
              publickey={poolItem.publickey}
              accountName={poolItem.accountName}
            />
          );
        })}
      </Box>
    </Paper>
  );
};
