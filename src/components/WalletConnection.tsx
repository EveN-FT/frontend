import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import connectors from "./wallet/connectors";
import "../styles/navbar.scss";
import "../styles/wallet-modal.scss";
import useConnector from "../hooks/useConnector";

const WalletConnection = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    isActive,
    isLoading,
    account,
    connect,
    disconnect,
    createConnectHandler,
  } = useConnector();

  // function createConnectHandler(connectorId: string) {
  //   return async () => {
  //     try {
  //       const connector = connectors[connectorId];
  //       if (
  //         connector instanceof WalletConnectConnector &&
  //         connector.walletConnectProvider?.wc?.uri
  //       ) {
  //         connector.walletConnectProvider = undefined;
  //       }
  //       await activate(connector);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  // }

  if (isActive) {
    return (
      <>
        {/* <div>Connected to {account}</div> */}
        <button onClick={disconnect}>Disconnect</button>
      </>
    );
  }

  return (
    <>
      <button onClick={() => setOpenModal(true)}>Connect</button>
      {openModal && (
        <div className="wallet-modal" onClick={() => setOpenModal(false)}>
          <div className="close" onClick={() => setOpenModal(false)}></div>
          <div className="button-grid">
            {Object.keys(connectors).map((v) => (
              <button
                key={v}
                onClick={() => createConnectHandler(v)}
                // onClick={connect}  //this works fine and the function has the same declared type in useConnector.tsx so idgi
                className="wallet-icon"
                id={v}
              >
                Connect to {v}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnection;
