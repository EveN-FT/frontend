import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Create from "./routes/Create";
import EventDetail from "./routes/EventDetail";
import TicketList from "./routes/TicketList";
import Redeem from "./routes/Redeem";
import UserRedeem from "./routes/UserRedeem";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Host from "./routes/Host";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/event/:address" element={<EventDetail />} />
        <Route path="/event/:address/tickets" element={<TicketList />} />
        <Route path="/event/:address/redeem" element={<Redeem />} />
        <Route path="/create" element={<Create />} />
        <Route path="/host" element={<Host />} />
        <Route path="/user/:address/redeem" element={<UserRedeem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
