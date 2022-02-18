import React, { useState, useEffect, useMemo, useCallback, Props } from "react";
import {
  injected,
  walletconnect,
  resetWalletConnector,
  walletlink,
  network,
} from "../components/wallet/connectors";
import { useWeb3React } from "@web3-react/core";

interface Store {
  isActive: boolean;
  isLoading: boolean;
  account: string | null | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const ConnectorContext = React.createContext<Store>({} as Store);

export const ConnectorProvider = ({ children }: Props<any>) => {
  const { activate, account, library, connector, active, deactivate } =
    useWeb3React();

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Init Loading
  useEffect(() => {
    connect().then(() => {
      setIsLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Connect to Connector wallet
  const connect = async () => {
    console.log("Connecting to Connector Wallet");
    try {
      await activate(injected);
    } catch (error) {
      console.log("Error on connecting: ", error);
    }
  };

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    console.log("Deactivating...");
    try {
      deactivate();
    } catch (error) {
      console.log("Error on disconnecting: ", error);
    }
  };

  const values = useMemo(
    () => ({
      isActive,
      account,
      isLoading,
      connect,
      disconnect,
    }),
    [isActive, isLoading] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <ConnectorContext.Provider value={values}>
      {children}
    </ConnectorContext.Provider>
  );
};

export default function useConnector() {
  const context = React.useContext(ConnectorContext);

  if (context === undefined) {
    throw new Error(
      "useConnector hook must be used with a ConnectorProvider component"
    );
  }

  return context;
}
