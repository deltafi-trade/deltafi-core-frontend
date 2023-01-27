import styled from "styled-components";

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
  .description {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
  }
`;
const TransactionImg = styled.img`
  width: 242px;
  height: 255px;
  margin-top: 24px;
`;

const TransactionWorking = ({ ...props }) => {
  const { isDark } = useDarkMode();

  return (
    <>
      <TransactionDiv>
        <TransactionImg src={"/images/transaction-working.png"} alt="Transaction Working" />
        <Text
          color={isDark ? "#EBECF1" : "#88809C"}
          className="description"
          fontFamily="'Inter', sans-serif"
        >
          We are working on your transaction...
        </Text>
      </TransactionDiv>
    </>
  );
};

export default TransactionWorking;
