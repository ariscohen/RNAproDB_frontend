// src/NGLViewer.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function NGLViewer() {
    let { pdbid } = useParams();
    useEffect(() => { //loads scripts async
    const loadNGL = () => {
      const script1 = document.createElement('script');
      script1.src = '/ngl.js';
      script1.async = true;

      const script2 = document.createElement('script');
      script2.src = '/ngl_viewer_functions_nm.js';
      script2.async = true;

      script1.addEventListener('load', () => {
        script2.addEventListener('load', () => {
          loadStructure(`/cifs/${pdbid}-assembly1.cif`);
        });
        document.body.appendChild(script2);
      });

      document.body.appendChild(script1);
    };

    loadNGL();
  }, [pdbid]);

  return <div id="viewport" style={{ width: '100%', height: '700px' }}></div>;
}

export default NGLViewer;
