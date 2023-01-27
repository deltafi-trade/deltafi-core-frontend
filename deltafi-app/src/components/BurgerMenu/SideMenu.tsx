import { Box, Drawer, makeStyles, Theme } from "@material-ui/core";
import { useModal } from "providers/modal";

import ConnectPanel from "./ConnectPanel";
import DepositPanel from "./DepositPanel";
import MenuPanel from "./MenuPanel";
import StakePanel from "./StakePanel";
import WalletPanel from "./WalletPanel";

const useStyles = makeStyles(({ breakpoints, palette }: Theme) => ({
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
  root: {
    width: "auto",
    [breakpoints.up("md")]: {
      width: 450,
    },
  },
}));

// type Anchor = 'top' | 'left' | 'bottom' | 'right'

const SideMenu: React.FC = (props) => {
  const classes = useStyles();
  const { menuOpen, menu, setMenu } = useModal();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setMenu(open, "");
  };

  const content = () =>
    menu === "connect" ? (
      <ConnectPanel />
    ) : menu === "menu" ? (
      <MenuPanel />
    ) : menu === "stake" ? (
      <StakePanel />
    ) : menu === "deposit" ? (
      <DepositPanel />
    ) : menu === "wallet" ? (
      <WalletPanel />
    ) : null;

  return (
    <>
      <Drawer
        anchor="right"
        className={classes.sectionDesktop}
        open={menuOpen}
        onClose={toggleDrawer(false)}
      >
        <Box className={classes.root}>{content()}</Box>
      </Drawer>
      <Drawer
        anchor="bottom"
        className={classes.sectionMobile}
        open={menuOpen}
        onClose={toggleDrawer(false)}
      >
        <Box className={classes.root}>{content()}</Box>
      </Drawer>
    </>
  );
};

export default SideMenu;
