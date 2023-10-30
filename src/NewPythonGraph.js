import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TitleContext from './TitleContext';

function NewPythonGraph({ dimensions } ) {
  const [data, setData] = useState(null);
  const { pdbid } = useParams();
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    async function fetchData() {
      try {
        //const response = await fetch(`http://10.136.114.14:8000/rnaprodb/run-script?pdbid=${pdbid}`);
        // const response = await fetch(`http://10.136.113.92:8000/rnaprodb/run-script?pdbid=${pdbid}`);
        const response = await fetch(`http://localhost:8000/rnaprodb/run-script?pdbid=${pdbid}`);

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
  }, [pdbid, setTitle]); // Add pdbid to the dependency array

  // Call your desired function with the fetched data
  // data is everything, data.output is the nodes/edges, data.title is the paper title
  useEffect(() => {
    console.log("My data is", data);
    if (data && data.output && window.d3graphscript) {
      setTitle(data.protein_name || "Missing PDB ID");
      window.d3graphscript({
        width: dimensions.width*1.1, //temporary
        height: dimensions.height*1.2, //temporary
        graph: data.output,
        collision: 0.5,
        charge: -800,
        directed: true
    }); // Call d3graph script on what we fetched!
    }
  }, [data, dimensions, setTitle]);

  /*return (
    <div>
    </div>
  );*/
  return;
}

export default NewPythonGraph;
