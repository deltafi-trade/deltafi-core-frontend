import { PublicKey } from "@solana/web3.js";
import React, { useContext, createContext, useState, useCallback } from "react";
import { ModalContextInfo, ModalInfo } from "./types";

const ModalContext: React.Context<null | ModalContextInfo> = createContext<null | ModalContextInfo>(
  null,
);

export const ModalProvider = ({ children }) => {
  const [modalInfo, setMenuOpen] = useState<ModalInfo>({
    menuOpen: false,
    menu: "",
    address: null,
    data: null,
  });

  const setMenu = useCallback(
    (menuOpen: boolean, menu: string = "", address: PublicKey | null = null, data: any = null) => {
      setMenuOpen({ menuOpen, menu, address, data });
    },
    [setMenuOpen],
  );

  return <ModalContext.Provider value={{ modalInfo, setMenu }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Missing connection context");
  }
  return { ...context.modalInfo, setMenu: context.setMenu };
};
