import React from 'react';
import '../utils/Welcome.css';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate(); 
  return (
    <div className="welcome-container">
      <h1>Welcome User</h1>
      <img src="icon.png" alt="Logo" className="logo" />
      <div className="button-container">
          <button className="button" onClick={()=>navigate('login')}>Login</button>
          <button className="button"onClick={()=>navigate('register')}>Register</button>
      </div>
    </div>
  );
}