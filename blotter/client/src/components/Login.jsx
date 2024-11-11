/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { motion } from 'framer-motion';
import  { useState, createContext, useContext } from 'react'; 
import { useAuth } from './AuthContext'; 
import { useNavigate } from 'react-router-dom';// Import Framer Motion
import './Login.css'; // Import the custom CSS
import logo from "./UBA-logo-removebg-preview.png"
import axios from 'axios';

function Login() {
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form default behavior

    try {
      // Sending POST request to backend for login
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      // Assuming response contains a success message or a token
      console.log(response.data); // You can log this to see the response from backend
      alert('Login successful! Redirecting to dashboard...');

      // Once login is successful, redirect to the dashboard
      navigate('/dashboard'); // Redirect to the /dashboard route

    } catch (error) {
      // If there's an error during login, handle it here
      if (error.response) {
        setErrorMessage(error.response.data.message); // Display server message
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };
  
  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }} // Start with 0 opacity
      animate={{ opacity: 1 }} // Fade in to full opacity
      exit={{ opacity: 0 }} // Fade out when exiting
      transition={{ duration: 0.5 }} // Transition duration
    >
      {/* Logo outside of form, aligned to top */}
      <motion.div
        className="logo-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }} // Delay for logo animation
      >
        <img
          src={logo} // Path to the logo image
          alt="Logo"
          className="logo" // Add a class for custom styling
        />
      </motion.div>

      {/* Login form container */}
      <motion.div
        className="login-form-container"
        initial={{ y: '-50px' }} // Start from 50px above
        animate={{ y: 0 }} // Slide in to the original position
        transition={{ duration: 0.6, type: 'spring', stiffness: 50 }} // Slide-in effect with a spring animation
      >
        <h2
          className="login-heading"
          style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}
        >
          UBA Treasury Blotter
        </h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <motion.div
            className="form-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }} // Delay to stagger animations
          >
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input-field"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }} // Delay to stagger animations
          >
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="login-button"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 100 }} // Button scale animation
          >
            Login
          </motion.button>
        </form>
        <p>
          Dont have an account? <a href="/signup">Sign up here</a>.
        </p>
      </motion.div>
    </motion.div>
  );
}


export default Login;
