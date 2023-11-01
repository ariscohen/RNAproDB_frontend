import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TitleContext from './TitleContext';

function NewPythonGraph({ dimensions, subgraph, setSS, setChainsObject }) {
  const [data, setData] = useState(null);
  const { pdbid } = useParams();
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    async function fetchData() {
      try {
        // console.log(`subgraph is ${subgraph}`)
        let response = null;
        //const response = await fetch(`http://10.136.114.14:8000/rnaprodb/run-script?pdbid=${pdbid}`);
        // const response = await fetch(`http://10.136.113.92:8000/rnaprodb/run-script?pdbid=${pdbid}`);
        if (!subgraph){
          console.log("In here!");
          response = await fetch(`http://localhost:8000/rnaprodb/run-script?pdbid=${pdbid}`);
        }
        else{
          response = await fetch(`http://localhost:8000/rnaprodb/run-script?pdbid=${pdbid}&subgraph=${subgraph}`);
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
      setTitle(data.protein_name || "Missing PDB ID");
      if(data.output.ss){ // set secondary structure from JSON output
        setSS(data.output.ss);
      }
      if(data.output.chainsList){
        console.log(data.output.chainsList);
        setChainsObject(data.output.chainsList);
      }
      // Check if the d3graphscript is already loaded or not
      if (window.d3graphscript) {
        window.d3graphscript({
          width: dimensions.width*1.1,
          height: dimensions.height*1.2,
          graph: data.output,
          collision: 0.5,
          charge: -800,
          directed: true
        });
      } else {
        // Load D3 graph script
        const loadD3 = () => {
          const script = document.createElement('script');
          script.src = '/FRONTEND_d3graphscript.js';  // Update this path as necessary
          script.async = true;

          script.addEventListener('load', () => {
            window.d3graphscript({
              width: dimensions.width*1.1,
              height: dimensions.height*1.2,
              graph: data.output,
              collision: 0.5,
              charge: -800,
              directed: true
            });
          });

          document.body.appendChild(script);
        };

        loadD3();
      }
    }
  }, [data, dimensions, setTitle, setSS, setChainsObject]);

  return;
}

export default NewPythonGraph;