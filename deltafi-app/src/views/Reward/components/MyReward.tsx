import React from "react";
import styled from "styled-components";
import {
  Box,
  Typography,
  makeStyles,
  Theme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import LinearProgress from "@material-ui/core/LinearProgress";

import { MyRewardProps } from "./types";

const useStyles = makeStyles(({ breakpoints }: Theme) => ({
  textColor: {
    color: "#D3D3D3",
    [breakpoints.down("sm")]: {
      fontSize: 10,
    },
  },
  barColorPrimary: {
    backgroundColor: "#C94A75",
  },
  tableContainer: {
    backgroundColor: "#2F2C3E",
    borderRadius: "16px",
    padding: "0px 24px 24px 24px",
    "& .MuiTableHead-root": {
      paddingBottom: 20,
      "& .MuiTableCell-head": {
        padding: "20px 16px",
        [breakpoints.down("sm")]: {
          padding: "0 0 20px",
        },
      },
    },
    "& .MuiTableBody-root": {
      "& .MuiTableRow-root": {
        "& .MuiTableCell-root": {
          fontSize: "14px",
          borderBottomWidth: "0px",
          color: "#F7F7F7",
          padding: "10px 16px",
          [breakpoints.down("sm")]: {
            fontSize: "10px",
            padding: "6px 0",
          },
        },
        "&:first-child .MuiTableCell-root": {
          padding: "16px 16px 10px",
          [breakpoints.down("sm")]: {
            padding: "21px 0px 6px",
          },
        },
      },
    },
    [breakpoints.down("sm")]: {
      padding: "24px 8px",
    },
  },
  accordionDetails: {
    padding: "0px 40px 32px",
    [breakpoints.down("md")]: {
      padding: "0px 16px 32px 16px",
    },
    [breakpoints.down("sm")]: {
      padding: "0px 8px 32px 8px",
    },
  },
  progressDesc: {
    fontSize: "14px",
    color: "#F7F7F7",
    [breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  progressBar: {
    width: "140px",
    marginRight: "8px",
    [breakpoints.down("sm")]: {
      width: 76,
    },
  },
  lockupBox: {
    display: "flex",
    alignItems: "center",
  },
  subTitle: {
    [breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
}));

const RewardAccordion = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 24,
      backgroundColor: "#1D1A27",
      boxShadow: "none",
      "&:last-child": {
        borderRadius: 24,
        marginBottom: "0px",
      },
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        //disable spacing when expand
        marginBottom: "16px",
      },
      marginBottom: "16px",
    },
    expanded: {},
  }),
)(Accordion);

const RewardAccordionSummary = withStyles((theme: Theme) => ({
  root: {
    minHeight: 96,
    margin: "0px 40px",
    padding: 0,
    "&$expanded": {
      minHeight: 96,
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0px 16px",
      minHeight: 86,
    },
  },
  content: {
    "&$expanded": {},
  },
  expanded: {},
}))(AccordionSummary);

const MainSpan = styled.div`
  font-size: 32px;
  line-height: 1;
  ${({ theme }) => theme.muibreakpoints.down("sm")} {
    font-size: 24px;
  }
`;

const SubSpan = styled.span`
  font-size: 18px;
  line-height: 1;
  color: #d3d3d3;
  ${({ theme }) => theme.muibreakpoints.down("sm")} {
    font-size: 16px;
  }
`;

const SpotSpan = styled.span`
  color: #c94a75;
`;

const MyReward: React.FC<MyRewardProps> = (props) => {
  const classes = useStyles(props);

  const { detail } = props;

  return (
    <RewardAccordion TransitionProps={{ unmountOnExit: true }}>
      <RewardAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{ width: "100%" }}
        >
          <Typography variant="subtitle1" className={classes.subTitle}>
            {detail.name}
          </Typography>
          <Box style={{ textAlign: "right" }}>
            <MainSpan>
              <SpotSpan>{detail.claimedAmount}</SpotSpan> /{" "}
              <SubSpan>{detail.totalAmount}DELFI</SubSpan>
            </MainSpan>
            <Typography variant="caption" className={classes.textColor}>
              <SpotSpan>{detail.claimed}%</SpotSpan> has claimed
            </Typography>
          </Box>
        </Box>
      </RewardAccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label="reward table">
            <TableHead>
              <TableRow>
                <TableCell>DATE</TableCell>
                <TableCell>REWARDS</TableCell>
                <TableCell>LOCKUP / 90days</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detail.history.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.rewards} DELFI</TableCell>
                  <TableCell>
                    <Box className={classes.lockupBox}>
                      <LinearProgress
                        variant="determinate"
                        value={row.lockup}
                        classes={{ barColorPrimary: classes.barColorPrimary }}
                        className={classes.progressBar}
                      />
                      <Typography className={classes.progressDesc}>
                        {100 - row.lockup > 0 ? 100 - row.lockup + " days left" : "Claimed"}{" "}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </RewardAccordion>
  );
};
export default MyReward;
