import React, { useState } from 'react';
import { motion } from 'framer-motion'; // For animations
import './master.css'; // Add custom CSS for styling if necessary

function MasterBidList() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
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
      className="master-bid-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="master-bid-list-heading">Master Bid List</h1>

      {/* Sample Master Bid List */}
      <div className="bid-list-content">
        <h2>Sample Master Bid List</h2>
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
  );
}

export default MasterBidList;
