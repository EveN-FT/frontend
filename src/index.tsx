import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import "the-new-css-reset/css/reset.css";
import "./styles/main.scss";
import { Web3ReactProvider } from "@web3-react/core";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { ConnectorProvider } from "./hooks/useConnector";
import { MoralisProvider } from "react-moralis";

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider, "any");
  library.pollingInterval = 15000;
  return library;
};

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ConnectorProvider>
      <MoralisProvider
        appId="Lha1izn3kc9AdoBp4FfI6ruxZdDZ9iIkIwmFxsgX"
        serverUrl="https://pbr26iwsgfom.usemoralis.com:2053/server"
      >
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </MoralisProvider>
    </ConnectorProvider>
  </Web3ReactProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function to log results (for example: reportWebVitals(console.log)) or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
