import React from "react";
import { Button, ButtonProps, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles(({ breakpoints, palette }: Theme) => ({
  button: {
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(314.49deg, #4048FF 0%, #B372CE 50.52%, #FF4B81 100%)",
    color: palette.text.primary,
    borderRadius: "12px",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    textTransform: "none",
    width: "180px",
    fontWeight: 600,
    padding: 0,
    "&:hover": {
      opacity: ".8",
    },
    [breakpoints.down("sm")]: {
      width: 92,
    },
  },
}));

const CopyLinkButton: React.FC<ButtonProps> = (props) => {
  const { children, ...otherProps } = props;
  const classes = useStyles(props);

  return (
    <>
      <Button
        {...otherProps}
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={props.onClick}
      >
        {children}
      </Button>
    </>
  );
};
export default React.memo(CopyLinkButton);
