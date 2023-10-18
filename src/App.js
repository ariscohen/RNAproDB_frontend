import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import TopRow from './TopRow';
import NGLViewer from './NGLViewer';
import PythonGraph from './PythonGraph';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SeqViewer from './Seqview';
function App() {
  return (
    <div>
      <Router>
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
        <div>
          {/* Other routes can be added here too */}
          <Routes>
            <Route path="/:pdbid" element={<PythonGraph />} />
          </Routes>
        </div>
        </div>
      </div>
      </Router>
    </div>
  );
}

export default App;
