import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
// import "./styles/reset.css";
import "the-new-css-reset/css/reset.css";
import "./styles/main.scss";
//multiconnect wallet
import { Web3ReactProvider } from "@web3-react/core";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { ConnectorProvider } from "./hooks/useConnector";

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider, "any");
  library.pollingInterval = 15000;
  return library;
};

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ConnectorProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ConnectorProvider>
  </Web3ReactProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function to log results (for example: reportWebVitals(console.log)) or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
