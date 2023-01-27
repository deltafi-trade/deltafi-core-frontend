import { Theme, makeStyles, Typography, Box, Link } from "@material-ui/core";
import Page from "components/layout/Page";

import "typeface-rubik";

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  root: {
    margin: "0 auto",
    [breakpoints.up("sm")]: {
      maxWidth: 560,
    },
  },
  header: {
    fontFamily: "rubik",
    fontWeight: 600,
    fontSize: 35,
    paddingBottom: 10,
  },
  content: {
    fontFamily: "rubik",
    fontWeight: "normal",
    fontSize: 20,
  },
  socialLinks: {
    paddingTop: 5,
    "& a": {
      marginRight: spacing(3),
      [breakpoints.down("sm")]: {
        marginRight: spacing(1.5),
      },
    },
  },
  shareButton: {
    width: 29,
    height: 29,
    [breakpoints.down("sm")]: {
      width: 24,
      height: 24,
    },
  },
}));

const Home: React.FC = (props) => {
  const classes = useStyles(props);

  return (
    <Page>
      <Typography variant="h1" align="center" paragraph className={classes.header}>
        You are accessing DeltaFi from a restricted territory.
      </Typography>
      <Typography variant="h6" align="center" paragraph className={classes.content}>
        Unfortunately, this means you will not be allowed to connect your wallet and use DeltaFi
        Protocol.
      </Typography>
      <Box display="flex" className={classes.socialLinks}>
        <Link
          href="https://twitter.com/deltafi_ai"
          target="_blank"
          rel="noreferrer noopener"
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Reward, target: Twitter"
        >
          <img src={"images/twitter.svg"} alt="" />
        </Link>

        <Link
          href="https://discord.gg/deltafi"
          target="_blank"
          rel="noreferrer noopener"
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Reward, target: Discord"
        >
          <img src={"images/discord.svg"} alt="" />
        </Link>
        <Link
          href="https://t.me/deltafi_ai"
          target="_blank"
          rel="noreferrer noopener"
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Reward, target: Telegram"
        >
          <img src={"images/telegram.svg"} alt="" />
        </Link>
        <Link
          href="https://medium.com/deltafi"
          target="_blank"
          rel="noreferrer noopener"
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Reward, target: Medium"
        >
          <img src={"images/medium.svg"} alt="" />
        </Link>
      </Box>
    </Page>
  );
};

export const FarmUnavailable: React.FC = (props) => {
  const classes = useStyles(props);

  return (
    <Page>
      <Typography variant="h1" align="center" paragraph className={classes.header}>
        Farm is comming soon...
      </Typography>
      <Box display="flex" className={classes.socialLinks}>
        <Link
          href="https://twitter.com/deltafi_ai"
          target="_blank"
          rel="noreferrer noopener"
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Reward, target: Twitter"
        >
          <img src={"images/twitter.svg"} alt="" />
        </Link>

        <Link
          href="https://discord.gg/deltafi"
          target="_blank"
          rel="noreferrer noopener"
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Reward, target: Discord"
        >
          <img src={"images/discord.svg"} alt="" />
        </Link>
        <Link
          href="https://t.me/deltafi_ai"
          target="_blank"
          rel="noreferrer noopener"
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Reward, target: Telegram"
        >
          <img src={"images/telegram.svg"} alt="" />
        </Link>
        <Link
          href="https://medium.com/deltafi"
          target="_blank"
          rel="noreferrer noopener"
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Reward, target: Medium"
        >
          <img src={"images/medium.svg"} alt="" />
        </Link>
      </Box>
    </Page>
  );
};
export default Home;
