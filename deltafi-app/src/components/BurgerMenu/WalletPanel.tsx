import { useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Box, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

import { Text } from "components/Text";
import { CopyAddressIcon, DisconnectWalletIcon } from "components";
import { useDarkMode } from "providers/theme";
import { useModal } from "providers/modal";

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  header: {},
  scrollBar: {
    marginTop: spacing(2),
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
  item: {
    background: palette.background.secondary,
    borderRadius: spacing(2),
    display: "flex",
    alignItems: "center",
    padding: `${spacing(4)}px ${spacing(3.5)}px`,
    marginTop: spacing(2),
    "& .icon": {
      width: "30px",
      marginRight: spacing(2),
    },
    cursor: "pointer",
  },
}));

const ConnectList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WalletPanel: React.FC = (props) => {
  const { disconnect, publicKey } = useWallet();
  const { setMenu } = useModal();
  const { isDark } = useDarkMode();

  const classes = useStyles(props);

  const onCopyAddress = () => {
    navigator.clipboard.writeText(publicKey.toString());
    setMenu(false);
  };

  const onDisconnectWallet = useCallback(() => {
    disconnect();
    setMenu(false);
  }, [disconnect, setMenu]);

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between" className={classes.header}>
        <Typography variant="h6" color="textSecondary">
          Wallet Setting
        </Typography>
        <IconButton size="small" onClick={() => setMenu(false, "")}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box className={classes.scrollBar}>
        <ConnectList>
          <Box
            onClick={onCopyAddress}
            data-amp-analytics-on="click"
            data-amp-analytics-name="click"
            data-amp-analytics-attrs="page: WalletSetting, target: CopyAddress"
            className={classes.item}
          >
            <CopyAddressIcon className="icon" />
            <Text color={isDark ? "#FFF" : "#23242F"} className="connect-type">
              Copy Address
            </Text>
          </Box>
          <Box
            onClick={onDisconnectWallet}
            data-amp-analytics-on="click"
            data-amp-analytics-name="click"
            data-amp-analytics-attrs="page: WalletSetting, target: DisconnectWallet"
            className={classes.item}
          >
            <DisconnectWalletIcon isDark={isDark} className="icon" />
            <Text color={isDark ? "#FFF" : "#23242F"} className="connect-type">
              Disconnet Wallet
            </Text>
          </Box>
        </ConnectList>
      </Box>
    </Box>
  );
};

export default WalletPanel;
