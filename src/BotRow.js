// src/TopRow.js
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import './BotRow.css'; // You can create a separate CSS file for this component

function BotRow() {
  const location = useLocation();
  const pdbid = location.pathname.split('/')[1];  // Split the pathname and get the second segment

  //console.log("pdbid is: ");
  //console.log(pdbid);

  return (
    <div className="bot-row">
      {/* Render the pdbid value if available, otherwise render a default text */}
      <h1>The Rohs Lab @ University of Southern California</h1>
    </div>
  );
}

export default BotRow;
