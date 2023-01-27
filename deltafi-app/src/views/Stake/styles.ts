import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  root: {
    margin: "0 auto",
    [breakpoints.up("sm")]: {
      maxWidth: 560,
    },
  },
  iconGroup: {
    display: "flex",
    alignItems: "center",
  },
  coinIcon: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    [breakpoints.up("sm")]: {
      width: 28,
      height: 28,
    },
    boxShadow: "rgb(0 0 0 / 8%) 0px 6px 10px",
    color: "rgb(86, 90, 105)",
  },
  firstCoin: {
    marginRight: -6,
    zIndex: 1,
  },
  liquidityStaked: {
    borderRadius: spacing(1.5),
    padding: `${spacing(2.5)}px ${spacing(2)}px`,
    background: "linear-gradient(219.47deg, rgba(229, 124, 255, 0.81) -26.6%, #4558FF 78.67%)",
    [breakpoints.up("sm")]: {
      borderRadius: spacing(2),
      padding: spacing(4),
    },
  },
  title: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 600,
    [breakpoints.up("sm")]: {
      fontSize: 21,
    },
  },
  amount: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 500,
    [breakpoints.up("sm")]: {
      fontSize: 21,
    },
  },
  cardBottom: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 18,
    [breakpoints.up("sm")]: {
      marginTop: spacing(5),
    },
  },
  unclaimedToken: {
    marginTop: spacing(3),
    borderRadius: spacing(1.5),
    padding: `${spacing(2.5)}px ${spacing(2)}px`,
    background: palette.background.primary,
    [breakpoints.up("sm")]: {
      borderRadius: spacing(2),
      padding: spacing(4),
    },
  },
  swapIcon: {
    transform: "rotate(90deg)",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -16,
    marginBottom: -16,
    backgroundColor: palette.background.secondary,
    border: `3px solid ${palette.background.primary}`,
  },
  minting: {
    background: palette.background.primary,
    borderRadius: spacing(2),
    marginBottom: spacing(3),
    marginTop: spacing(3),
    padding: `${spacing(3)}px ${spacing(2)}px`,
    [breakpoints.up("sm")]: {
      padding: `${spacing(5)}px ${spacing(4)}px`,
      borderRadius: spacing(3),
      marginBottom: spacing(5),
      marginTop: spacing(5),
      maxWidth: 560,
    },
  },
  ratePanel: {
    display: "flex",
    flexDirection: "column",
    // marginBottom: 20,
  },
  statsPanel: {
    padding: `${spacing(3)}px ${spacing(2)}px`,
    [breakpoints.up("sm")]: {
      padding: `${spacing(5)}px ${spacing(4)}px`,
    },
  },
  tabs: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing(4),
  },
  marketCondition: {
    fontWeight: "bold",
    marginBottom: 32,
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
  btn: {
    color: `${palette.secondary.main} !important`,
    fontWeight: "bold",
  },
  activeBtn: {
    color: `${palette.primary.main} !important`,
    fontWeight: "bold",
  },
  link: {},
  linkIcon: {
    marginLeft: spacing(1),
  },
  desc: {
    border: "2px solid #3E3E3E",
    padding: "32px 36px",
    borderRadius: 24,
    marginBottom: spacing(4),
  },
  snackBarIcon: {
    marginRight: spacing(2),
  },
  snackBarLink: {
    color: palette.text.blue,
    cursor: "pointer",
    textDecoration: "none !important",
    marginLeft: spacing(1),
  },
  snackBarContent: {
    maxWidth: 421,
    backgroundColor: palette.background.lightBlack,
    display: "flex",
    flexWrap: "unset",
    alignItems: "start",
  },
  snackBarClose: {
    marginTop: 5,
  },
  claimLoadingButton: {
    marginTop: 0,
    marginBottom: 1,
    marginLeft: 11,
    marginRight: 12,
    width: 31,
    height: 31,
  },
  actionLoadingButton: {
    width: 50,
    height: 50,
    marginTop: 4,
    marginBottom: 5,
  },
}));

export default useStyles;
