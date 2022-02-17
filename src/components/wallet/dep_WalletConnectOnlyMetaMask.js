import React from "react";
import { Button } from "@material-ui/core";
import useMetaMask from "../../hooks/useMetaMask";

const WalletConnectOnlyMetaMask = () => {
  const { connect, disconnect, isActive, account, shouldDisable } =
    useMetaMask();

  return (
    <div>
      <Button onClick={connect} disabled={shouldDisable}>
        {/* <img src="images/metamask.svg" alt="MetaMask" width="50" height="50" />  */}
        Connect to MetaMask
      </Button>
      <div>Connected Account: {isActive ? account : ""}</div>
      <Button onClick={disconnect}>
        Disconnect MetaMask
        {/* <img src="images/noun_waving_3666509.svg" width="50" height="50" /> */}
      </Button>
    </div>
  );
};

export default WalletConnectOnlyMetaMask;
