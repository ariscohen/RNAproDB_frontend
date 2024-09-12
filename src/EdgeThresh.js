import React, { useState } from 'react';
import './EdgeThresh.css';

const EdgeThresholdSlider = () => {
  const [edgeThreshold, setEdgeThreshold] = useState(15);

  function handleEdgeSliderChange(event) {
    const newValue = event.target.value;
    console.log("Slider value:", newValue);
    setEdgeThreshold(newValue);
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
