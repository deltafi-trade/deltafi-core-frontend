import React from "react";
import { Helmet } from "react-helmet-async";
import { Box, makeStyles, Theme } from "@material-ui/core";

import { DEFAULT_META } from "constants/meta";
import { TabMenu } from "components";
import ModalMenu from "components/Modal/ModalMenu";

const useStyles = makeStyles(({ breakpoints, mixins, palette, spacing }: Theme) => ({
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "calc(100vh - 82px)",
    paddingTop: mixins.toolbar.minHeight,
    position: "relative",
    backgroundColor: palette.background.tertiary,
    [breakpoints.down("md")]: {
      paddingTop: 96,
      minHeight: "calc(100vh - 116px)",
    },
    "&:before": {
      content: "''",
      position: "absolute",
      top: "3px",
      left: "-302px",
      width: "629.21px",
      height: "629.21px",
      backgroundColor: "rgba(210, 32, 255, 0.1)",
      filter: "blur(200px)",
      [breakpoints.down("md")]: {
        width: 176,
        height: 176,
        left: -83,
        top: -48,
        filter: "blur(51.6801px)",
      },
    },
    "&:after": {
      content: "''",
      position: "fixed",
      bottom: "-164px",
      right: "-340px",
      width: "629.21px",
      height: "629.21px",
      backgroundColor: "rgba(23, 102, 255, 0.1)",
      filter: "blur(200px)",
      [breakpoints.down("md")]: {
        width: 408,
        height: 408,
        right: -264,
        bottom: -161,
        filter: "blur(51.6801px)",
      },
    },
  },
  sectionMobile: {
    display: "flex",
    marginBottom: spacing(3),
    [breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const PageMeta = () => {
  const { title, description } = { ...DEFAULT_META };

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const classes = useStyles(props);
  return (
    <>
      <PageMeta />
      <Box className={classes.page} {...props}>
        <div className={classes.sectionMobile}>
          <TabMenu />
        </div>
        {children}
        <ModalMenu />
      </Box>
    </>
  );
};

export default Page;
