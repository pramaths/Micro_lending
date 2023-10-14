import React,{ useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Borrower">Borrow</Link>
                </li>
                <li>
                    <Link to="/Lender">Lend</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/Repay">Repay</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
