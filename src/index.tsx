import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import Web3 from "web3";
// import { Web3ReactProvider } from '@web3-react/core'
// import { MetaMaskProvider } from './hooks/useMetaMask'

// function getLibrary(provider, connector) {
//   return new Web3(provider)
// }

ReactDOM.render(
  // <Web3ReactProvider getLibrary={getLibrary}>
  //   <MetaMaskProvider>
  <Provider store={store}>
    <App />
  </Provider>,
  //   </MetaMaskProvider>
  // </Web3ReactProvider>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
