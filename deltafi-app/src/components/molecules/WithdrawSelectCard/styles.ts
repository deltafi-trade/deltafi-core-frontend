import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles(({ breakpoints, spacing, palette }: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 16,
    width: "100%",
    background: palette.background.secondary,
    marginBottom: spacing(1),
    padding: `${spacing(1.5)}px ${spacing(2)}px`,
    [breakpoints.up("sm")]: {
      padding: `${spacing(2.5)}px ${spacing(3)}px`,
    },
  },
  title: {
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: 500,
    lineHeight: "18px",
    color: palette.text.dark,
    marginBottom: spacing(2),
    [breakpoints.up("sm")]: {
      fontSize: 16,
    },
  },
  content: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    "& .slider-value": {
      fontSize: 12,
      fontWeight: 400,
    },
    [breakpoints.up("sm")]: {
      "& .slider-value": {
        fontSize: 18,
      },
    },
  },
  percent: {
    width: 108,
    height: 32,
    [breakpoints.up("sm")]: {
      width: 150,
      height: 48,
    },
    background: palette.background.tertiary,
    borderRadius: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing(4),
    boxSizing: "border-box",
  },
}));

export default useStyles;
