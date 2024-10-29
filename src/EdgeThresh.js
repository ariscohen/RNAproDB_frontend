import React, { useState, useEffect } from 'react';
import './EdgeThresh.css';

const EdgeThresholdSlider = ({resetThreshold, showProtein}) => {
  const [edgeThreshold, setEdgeThreshold] = useState(8);
  const [isReset, setIsReset] = useState(false);

   // This is the function that will be called when the prop changes
   const handleReset = () => {
    console.log("IS RESET!");
    setIsReset(true);
    setEdgeThreshold(8);
    callHandleEdgeSliderChange(8);
  };

  // if hide/show protein, may need to reset the threshold!
  useEffect(() => {
    console.log("Use effect for resetThreshold!");
    if(showProtein){
      handleReset();
    }else{
      setEdgeThreshold(0);
    }
  }, [showProtein]);

  const callHandleEdgeSliderChange = (value) => {
    console.log("callHandleEdgeSliderChange!");

    // Function to wait until window.filterEdges is available
    const waitForFilterEdges = () => {
      if (typeof window.filterEdges === 'function') {
        // When available, call the function with the value
        window.filterEdges(value);
      } else {
        // Retry every 100ms until window.filterEdges is available
        setTimeout(waitForFilterEdges, 100);
      }
    };

    waitForFilterEdges();
  };

  function handleEdgeSliderChange(event) {
    console.log("handleEdgeSliderChange!");
    const newValue = event.target.value;
    setEdgeThreshold(newValue);

    // Consider the hide protein checkbox
    const checkbox = document.getElementById('toggleProteinCheckbox');
    const isChecked = checkbox && checkbox.checked;
    if (isChecked) {
      window.toggleProteinVisibility();
      checkbox.checked = !checkbox.checked;
    }

    if (isReset) {
      setIsReset(false); // Reset the flag after the first update
      return;
    }

    callHandleEdgeSliderChange(newValue);
  }

  return (
    <span className="edge-threshold-container">
      <span className="edge-threshold-label">Edge threshold:</span>
      <input
        type="range"
        className="edge-slider"
        min="0"
        max="15"
        value={edgeThreshold}
        onChange={handleEdgeSliderChange}
      />
      <span className="edge-threshold-value">{edgeThreshold} Å</span>
    </span>
  );
};

export default EdgeThresholdSlider;
