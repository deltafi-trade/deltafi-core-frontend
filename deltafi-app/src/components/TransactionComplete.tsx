import styled from "styled-components";

import { ViewTransactionIcon, StartTransactionIcon } from "components";
import { Text } from "components/Text";

import { useDarkMode } from "providers/theme";

const TransactionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 32px 0px 37px;
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 10px;
  padding: 34px 47px 38px 47px;
  .congrat {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .complete {
    text-align: center;
    font-size: 16px;
    font-weight: 300;
    margin-top: 10px;
  }
  .view-transaction {
    font-size: 14px;
    margin-top: 14px;
    text-align: center;
  }
  .start-transaction {
    color: #88809c;
  }
`;
const Img = styled.img`
  width: 187px;
  height: 187px;
  margin-top: 24px;
`;
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

const TransactionComplete = ({ ...props }) => {
  const { isDark } = useDarkMode();

  return (
    <>
      <TransactionDiv>
        <Text
          color={isDark ? "#EBECF1" : "#88809C"}
          className="congrat"
          fontFamily="'Inter', sans-serif"
        >
          Congratulations!
        </Text>
        <Text
          color={isDark ? "#EBECF1" : "#88809C"}
          className="complete"
          fontFamily="'Inter', sans-serif"
        >
          Your transaction is complete
        </Text>
        <Text
          color={isDark ? "#88809C" : "#6B7280"}
          className="view-transaction"
          fontFamily="'Inter', sans-serif"
        >
          <ExternalLink
            href="/VIEWTRANSACTION"
            target="_blank"
            rel="noreferrer noopener"
            data-amp-analytics-on="click"
            data-amp-analytics-name="click"
            data-amp-analytics-attrs="page: Transaction, target: ViewTransaction"
          >
            VIEW TRANSACTION
            <ViewTransactionIcon className="external-link" isDark={isDark} width="18px" />
          </ExternalLink>
        </Text>
        <Img src={"/images/transaction-complete.png"} alt="Transaction Working" />
        <Text
          color={isDark ? "#EFCBD7" : "#1B0D3F"}
          className="view-transaction"
          fontFamily="'Inter', sans-serif"
        >
          <ExternalLink
            href="/VIEWTRANSACTION"
            className="start-transaction"
            target="_blank"
            rel="noreferrer noopener"
            data-amp-analytics-on="click"
            data-amp-analytics-name="click"
            data-amp-analytics-attrs="page: Transaction, target: NewTransaction"
          >
            START NEW TRANSACTION
            <StartTransactionIcon className="external-link" isDark={isDark} width="17px" />
          </ExternalLink>
        </Text>
      </TransactionDiv>
    </>
  );
};

export default TransactionComplete;
