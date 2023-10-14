import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'crypto-browserify';
import 'os-browserify/browser';
import 'path-browserify';
import 'stream-browserify';
import 'assert';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


