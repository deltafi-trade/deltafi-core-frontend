import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles(({ palette, spacing, transitions }: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  "@keyframes logoEffect": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  logo: {
    transform: "translate3d(0, 0, 0)",
    animation: "$logoEffect 2s linear infinite'",
  },
}));

const PageLoader: React.FC = (props) => {
  const classes = useStyles(props);
  return (
    <Box className={classes.root}>
      <Box className={classes.logo}>
        <img
          src="/images/logomark 200.svg"
          width={128}
          height={128}
          className={classes.logo}
          alt="logo"
        />
      </Box>
    </Box>
  );
};

export default PageLoader;
