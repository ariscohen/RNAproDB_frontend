import React, { useState, useEffect } from 'react';
import './GraphOps.css';

const GraphOps = ({ subgraph }) => {
    // Slider value state (initially set to zero)
    const [rotation, setRotation] = useState(0);

    // on load, the graph should be reset to zero
    useEffect(() => {
        setRotation(0);
        if (typeof window.rotateGraph === 'function') {
            window.rotateGraph(0);
        }
    }, [subgraph]);

    // Handle slider change
    const handleSliderChange = (event) => {
        const newRotation = parseInt(event.target.value, 10);
        setRotation(newRotation);
        if (typeof window.rotateGraph === 'function') {
            window.rotateGraph(newRotation);
        }
    };

    // Handle reflect button clicks
    const handleReflectX = () => {
        if (typeof window.reflectGraph === 'function') {
            window.reflectGraph('x');
            setRotation(0);
        }
    };

    const handleReflectY = () => {
        if (typeof window.reflectGraph === 'function') {
            window.reflectGraph('y');
            setRotation(0);
        }
    };

    return (
        <>
            <label htmlFor="rotation-slider">Rotate Graph:</label>
            <input
                id="rotation-slider"
                type="range"
                min="0"
                max="360"
                value={rotation}
                onChange={handleSliderChange}
            />
            <span>{rotation}°</span>
            <div className="reflect-buttons">
                <button className="reflect-button" onClick={handleReflectY}>Reflect X</button>
                <button className="reflect-button" onClick={handleReflectX}>Reflect Y</button>
            </div>
        </>
    );
};

export default GraphOps;