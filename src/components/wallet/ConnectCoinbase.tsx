import { useWeb3React } from "@web3-react/core";
import { walletlink } from "./connectors";

const ConnectCoinbase = () => {
  const web3reactContext = useWeb3React();

  //web3react coinbase
  const connectCoinbase = async () => {
    try {
      await web3reactContext.activate(walletlink);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <button onClick={connectCoinbase} className="wallet-icon" id="coinbase">
      Connect
    </button>
  );
};

export default ConnectCoinbase;
