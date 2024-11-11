/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App'; 
import './src/index.css' // Your main app component

// Render your React app into the 'root' div in index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
