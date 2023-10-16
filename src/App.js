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
          <p>Your text goes here. Make sure it's large and modern, and it will wrap as needed.</p>
          <NGLViewer />
        </div>
        <div className="column">
          <h1>Graph Visualization</h1>
          <p>More text for the right side. You can customize the content as needed.</p>
          <PythonGraph />
        </div>
      </div>
    </div>
  );
}

export default App;
