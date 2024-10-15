import React, { useRef, useEffect } from 'react';  
import { useParams } from 'react-router-dom';

function SSiframe({ ss }) {
    const iframeRef = useRef(null);

    const handleIframeLoad = () => {
        const message = {
            type: "SS_DATA",
            payload: ss
        };
        iframeRef.current.contentWindow.postMessage(message, "*");
    };

 // Add event listeners to prevent page scrolling
 useEffect(() => {
  const graphElement = document.getElementById('ss_graph_container');

  const preventDefault = (e) => e.preventDefault();

  if (graphElement) {
    // Disable touchmove and wheel events on the graph
    graphElement.addEventListener('touchmove', preventDefault, { passive: false });
    graphElement.addEventListener('wheel', preventDefault, { passive: false });
  }

  return () => {
    if (graphElement) {
      // Cleanup event listeners when component unmounts
      graphElement.removeEventListener('touchmove', preventDefault);
      graphElement.removeEventListener('wheel', preventDefault);
    }
  };
}, []);

    return (
      <div className="graph_container" id="ss_graph_container">
        <iframe 
          ref={iframeRef}
          className="responsive-iframe" 
          src={`/ss_viewer.html`}
          title="Embedded HTML"
          width="100%"
          height="1000"
          scrolling="no"
          onLoad={handleIframeLoad}  // Added this to detect iframe load completion
        ></iframe>
      </div>
    );
}

export default SSiframe;
