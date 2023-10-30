// src/NGLViewer.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './fornac.css';
import $ from 'jquery';

function SSViewer() {
    let { pdbid } = useParams();
    useEffect(() => { //loads scripts async
    const loadSS = () => {
        var container = new FornaContainer("#rna_ss", {'applyForce': false});

        var options = {'structure': '((..((....)).(((....))).))',
                       'sequence':             'CGCUUCAUAUAAUCCUAAUGACCUAU'};

        container.addRNA(options.structure, options);
    };

    loadSS();
  }, []);

  return <div id='rna_ss'> </div>;
}

export default SSViewer;
