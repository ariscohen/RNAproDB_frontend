// src/NGLViewer.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './StructureInfo.css';

function StructureInfo() {
    let { pdbid } = useParams();
    useEffect(() => { //loads scripts async
  }, []);

  return <div id='structureInfoDiv'>Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. </div>;
}

export default StructureInfo;
