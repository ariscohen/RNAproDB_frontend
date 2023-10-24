import logo from './logo.svg';
import './App.css';
import './seqview.css';
import './pythongraph.css';
import React, { useEffect, useState, useRef } from 'react';
import TopRow from './TopRow';
import BotRow from './BotRow';
import NGLViewer from './NGLViewer';
import NewPythonGraph from './NewPythonGraph';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import SeqViewer from './Seqview';
function App() {

  // gets the column width and height to pass into PythonGraph
  const columnRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (columnRef.current) {
      setDimensions({
        width: columnRef.current.offsetWidth * .80,
        height: columnRef.current.offsetHeight * .60
      });

      console.log(columnRef.current.offsetWidth, columnRef.current.offsetHeight)
    }
  }, [columnRef]);


  return (
    <div>
      <Router>
      <TopRow />
      <div className="container">
        <div className="column">
          <h1>3D Structure</h1>
          <SeqViewer />
            <Routes>
                  <Route path="/:pdbid" element={<NGLViewer />} />
            </Routes>
        </div>
        <div className="column" ref={columnRef} id="right_column_top">
          <h1>Interactive explorer</h1>
            <img src="/legend.svg" alt="Nature" class="responsive_img"/>
           <span> Freeze Graph </span>
            <label class="switch">
              <input id="forcefieldButton" type="checkbox" />
              <span class="slider round"></span>
             </label>
                {/* Other routes can be added here too */}
                <div id="right_column">
                <Routes>
                  <Route path="/:pdbid" element={<NewPythonGraph dimensions={dimensions} />} />
                </Routes>
                </div>
          </div>
      </div>
        <BotRow />
      </Router>
    </div>
  );
}

export default App;
