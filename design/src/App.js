import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Kyc from './pages/Kyc';
import Profile from './pages/Profile';
import Repay from './pages/Repay';
import Lender from './pages/Lender';
import Borrower from './pages/Borrower';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/kyc" element={<Kyc />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Borrower" element={<Borrower />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Repay" element={<Repay/>} />
        <Route path="/Lender" element={<Lender />} />
      </Routes>
    </Router>
  );
}

export default App;
