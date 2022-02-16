import { Provider } from "react-redux";
import Home from "./routes/Home";
import Explore from "./routes/Explore";
import Create from "./routes/Create";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
