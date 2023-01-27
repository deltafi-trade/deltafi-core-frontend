import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  AppBar,
  makeStyles,
  Theme,
  Container,
  Toolbar,
  Link,
  AppBarProps,
} from "@material-ui/core";
import { useWallet } from "@solana/wallet-adapter-react";

import { ConnectButton, TabMenu, WalletButton } from "components";
import { useModal } from "providers/modal";
import { HOMEPAGE_LINK } from "constants/index";

interface ContainerProps extends AppBarProps {
  theme: any;
  shrunk: number;
}

const useStyles = makeStyles(({ breakpoints, palette }: Theme) => ({
  ctaButton: {
    backgroundImage: `linear-gradient(52.7deg, #1AFA9A -3.73%, #478EF0 48.34%, #9945FD 93.4%), ${palette.gradient.btnCta}`,
    color: palette.text.primary,
    borderRadius: 100,
    border: "solid 1px transparent",
    backgroundOrigin: "border-box",

    height: 50,
    width: 180,

    fontSize: 16,
    fontWeight: 600,
    textTransform: "none",

    "&:hover": {
      color: palette.text.primary,
      boxShadow: "none",
    },

    [breakpoints.down("sm")]: {
      fontSize: 16,
      height: 45,
      width: 180,
      boxShadow: `2px 1000px 1px ${palette.background.black} inset`,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 96,
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [breakpoints.up("md")]: {
      display: "none",
    },
  },
  logo: {
    width: 150,
    [breakpoints.down("sm")]: {
      width: 100,
    },
    [breakpoints.down("md")]: {
      width: 137,
    },
  },
}));

const HeaderWrapper = styled(AppBar)<ContainerProps>`
  background-color: ${({ theme, shrunk }) => (shrunk ? theme.palette.background.primary : "none")};
  box-shadow: none;
`;

const Header: React.FC = (props) => {
  const classes = useStyles(props);
  const { connected: isConnectedWallet } = useWallet();
  const { setMenu } = useModal();
  const [isShrunk, setShrunk] = useState(false);

  useEffect(() => {
    if (isConnectedWallet) setMenu(false, "");
  }, [isConnectedWallet, setMenu]);

  useEffect(() => {
    const onScroll = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
        ) {
          return true;
        }

        if (isShrunk && document.body.scrollTop < 4 && document.documentElement.scrollTop < 4) {
          return false;
        }

        return isShrunk;
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <HeaderWrapper position="fixed" color="transparent" shrunk={isShrunk ? 1 : 0}>
      <Container>
        <Toolbar disableGutters className={classes.toolbar}>
          <Link
            href={HOMEPAGE_LINK}
            underline="none"
            data-amp-analytics-on="click"
            data-amp-analytics-name="click"
            data-amp-analytics-attrs="page: Header, target: Logo"
          >
            <img src="/horizontal 60.svg" alt="logo" className={classes.logo} />
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <TabMenu />
            {/* <MenuButton onClick={() => setMenu(true, 'menu')} /> */}
          </div>
          <div className={classes.grow} />
          {isConnectedWallet ? (
            <WalletButton />
          ) : (
            <ConnectButton
              size="small"
              onClick={() => setMenu(true, "connect")}
              className={classes.ctaButton}
            >
              Connect wallet
            </ConnectButton>
          )}
          {/* <div className={classes.sectionMobile}>
            <MenuButton onClick={() => setMenu(true, 'menu')} />
          </div> */}
        </Toolbar>
      </Container>
      {/* <MobileWrapper>
        <Logo
          href={HOMEPAGE_LINK}
          isDark={isDark}
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Header, target: Logo"
        />
        <StyledDiv>
          <ConnectWallet />
          <Menu isDark={isDark} />
        </StyledDiv>
      </MobileWrapper>
      <DesktopWrapper>
        <Logo
          href={HOMEPAGE_LINK}
          isDark={isDark}
          data-amp-analytics-on="click"
          data-amp-analytics-name="click"
          data-amp-analytics-attrs="page: Header, target: Logo"
        />
        <StyledDiv>
          <ButtonGroup variant="contained">
            <Button
              onClick={() => handleActive('swap')}
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Header, target: Swap"
            >
              Swap
            </Button>
            <Button
              onClick={() => handleActive('pools')}
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Header, target: Pools"
            >
              Pools
            </Button>
            <Button
              onClick={() => handleActive('farms')}
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Header, target: Farms"
            >
              Farms
            </Button>
          </ButtonGroup>
          <Menu isDark={isDark} />
        </StyledDiv>
        {!isConnectedWallet ? <ConnectWallet /> : <WalletButton />}
      </DesktopWrapper> */}
      {/* {isConnectedWallet && <WalletSetting open={menuOpen} setOpen={setMenuOpen} />} */}
    </HeaderWrapper>
  );
};

export default Header;
