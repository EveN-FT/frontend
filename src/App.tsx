import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Explore from "./routes/Explore";

import Wallet from "./routes/Wallet";

import EventCreate from "./routes/EventCreate";
import EventDetail from "./routes/EventDetail";
import EventMint from "./routes/EventMint";
import TicketList from "./routes/TicketList";
import Host from "./routes/Host";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/event/:address" element={<EventDetail />} />

        <Route path="/wallet" element={<Wallet />} />

        <Route path="/event/:address/tickets" element={<TicketList />} />
        <Route path="/event/:address/mint" element={<EventMint />} />
        <Route path="/event/new" element={<EventCreate />} />
        <Route path="/host" element={<Host />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
