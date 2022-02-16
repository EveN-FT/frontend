import { useWeb3React } from "@web3-react/core";
import {
  injected,
  walletconnect,
  resetWalletConnector,
  walletlink,
} from "./connectors";
// import { getContract } from './Helpers/contract';
import React, { useState, useEffect } from "react";
import Web3EthContract from "web3-eth-contract";
import { useDispatch } from "react-redux";
import {
  connectFailed,
  connectRequest,
  connectSuccess,
  updateAccount,
} from "../../redux/blockchainSlice";
import { fetchData } from "../../redux/data/dataActions";
import { useSelector } from "react-redux";
import CONFIG from "../../config";

const Web3ReactConnectionComponent = () => {
  //connector, library, chainId, account, activate, deactivate
  const web3reactContext = useWeb3React();
  //web3react
  // const writeToContractUsingWeb3React = async () => {
  // 	try {
  // 		const randomNumber = Math.floor(Math.random() * 100);
  // 		// const myContract = getContract(web3reactContext.library, web3reactContext.account);
  // 		const overrides = {
  // 			gasLimit: 230000
  // 		};
  // 		const response = await myContract.store(randomNumber, overrides);
  // 		console.log(response);
  // 		alert('write ' + randomNumber);
  // 	} catch (ex) {
  // 		console.log(ex);
  // 		alert(ex);
  // 	}
  // };

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

  //web3react metamask
  const connectMetamaskSimple = async () => {
    try {
      await web3reactContext.activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  //OG MetaMask connection

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [errorOpen, setErrorOpen] = useState(false);
  const isLoading = useSelector((state) => state.blockchain.loading);
  const errorMsg = useSelector((state) => state.blockchain.errorMsg);
  const account = useSelector((state) => state.blockchain.account);
  useEffect(() => {
    if (errorMsg) {
      setErrorOpen(true);
    }
  }, [errorMsg]);
  const getData = () => {
    if (
      state.blockchain.account !== "" &&
      state.blockchain.smartContract !== null
    ) {
      dispatch(fetchData(state.blockchain.account));
    }
  };
  useEffect(() => {
    getData();
  }, [state.blockchain.account]);

  const connectToWalletMM = () => {
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

  //web3react walletconnect
  const connectWalletConnectSimple = async () => {
    try {
      resetWalletConnector(walletconnect);
      await web3reactContext.activate(walletconnect);
    } catch (ex) {
      console.log(ex);
    }
  };

  //web3react coinbase
  const connectCoinbaseSimple = async () => {
    try {
      await web3reactContext.activate(walletlink);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div>
      {/* <div className="flex space-x-3">
				<button
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					// onClick={writeToContractUsingWeb3React}
				>
					Write To Contract Via Web3React
				</button>

				<button
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={checkInfoSimple}
				>
					Check web3react Context
				</button>
				<button
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={disconnectMetamaskSimple}
				>
					Disconnect Web3React
				</button>
			</div> */}
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
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(connectToWalletMM);
                getData();
              }}
              // onClick={connectToWalletMM}
              variant="contained"
            >
              ConnectInjected
            </button>
            {state.blockchain.errorMsg !== "" ? (
              <div
                style={{
                  textAlign: "center",
                  color: "var(--accent-text)",
                }}
              >
                ttt{state.blockchain.errorMsg}xxx
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div open={errorOpen}>
        <div>
          <span>{errorMsg}</span>
          <button
            onClick={() => {
              setErrorOpen(false);
              dispatch(connectFailed(""));
            }}
            variant="contained"
          ></button>
        </div>
      </div>
      {/* basic metamask implementation without error checking */}
      {/* <div>
				<button onClick={connectMetamaskSimple}>
					Connect Metamask
				</button>
			</div> */}
      {/* trust/rainbow/QR mobile wallet integration. still in progress */}
      {/* <div>
				<button onClick={connectWalletConnectSimple}>
					Connect WalletConnect
				</button>
			</div> */}
      <div>
        <button onClick={connectCoinbaseSimple}>Connect Coinbase Wallet</button>
      </div>
      {web3reactContext.account ? (
        <p>{web3reactContext.account}</p>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  );
};
export default Web3ReactConnectionComponent;
