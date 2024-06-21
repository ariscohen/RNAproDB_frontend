// src/NGLViewer.js
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NGLViewer.css'

function NGLViewer(rotationMatrix, algorithm) {
    let { pdbid } = useParams();

  // Handle outside click for dropdown
  //useEffect(() => {
  //  function handleClickOutside(event) {
  //    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //      setShowDropdown(false);
  //    }
  //  }

   // document.addEventListener("mousedown", handleClickOutside);
   // return () => {
   //   document.removeEventListener("mousedown", handleClickOutside);
   // };
  //}, []);

    const [isCartoonVisible, setIsCartoonVisible] = useState(true);
    const [isWaterVisible, setIsWaterVisible] = useState(true);
    // Define the function to handle the button click

    useEffect(() => { 
    const loadNGL = () => {
      const script1 = document.createElement('script');
      script1.src = '/ngl.js';
      script1.async = true;

      const script2 = document.createElement('script');
      script2.src = '/ngl_viewer_functions_nm.js';
      script2.async = true;

      script1.addEventListener('load', () => {
        script2.addEventListener('load', () => {
          loadStructure(`/cifs/${pdbid}-assembly1.cif`, {rotationMatrix, algorithm});
        });
        document.body.appendChild(script2);
      });

      document.body.appendChild(script1);
    };

    loadNGL();
  }, [rotationMatrix, algorithm]); // CHECK WHETHER THIS DEPENDENCY IS NEEDEED

     // Function to call the update_show_water function
     const handleToggleWater = () => {
      if (isWaterVisible) {
          window.update_show_water(false);
      } else {
          window.update_show_water(true);
      }
    setIsWaterVisible(prevState => !prevState);
  };

       // Function to call the update_show_water function
       const handleToggleCartoon = () => {
        if (isCartoonVisible) {
            window.cartoonInvisible();}
        else if(!isCartoonVisible){
            window.cartoonVisible();
        } else {
            console.error("function not found");
        }
        setIsCartoonVisible(prevState => !prevState);
    };

  return (
    <div>
      <h5>3D Visualization</h5>
      <button className="button4" id="toggle-water" onClick={handleToggleWater}>Toggle Solvent</button>
      <button className="button4" id="toggle-cartoon" onClick={handleToggleCartoon}>Toggle Cartoon</button>
      <div
        id="viewport"
        style={{
          width: '100%',
          height: '700px',
          borderTop: '2px solid black',
          borderLeft: '2px solid black',
          borderRight: '1px solid black',
          borderBottom: '1px solid black'
        }}
      ></div>
    </div>
  );
}

export default NGLViewer;
