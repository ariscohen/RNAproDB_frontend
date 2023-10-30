import React, { useState } from 'react';
import './Subgraph.css';


function Subgraph({setSubgraph}) {
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

  return (
    <div>
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Freeze Graph </span>
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