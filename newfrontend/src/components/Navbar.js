import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/Lender">Lender</Link>
        </li>
        <li>
          <Link to="/Borrower">Borrower</Link>
        </li>
        <li>
          <Link to="/Repay">Repay</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
