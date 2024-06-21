// src/NGLViewer.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function NGLViewer(rotationMatrix, algorithm) {
    let { pdbid } = useParams();
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

  return (
    <div>
      <h5>3D Visualization</h5>
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
