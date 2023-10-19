// src/TopRow.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import './TopRow.css'; // You can create a separate CSS file for this component

function TopRow() {
  const location = useLocation();
  const pdbid = location.pathname.split('/')[1];  // Split the pathname and get the second segment

  console.log("pdbid is: ");
  console.log(pdbid);

  return (
    <div className="top-row">
      {/* Render the pdbid value if available, otherwise render a default text */}
      <h1>{pdbid ? pdbid : "Missing PDB ID"}</h1>
    </div>
  );
}

export default TopRow;