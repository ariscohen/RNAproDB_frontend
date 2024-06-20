import React from 'react';
import './DownloadButtons.css';

const DownloadButtons = ({ downloadGraphHandler, handleFlipX, handleFlipY, handleRotationSliderChange }) => {
  return (
    <div className="download-buttons">
      <div className="dropdown">
        <button>Flip</button>
        <div className="dropdown-content">
          <button onClick={() => window.handleFlipX()}>Flip by X-axis</button>
          <button onClick={() => window.handleFlipY()}>Flip by Y-axis</button>
        </div>
      </div>
      <div className="dropdown">
        <button>Download</button>
        <div className="dropdown-content">
          <button onClick={() => downloadGraphHandler('svg')}>Download SVG</button>
          <button onClick={() => downloadGraphHandler('png')}>Download PNG</button>
        </div>
      </div>
      <div className="slider-container">
        <label>Graph Rotation:</label>
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
  );
};

export default DownloadButtons;
