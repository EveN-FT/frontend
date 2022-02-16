import { useWeb3React } from "@web3-react/core";
import { walletconnect, resetWalletConnector } from "./connectors";

const ConnectWalletConnect = () => {
  const web3reactContext = useWeb3React();
  // const disconnectMetamaskSimple = () => {
  // 	try {
  // 		web3reactContext.deactivate();
  // 	} catch (ex) {
  // 		console.log(ex);
  // 	}
  // };

  // //web3react context
  // const checkInfoSimple = async () => {
  // 	try {
  // 		console.log('web3reactContext');
  // 		console.log(web3reactContext);
  // 	} catch (ex) {
  // 		console.log(ex);
  // 	}
  // };

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
