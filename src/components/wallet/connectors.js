import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
	1: 'https://mainnet.infura.io/v3/130112a3cd15466b9b9ded6f200e3f68',
	4: 'https://rinkeby.infura.io/v3/130112a3cd15466b9b9ded6f200e3f68',
	137: 'https://polygon-mainnet.infura.io/v3/130112a3cd15466b9b9ded6f200e3f68',
};

//metamask
export const injected = new InjectedConnector({
	supportedChainIds: [ 1, 4, 137 ]
}); 

//wallet connect: trust, rainbow, etc
export const walletconnect = new WalletConnectConnector({
	// rpc: {
	// 	1: RPC_URLS[1],
	// 	4: RPC_URLS[4],
	// 	137: RPC_URLS[137],
	// },
	rpc: { 1: RPC_URLS[1] },
    bridge: "https://bridge.walletconnect.org",
	qrcode: true,
	pollingInterval: POLLING_INTERVAL
});

export function resetWalletConnector(connector) {
	if (connector && connector instanceof WalletConnectConnector) {
		connector.walletConnectProvider = undefined;
	}
}

//coinbase wallet
export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[137],
	appName: 'EveN-FT',
	supportedChainIds: [ 1, 4, 137 ]
});