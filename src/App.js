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
import Subgraph from './Subgraph'; // Import the new component at the top

import SeqViewer from './Seqview';
import SSViewer from './SSViewer';
import SSiframe from './SSiframe';

function App() {

  // gets the column width and height to pass into PythonGraph
  const columnRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [title, setTitle] = useState("");
  const [show2DGraph, setShow2DGraph] = useState(false);
  const [subgraph, setSubgraph] = useState(false);
  const [activeTab, setActiveTab] = useState('graph');

  useEffect(() => {
    if (columnRef.current) {
      setDimensions({
        width: columnRef.current.offsetWidth * .80,
        height: columnRef.current.offsetHeight * .60
      });

      // console.log(columnRef.current.offsetWidth, columnRef.current.offsetHeight)
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
            <h1>Visualization</h1>
            <div className="tabs">
                            <button 
                                className={activeTab === '2dgraph' ? 'active-tab' : ''}
                                onClick={() => setActiveTab('2dgraph')}
                            >
                                Interactive Explorer
                            </button>
                            <button 
                                className={activeTab === 'ssgraph' ? 'active-tab' : ''}
                                onClick={() => setActiveTab('ssgraph')}
                            >
                                Secondary Structure
                            </button>
            </div>


            <button onClick={() => setShow2DGraph(!show2DGraph)}>Toggle 2D Graph</button>
            {/* Set visibility based on show2DGraph */}
            <div style={{ display: show2DGraph ? 'block' : 'none' }}>
              <img src="/legend.svg" alt="Nature" class="responsive_img"/>
              <Subgraph setSubgraph={setSubgraph}/>
              <div id="right_column" onClick={window.reset_graph_colors}>
                <Routes>
                  <Route path="/:pdbid" element={<NewPythonGraph dimensions={dimensions} subgraph={subgraph} />} />
                </Routes>
              </div>
            </div>
            <div style={{ display: !show2DGraph ? 'block' : 'none' }}>
              <SSiframe />
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
