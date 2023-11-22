import logo from '../logo.svg';
import '../App.css';
import '../seqview.css';
import '../pythongraph.css';
import React, { useEffect, useState, useRef } from 'react';
import TopRow from '../TopRow';
import NGLViewer from '../NGLViewer';
import NewPythonGraph from '../NewPythonGraph';
import TitleContext from '../TitleContext';
import Subgraph from '../Subgraph'; // Import the new component at the top

import SeqViewer from '../Seqview';
import SSViewer from '../SSViewer';
import SSiframe from '../SSiframe';
import NewRnaView from '../NewRnaView';

function Home() {

  // gets the column width and height to pass into PythonGraph
  const columnRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [title, setTitle] = useState("");
  const [show2DGraph, setShow2DGraph] = useState(false);
  const [subgraph, setSubgraph] = useState(false);
  const [activeTab, setActiveTab] = useState('2dgraph');
  const [ss, setSS] = useState(false);
  const [chainsObject, setChainsObject] = useState(false);
  const [tooLarge, setTooLarge] = useState(false);
  const [rotationMatrix, setRotationMatrix] = useState(false);


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
          <TopRow />
          <div className="container">
            <div className="column">
              <h1>3D Structure</h1>
                {chainsObject !== false && (
                  <SeqViewer chainsObject={chainsObject} tooLarge={tooLarge} />
                  )}
                  {rotationMatrix !== false && (<NGLViewer rotationMatrix = {rotationMatrix} /> )}
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
                            <button 
                                className={activeTab === 'newRNAview' ? 'active-tab' : ''}
                                onClick={() => setActiveTab('newRNAview')}
                            >
                                New RNA View
                            </button>
            </div>


            {/* Set visibility based on show2DGraph */}
            <div style={{ display: activeTab === '2dgraph' ? 'block' : 'none' }}>
              <img src="/legend.svg" alt="Nature" className="responsive_img"/>
              <Subgraph tooLarge={tooLarge} setSubgraph={setSubgraph}/>
              <div id="right_column" onClick={window.reset_graph_colors}>
                  <NewPythonGraph setTooLarge = {setTooLarge} setRotationMatrix = {setRotationMatrix}
                  dimensions={dimensions} subgraph={subgraph} setSS ={setSS} setChainsObject = {setChainsObject} tooLarge={tooLarge}/>
              </div>
            </div>
            {activeTab === 'ssgraph' && ss !== false && (
                            <div>
                              <SSiframe ss={ss}/>
                            </div>
                        )}
            {activeTab === 'newRNAview' && (
                <div>
                    <NewRnaView />
                </div>
            )}
          </div>
        </div>
    </TitleContext.Provider>
    </div>
  );
}

export default Home;