import React from "react";
import { ButtonProps } from "@material-ui/core";
import styled from "styled-components";
import { useModal } from "providers/modal";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectButton } from "components";

const Img = styled.img`
  width: 24px;
  height: 24px;
  ${({ theme }) => theme.muibreakpoints.up("sm")} {
    width: 34px;
    height: 34px;
    border-radius: 50%;
  }
`;

const WalletButton: React.FC<ButtonProps> = (props) => {
  const { setMenu } = useModal();
  const { wallet, publicKey } = useWallet();
  const accountAddress = publicKey ? publicKey.toString() : "";

  return (
    <ConnectButton
      {...props}
      startIcon={<Img src={wallet.icon} alt={wallet.name} />}
      onClick={() => setMenu(true, "wallet")}
    >
      {accountAddress?.substring(0, 4)}...{accountAddress?.substring(accountAddress?.length - 4)}
    </ConnectButton>
  );
};

export default React.memo(WalletButton);
