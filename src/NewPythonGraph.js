import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TitleContext from './TitleContext';
import $ from 'jquery';

function NewPythonGraph({ dimensions, subgraph, setSS, setChainsObject, setTooLarge, tooLarge, setRotationMatrix }) {
  const [data, setData] = useState(null);
  const { pdbid } = useParams();
  const { setTitle } = useContext(TitleContext);
  const [tooLargeMessage, setTooLargeMessage] = useState(''); // Added state for too large message

  useEffect(() => {
    async function fetchData() {
      try {
        // console.log(`subgraph is ${subgraph}`)
        let response = null;
        //const response = await fetch(`http://10.136.114.14:8000/rnaprodb/run-script?pdbid=${pdbid}`);
        // const response = await fetch(`http://10.136.113.92:8000/rnaprodb/run-script?pdbid=${pdbid}`);
        var IP = `localhost`
        if (!subgraph){
          response = await fetch(`http://`+IP+`:8000/rnaprodb/run-script?pdbid=${pdbid}`);
        }
        else{
          response = await fetch(`http://`+IP+`:8000/rnaprodb/run-script?pdbid=${pdbid}&subgraph=${subgraph}`);
        }
        // Check if the response has content and if it's JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const result = await response.json();
    
          if (response.ok) {
            setData(result);
          } else {
            console.error("Error fetching data:", result.message);
          }
        } else {
          console.error("Oops, we haven't got JSON!");
        }
      } catch (error) {
        console.error("Network error:", error.message);
      }
    }

    fetchData();
  }, [pdbid, setTitle, subgraph]); // Add pdbid to the dependency array

  // Call your desired function with the fetched data
  // data is everything, data.output is the nodes/edges, data.title is the paper title
  useEffect(() => {
    if (data && data.output) {
            // CHECK IF TOO LARGE HERE!
      if(data.tooLarge){
        setTooLarge(true);
        setTooLargeMessage("The graph is too large to be displayed. Please select a subgraph."); // Set message when graph is too large
      }
      else{
        setTooLarge(false);
        setTooLargeMessage(""); // Clear message when graph is not too large
      }
      setTitle(data.protein_name || "Missing PDB ID");
      if(data.output.ss){ // set secondary structure from JSON output
        setSS(data.output.ss);
      }
      if(data.output.chainsList){
        setChainsObject(data.output.chainsList);
      }
      if(data.output.rotationMatrix){
        setRotationMatrix(data.output.rotationMatrix);
      }

      
      // If script is not loaded, should be loaded regardless. Just don't call d3graphscript!

      // If structure is not too large, load it immediately!
      if(!data.tooLarge){
        // Check if the d3graphscript is already loaded or not
        if (window.static_d3graphscript) {
          window.static_d3graphscript({
            width: dimensions.width*1.1,
            height: 700,
            graph: data.output,
            collision: 0.5,
            charge: -10,
            directed: true
          });
        } else {
          // Load D3 graph script
          const loadD3 = () => {
            const script = document.createElement('script');
            script.src = '/STATIC_FRONTEND_d3graphscript.js';  // Update this path as necessary
            script.async = true;

            script.addEventListener('load', () => {
              window.static_d3graphscript({
                width: dimensions.width*1.1,
                height: 700,
                graph: data.output,
                collision: 0.1,
                // charge: -10,
                directed: true
              });
            });

            document.body.appendChild(script);
          };

          loadD3();
        }
      }
      
    }
  }, [data, dimensions, setTitle, setSS, setChainsObject, setRotationMatrix]);

    // Render the tooLargeMessage if it's set
    if (tooLarge) {
      return <span>{tooLargeMessage}</span>;
    }
}

export default NewPythonGraph;
