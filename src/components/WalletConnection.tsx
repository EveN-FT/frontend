import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import connectors from "./wallet/connectors";
import "../styles/navbar.scss";
import "../styles/wallet-modal.scss";
import useConnector from "../hooks/useConnector";
import { Link, useLocation } from "react-router-dom";

const WalletConnection = () => {
  const [openModal, setOpenModal] = useState(false);
  const { isActive, account, disconnect, createConnectHandler } =
    useConnector();
  const location = useLocation();

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

  if (location.pathname === "/wallet") {
    return null;
  }

  if (isActive) {
    //TODO: remove button and add icon for 'view wallet'
    return (
      <>
        <Link to={`/wallet`}>
          <button>View wallet</button>
        </Link>
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
