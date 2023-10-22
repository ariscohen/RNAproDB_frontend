import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function NewPythonGraph({ dimensions } ) {
  const [data, setData] = useState(null);
  const { pdbid } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8000/rnaprodb/run-script?pdbid=${pdbid}`);
        // Check if the response has content and if it's JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const result = await response.json();
    
          if (response.ok) {
            setData(result.output);
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
  }, [pdbid]); // Add pdbid to the dependency array

  // Call your desired function with the fetched data
  useEffect(() => {
    console.log("My data is", data);
    if (data && window.d3graphscript) {
      window.d3graphscript({
        width: dimensions.width,
        height: dimensions.height,
        graph: data,
        collision: 0.5,
        charge: -450,
        directed: true
    }); // Call d3graph script on what we fetched!
    }
  }, [data, dimensions]);

  /*return (
    <div>
    </div>
  );*/
  return;
}

export default NewPythonGraph;
