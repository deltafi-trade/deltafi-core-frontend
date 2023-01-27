import { HelmetProvider } from "react-helmet-async";

import { CustomConnectionProvider as ConnectionProvider } from "./connection";
import { CustomWalletProvider as WalletProvider } from "./wallet";
import { ThemeContextProvider } from "./theme";
import { ModalProvider } from "./modal";

export function Providers({ children }) {
  return (
    <ConnectionProvider>
      <WalletProvider>
        <HelmetProvider>
          <ThemeContextProvider>
            <ModalProvider>{children}</ModalProvider>
          </ThemeContextProvider>
        </HelmetProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default Providers;
