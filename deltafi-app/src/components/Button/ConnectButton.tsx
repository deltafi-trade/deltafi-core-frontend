import React from "react";
import { Button, ButtonProps, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles(({ breakpoints, spacing, palette }: Theme) => ({
  button: {
    backgroundImage: `linear-gradient(52.7deg, #1AFA9A -3.73%, #478EF0 48.34%, #9945FD 93.4%), ${palette.gradient.btnCta}`,
    color: palette.text.primary,
    borderRadius: 100,
    border: "solid 1px transparent",
    backgroundOrigin: "border-box",
    // backgroundClip: 'content-box, border-box',
    boxShadow: `2px 1000px 1px ${palette.background.black} inset`,
    fontSize: 14,
    fontWeight: 500,
    textTransform: "capitalize",
    "&:hover": {
      boxShadow: "none",
      border: "solid 1px transparent",
    },
    "&.Mui-disabled": {
      color: "#88809C",
    },
    [breakpoints.up("sm")]: {
      fontSize: 18,
    },
  },
  buttonContained: {
    backgroundImage: `linear-gradient(52.7deg, #1AFA9A -3.73%, #478EF0 48.34%, #9945FD 93.4%), ${palette.gradient.btnCta}`,
    boxShadow: "none",
    border: "none",
    "&:hover": { border: 0 },
    fontWeight: 600,
  },
  buttonOutlined: {
    border: 0,
    "&:hover": { border: 0 },
  },
  buttonSmall: {
    [breakpoints.up("sm")]: {
      fontSize: 18,
      lineHeight: "45px",
      fontWeight: 500,
      padding: "0 20px",
    },
  },
  buttonLarge: {
    [breakpoints.up("sm")]: {
      fontSize: 21,
      lineHeight: "58.31px",
      fontWeight: 400,
      color: "#F6F6F6",
      paddingTop: 7,
      paddingBottom: 7,
    },
  },
  buttonDisabled: {
    color: "#88809C",
    textTransform: "capitalize",
  },
  roundButton: {
    minWidth: 42,
    height: 42,
    padding: 0,
    borderRadius: spacing(3),
  },
}));

const ConnectButton: React.FC<ButtonProps> = (props) => {
  const { children, ...otherProps } = props;
  const classes = useStyles(props);

  return (
    <Button
      color="primary"
      variant="outlined"
      classes={{
        contained: classes.buttonContained,
        sizeSmall: classes.buttonSmall,
        sizeLarge: classes.buttonLarge,
        disabled: classes.buttonDisabled,
      }}
      className={classes.button}
      onClick={props.onClick}
      {...otherProps}
    >
      {props.children}
    </Button>
  );
};

export default React.memo(ConnectButton);
