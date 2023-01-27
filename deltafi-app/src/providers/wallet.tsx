import { useMemo, useCallback } from "react";
import {
  getCoin98Wallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolflareWebWallet,
  getSolletExtensionWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export function CustomWalletProvider({ children }) {
  const network = process.env.REACT_APP_NETWORK as WalletAdapterNetwork;
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolflareWebWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
      getCoin98Wallet(),
      getSlopeWallet(),
    ],
    [network],
  );
  const onErrorWallet = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  return (
    <WalletProvider wallets={wallets} onError={onErrorWallet} autoConnect>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  );
}
