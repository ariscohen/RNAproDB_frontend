import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TitleContext from './TitleContext';

function NewRnaView() {
    let { pdbid } = useParams();
    const imagePath = `${process.env.PUBLIC_URL}/rnaview/${pdbid}.png`;
    console.log("NewRNAVIEW");
    console.log(imagePath);
    return (
        <div>
          {/* Display the image only if pdbid is present */}
          {pdbid && (
            <img src={imagePath} alt={`Structure for ${pdbid}`} />
          )}
        </div>
      );
    }
    
    export default NewRnaView;
    