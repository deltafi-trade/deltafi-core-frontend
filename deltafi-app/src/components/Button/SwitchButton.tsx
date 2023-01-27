import {
  createStyles,
  Switch,
  SwitchClassKey,
  SwitchProps,
  Theme,
  withStyles,
} from "@material-ui/core";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 36,
      height: 16,
      padding: 0,
      margin: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        width: 62,
        height: 26,
      },
    },
    switchBase: {
      padding: 2,
      [theme.breakpoints.up("sm")]: {
        padding: 1,
      },
      "&$checked": {
        transform: "translateX(20px)",
        [theme.breakpoints.up("sm")]: {
          transform: "translateX(36px)",
        },
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#52d869",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 12,
      height: 12,
      background: "linear-gradient(180deg, #FFFFFF 0%, #E8EAEA 100%)",
      [theme.breakpoints.up("sm")]: {
        width: 24,
        height: 24,
      },
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
export default IOSSwitch;
