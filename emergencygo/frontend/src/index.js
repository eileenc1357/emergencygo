import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Create the root for concurrent rendering
const root = ReactDOM.createRoot(document.getElementById('root')); // Using createRoot instead of render

root.render(
  <BrowserRouter> 
    <App />
  </BrowserRouter>
);
