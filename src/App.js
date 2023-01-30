import "./resources/css/normalize.css";
import Home from "./components/Home";
import User from "./components/User";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuario/:login" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
