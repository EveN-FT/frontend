import { useWeb3React } from "@web3-react/core";
import { walletconnect, resetWalletConnector } from "./connectors";

const ConnectWalletConnect = () => {
  //connector, library, chainId, account, activate, deactivate
  const web3reactContext = useWeb3React();

  //web3react walletconnect
  const connectWalletConnect = async () => {
		try {
			resetWalletConnector(walletconnect);
			await web3reactContext.activate(walletconnect);
		} catch (ex) {
			console.log(ex);
		}
	};
  return (
    <button
      onClick={connectWalletConnect}
      className="wallet-icon"
      id="wallet-connect"
    >
      Connect
    </button>
  );
};

export default ConnectWalletConnect;
