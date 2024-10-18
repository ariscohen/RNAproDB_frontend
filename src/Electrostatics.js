import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TitleContext from './TitleContext';
import './Electrostatics.css';

function Electrostatics() {
    const location = useLocation();
    const pdbid = location.pathname.split('/')[2];
    const { title } = useContext(TitleContext);
    const iframeRef = useRef(null);
    
    // State to manage the dropdown selection
    const [selectedOption, setSelectedOption] = useState('all');

    // Function to handle dropdown change
    const handleDropdownChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        reloadIframe(value); // Reload the iframe with the new filename
    };

    // Function to reload the iframe with the appropriate filename
    const reloadIframe = (option) => {
        if (iframeRef.current) {
            let filename;
            if (option === 'all') {
                filename = `full_${pdbid}.ply`;
            } else if (option === 'protein') {
                filename = `pro_${pdbid}.ply`;
            } else if (option === 'nucleicAcid') {
                filename = `na_${pdbid}.ply`;
            }

            // Send the filename to the iframe
            iframeRef.current.contentWindow.postMessage({
                type: 'filename',
                filename: filename
            }, '*');
        }
    };

    // Function to handle received messages
    const handleReceiveMessage = (event) => {
        // Check the origin for security
        // if (event.origin !== 'http://your-expected-origin.com') return;

        if (event.data.action === 'updateTextarea') {
            console.log("Message received:", event.data);
        }
    };

    // Add event listener for receiving messages
    useEffect(() => {
        window.addEventListener('message', handleReceiveMessage);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('message', handleReceiveMessage);
        };
    }, []); // Empty dependency array ensures this runs only once after initial render

    // Function to send data to the iframe once it has loaded
    const iframeLoadHandler = () => {
        reloadIframe(selectedOption); // Reload with the current option
    };

    // Prevent page scroll when the mouse is over the iframe
    useEffect(() => {
        const preventScroll = (e) => {
            if (iframeRef.current && document.activeElement === iframeRef.current) {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', preventScroll, { passive: false });

        return () => {
            window.removeEventListener('wheel', preventScroll);
        };
    }, []);

    

    return (
        <div className="electro-div">
            <h5>Electrostatics</h5>
            <div style={{ marginTop: '0px', marginBottom: '5px' }}>
                <strong>Translate:</strong> drag + left click &nbsp;
                <strong>Zoom:</strong> scroll &nbsp;
                <strong>Select component:</strong>
                {/* Dropdown to toggle between states */}
                <select value={selectedOption} onChange={handleDropdownChange} style={{ marginLeft: '20px' }}>
                    <option value="all">All (protein and NA)</option>
                    <option value="protein">Protein only</option>
                    <option value="nucleicAcid">Nucleic Acid only</option>
                </select>
            </div>
            <iframe
                ref={iframeRef}
                src={`${process.env.PUBLIC_URL}/babylon.html`}
                title="Electrostatics Graph"
                width="100%"
                height="700"
                onLoad={iframeLoadHandler}
                style={{ border: '1px solid black' }}
            ></iframe>
        </div>
    );
}

export default Electrostatics;