import React from "react";
import styled from "styled-components";
import { Box, Typography, makeStyles, Paper } from "@material-ui/core";
import { CardProps } from "./types";

const useStyles = makeStyles(() => ({
  root: {
    height: "272px",
    backgroundColor: "#1D1A27",
    borderRadius: 16,
    padding: "0px 12px 24px 12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imageContainer: {
    flexGrow: 1,
  },
  fontBold: {
    fontWeight: "bold",
  },
}));

const Img = styled.img`
  max-width: 120px;
`;

const ReferralCard: React.FC<CardProps> = (props) => {
  const classes = useStyles(props);
  const { caption, detail, image } = props;
  return (
    <Paper className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.imageContainer}
      >
        <Img src={image} alt="referral_intro_card" />
      </Box>
      <Box>
        <Typography variant="subtitle1" align="center" className={classes.fontBold}>
          {caption}
        </Typography>
        <Typography variant="subtitle2" align="center" color="textSecondary">
          {detail}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ReferralCard;
