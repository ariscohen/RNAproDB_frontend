// src/NGLViewer.js
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './NGLViewer.css'

function NGLViewer(rotationMatrix, algorithm) {
    let { pdbid } = useParams();
    const lowercasePdbid = pdbid?.toLowerCase(); // Convert pdbid to lowercase if it exists

    const viewportRef = useRef(null);

    const [isCartoonVisible, setIsCartoonVisible] = useState(true);
    const [isWaterVisible, setIsWaterVisible] = useState(true);

    useEffect(() => { 
    const loadNGL = () => {
      const script1 = document.createElement('script');
      script1.src = '/rnaprodb/ngl.js';
      script1.async = true;

      const script2 = document.createElement('script');
      script2.src = '/rnaprodb/ngl_viewer_functions_nm.js';
      script2.async = true;

      script1.addEventListener('load', () => {
        script2.addEventListener('load', () => {
          // window.loadStructure(`/rnaprodb/cifs/${lowercasePdbid}-assembly1.cif`, {rotationMatrix, algorithm});
          window.loadStructure(`https://rohslab.usc.edu/rpdb_cifs/${lowercasePdbid}-assembly1.cif`, {rotationMatrix, algorithm});

        });
        document.body.appendChild(script2);
      });

      document.body.appendChild(script1);
    };

    loadNGL();
  }, [rotationMatrix, algorithm]);

     // Function to call the update_show_water function
     const handleToggleWater = () => {
      if (isWaterVisible) {
          window.update_show_water(false);
      } else {
          window.update_show_water(true);
      }
    setIsWaterVisible(prevState => !prevState);
  };

  // Function to call the update_show_cartoon function
  const handleToggleCartoon = () => {
      if (isCartoonVisible) {
          window.cartoonInvisible();
      }
      else if(!isCartoonVisible){
          window.cartoonVisible();
      } else {
          console.error("function not found");
      }
      setIsCartoonVisible(prevState => !prevState);
  };

  // Function to handle download as PNG
  const handleDownloadPNG = () => {
    if (viewportRef.current) {
      window.stage_nm1.makeImage({
        factor: 2, // Resolution factor
        antialias: true,
        trim: false,
        transparent: true
      }).then(function(blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${lowercasePdbid}_structure.png`;
        link.click();
      }).catch(function(e) {
        console.error('Image generation failed:', e);
      });
    }
  };

  return (
    <div>
      <h5>3D structure</h5>
      <button className="button4" id="toggle-water" onClick={handleToggleWater}>Toggle Solvent</button>
      <button className="button4" id="toggle-cartoon" onClick={handleToggleCartoon}>Toggle Cartoon</button>
      <button className="button4" id="download-png" onClick={handleDownloadPNG}>Download PNG</button>
      <div style={{ marginTop: '5px', marginBottom: '5px' }}>
        <strong>Rotate:</strong> drag + left click &nbsp;
        <strong>Translate:</strong> drag + right click &nbsp;
        <strong>Zoom:</strong> scroll
      </div>
      <div
        id="viewport"
        ref={viewportRef}
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
