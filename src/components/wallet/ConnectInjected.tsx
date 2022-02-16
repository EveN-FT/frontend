import { useWeb3React } from "@web3-react/core";
import { injected } from "./connectors";

const ConnectInjected = () => {
  const web3reactContext = useWeb3React();

  //web3react metamask
  const connectMetamask = async () => {
    try {
      await web3reactContext.activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <button onClick={connectMetamask} className="wallet-icon" id="metamask">
      Connect
    </button>
  );
};
export default ConnectInjected;
