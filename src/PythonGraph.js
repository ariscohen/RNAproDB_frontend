import React, { useEffect } from 'react';  // Import useEffect
import { useParams } from 'react-router-dom';

function PythonGraph() {
  let { pdbid } = useParams();

    return (
      <div className="graph_container">
        <iframe className="responsive-iframe" 
          src={`/${pdbid}.tmp.cif.html`}
          title="Embedded HTML"
          width="100%"
          height="1000"
          scrolling="no"
        ></iframe>
      </div>
    );
  }
export default PythonGraph;

