import type { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { UAuthConnector } from "@uauth/web3-react";
import { NetworkConnector } from "@web3-react/network-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID!}`,
  4: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_ID!}`,
  137: `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
};

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 4: RPC_URLS[4], 137: RPC_URLS[137] },
  defaultChainId: 1,
});

//metamask
export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 137],
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
  console.info(connector);
  if (connector && connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined;
  }
}

//coinbase wallet
export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[137],
  appName: "Tiny Tix",
  supportedChainIds: [1, 4, 137],
});

//unstoppable domains
export const uauth = new UAuthConnector({
  clientID: process.env.REACT_APP_CLIENT_ID!,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET!,
  redirectUri: process.env.REACT_APP_REDIRECT_URI!,
  // postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI!,
  fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER!,
  scope: "openid wallet",
  connectors: { injected, walletconnect },
});

//array of all connectors
const connectors: Record<string, AbstractConnector> = {
  injected,
  walletconnect,
  walletlink,
  uauth,
};

export default connectors;
