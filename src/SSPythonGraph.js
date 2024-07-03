import React, { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import TitleContext from './TitleContext';
import './SSPythonGraph.css'; // Ensure this CSS is appropriate for styling the iframe if needed

function SSPythonGraph({ graphData }) { // Ensure props are correctly destructured
  const location = useLocation();
  const pdbid = location.pathname.split('/')[1];
  const { title } = useContext(TitleContext);
  const iframeRef = useRef(null);

  // Function to handle received messages
  const handleReceiveMessage = event => {
    // You may want to check the origin for security
    // if (event.origin !== 'http://expected-origin.com') return;

    if (event.data.action === 'updateTextarea') {
      const textBox = document.getElementById("subgraph-textbox");
      if (textBox) {
        textBox.value += event.data.content;
      }
    } else if (event.data.action === 'clickButton') {
      const textBox = document.getElementById("subgraph-textbox");
      if (textBox) { // do not need to click button, textbox exists
        return;
      }
      const button = document.getElementById("select-subgraph-button");
      if (button) {
        button.click();
      }
    }
  };

  // Add event listener for receiving messages
  useEffect(() => {
    window.addEventListener('message', handleReceiveMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', handleReceiveMessage);
    };
  }, []); // Empty dependency array ensures this runs only once after initial render

  // Function to send data to the iframe once it has loaded
  const iframeLoadHandler = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({
        type: 'graphData',
        graph: graphData  // Here you would pass the actual JSON data
      }, '*');  // Adjust the targetOrigin as necessary for security
    }
  };

  return (
    <div className="ss-graph-div">
      <h5>Secondary structure selector</h5>
      <iframe
        ref={iframeRef}
        src={`${process.env.PUBLIC_URL}/ssd3.html`}
        title="Secondary Structure Graph"
        width="100%"
        height="700"
        onLoad={iframeLoadHandler}
        style={{ border: '1px solid black' }}
      ></iframe>
    </div>
  );
}

export default SSPythonGraph;