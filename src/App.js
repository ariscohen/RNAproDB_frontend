import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import TopRow from './TopRow';
import NGLViewer from './NGLViewer';
import PythonGraph from './PythonGraph';
import SeqViewer from './Seqview';
function App() {
  return (
    <div>
      <TopRow />
      <div className="container">
        <div className="column">
          <SeqViewer />
          <h1>3D Structure</h1>
          <NGLViewer />
        </div>
        <div className="column">
            <img src="/legend.svg" alt="Nature" class="responsive_img"/>
          <h1>Graph Visualization</h1>
          <PythonGraph />
        </div>
      </div>
    </div>
  );
}

export default App;
