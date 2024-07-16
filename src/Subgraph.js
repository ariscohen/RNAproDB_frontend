import React, { useState, useEffect } from 'react';
import './Subgraph.css';

function Subgraph({ setSubgraph, tooLarge }) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showGenerateButton, setShowGenerateButton] = useState(false);

  const handleSelectSubgraphClick = () => {
    setShowInput(!showInput);
    setInputValue("");
    setShowGenerateButton(!showGenerateButton);
  };

  const handleGenerateSubgraphClick = () => {
    let textBox = document.getElementById("subgraph-textbox");
    let newSubgraph = false;
    if (textBox) {
      newSubgraph = textBox.value;
    }
    setSubgraph(newSubgraph);
  };

  useEffect(() => {
    if (tooLarge) {
      document.getElementById('select-subgraph-button').click();
    }
  }, [tooLarge]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
    <button
        id="select-subgraph-button"
        className="button4"
        onClick={handleSelectSubgraphClick}
    >
        {showInput ? "Close subgraph selection" : "Select subgraph"}
    </button>

    {showGenerateButton &&
        <button
            id="generate-subgraph-button"
            className="button4"
            onClick={handleGenerateSubgraphClick}
        >
            Generate subgraph
        </button>
    }

    {showInput && <textarea
        id="subgraph-textbox"
        className="subgraph-textarea"
        placeholder="Click nodes or enter comma separated residues: chain:residueNumber:icode,chain:residueNumber:icode..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
    />}
</div>

  );
}

export default Subgraph;
