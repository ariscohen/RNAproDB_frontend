import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TitleContext from './TitleContext';
import $ from 'jquery';

function NewPythonGraph({ dimensions, subgraph, algorithm, setSS, setChainsObject, setTooLarge, tooLarge, setRotationMatrix, setInitialGraphData }) {
  const [data, setData] = useState(null);
  const { pdbid } = useParams();
  const { setTitle } = useContext(TitleContext);
  const [tooLargeMessage, setTooLargeMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        let response = null;
        const IP = `localhost`;
        if (!subgraph) {
          response = await fetch(`http://${IP}:8000/rnaprodb/run-script?pdbid=${pdbid}&algorithm=${algorithm}`);
        } else {
          response = await fetch(`http://${IP}:8000/rnaprodb/run-script?pdbid=${pdbid}&subgraph=${subgraph}&algorithm=${algorithm}`);
        } 
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
  }, [pdbid, setTitle, subgraph, algorithm]);

  useEffect(() => {
    if (data && data.output) {
      if (data.tooLarge) {
        setTooLarge(true);
        setTooLargeMessage("The graph is too large to be displayed. Please select a subgraph.");
      } else {
        setTooLarge(false);
        setTooLargeMessage("");
      }
      setTitle(data.protein_name || "Missing PDB ID");
      if (data.output.ss) {
        setSS(data.output.ss);
      }
      if (data.output.chainsList) {
        setChainsObject(data.output.chainsList);
      }
      if (data.output.rotationMatrix) {
        setRotationMatrix(data.output.rotationMatrix);
      }

      const initGraphData = data.output;
      if (!initGraphData) {
        setInitialGraphData(initGraphData);
      }

      if (!data.tooLarge) {
        if (window.static_d3graphscript) {
          window.static_d3graphscript({
            width: dimensions.width * 1.1,
            height: 700,
            graph: data.output,
            collision: 0.5,
            charge: -10,
            directed: true
          });
        } else {
          const loadD3 = () => {
            const script = document.createElement('script');
            script.src = '/STATIC_FRONTEND_d3graphscript.js';
            script.async = true;

            script.addEventListener('load', () => {
              window.static_d3graphscript({
                width: dimensions.width * 1.1,
                height: 700,
                graph: data.output,
                collision: 0.5,
                charge: -10,
                directed: true
              });
            });

            document.body.appendChild(script);
          };

          loadD3();
        }
      }
    }
  }, [data, dimensions, setTitle, setSS, setChainsObject, setRotationMatrix, setInitialGraphData]);

  if (tooLarge) {
    return <span>{tooLargeMessage}</span>;
  }

  return null;
}

export default NewPythonGraph;
