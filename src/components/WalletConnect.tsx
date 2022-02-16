import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useDispatch } from "react-redux";
import {
  connectFailed,
  connectRequest,
  connectSuccess,
  updateAccount,
} from "../redux/blockchainSlice";
import useSelector from "../hooks/useSelector";
import CONFIG from "../config";

const WalletConnect = () => {
  const ethereum = window.ethereum;
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  // const [errorOpen, setErrorOpen] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  // const isLoading = useSelector((state) => state.blockchain.loading);
  // const errorMsg = useSelector((state) => state.blockchain.errorMsg);
  // const account = useSelector((state) => state.blockchain.account);

  const [openModal, setOpenModal] = React.useState(false);

  const handleClose = () => {
    setOpenModal(false);
    console.log("handle close");
  };

  const handleOpen = () => {
    setOpenModal(true);
    console.log("handle open ");
  };

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

        ethereum.on("accountsChanged", (accounts: any) => {
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

  return (
    <div>
      <button onClick={handleOpen}>
        {console.log("selected connect")}
        Connect
      </button>
    </div>
  );
};

export default WalletConnect;
