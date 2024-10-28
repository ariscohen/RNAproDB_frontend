// Home.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import '../seqview.css';
import '../pythongraph.css';
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
import basePairingLegend from '../lw_base_pairing_legend.svg'; // Import the imag
import ZoomFit from '../ZoomFit';
import SSPythonGraph from '../SSPythonGraph.js';
import StructureInfo from '../StructureInfo.js';
import Table from "../Table.js";
import EdgeThresholdSlider from '../EdgeThresh.js';
import Electrostatics from '../Electrostatics.js';
import GraphOps from '../GraphOps.js';

const Home = () => {
  const { pdbid, urlAlgorithm } = useParams();
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFirst, setIsFirst] = useState(true);

  const [tableData, setTableData] = useState({});

  const [graphData, setGraphData] = useState(null); // DATA FOR SS PYTHON GRAPH

  const checkboxRef = useRef(null); // for the toggle tertiary checkbox

  const algorithm = urlAlgorithm || 'pca'; // get algorithm from link
  const [algorithmText, setAlgorithmText] = useState(false);

  const [triggerThreshReset, setTriggerThreshReset] = useState(false);
  const [showProtein, setShowProtein] = useState(true);


  // if checkbox toggled, call the tertiary edges stuff
  useEffect(() => {
    if (algorithm === "SecondaryStructure") {
      // Initially uncheck the checkbox and call the function
      if (checkboxRef.current) {
        console.log("Calling tertiary useEffect");
        checkboxRef.current.checked = false; // Set checkbox to unchecked
        window.toggleTertiaryEdges(true); // Call the function as if the box is unchecked
      }
    }
  }, [algorithm]);

  useEffect(() => {
    if (columnRef.current) {
      setDimensions({
        width: columnRef.current.offsetWidth,
        height: columnRef.current.offsetHeight
      });
    }
  }, [columnRef]);

  useEffect(() => {
    const checkSvgAndFit = () => {
      const svg = window.d3.select("#right_column").select("svg");

      if (!svg.node()) {
        setTimeout(checkSvgAndFit, 100);
        return;
      }

      // Ensure ZoomFit is called with correct parameters
      // ZoomFit(0, setInitialTranslate, setInitialScale);
      //document.getElementById('rotation_value').value = 0;
      //document.getElementById('graph_rotation_slider').value = 0;
    };

    checkSvgAndFit();
  }, [dimensions]);

  const downloadGraphHandler = (format) => {
    DownloadGraph(format, graphRef, pdbid, algorithm, setInitialTranslate, setInitialScale);
  };

  const handleRotationSliderChange = (e) => {
    HandleRotationChange(e, initialTranslate, initialScale, dimensions);
  };

  const handleAlgorithmSelect = (selectedAlgorithm) => {
    // don't redirect if algorithm is the same
    if(selectedAlgorithm === algorithm){
      return;
    }
    window.location = `${window.location.origin}/rnaprodb/${pdbid}/${selectedAlgorithm}`;
  };


  // reset threshold after hiding protein
  const handleProteinChange = (e) => {
    setShowProtein(!showProtein);
    window.toggleProteinVisibility();
  };

    // set algorithm text
    useEffect(() => {
      if (algorithm === 'pca'){
        setAlgorithmText("Projection");
      } else if (algorithm === 'viennarna'){
        setAlgorithmText("ViennaRNA");
      }else if (algorithm === "rnascape"){
        setAlgorithmText("RNAscape");
      }
    });

  return (
    <div className="App">
      <TitleContext.Provider value={{ title, setTitle }}>
        <div id="tooltip"></div>
        <div id="edgeTooltip"></div>
        <div className="whole_container">
        <div className="column" id="left_column_wrapper">
    <div className="left-col">
      {/* Structure Info - Takes up 30% */}
      {pdbid && pdbid.length < 7 && (
        <div className="structure-info" id="left_column_top">
          <h5>Structure Info</h5>
          <StructureInfo />
        </div>
      )}

      {/* Viewer Container - Takes up the remaining 70%, stacking Sequence and NGL viewers */}
      <div className="viewer-container">
        <h5>Sequence Viewer</h5>
        {chainsObject && (
          <div className="seq-viewer">
            <SeqViewer chainsObject={chainsObject} tooLarge={tooLarge} />
          </div>
        )}
        {rotationMatrix && !tooLarge && (
          <div className="ngl-viewer">
            <NGLViewer rotationMatrix={rotationMatrix} algorithm={algorithm} />
          </div>
        )}
      </div>
    </div>
  </div>
          <div className="column" ref={columnRef} id="right_column_top">
            <h5>Interface explorer</h5>
            <div style={{ display: activeTab === '2dgraph' ? 'block' : 'none', paddingTop: '0px' }} ref={graphRef}>
              <div className="row-top">
                <div>
                  <span>Relax graph </span>
                  <label className="switch">
                    <input id="forcefieldButton" type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                  <span style={{ marginLeft: '40px' }}>Indicate H-bonds </span>
                  <label className="switch">
                    <input id="toggleHBondsCheckbox" type="checkbox" defaultChecked={true} onChange={window.toggleHBondEdgeColors} />
                    <span className="slider round"></span>
                  </label>
                  {algorithm == "viennarna" && (
                    <React.Fragment>
                      <span style={{ marginLeft: '40px' }}>Indicate Tertiary Structure </span>
                      <label className="switch">
                        <input
                          id="toggleTertiaryCheckbox"
                          type="checkbox"
                          defaultChecked={true}
                          onChange={(e) => window.toggleTertiaryEdges(!e.target.checked)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </React.Fragment>
                  )}
                  <span style={{ marginLeft: '40px' }}>Hide protein </span>
                      <label className="switch">
                        <input
                          id="toggleProteinCheckbox"
                          type="checkbox"
                          value={showProtein}
                          defaultChecked={false}
                          onChange={handleProteinChange}
                        />
                        <span className="slider round"></span>
                      </label>
                </div>
                <DownloadButtons
                  downloadGraphHandler={downloadGraphHandler}
                  handleRotationSliderChange={handleRotationSliderChange}
                />
              </div>
              <div className="row-bottom">
                <div className="dropdown">
                  <button onClick={() => setShowDropdown(!showDropdown)} className="dropdown-button">
                    Algorithm: {algorithmText}
                  </button>
                  {showDropdown && (
                    <div className="dropdown-content">
                      {/* <div onClick={() => handleAlgorithmSelect('None')}>None</div> */}
                      <div onClick={() => handleAlgorithmSelect('pca')}>Projection</div>
                      <div onClick={() => handleAlgorithmSelect('rnascape')}>RNAscape</div>
                      <div onClick={() => handleAlgorithmSelect('viennarna')}>ViennaRNA</div>
                    </div>
                  )}
                </div>
                <div className="subgraph-container">
                  <Subgraph tooLarge={tooLarge} setSubgraph={setSubgraph} />
                </div>
                <EdgeThresholdSlider resetThreshold = {triggerThreshReset} showProtein={showProtein}></EdgeThresholdSlider>
              </div>
              <GraphOps subgraph = {subgraph}/>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '0px' }}>

                <div id="right_column" onClick={window.reset_graph_colors}>
                <div style={{ marginTop: '0px', marginBottom: '5px' }}>
                                <strong>Translate:</strong> drag + left click &nbsp;
                                <strong>Zoom:</strong> scroll &nbsp;
                                <strong>Show info:</strong> hover &nbsp;
                                <strong>Select:</strong> click (shift to multi-select) &nbsp;
                            </div>
                  <NewPythonGraph
                    pdbid={pdbid}
                    setGraphData={setGraphData}
                    setTooLarge={setTooLarge}
                    setRotationMatrix={setRotationMatrix}
                    dimensions={dimensions}
                    subgraph={subgraph}
                    algorithm={algorithm}
                    isFirst={isFirst}
                    setSS={setSS}
                    setChainsObject={setChainsObject}
                    tooLarge={tooLarge}
                    tooLarge3d={tooLarge3d}
                    setTooLarge3d={setTooLarge3d}
                    setInitialGraphData={setInitialGraphData}
                    setTableData={setTableData}
                    setTriggerThreshReset ={setTriggerThreshReset}
                    triggerThreshReset={triggerThreshReset}
                  />

                </div>
                <div id="legend_div" style={{ marginLeft: '20px', textAlign: 'center' }}>
                  <img src={basePairingLegend} alt="Base Pairing Legend" className="base-pairing-legend" style={{ height: '400px' }} />
                  <div style={{ marginTop: '10px', fontSize: '16px', textAlign: 'left' }}>
                    <div><b>c</b>: cis</div>
                    <div><b>t</b>: trans</div>
                    <div><b>W</b>: Watson-Crick</div>
                    <div><b>H</b>: Hoogsteen</div>
                    <div><b>S</b>: Sugar</div>
                  </div>
                </div>
              </div>
              <img src="/rnaprodb/legend.svg" alt="Legend" className="responsive_img" style={{ width: '100%', maxWidth: '800px', height: 'auto' }} />
            </div>
            {activeTab === 'ssgraph' && ss !== false && (
              <SSiframe ss={ss} />
            )}
            {activeTab === 'newRNAview' && (
              <NewRnaView />
            )}
          </div>
        </div>
        <div className='bottom_row'>
        {graphData && !tooLarge && (
          <div className="ss-instructions-div">
            <p>The <b>Secondary structure selector</b> is a coarse-grained visualization that shows broad secondary structure elements of the structure.</p>
            <p>It can be used to quickly find and visualize certain areas of the structure.</p>
            <p>Left clicking an element will open the subgraph view in <b>Interface explorer</b>, adding its corresponding nodes. Simply click <b>Generate subgraph</b> to then visualize these nodes and their neighbors.</p>
            <p>Multiple elements can be added to a subgraph by clicking additional elements one-by-one.</p>
            <p>Protein elements are shown to orient the user; however, they are not interactable. To view them in the subgraph, simply select the secondary structure element to which they are connected.</p>
            </div>
        )}

          {graphData && !tooLarge && (
            <div className="ss-python-graph">
              <SSPythonGraph graphData={graphData}/>
            </div>
          )}
          {rotationMatrix && (
            <div className="table-container">
              <Table data={tableData}/>
            </div>
          )}
        </div>
        <div>
          <Electrostatics />
        </div>
      </TitleContext.Provider>
    </div>
  );
}

export default Home;
