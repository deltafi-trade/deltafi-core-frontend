import { useState } from "react";
import styled from "styled-components";
import {
  Box,
  IconButton,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { Text, LinkIcon, WalletButton, StakeIcon, WithdrawIcon } from "components";

import { useModal } from "providers/modal";

import { Scrollbars } from "react-custom-scrollbars";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDarkMode } from "providers/theme";
import { useSelector } from "react-redux";
import { selectPoolByPoolKey } from "states/selectors";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
interface DarkProps {
  readonly isDark: boolean;
}

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
    background: palette.background.secondary,
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

const Img = styled.img`
  width: 27px;
  height: 27px;
  border-radius: 50%;
  ${({ theme }) => theme.muibreakpoints.down("md")} {
    width: 20px;
    height: 20px;
  }
`;
const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  &.stake {
    margin-top: 30px;
    justify-content: center;
  }
  &.space-between {
    justify-content: space-between;
  }
  .underline {
    text-decoration: underline;
  }
`;

const FlexColumnWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  &.first {
    align-items: flex-end;
    margin-right: 18px;
  }
`;

const LiquidDiv = styled.div`
  border-radius: 5px;
  margin: 30px 32px 28px 37px;
  justify-content: space-between;
  flex-direction: row;
  ${({ theme }) => theme.muibreakpoints.down("md")} {
    margin: 20px 16px 22px 16px;
    flex-direction: column;
    justify-content: center;
  }
`;

const LiquidItemDiv = styled.div<DarkProps>`
  display: flex;
  flex-direction: column;
  padding: 22px 24px;
  &.first {
    background: ${({ isDark }) =>
      isDark
        ? "linear-gradient(5.76deg, #88809C -194.75%, #1B0D3F 165.76%)"
        : "linear-gradient(5.76deg, rgba(136, 128, 156, 0.6) -194.75%, rgba(27, 13, 63, 0.6) 165.76%)"};
    border-radius: 5px;
  }
  .liquid-title {
    margin-bottom: 10px;
  }
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: ${({ isDark }) => (isDark ? "#000000" : "#FFFFFF")};
`;

const LiquidDescriptonDiv = styled.div<DarkProps>`
  background: ${({ isDark }) =>
    isDark
      ? "linear-gradient(5.76deg, #88809C -194.75%, #1B0D3F 165.76%)"
      : "linear-gradient(5.76deg, rgba(136, 128, 156, 0.6) -194.75%, rgba(27, 13, 63, 0.6) 165.76%)"};
  border-radius: 5px;
  padding: 24px 26px;
  margin: 30px 32px 43px 37px;
  ${({ theme }) => theme.muibreakpoints.down("md")} {
    margin: 0px 16px 40px 16px;
  }
`;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`deposit-block-${index}`}
      aria-labelledby={`deposit-block-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

const StakePanel: React.FC = (props) => {
  const { connected: isConnectedWallet } = useWallet();
  const { isDark } = useDarkMode();
  const classes = useStyles(props);
  const { address, setMenu } = useModal();

  const pool = useSelector(selectPoolByPoolKey(address.toBase58()));

  const [tab, setTab] = useState(0);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  if (!pool) return null;

  const renderStakeBlock = () => (
    <Paper>
      <Tabs value={tab} onChange={handleChangeTab} aria-label="Deposit Block">
        <Tab label="STAKE" icon={<StakeIcon isDark={isDark} isSelected className="icon" />} />
        <Tab label="UNSTAKE" icon={<WithdrawIcon isDark={isDark} isSelected className="icon" />} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        {/* <StakeTransaction farm={farm} /> */}
      </TabPanel>
      <TabPanel value={tab} index={1}>
        {/* <UnstakeTransaction farm={farm} /> */}
      </TabPanel>
    </Paper>
  );

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between" className={classes.header}>
        {isConnectedWallet ? (
          <WalletButton />
        ) : (
          <Typography variant="h6">Position Management</Typography>
        )}
        <IconButton size="small" onClick={() => setMenu(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box className={classes.scrollBar}>
        <Scrollbars autoHeightMax={200} autoHide={true}>
          <Box display="flex" justifyContent="center" padding={3}>
            <Typography>
              {pool.baseTokenInfo.symbol ?? ""} - {pool.quoteTokenInfo.symbol ?? ""} Liquidity
              Mining
            </Typography>
            <Img src={pool.baseTokenInfo.logoURI} alt="staking coin" />
            <Img src={pool.quoteTokenInfo.logoURI} alt="earning coin" />
          </Box>

          <Typography align="center" paragraph>
            LIQUIDITY MINING
          </Typography>
          <Box p={2}>{renderStakeBlock()}</Box>
          <FlexWrapper className="stake">
            <FlexColumnWrapper className="first">
              <Text color={"#88809C"} small fontFamily="'Inter', sans-serif">
                Total Staked
              </Text>
              <Text fontFamily="'Inter', sans-serif" className="deposit-share">
                40,378,330 DELFI
              </Text>
            </FlexColumnWrapper>
            <FlexColumnWrapper>
              <Text color={"#88809C"} small fontFamily="'Inter', sans-serif">
                Pool Rate
              </Text>
              <Text fontFamily="'Inter', sans-serif" className="deposit-share">
                240,000 DELFI / day
              </Text>
            </FlexColumnWrapper>
          </FlexWrapper>

          <LiquidDiv>
            <LiquidItemDiv className="first" isDark={isDark}>
              <Text color="#FFFFFF" small fontFamily="'Inter', sans-serif" className="liquid-title">
                Your liquidity staked
              </Text>
              <FlexWrapper className="space-between">
                <Text color="#FFFFFF" fontSize="24px">
                  0
                </Text>
                <Text color="#FFFFFF" small>
                  USDT - USDC DELFI
                </Text>
              </FlexWrapper>
            </LiquidItemDiv>
            <LiquidItemDiv isDark={isDark}>
              <Text small fontFamily="'Inter', sans-serif" className="liquid-title">
                Your unclaimed DELFI
              </Text>
              <FlexWrapper className="space-between">
                <Text fontSize="24px">0</Text>
                <Text color={"#898BA2"} fontWeight={500} fontFamily="'Inter', sans-serif">
                  0 / day
                </Text>
              </FlexWrapper>
            </LiquidItemDiv>
          </LiquidDiv>

          {isConnectedWallet && (
            <LiquidDescriptonDiv isDark={isDark}>
              <Text small color={"rgba(255, 255, 255, 0.8)"}>
                DELFI tokens are tokens which represent a share of the liquidity provided to a
                DeltaFi staking pool.
              </Text>
              <br />
              <Text small color={"rgba(255, 255, 255, 0.8)"}>
                You may obtain DELFI tokens by depositing USD Coin (USDC) or USDT (USDT) into the
                USDT-USDC pool.
              </Text>
              <br />
              <FlexWrapper>
                <Text small color={"rgba(255, 255, 255, 0.8)"} className="underline">
                  Deposit into the USDT-USDC Pool
                </Text>
                <LinkIcon
                  className="external-link"
                  isDark={isDark}
                  width="15px"
                  style={{ marginLeft: 6 }}
                />
              </FlexWrapper>
            </LiquidDescriptonDiv>
          )}
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default StakePanel;
