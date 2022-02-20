import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Props,
  MouseEventHandler,
} from "react";
import {
  injected,
  walletconnect,
  resetWalletConnector,
  walletlink,
  network,
} from "../components/wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import connectors from "../components/wallet/connectors";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";

interface Store {
  isActive: boolean;
  isLoading: boolean;
  account: string | null | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  createConnectHandler: (connectorId: string) => Promise<void>;
  library: any;
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
      //TODO change this to new createConnectHandler function or just remove it
      setIsLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  //Connect to Connector wallet
  const connect = async () => {
    console.log("Connecting to Connector Wallet");
    try {
      await activate(injected);
    } catch (error) {
      console.log("Error on connecting: ", error);
    }
  };
  //NEW connect to Connector wallet
  const createConnectHandler = async (connectorId: string) => {
    try {
      const selectedConnector = connectors[connectorId];
      if (
        selectedConnector instanceof WalletConnectConnector &&
        selectedConnector.walletConnectProvider?.wc?.uri
      ) {
        selectedConnector.walletConnectProvider = undefined;
      }
      await activate(selectedConnector);
    } catch (error) {
      console.error(error);
    }
  };

  // Disconnect from wallet
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
      createConnectHandler,
      disconnect,
      library,
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
