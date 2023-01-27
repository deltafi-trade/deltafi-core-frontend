import styled from "styled-components";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useWallet } from "@solana/wallet-adapter-react";

import {
  Button,
  ViewTransactionIcon,
  ErrorIcon,
  StakeTransactionIcon,
  ConnectButton,
} from "components";
import { Text } from "components/Text";

import { useDarkMode } from "providers/theme";
import { useModal } from "providers/modal";
import { Box, Typography } from "@material-ui/core";

const InputBlock = styled.div`
  margin-top: 8px;
  border-radius: 5px;
  padding: 16px 22px;
  background: ${({ theme }) => theme.palette.background.default};
  .stake-symbol {
    font-size: 14px;
    font-weight: 400;
  }
  .stake-unit {
    font-size: 10px;
    font-weight: 500;
  }
  .unit {
    margin-left: 10px;
  }
  .info {
    margin-top: 29px;
    justify-content: space-between;
  }
  .currency {
    text-align: right;
    border: none;
    background: transparent;
    outline: none;
    font-size: 24px;
    font-family: "PT Mono";
    color: #515369;
    width: 100%;
    margin-right: 5px;
  }
  .down-arrow {
    width: 16px;
    margin-left: 5px;
  }
  .drop-down {
    cursor: pointer;
  }
`;
const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Wrapper = styled.div``;
const ExternalLink = styled.a`
  color: #88809c;
  outline: none;
  margin-left: 5px;
  display: inline-flex;
  text-decoration: none;
  .external-link {
    display: flex;
    align-items: flex-end;
    margin: 0 5px;
  }
`;

const IconWrapper = styled.div`
  background: linear-gradient(180deg, #ff5e79 0%, #dc0640 100%);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UnstakeTransaction = ({ ...props }) => {
  const farm = props.farm;
  const maxWithdrawal = 120;

  const { connected: isConnectedWallet } = useWallet();
  const { isDark } = useDarkMode();
  // !TODO: why stakingPercentage is not used
  const [stakingPercentage, setStakingPercentage] = useState(0); // eslint-disable-line
  const [earningAmount, setEarningAmount] = useState("");

  const { setMenu } = useModal();

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^\d.-]/g, "");
    if (isNaN(parseFloat(value))) {
      setEarningAmount("");
      setStakingPercentage(0);
    } else {
      setEarningAmount(value);
      if (Math.round((parseFloat(value) / maxWithdrawal) * 100) > 100) {
        setStakingPercentage(100);
      } else {
        setStakingPercentage(Math.round((parseFloat(value) / maxWithdrawal) * 100));
      }
    }
  };

  return (
    <>
      <InputBlock>
        <FlexWrapper>
          <FlexWrapper>
            <IconWrapper>
              <StakeTransactionIcon />
            </IconWrapper>
            <Wrapper className="unit">
              <Text
                color={isDark ? "#FFFFFF" : "#000000"}
                fontFamily="'Inter', sans-serif"
                className="stake-symbol"
              >
                DELFI
              </Text>
              <Text
                color={isDark ? "#999999" : "#999999"}
                fontFamily="'Inter', sans-serif"
                className="stake-unit"
              >
                {farm?.stakingToken?.symbol || ""} - {farm?.earningToken?.symbol || ""} Del...
              </Text>
            </Wrapper>
          </FlexWrapper>
          <CurrencyInput
            name="stakingCurrency"
            className="currency"
            autoComplete="off"
            placeholder="0.00"
            minLength={0}
            maxLength={20}
            decimalsLimit={20}
            value={earningAmount}
            onChange={inputHandler}
          />
        </FlexWrapper>
        <FlexWrapper className="info">
          <Text
            color={isDark ? "#515369" : "#515369"}
            fontFamily="'Inter', sans-serif"
            className="stake-symbol"
          >
            Balance: --
          </Text>
          <Text
            color={isDark ? "#515369" : "#515369"}
            fontFamily="'Inter', sans-serif"
            className="stake-unit"
          >
            %--
          </Text>
        </FlexWrapper>
      </InputBlock>
      {isConnectedWallet ? (
        parseFloat(earningAmount) > 0.0 ? (
          <>
            <Button
              disabled={parseFloat(earningAmount) > maxWithdrawal}
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Unstake, target: Withdraw"
            >
              WITHDRAW
            </Button>
            {parseFloat(earningAmount) > maxWithdrawal && (
              <FlexWrapper className="failed">
                <FlexWrapper style={{ justifyContent: "center" }}>
                  <ErrorIcon isDark={isDark} isSelected className="icon" />
                  <Text
                    small
                    color={isDark ? "#515369" : "#515369"}
                    fontFamily="'Inter', sans-serif"
                    className="transaction-failed"
                  >
                    Insufficient balance
                  </Text>
                </FlexWrapper>
              </FlexWrapper>
            )}
          </>
        ) : (
          <Button
            disabled
            data-amp-analytics-on="click"
            data-amp-analytics-name="click"
            data-amp-analytics-attrs="page: Unstake, target: EnterAmount"
          >
            ENTER AMOUNT
          </Button>
        )
      ) : (
        <>
          <Box marginY={2}>
            <ConnectButton
              fullWidth
              onClick={() => setMenu(true, "connect")}
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Untake, target: ConnectWallet"
            />
          </Box>
          <Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              data-amp-analytics-on="click"
              data-amp-analytics-name="click"
              data-amp-analytics-attrs="page: Untake, target: SubmitAgain"
            >
              SUBMIT AGAIN
            </Button>
            <FlexWrapper className="failed">
              <FlexWrapper>
                <ErrorIcon isDark={isDark} isSelected={true} className="icon" />
                <Typography color="error">Sorry, Transaction Failed!</Typography>
              </FlexWrapper>
              <Text
                color={isDark ? "#88809C" : "#6B7280"}
                className="view"
                fontFamily="'Inter', sans-serif"
              >
                <ExternalLink
                  href="/VIEWTRANSACTION"
                  target="_blank"
                  rel="noreferrer noopener"
                  data-amp-analytics-on="click"
                  data-amp-analytics-name="click"
                  data-amp-analytics-attrs="page: Untake, target: ViewTransaction"
                >
                  VIEW
                  <ViewTransactionIcon className="external-link" isDark={isDark} width="18px" />
                </ExternalLink>
              </Text>
            </FlexWrapper>
          </Box>
        </>
      )}
    </>
  );
};

export default UnstakeTransaction;
