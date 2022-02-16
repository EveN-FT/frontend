import React, { useState, useEffect } from "react";
import Web3EthContract from "web3-eth-contract";
import { useDispatch } from "react-redux";
import {
  connectFailed,
  connectRequest,
  connectSuccess,
  updateAccount,
} from "../redux/blockchainSlice";
import { useSelector } from "react-redux";
import CONFIG from "../config";

const WalletConnect = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [errorOpen, setErrorOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const isLoading = useSelector((state) => state.blockchain.loading);
  const errorMsg = useSelector((state) => state.blockchain.errorMsg);
  const account = useSelector((state) => state.blockchain.account);

  useEffect(() => {
    if (errorMsg) {
      setErrorOpen(true);
    }
  }, [errorMsg]);

  const connectToWallet = () => {
    dispatch(connectRequest());

    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (!metamaskIsInstalled) {
      dispatch(connectFailed("Install Metamask."));
      return null;
    }

    Web3EthContract.setProvider(ethereum);

    const accountsPromise = ethereum.request({
      method: "eth_requestAccounts",
    });
    const networkIdPromise = ethereum.request({
      method: "net_version",
    });

    Promise.all([accountsPromise, networkIdPromise])
      .then((results) => {
        const [accounts, networkId] = results;
        console.log("results -", results);
        if (networkId === CONFIG.NETWORK.ID) {
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: null,
            })
          );

          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });

          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
        } else {
          dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(connectFailed("Something went wrong."));
      });
  };

  return (
    <div>
      <div>
        {isLoading ? (
          <span>loading...</span>
        ) : typeof account === "string" ? (
          <p>
            {account.substring(0, 6) +
              "..." +
              account.substring(account.length - 4, account.length)}
          </p>
        ) : (
          <button onClick={connectToWallet} variant="contained">
            Connect
          </button>
        )}
      </div>
      {/* <div open={errorOpen}> */}
      {/*   <div> */}
      {/*     <span>{errorMsg}</span> */}
      {/*     <button */}
      {/*       onClick={() => { */}
      {/*         setErrorOpen(false); */}
      {/*         dispatch(connectFailed("")); */}
      {/*       }} */}
      {/*       variant="contained" */}
      {/*     > */}
      {/*       Close */}
      {/*     </button> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  );
};

export default WalletConnect;
