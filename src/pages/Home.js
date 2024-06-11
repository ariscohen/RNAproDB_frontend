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
import DownloadGraph from '../DownloadGraph.js';
import HandleRotationChange from '../HandleRotationChange';

const Home = () => {
  const columnRef = useRef(null);
  const graphRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [title, setTitle] = useState("");
  const [subgraph, setSubgraph] = useState(false);
  const [activeTab, setActiveTab] = useState('2dgraph');
  const [ss, setSS] = useState(false);
  const [chainsObject, setChainsObject] = useState(false);
  const [tooLarge, setTooLarge] = useState(false);
  const [tooLarge3d, setTooLarge3d] = useState(false);
  const [rotationMatrix, setRotationMatrix] = useState(false);
  const [initialGraphData, setInitialGraphData] = useState(null);

  const [initialTranslate, setInitialTranslate] = useState([0, 0]);
  const [initialScale, setInitialScale] = useState(1);

  useEffect(() => {
    if (columnRef.current) {
      setDimensions({
        width: columnRef.current.offsetWidth * 0.80,
        height: columnRef.current.offsetHeight * 0.60
      });
    }
  }, [columnRef]);

  useEffect(() => {
    const checkSvgAndFit = () => {
      const svg = d3.select("#right_column").select("svg");

      if (!svg.node()) {
        setTimeout(checkSvgAndFit, 100);
        return;
      }

      zoomFit(0);
      document.getElementById('rotation_value').value = 0;
      document.getElementById('graph_rotation_slider').value = 0;
    };

    checkSvgAndFit();
  }, [dimensions]);

  const downloadGraphHandler = (format) => {
    DownloadGraph(format, graphRef, setInitialTranslate, setInitialScale);
  };

  const handleRotationSliderChange = (e) => {
    HandleRotationChange(e, initialTranslate, initialScale, dimensions);
  };

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
            {rotationMatrix !== false && tooLarge !== true && (
              <NGLViewer rotationMatrix={rotationMatrix} />
            )}
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

            <div style={{ display: activeTab === '2dgraph' ? 'block' : 'none' }} ref={graphRef}>
              <img src="/legend.svg" alt="Nature" className="responsive_img" />
              <Subgraph tooLarge={tooLarge} setSubgraph={setSubgraph} />
              <div id="right_column" onClick={window.reset_graph_colors}>
                <NewPythonGraph 
                  setTooLarge={setTooLarge} 
                  setRotationMatrix={setRotationMatrix}
                  dimensions={dimensions} 
                  subgraph={subgraph} 
                  setSS={setSS} 
                  setChainsObject={setChainsObject} 
                  tooLarge={tooLarge}
                  tooLarge3d={tooLarge3d} 
                  setTooLarge3d={setTooLarge3d}
                  setInitialGraphData={setInitialGraphData}
                />
              </div>
              <div className="download-buttons">
                <button onClick={() => downloadGraphHandler('svg')}>Download SVG</button>
                <button onClick={() => downloadGraphHandler('png')}>Download PNG</button>
              </div>
              <div className="slider-container">
                <label>Graph Rotation: </label>
                <input 
                  type="range" 
                  id="graph_rotation_slider" 
                  min="0" 
                  max="360" 
                  defaultValue="0"
                  onInput={handleRotationSliderChange} 
                />
                <input 
                  type="number" 
                  id="rotation_value" 
                  min="0" 
                  max="360" 
                  defaultValue="0"
                  onChange={handleRotationSliderChange} 
                />
              </div>
            </div>
            {activeTab === 'ssgraph' && ss !== false && (
              <div>
                <SSiframe ss={ss} />
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