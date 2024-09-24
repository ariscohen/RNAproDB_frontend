import React, { useState, useEffect } from 'react';
import './EdgeThresh.css';

const EdgeThresholdSlider = ({resetThreshold}) => {
  const [edgeThreshold, setEdgeThreshold] = useState(15);
  const [isReset, setIsReset] = useState(false);

  // This is the function that will be called when the prop changes
  const handleReset = () => {
    setIsReset(true);
    setEdgeThreshold(15);
    // Your specific function logic here
  };

  // Use useEffect to watch for changes in the prop and call the function
  useEffect(() => {
      handleReset();
  }, [resetThreshold]); // Call handleFunction whenever triggerFunction changes

  
// break into setting it and not setting it!
  function handleEdgeSliderChange(event) {
    const newValue = event.target.value;
    setEdgeThreshold(newValue);

    // consider the hide protein checkbox
    const checkbox = document.getElementById('toggleProteinCheckbox');
    const isChecked = checkbox.checked;
    if(isChecked){
      window.toggleProteinVisibility();
      checkbox.checked = !checkbox.checked;
    }

    if (isReset) {
      setIsReset(false); // Reset the flag after the first update
      return;
    }

    window.filterEdges(newValue);
    // Implement any functionality that depends on the slider's value
}

  return (
    <div className="edge-threshold-container">
      <span className="edge-threshold-label">Edge threshold:</span>
      <input
        type="range"
        className="edge-slider"
        min="0"
        max="15"
        value={edgeThreshold}
        onChange={handleEdgeSliderChange}
      />
      <span className="edge-threshold-value">{edgeThreshold}</span>
    </div>
  );
};

export default EdgeThresholdSlider;
