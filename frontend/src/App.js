import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Kyc from "./pages/Kyc";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import Lend from "./pages/Lend";
import Borrow from './pages/Borrow';
import Repay from "./pages/Repay";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kyc" element={<Kyc />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/lend" element={<Lend />} />
          <Route path="/borrow" element={<Borrow />} />
          <Route path="/repay" element={<Repay />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
