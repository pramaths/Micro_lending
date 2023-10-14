import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMoneyCheckAlt, FaHandHoldingUsd, FaHistory, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Import icons from react-icons/fa
import './Lend.css';

const UserHome = () => {
  return (
    <div>
      <div className='rightContent'>
        <div className='welcomeuser'> Lend</div>
      </div>

      <div className="sidebar">
        <div className="top-div">
          <h2>MicroLend</h2>
          <h4>Reshape The Banking System</h4>
        </div>
        <div className="center-div">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/userhome"><FaHome /> Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/lend"><FaMoneyCheckAlt /> Lend</Link>
            </li>
            <li className="nav-item">
              <Link to="/borrow"><FaHandHoldingUsd /> Borrow</Link>
            </li>
            <li className="nav-item">
              <Link to="/repay"><FaHistory /> Repay</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile"><FaUser /> Profile</Link>
            </li>
          </ul>
        </div>
        <div className="bottom-div">
          <a href="/logout"><FaSignOutAlt /> Logout</a>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
