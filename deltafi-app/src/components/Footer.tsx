import React from "react";
import styled from "styled-components";
import { Box, Container, makeStyles, Theme, Typography, IconButton } from "@material-ui/core";

import { BLOG_LINK, TWITTER_LINK, TELEGRAM_LINK, DISCORD_LINK, GITHUB_LINK } from "constants/index";
import { TwitterIcon, TelegramIcon, MediumIcon, GithubIcon, DiscordIcon } from "components";
import { useDarkMode } from "providers/theme";

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  root: {
    background: palette.background.lightBlack,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: spacing(3),
    paddingBottom: spacing(3),

    [breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  iconButton: {
    width: 38.17,
    height: 38.17,
    borderRadius: "50%",
    backgroundColor: "rgba(242, 242, 242, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0;
  ${({ theme }) => theme.muibreakpoints.down("sm")} {
    margin-bottom: 10px;
  }
`;
const IconWrapper = styled.div`
  margin: 0 16px;
  ${({ theme }) => theme.muibreakpoints.down("lg")} {
    margin: 0 6px;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  a {
    padding: 0;
  }
`;

const Footer: React.FC = (props) => {
  const { isDark } = useDarkMode();
  const classes = useStyles(props);
  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <StyledDiv>
          <IconWrapper>
            <IconButton
              component="a"
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer noopener"
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Footer, target: Twitter"
              className={classes.iconButton}
            >
              <TwitterIcon isDark={isDark} />
            </IconButton>
          </IconWrapper>
          <IconWrapper>
            <IconButton
              component="a"
              href={DISCORD_LINK}
              target="_blank"
              rel="noreferrer noopener"
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Footer, target: Discord"
              className={classes.iconButton}
            >
              <DiscordIcon isDark={isDark} />
            </IconButton>
          </IconWrapper>
          <IconWrapper>
            <IconButton
              component="a"
              href={GITHUB_LINK}
              target="_blank"
              rel="noreferrer noopener"
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Footer, target: Github"
              className={classes.iconButton}
            >
              <GithubIcon isDark={isDark} />
            </IconButton>
          </IconWrapper>
          <IconWrapper>
            <IconButton
              component="a"
              href={BLOG_LINK}
              target="_blank"
              rel="noreferrer noopener"
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Footer, target: Medium"
              className={classes.iconButton}
            >
              <MediumIcon />
            </IconButton>
          </IconWrapper>
          <IconWrapper>
            <IconButton
              component="a"
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer noopener"
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Footer, target: Telegram"
              className={classes.iconButton}
            >
              <TelegramIcon isDark={isDark} />
            </IconButton>
          </IconWrapper>
        </StyledDiv>
        <Typography>© 2022 DeltaFi. All rights reserved</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
