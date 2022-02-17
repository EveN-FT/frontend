import type { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { UAuthConnector } from '@uauth/web3-react'


// import React, { useState, useEffect } from "react";
// import {
// 	Web3ReactProvider,
// 	useWeb3React,
// 	UnsupportedChainIdError
// } from "@web3-react/core";
// import {
// 	NoEthereumProviderError,
// 	UserRejectedRequestError as UserRejectedRequestErrorInjected
// } from "@web3-react/injected-connector";
// import {
// 	URI_AVAILABLE,
// 	UserRejectedRequestError as UserRejectedRequestErrorWalletConnect
// } from "@web3-react/walletconnect-connector";
// import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";

// function getErrorMessage(error) {
// 	if (error instanceof NoEthereumProviderError) {
// 		return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
// 	} else if (error instanceof UnsupportedChainIdError) {
// 		return "You're connected to an unsupported network.";
// 	} else if (
// 		error instanceof UserRejectedRequestErrorInjected ||
// 		error instanceof UserRejectedRequestErrorWalletConnect ||
// 		error instanceof UserRejectedRequestErrorFrame
// 	) {
// 		return "Please authorize this website to access your Ethereum account.";
// 	} else {
// 		console.error(error);
// 		return "An unknown error occurred. Check the console for more details.";
// 	}
// }
// // log the walletconnect URI
// useEffect(() => {
//     console.log('running')
//     const logURI = uri => {
//       console.log("WalletConnect URI", uri);
//     };
//     walletconnect.on(URI_AVAILABLE, logURI);

//     return () => {
//       walletconnect.off(URI_AVAILABLE, logURI);
//     };
//   }, []);

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
	1: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID!}`,
	4: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_ID!}`,
	137: `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
};

//metamask
export const injected = new InjectedConnector({
	supportedChainIds: [1, 4, 137]
});

//TODO: fix walletconnect bc it aint working
//wallet connect: trust, rainbow, etc
export const walletconnect = new WalletConnectConnector({
	infuraId: process.env.REACT_APP_INFURA_ID!,
	qrcode: true,
});
// export const walletconnect = new WalletConnectConnector({
// 	rpc: {
// 		1: RPC_URLS[1],
// 		4: RPC_URLS[4],
// 		137: RPC_URLS[137],
// 	},
// 	infuraId: process.env.REACT_APP_INFURA_ID!,
//     bridge: "https://bridge.walletconnect.org",
// 	qrcode: true,
// 	// pollingInterval: POLLING_INTERVAL
// });

export function resetWalletConnector(connector: WalletConnectConnector) {
	console.info(connector)
	console.log(connector instanceof WalletConnectConnector)
	if (connector && connector instanceof WalletConnectConnector) {
		connector.walletConnectProvider = undefined;
	}
}

//coinbase wallet
export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[137],
	appName: 'EveN-FT',
	supportedChainIds: [1, 4, 137]
});

//unstoppable domains
export const uauth = new UAuthConnector({
	clientID: process.env.REACT_APP_CLIENT_ID!,
	clientSecret: process.env.REACT_APP_CLIENT_SECRET!,
	redirectUri: process.env.REACT_APP_REDIRECT_URI!,
	// postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI!,
	fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER!,
	scope: 'openid wallet',
	connectors: {injected, walletconnect},
  })
  
  //array of all connectors
  const connectors: Record<string, AbstractConnector> = {
	injected,
	walletconnect,
	walletlink,
	uauth,
  }
  
  export default connectors