/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { motion } from 'framer-motion';
import  { useState} from 'react';  // Import Framer Motion
import './signup.css'; // Import the custom CSS
import logo from "./UBA-logo-removebg-preview.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      // Make the POST request to the backend
      const response = await axios.post('http://localhost:5000/api/signup', { username, password });
      
      // If successful, you can navigate to the login page or dashboard
      console.log(response.data);
      alert('Signup successful! You can now log in.');

    } catch (error) {
      // Handle error (showing error message)
      if (error.response) {
        setErrorMessage(error.response.data.message);  // Display error message from backend
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };
  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: 0 }} // Start with 0 opacity
      animate={{ opacity: 1 }} // Fade in to full opacity
      exit={{ opacity: 0 }} // Fade out when exiting
      transition={{ duration: 0.5 }} // Transition duration
    >
      {/* Logo outside of form, floated to the right */}
      <motion.div
        className="logo-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }} // Delay for logo animation
      >
        <img
          src={logo}// Path to the logo image
          alt="Logo"
          className="logo" // Add a class for custom styling
        />
      </motion.div>

      {/* Signup form container */}
      <motion.div
        className="signup-form-container"
        initial={{ y: '-50px' }} // Start from 50px above
        animate={{ y: 0 }} // Slide in to the original position
        transition={{ duration: 0.6, type: 'spring', stiffness: 50 }} // Slide-in effect with a spring animation
      >
        <h2
          className="signup-heading"
          style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px' }}
        >
        Create Your Account
        </h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSignup} className="space-y-4">
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

          {/* <motion.div
            className="form-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }} // Delay to stagger animations
          >
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              onChange={(e) => setEmailaddress(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </motion.div> */}

          <motion.div
            className="form-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }} // Delay to stagger animations
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
            className="signup-button"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 100 }} // Button scale animation
          >
            Sign Up
          </motion.button>
        </form>
        <p>
          Already have an account? <a href="/">Log in here</a>.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Signup;
