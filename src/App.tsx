import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Create from "./routes/Create";
import { Route, BrowserRouter, Routes } from "react-router-dom";

// import { Example } from "./components/Example"
// import Web3ReactConnectionComponent from './components/wallet/Web3ReactConnectionComponent';

////altWallet2 Web3-React
// import { Web3ReactProvider } from '@web3-react/core' //altWallet2
// import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
// import { MetaMaskProvider } from './hooks/useMetaMask' //altWallet2
// // function getLibrary(provider, connector) { //altWallet2
// //   return new Web3(provider)  //altWallet2
// // }  //altWallet2
// const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
//   const library = new Web3Provider(provider, 'any');
//   library.pollingInterval = 15000;
//   return library;
// };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
