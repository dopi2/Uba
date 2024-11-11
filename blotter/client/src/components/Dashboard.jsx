import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegFileAlt, FaRegListAlt, FaRegFile, FaRegMoneyBillAlt, FaRegBuilding } from 'react-icons/fa';  // For navigation
import './dashboard.css'; // Custom CSS file for dashboard styling
import logo from './UBA-logo-removebg-preview.png';
import { useAuth } from './AuthContext';  // Import the hook to access the AuthContext

function Dashboard() {
  const { user, logout } = useAuth(); // Use the hook to get user and logout functions
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/dashboard'); // Redirect to login if there's no user
    }
  }, [user, navigate]);

  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFileDownload = () => {
    if (file) {
      // Download the file
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
    } else {
      alert('No file selected for download');
    }
  };

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar and Logo */}
      <motion.div
        className="sidebar"
        initial={{ x: -200 }} // Start from off-screen to the left
        animate={{ x: 0 }} // Slide into the viewport
        transition={{ duration: 0.6, type: 'spring', stiffness: 50 }}
      >
        <img
          src={logo} // Path to logo
          alt="Logo"
          className="sidebar-logo"
        />
        <nav>
          <ul>
            <li><Link to="/dashboard"><FaRegFileAlt className="sidebar-icon" />&nbsp;&nbsp;Master Bid List</Link></li>
            <li><Link to="/advisory-limits"><FaRegListAlt className="sidebar-icon" />&nbsp;&nbsp; Advisory Limits</Link></li>
            <li><Link to="/consideration-bid-list"><FaRegFile className="sidebar-icon" />&nbsp;&nbsp;Consideration Bid List</Link></li>
            <li><Link to="/wholesale-cid-list"><FaRegMoneyBillAlt className="sidebar-icon" />&nbsp;&nbsp;Wholesale CID List</Link></li>
            <li><Link to="/cbn-retail-bid"> <FaRegBuilding className="sidebar-icon" />&nbsp;&nbsp;CBN Retail Bid</Link></li>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li><Link to="/profile"><FaRegFileAlt className="sidebar-icon" />&nbsp;&nbsp;Profile</Link></li>
            <button onClick={handleLogout}>Logout</button>
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="master-bid-list-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="master-bid-list-heading">Master Bid List</h1>

          {/* Sample Master Bid List */}
          <div className="bid-list-content">
            <h2>Account Master Bid List</h2>
            <table className="master-bid-table">
              <thead>
                <tr>
                  <th>Bidder Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bidder 1</td>
                  <td>$10,000</td>
                  <td>2024-11-10</td>
                  <td>Accepted</td>
                </tr>
                <tr>
                  <td>Bidder 2</td>
                  <td>$15,000</td>
                  <td>2024-11-11</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>Bidder 3</td>
                  <td>$12,500</td>
                  <td>2024-11-12</td>
                  <td>Rejected</td>
                </tr>
                <tr>
                  <td>Bidder 4</td>
                  <td>$15,000</td>
                  <td>2024-11-11</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>Bidder 5</td>
                  <td>$15,000</td>
                  <td>2024-11-11</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>Bidder 6</td>
                  <td>$15,000</td>
                  <td>2024-11-11</td>
                  <td>Pending</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* File Upload */}
          <div className="file-upload-container">
            <input
              type="file"
              className="file-input"
              onChange={handleFileUpload}
            />
          </div>

          {/* File Download */}
          <div className="file-download-container">
            <button
              onClick={handleFileDownload}
              className="download-button"
            >
              Download Master Bid List
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
