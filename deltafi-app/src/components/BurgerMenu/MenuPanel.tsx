import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
import CloseIcon from "@material-ui/icons/Close";

import { Text } from "components/Text";
import {
  AboutIcon,
  DocumentsIcon,
  CodeIcon,
  DiscordIcon,
  AnalyticsIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon,
  ConnectButton,
  WalletButton,
} from "components";

import { useDarkMode } from "providers/theme";
import { useModal } from "providers/modal";
import { DISCORD_LINK, GITHUB_LINK } from "constants/index";
import { useWallet } from "@solana/wallet-adapter-react";
import { Box, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  header: {
    background: palette.background.primary,
    paddingTop: spacing(4),
    paddingBottom: spacing(4),
    paddingLeft: spacing(3),
    paddingRight: spacing(3),
  },
  scrollBar: {
    width: "100%",
    height: "calc(100vh - 100px)",
    background: palette.background.default,
  },
  sectionDesktop: {
    display: "none",
    [breakpoints.up("md")]: {
      width: 450,
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    width: "auto",
    [breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const ConnectList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;
const ConnectItem = styled.div`
  background: ${({ theme }) => theme.palette.background.primary};
  border-radius: 8px;
  width: 162px;
  height: 162px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  position: relative;
  text-align: center;
  cursor: pointer;
  ${({ theme }) => theme.muibreakpoints.down("lg")} {
    width: 138px;
    height: 138px;
  }
  ${({ theme }) => theme.muibreakpoints.down("md")} {
    width: 87px;
    height: 87px;
  }
  .connect-type {
    font-family: "Inter";
    font-size: 14px;
    font-weight: 500;
    padding: 10px;
    ${({ theme }) => theme.muibreakpoints.down("md")} {
      padding: 5px 10px;
    }
  }
  .icon {
    width: 30px;
  }
`;

const MenuPanel = (props) => {
  const { connected: isConnectedWallet } = useWallet();
  const { setMenu } = useModal();
  const { isDark, toggleDarkMode } = useDarkMode();
  const classes = useStyles(props);

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between" className={classes.header}>
        {isConnectedWallet ? (
          <WalletButton />
        ) : (
          <ConnectButton
            onClick={() => setMenu(true, "connect")}
            data-amp-analytics-on="click"
            data-amp-analytics-name="click"
            data-amp-analytics-attrs="page: Setting, target: ConnectWallet"
          />
        )}
        <IconButton size="small" onClick={() => setMenu(false, "")}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box className={classes.scrollBar}>
        <Scrollbars autoHeightMax={200}>
          <Box padding={3}>
            <Typography variant="h6" align="center" color="primary">
              MENU
            </Typography>
          </Box>
          <Box padding={3}>
            <ConnectList>
              <ConnectItem
                data-amp-analytics-on="click"
                data-amp-analytics-name="click"
                data-amp-analytics-attrs="page: Setting, target: About"
              >
                <AboutIcon isDark={isDark} className="icon" />
                <Text color={isDark ? "#FFF" : "#23242F"} className="connect-type">
                  About
                </Text>
              </ConnectItem>
              <ConnectItem
                onClick={() => window.open("https://docs.deltafi.ai/", "_blank")}
                data-amp-analytics-on="click"
                data-amp-analytics-name="click"
                data-amp-analytics-attrs="page: Setting, target: Documents"
              >
                <DocumentsIcon isDark={isDark} className="icon" />
                <Text color={isDark ? "#FFF" : "#23242F"} className="connect-type">
                  Documents
                </Text>
              </ConnectItem>
              <ConnectItem
                onClick={() => window.open(GITHUB_LINK, "_blank")}
                data-amp-analytics-on="click"
                data-amp-analytics-name="click"
                data-amp-analytics-attrs="page: Setting, target: Code"
              >
                <CodeIcon isDark={isDark} className="icon" />
                <Text color={isDark ? "#FFF" : "#23242F"} className="connect-type">
                  Code
                </Text>
              </ConnectItem>
              <ConnectItem
                onClick={() => window.open(DISCORD_LINK, "_blank")}
                data-amp-analytics-on="click"
                data-amp-analytics-name="click"
                data-amp-analytics-attrs="page: Setting, target: Discord"
              >
                <DiscordIcon isDark={isDark} className="icon" />
                <Text color={isDark ? "#FFF" : "#23242F"} className="connect-type">
                  Discord
                </Text>
              </ConnectItem>
              <ConnectItem
                data-amp-analytics-on="click"
                data-amp-analytics-name="click"
                data-amp-analytics-attrs="page: Setting, target: Analytics"
              >
                <AnalyticsIcon isDark={isDark} className="icon" />
                <Text color={isDark ? "#FFF" : "#23242F"} className="connect-type">
                  Analytics
                </Text>
              </ConnectItem>
              <ConnectItem
                data-amp-analytics-on="click"
                data-amp-analytics-name="click"
                data-amp-analytics-attrs="page: Setting, target: Language"
              >
                <LanguageIcon isDark={isDark} className="icon" />
                <Text color={isDark ? "#FFF" : "#23242F"} className="connect-type">
                  Language
                </Text>
              </ConnectItem>
              <ConnectItem onClick={toggleDarkMode}>
                {isDark ? <SunIcon className="icon" /> : <MoonIcon className="icon" />}
                <Text color={isDark ? "#FFF" : "#23242F"} className="connect-type">
                  {isDark ? "Light Mode" : "Dark Mode"}
                </Text>
              </ConnectItem>
            </ConnectList>
          </Box>
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default MenuPanel;
