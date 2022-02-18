import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import connectors from "./wallet/connectors";
import "../styles/navbar.scss";
import "../styles/wallet-modal.scss";

const WalletConnection = () => {
  const [openModal, setOpenModal] = useState(false);
  const { active, account, activate, deactivate } = useWeb3React();
  const testVar = "metamask";

  function createConnectHandler(connectorId: string) {
    return async () => {
      try {
        const connector = connectors[connectorId];
        if (
          connector instanceof WalletConnectConnector &&
          connector.walletConnectProvider?.wc?.uri
        ) {
          connector.walletConnectProvider = undefined;
        }
        await activate(connector);
      } catch (error) {
        console.error(error);
      }
    };
  }

  async function handleDisconnect() {
    try {
      deactivate();
    } catch (error) {
      console.error(error);
    }
  }

  if (active) {
    return (
      <>
        <div>Connected to {account}</div>
        <button onClick={handleDisconnect}>Disconnect</button>
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
                onClick={createConnectHandler(v)}
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
