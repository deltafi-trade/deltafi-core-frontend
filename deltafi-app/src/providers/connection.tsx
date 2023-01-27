import React, { useContext } from "react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { useLocalStorageState } from "../utils/utils";
import { ConnectionContextValues, EndpointInfo } from "./types";

export const ENDPOINTS: EndpointInfo[] = [
  {
    name: "mainnet-beta",
    endpoint: "https://api.mainnet-beta.solana.com",
    custom: false,
  },
  { name: "testnet", endpoint: "https://api.testnet.solana.com", custom: false },
];

const ConnectionContext: React.Context<null | ConnectionContextValues> =
  React.createContext<null | ConnectionContextValues>(null);

export function CustomConnectionProvider({ children }) {
  const [endpoint, setEndpoint] = useLocalStorageState<string>(
    "connectionEndpts",
    ENDPOINTS[0].endpoint,
  );
  const [network, setNetwork] = useLocalStorageState<string>("network", ENDPOINTS[0].name);

  const handleSetNetwork = (network: string) => {
    const endpoint = ENDPOINTS.find((e) => e.name === network);
    setNetwork(endpoint.name);
    setEndpoint(endpoint.endpoint);
  };

  return (
    <ConnectionContext.Provider value={{ endpoint, network, setNetwork: handleSetNetwork }}>
      <ConnectionProvider endpoint={endpoint}>{children}</ConnectionProvider>
    </ConnectionContext.Provider>
  );
}

export function useCustomConnection() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("Missing connection context");
  }
  return context;
}
