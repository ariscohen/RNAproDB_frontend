import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import TopRow from './TopRow';
import NGLViewer from './NGLViewer';
import PythonGraph from './PythonGraph';

function App() {
  return (
    <div>
      <TopRow />
      <div className="container">
        <div className="column">
          <h1>3D Structure</h1>
          <NGLViewer />
        </div>
        <div className="column">
          <h1>Graph Visualization</h1>
          <PythonGraph />
        </div>
      </div>
    </div>
  );
}

export default App;
