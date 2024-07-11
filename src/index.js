import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
  //Strict Mode is commented, causing problem in row selection
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
