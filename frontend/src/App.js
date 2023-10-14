import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Kyc from "./pages/Kyc";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kyc" element={<Kyc />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
