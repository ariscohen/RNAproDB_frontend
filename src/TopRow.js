// src/TopRow.js
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import './TopRow.css'; // You can create a separate CSS file for this component
import TitleContext from './TitleContext';

function TopRow() {
  const location = useLocation();
  const pdbid = location.pathname.split('/')[2];  // Split the pathname and get the second segment
  const { title } = useContext(TitleContext);

  // console.log("pdbid is: ");
  // console.log(pdbid);

  return (
    <div className="top-row">
      {/* Render the pdbid value if available, otherwise render a default text */}
     <span><h2>{pdbid ? pdbid : "Missing PDB ID"}{/*<span id="titleSpan">: {title}</span>*/}</h2></span>
      
    </div>
  );
}

export default TopRow;
