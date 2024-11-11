import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaDownload, FaSignOutAlt, FaRegFileAlt, FaRegListAlt, FaRegFile, FaRegMoneyBillAlt, FaRegBuilding, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Added edit and delete icons
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth to access logout function
import './Advise.css'; // Update your CSS
import logo from './UBA-logo-removebg-preview.png'; // Update with your logo path

const AdvisoryLimits = () => {
  const { logout } = useAuth(); // Get the logout function from context
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [file, setFile] = useState(null); // File to upload
  const [uploadedFileName, setUploadedFileName] = useState(''); // Show file name after upload
  const [data, setData] = useState([
    { id: 1, name: "Bidder 1", limit: "$1,000,000", status: "Approved" },
    { id: 2, name: "Bidder 2", limit: "$500,000", status: "Pending" },
    { id: 3, name: "Bidder 3", limit: "$750,000", status: "Approved" },
    { id: 4, name: "Bidder 4", limit: "$1,500,000", status: "Rejected" },
    { id: 5, name: "Bidder 5", limit: "$200,000", status: "Pending" },
    { id: 6, name: "Bidder 6", limit: "$1,000,000", status: "Approved" }
  ]); // State to store the data

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setUploadedFileName(uploadedFile.name); // Display the file name
  };

  // Handle file download
  const handleFileDownload = () => {
    // Convert the array to CSV format
    const advisoryData = data.map(item => [item.name, item.limit, item.status]);
    const csvContent = "data:text/csv;charset=utf-8," + ["Bidder Name", "Advisory Limit", "Status"].concat(advisoryData).map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);

    // Create a temporary link to download the file
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "advisory_limits.csv");
    link.click();
  };

  // Handle Logout
  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate('/'); // Redirect to login page after logout
  };

  // Handle Edit
  const handleEdit = (id) => {
    const newData = data.map(item => 
      item.id === id ? { ...item, name: prompt("Enter new name", item.name), limit: prompt("Enter new limit", item.limit), status: prompt("Enter new status", item.status) } : item
    );
    setData(newData); // Update the data state
  };

  // Handle Delete
  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData); // Update the data state after deleting the row
  };

  return (
    <motion.div
      className="advisory-limits-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sidebar */}
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
            <li><Link to="/advisory-limits"><FaRegListAlt className="sidebar-icon" />&nbsp;&nbsp;Advisory Limits</Link></li>
            <li><Link to="/consideration-bid-list"><FaRegFile className="sidebar-icon" />&nbsp;&nbsp;Consideration Bid List</Link></li>
            <li><Link to="/wholesale-cid-list"><FaRegMoneyBillAlt className="sidebar-icon" />&nbsp;&nbsp;Wholesale CID List</Link></li>
            <li><Link to="/cbn-retail-bid"> <FaRegBuilding className="sidebar-icon" />&nbsp;&nbsp;CBN Retail Bid</Link></li>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <li><Link to="/profile"><FaRegFileAlt className="sidebar-icon" />&nbsp;&nbsp;Profile</Link></li>
            <button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /> Logout</button> {/* Logout button */}
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
        <h1>Advisory Bid Limits</h1>

        {/* Advisory Limits Table */}
        <table className="advisory-limits-table">
          <thead>
            <tr>
              <th>Bidder Name</th>
              <th>Advisory Limit</th>
              <th>Status</th>
              <th>Actions</th> {/* Actions Column for Edit and Delete */}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.limit}</td>
                <td>{item.status}</td>
                <td>
                  <FaEdit 
                    className="edit-icon" 
                    onClick={() => handleEdit(item.id)} 
                    title="Edit"
                  />
                  <FaTrashAlt 
                    className="delete-icon" 
                    onClick={() => handleDelete(item.id)} 
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
<div className='half'>
  
        {/* Upload Button */}
        <div className="upload-container">
          <input
            type="file"
            id="upload-file"
            className="file-input"
            onChange={handleFileUpload}
          />
          <label htmlFor="upload-file" className="upload-btn">
            <FaUpload /> Upload Advisory Limit File
          </label>
          {uploadedFileName && <p>Uploaded File: {uploadedFileName}</p>}
        </div>

        {/* Download Button */}
        <div className="download-container">
          <button
            className="download-btn"
            onClick={handleFileDownload}
          >
            <FaDownload /> Download Advisory Limits (CSV)
          </button>
        </div>
</div>
      </motion.div>
    </motion.div>
  );
};

export default AdvisoryLimits;
