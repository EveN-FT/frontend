import React from "react";
import { Provider } from "react-redux";
import Home from "./routes/home";
import Explore from "./routes/explore";
import Create from "./routes/create";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TabBar from "./components/TabBar";
import store from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <TabBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="create" element={<Create />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
