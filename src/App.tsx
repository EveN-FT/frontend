import Home from "./routes/Home";
import Explore from "./routes/Explore";
import EventCreate from "./routes/EventCreate";
import EventDetail from "./routes/EventDetail";
import TicketList from "./routes/TicketList";
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
        <Route path="/event/new" element={<EventCreate />} />
        <Route path="/host" element={<Host />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
