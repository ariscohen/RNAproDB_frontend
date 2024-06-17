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
import DownloadButtons from '../DownloadButtons';
import DownloadGraph from '../DownloadGraph.js';
import HandleRotationChange from '../HandleRotationChange';

import basePairingLegend from '../lw_base_pairing_legend.svg'; // Import the image

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
  const [algorithm, setAlgorithm] = useState('PCA');
  const [showDropdown, setShowDropdown] = useState(false);

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

      // zoomFit(0);
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

  const handleAlgorithmSelect = (selectedAlgorithm) => {
    setAlgorithm(selectedAlgorithm);
    setShowDropdown(false);
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
            <div style={{ display: activeTab === '2dgraph' ? 'block' : 'none' }} ref={graphRef}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
                  <div>
                    <span>Relax Graph </span>
                    <label className="switch">
                      <input id="forcefieldButton" type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                    <span style={{ marginLeft: '20px' }}>Indicate H-Bonds </span>
                    <label className="switch">
                      <input id="toggleHBondsCheckbox" type="checkbox" onChange={window.toggleHBondEdgeColors} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="dropdown">
                    <button onClick={() => setShowDropdown(!showDropdown)} className="dropdown-button">
                      Algorithm: {algorithm}
                    </button>
                    {showDropdown && (
                      <div className="dropdown-content">
                        <div onClick={() => handleAlgorithmSelect('PCA')}>PCA</div>
                        <div onClick={() => handleAlgorithmSelect('RNAScape')}>RNAScape</div>
                        <div onClick={() => handleAlgorithmSelect('Secondary Structure')}>Secondary Structure</div>
                      </div>
                    )}
                  </div>
                </div>
                <Subgraph tooLarge={tooLarge} setSubgraph={setSubgraph} />
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
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
                  <div style={{ marginLeft: '20px', textAlign: 'center' }}>
                    <img src={basePairingLegend} alt="Base Pairing Legend" className="base-pairing-legend" style={{ height: '400px' }} />
                    <div style={{ marginTop: '10px', fontSize: '16px' }}>
                      <div><b>c</b>: cis</div>
                      <div><b>t</b>: trans</div>
                      <div><b>W</b>: Watson-Crick</div>
                      <div><b>H</b>: Hoogsteen</div>
                      <div><b>S</b>: Sugar</div>
                    </div>
                  </div>
                </div>
              </div>
              <DownloadButtons
                downloadGraphHandler={downloadGraphHandler}
                handleRotationSliderChange={handleRotationSliderChange}
              />
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
