import React, { useState, useEffect } from 'react';
import './Subgraph.css';


function Subgraph({setSubgraph, tooLarge}) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(""); // Step 1: New state for input value
  const [showGenerateButton, setShowGenerateButton] = useState(false); // New state

  // Update the button's onClick handler
  const handleSelectSubgraphClick = () => {
    setShowInput(!showInput); 
    setInputValue(""); // clear any input
    setShowGenerateButton(!showGenerateButton); // Toggle the visibility of the "Generate Subgraph" button
    // setInputValue(prevValue => prevValue + "Hi,"); // Step 2: Append "Hi," to the input value
  };

  const handleGenerateSubgraphClick = () => {
    let textBox = document.getElementById("subgraph-textbox");
    let newSubgraph = false;
    if (textBox) {  // Check if the textBox is not null
        newSubgraph = textBox.value;
    }
    setSubgraph(newSubgraph);
  };

  useEffect(() => {
    if (tooLarge) {
      // Directly trigger the click event using the underlying DOM event
      document.getElementById('select-subgraph-button').click();
    }
  }, [tooLarge]); // This will run only when `tooLarge` changes

  return (
    <div>
    <div>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Relax Graph </span>
              <label class="switch">
                <input id="forcefieldButton" type="checkbox" />
                <span class="slider round"></span>
              </label>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <span> Indicate H-Bonds </span>
              <label class="switch">
                <input id="toggleHBondsCheckbox" type="checkbox" onChange={window.toggleHBondEdgeColors} />
                <span class="slider round"></span>
              </label>
    </div>

    <div>  
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Flip X-axis </span>
      <label class="switch">
        <input id="flipXButton" type="checkbox" />
        <span class="slider round"></span>
      </label>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span> Flip Y-axis </span>
      <label class="switch">
        <input id="flipYButton" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>

    <div id="algorithmButton">
      <input type="radio" id="PCA" name="algorithm" value="PCA" defaultChecked/>
      <label for="PCA">PCA</label><br></br>
      <input type="radio" id="RNAScape" name="algorithm" value="RNAScape"/>
      <label for="RNAScape">RNAScape</label><br></br>
      <input type="radio" id="SecondaryStructure" name="algorithm" value="SecondaryStructure"/>
      <label for="SecondaryStructure">Secondary Structure</label>
    </div>

    <button 
        id="select-subgraph-button" 
        className="button4 button4"
        onClick={handleSelectSubgraphClick}
      >
        {showInput ? "Hide Subgraph" : "Select Subgraph"}
    </button>

      {/* Conditionally render the "Generate Subgraph" button */}
      {showGenerateButton && 
        <button 
          id="generate-subgraph-button" 
          className="button4 button4"
          style={{ marginLeft: '10px' }}  // Add some margin for spacing
          onClick={handleGenerateSubgraphClick}
        >
          Generate Subgraph
        </button>
      }
      {showInput && <textarea id="subgraph-textbox" type="text" style={{ width: '100%', marginTop: '10px' }}
        placeholder="Click nodes or enter comma separated residues: chain:residueNumber,chain:residueNumber..." value={inputValue} onChange={e => setInputValue(e.target.value)} />}
      </div>
  );
}

export default Subgraph;