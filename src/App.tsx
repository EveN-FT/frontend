import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Wallet from "./routes/Wallet";
import EventDetail from "./routes/EventDetail";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/event/:address" element={<EventDetail />} />
        <Route path="/wallet" element={<Wallet />} />
        {/* <Route path="/eventdetail" element={<EventDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
