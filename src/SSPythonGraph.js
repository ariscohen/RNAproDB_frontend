import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TitleContext from './TitleContext';
import './SSPythonGraph.css';

function SSPythonGraph({ graphData }) {
  const location = useLocation();
  const pdbid = location.pathname.split('/')[1];
  const { title } = useContext(TitleContext);
  const iframeRef = useRef(null);

  // Function to handle received messages
  const handleReceiveMessage = event => {
    if (event.data.action === 'updateTextarea') {
      const textBox = document.getElementById("subgraph-textbox");
      if (textBox) {
        textBox.value += event.data.content;
      }
    } else if (event.data.action === 'clickButton') {
      const textBox = document.getElementById("subgraph-textbox");
      if (textBox) {
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
  }, []);

  // Function to send data to the iframe once it has loaded
  const iframeLoadHandler = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({
        type: 'graphData',
        graph: graphData
      }, '*');
    }
  };

  // Handle the download button click
  const handleDownloadClick = (format) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({
        type: 'downloadGraph',
        format: format
      }, '*');
    }
  };

  return (
    <div className="ss-graph-div">
      <h5>Secondary structure selector</h5>
      <div style={{ marginTop: '0px', marginBottom: '5px' }}>
        <strong>Translate:</strong> drag + left click &nbsp;
        <strong>Zoom:</strong> scroll &nbsp;
        <strong>Add to subgraph:</strong> left click &nbsp;
      </div>
      <button>Download</button>
      <div className="download-dropdown">
            <button onClick={() => handleDownloadClick('png')}>Download PNG</button>
            <button onClick={() => handleDownloadClick('svg')}>Download SVG</button>
      </div>
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