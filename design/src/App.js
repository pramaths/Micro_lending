import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Repay from './pages/Repay';
import Lender from './pages/Lender';
import Borrower from './pages/Borrower';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Borrower" element={<Borrower />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Repay" element={<Repay/>} />
        <Route path="/Lender" element={<Lender />} />
      </Routes>
    </Router>
  );
}

export default App;
