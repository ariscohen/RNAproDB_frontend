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
import TitleContext from './TitleContext';

import SeqViewer from './Seqview';
function App() {

  // gets the column width and height to pass into PythonGraph
  const columnRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [title, setTitle] = useState("");

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
      <TitleContext.Provider value={{ title, setTitle }}>
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
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Freeze Graph </span>
              <label class="switch">
                <input id="forcefieldButton" type="checkbox" />
                <span class="slider round"></span>
              </label>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <span> Indicates H-Bonds </span>
              <label class="switch">
                <input id="toggleHBondsCheckbox" type="checkbox" onChange={window.toggleHBondEdgeColors} />
                <span class="slider round"></span>
              </label>
            <div id="right_column">
            <Routes>
              <Route path="/:pdbid" element={<NewPythonGraph dimensions={dimensions} />} />
            </Routes>
            </div>
              </div>
          </div>
            <BotRow />
        </Router>
    </TitleContext.Provider>
    </div>
  );
}

export default App;
