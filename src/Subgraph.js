import React, { useState } from 'react';
import './Subgraph.css';


function Subgraph() {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(""); // Step 1: New state for input value

  // Update the button's onClick handler
  const handleButtonClick = () => {
    setShowInput(true); 
    setInputValue(prevValue => prevValue + "Hi,"); // Step 2: Append "Hi," to the input value
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
        id="subgraph-button" 
        className="button4 button4"
        onClick={handleButtonClick}
      >
        Create Subgraph
      </button>
      {showInput && <input type="text" style={{ width: '100%', marginTop: '10px' }}
        placeholder="Click nodes or enter chain:#,chain:#,..." value={inputValue} onChange={e => setInputValue(e.target.value)} />}
      </div>
  );
}

export default Subgraph;