// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Ensure you import Router
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Master from './components/masterbidlist';
import AdvisoryLimits from './components/AdvisoryLimits';

const App = () => {
  return (
    <Router>  {/* Wrap the whole app in Router */}
      <AuthProvider>  {/* AuthProvider should be inside Router */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/masterbid" element={<Master />} />
          <Route path="/advisory-limits" element={<AdvisoryLimits />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
