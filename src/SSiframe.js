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

    return (
      <div className="graph_container">
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
