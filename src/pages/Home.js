import logo from '../logo.svg';
import '../App.css';
import '../seqview.css';
import '../pythongraph.css';
import '../NavBar.css';
import React, { useEffect, useState, useRef } from 'react';
import TopRow from '../TopRow';
import BotRow from '../BotRow';
import NGLViewer from '../NGLViewer';
import NewPythonGraph from '../NewPythonGraph';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import TitleContext from '../TitleContext';
import Subgraph from '../Subgraph'; // Import the new component at the top

import SeqViewer from '../Seqview';
import SSViewer from '../SSViewer';
import SSiframe from '../SSiframe';


export default function Home() {
    
  // gets the column width and height to pass into PythonGraph
  const columnRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [title, setTitle] = useState("");
  const [show2DGraph, setShow2DGraph] = useState(false);
  const [subgraph, setSubgraph] = useState(false);
  const [activeTab, setActiveTab] = useState('2dgraph');
  const [ss, setSS] = useState(false);
  const [chainsObject, setChainsObject] = useState(false);


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
            <>
            <TitleContext.Provider value={{ title, setTitle }}>
              <TopRow />
              <div className="container">
                <div className="column">
                  <h1>3D Structure</h1>
                    {chainsObject !== false && (
                        <SeqViewer chainsObject={chainsObject}/>
                            )}
                    <Routes>
                    {/* {ss !== false && (
                      <Route path="/:pdbid" element={<NGLViewer />} />
                    )} */}
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
                                    RNA Secondary Structure
                                </button>
                </div>
    
    
                {/* Set visibility based on show2DGraph */}
                <div style={{ display: activeTab === '2dgraph' ? 'block' : 'none' }}>
                  <img src="/legend.svg" alt="Nature" class="responsive_img"/>
                  <Subgraph setSubgraph={setSubgraph}/>
                  <div id="right_column" onClick={window.reset_graph_colors}>
                    <Routes>
                      <Route path="/:pdbid" element={<NewPythonGraph dimensions={dimensions} subgraph={subgraph} setSS ={setSS} setChainsObject = {setChainsObject}/>} />
                    </Routes>
                  </div>
                </div>
                {activeTab === 'ssgraph' && ss !== false && (
                                <div>
                                  <SSiframe ss={ss}/>
                                </div>
                            )}
              </div>
             </div>
            </TitleContext.Provider>
            </>
        </div>
      );
    }