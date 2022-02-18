import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Create from "./routes/Create";
import EventDetail from "./routes/EventDetail";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { IAssetData } from "./utils/types";

function App() {
  interface IAppState {
    connector: any | null;
    fetching: boolean;
    connected: boolean;
    chainId: number;
    showModal: boolean;
    pendingRequest: boolean;
    uri: string;
    accounts: string[];
    address: string;
    result: any | null;
    assets: IAssetData[];
  }

  const INITIAL_STATE: IAppState = {
    connector: null,
    fetching: false,
    connected: false,
    chainId: 1,
    showModal: false,
    pendingRequest: false,
    uri: "",
    accounts: [],
    address: "",
    result: null,
    assets: [],
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/event/:address" element={<EventDetail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
