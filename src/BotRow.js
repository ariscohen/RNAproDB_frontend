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
      <h1>RNAproDB is maintained by <a href="https://www.rohslab.org">The Rohs Lab</a> @ <a href="http://www.usc.edu">University of Southern California</a>. It is free to use by anyone, <b>including commercial users</b>.</h1>
    </div>
  );
}

export default BotRow;
