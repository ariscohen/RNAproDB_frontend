import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TitleContext from './TitleContext';
import './Electrostatics.css';

function Electrostatics() {
    const location = useLocation();
    const pdbid = location.pathname.split('/')[2];
    const { title } = useContext(TitleContext);
    const iframeRef = useRef(null);

    const [hasAll, setHasAll] = useState(false);
    const [hasProtein, setHasProtein] = useState(false);
    const [hasNA, setHasNA] = useState(false);
    const [hasRunElectrostatics, setHasRunElectrostatics] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        // Helper function to check if a file exists
        const checkFileExists = async (url) => {
            try {
                const response = await fetch(url, { method: 'HEAD' });
                return response.status === 200;
            } catch (error) {
                console.error('Error checking file:', error);
                return false;
            }
        };

        // URLs for the files to check
        const allUrl = `/electrostatics/full_${pdbid}.ply`;
        const proteinUrl = `/electrostatics/pro_${pdbid}.ply`;
        const naUrl = `/electrostatics/na_${pdbid}.ply`;
        const ipUrl = `/electrostatics/ip_${pdbid}.txt`;

        // Check each file and set the corresponding state
        const checkFiles = async () => {
            const allExists = await checkFileExists(allUrl);
            const proteinExists = await checkFileExists(proteinUrl);
            const naExists = await checkFileExists(naUrl);
            const ipExists = await checkFileExists(ipUrl);

            setHasAll(allExists);
            setHasProtein(proteinExists);
            setHasNA(naExists);
            setHasRunElectrostatics(ipExists);
        };

        // Run the file checks on page load
        checkFiles();
    }, [pdbid]);

    // State to manage the dropdown selection
    const [selectedOption, setSelectedOption] = useState('all'); // maybe remove if does not exist

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

    const runElectrostaticsScript = async (pdbid) => {
        try {
          const response = await fetch(`/rnaprodb-backend/rnaprodb/run-electrostatics?pdbid=${pdbid}`);
          if (!response.ok) {
            throw new Error('Failed to run electrostatics script');
          }
          const result = await response.json();
          console.log('Script ran successfully:', result);
          // You can add more handling here if needed
        } catch (error) {
          console.error('Error:', error.message);
          alert('There was an error running the script');
        }
        finally{
            setHasRunElectrostatics(true);
            setShowMessage(true);
        }
      };

    // Function to handle downloading the current PLY file
    const handleDownloadPLY = () => {
        let filename;
        if (selectedOption === 'all') {
            filename = `full_${pdbid}.ply`;
        } else if (selectedOption === 'protein') {
            filename = `pro_${pdbid}.ply`;
        } else if (selectedOption === 'nucleicAcid') {
            filename = `na_${pdbid}.ply`;
        }

        if (filename) {
            const link = document.createElement('a');
            link.href = `/electrostatics/${filename}`;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="electro-div">
          <h5>Electrostatics</h5>
          <div style={{ marginTop: '0px', marginBottom: '5px' }}>
            <strong>Translate:</strong> drag + left click &nbsp;
            <strong>Zoom:</strong> scroll &nbsp;
            <strong>Select component:</strong>
            {/* Dropdown to toggle between states */}
            {hasAll || hasProtein || hasNA ? (
              <select
                value={selectedOption}
                onChange={handleDropdownChange}
                className='electroSelect'
              >
                {hasAll && <option value="all">All (protein and NA)</option>}
                {hasProtein && <option value="protein">Protein only</option>}
                {hasNA && <option value="nucleicAcid">Nucleic Acid only</option>}
              </select>
            ) : (
              <span style={{ marginLeft: '20px' }}>No components available</span>
            )}
          </div>
          {(hasAll || hasProtein || hasNA) && (
            <div>
            {/* Download current PLY file if one is being shown and is available*/}
            <button className="button4" onClick={handleDownloadPLY}>Download</button>
            </div>
            )}


            {(hasAll || hasProtein || hasNA) && (
            <iframe
                ref={iframeRef}
                src={`${process.env.PUBLIC_URL}/babylon.html`}
                title="Electrostatics Graph"
                width="100%"
                className="electrostatics-iframe"
                onLoad={iframeLoadHandler}
            ></iframe>
            )}


{(hasAll || hasProtein || hasNA) && (
            <div>
          <img 
            src='/rnaprodb/electrostatics_bar.svg' 
            style={{ 
                maxHeight: '100px', 
                height: 'auto', 
                width: 'auto', 
                display: 'block', 
                margin: 'auto' 
            }} 
            alt="Electrostatics Bar"
            />
            </div>
            )}


        {(!(hasAll || hasProtein || hasNA) && pdbid.length > 7 && !hasRunElectrostatics) && (
        <div>
            <button className="run-el-btn" onClick={() => runElectrostaticsScript(pdbid)}>
            Run Electrostatics
            </button>
        </div>
        )}
        {showMessage && (
            <div>
                Your structure is now running. Please check back by reloading/bookmarking the page in about 15 minutes.
            </div>
        )
        }

            {hasRunElectrostatics && !showMessage && (
            <div>
                Electrostatics is currently running. Please check back by reloading the page in about 15 minutes.
            </div>
        )}

        </div>
      );
}

export default Electrostatics;
