import React, { useState } from 'react';
import './Search.css';
import QueryOutput from '../queryOutputs';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';



//Slider functionalities

function ResolutionSlider() {

  function valuetext(value) {
    return `${value} Angstroms`;
  }

  const [value, setValue] = React.useState([0, 5]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    {
      value: 0,
      label: '0 Å',
    },
    {
      value: 5,
      label: '>= 5 Å',
    },
  ];

  const minDistance = 0.2;

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Resolution range'}
        onChange={handleChange2}
        value={value}
        getAriaValueText={valuetext}
        track={false}
        marks={marks}
        valueLabelDisplay="on"
        min={0}
        max={5}
        step={0.2}
        disableSwap
      />
    </Box>
  );
}

function NA_Slider() {

  function valuetext(value) {
    return `${value} NAs`;
  }

  const [value, setValue] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 100,
      label: '100+',
    },
  ];

  const minDistance = 2;

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Resolution range'}
        onChange={handleChange2}
        value={value}
        getAriaValueText={valuetext}
        track={false}
        marks={marks}
        valueLabelDisplay="on"
        min={1}
        max={100}
        step={1}
        disableSwap
      />
    </Box>
  );
}

function ProteinSlider() {
  function valuetext(value) {
    return `${value} Proteins`;
  }

  const [value, setValue] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 100,
      label: '100+',
    },
  ];

  const minDistance = 2;

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Resolution range'}
        onChange={handleChange2}
        value={value}
        getAriaValueText={valuetext}
        track={false}
        marks={marks}
        valueLabelDisplay="on"
        min={1}
        max={100}
        step={1}
        disableSwap
      />
    </Box>
  );
}



//Search bar functionality

function SearchTextField( {onSearchTermChange, onEnterPress}) {
  const handleInputChange = (event) => {
    onSearchTermChange(event.target.value); // Update the searchTerm state in parent
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onEnterPress(); // Call handleSearch when Enter is pressed
    }
  };
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      onKeyDown={handleKeyDown}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Filter by authors or keyword"
        inputProps={{ 'aria-label': 'filters by authors or keyword' }}
        onChange={handleInputChange}
      />
      {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton> */}
    </Paper>
  );
}



export default function Search() {

  //Query Output
const [jsonData, setJsonData] = useState([]);
const [searchParams, setSearchParams] = useState({
  searchTerm: '',
  minResolution: '',
  maxResolution: '',
  minNA: '',
  maxNA: '',
  minProtein: '',
  maxProtein: '',
  experimentalModality: '',
  // Add other parameters as needed
});

const handleExperimentalModalityChange = (modality) => {
  setSearchParams({ ...searchParams, experimentalModality: modality });
};

const updateSearchParams = (key, value) => {
  setSearchParams({ ...searchParams, [key]: value });
};

const handleSearch = async () => {
  const response = await fetch('http://localhost:8000/search/pypdb/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchParams),
  });

  const data = await response.json();
  setJsonData(data);
  // Process your data here
};


// const fetchData = () => {
//   fetch('http://localhost:8000/search/pypdb/') // Replace with your Django URL
//     .then(response => response.json())
//     .then(data => setJsonData(data))
//     .catch(error => console.error('Error fetching data:', error));
// };

return (
  <div className='content'>
    <h1 className='search_title'>Advanced Search</h1>
    <div className='SearchTextField'>
      <SearchTextField onSearchTermChange={(value) => updateSearchParams('searchTerm', value)} onEnterPress={handleSearch} />
    </div>
    <div className='horizontal_container'>
      <div className='ResolutionSlider'>
        <ResolutionSlider onChange={(value) => updateSearchParams('minResolution', value[0], 'maxResolution', value[1])} />
        <p><b> Resolution Range (Å) </b></p>
      </div>
      <div className='NASlider'>
        <NA_Slider onChange={(value) => updateSearchParams('minNA', value[0], 'maxNA', value[1])} />
        <p><b> Number of Nucleic Acid Polymers </b></p>
      </div>
      <div className='ProteinSlider'>
        <ProteinSlider onChange={(value) => updateSearchParams('minProtein', value[0], 'maxProtein', value[1])} />
        <p><b> Number of Protein Polymers </b></p>
      </div>
      {/* Include other sliders here */}
      <div className='ExperimentalModalitySelector'>
        <ButtonGroup size="large" aria-label="large button group" onClick={handleExperimentalModalityChange}>
          <Button key="xray">X-ray</Button>
          <Button key="em">EM</Button>
          <Button key="nmr">NMR</Button>
        </ButtonGroup>
        <p><b> Experimental Modality </b></p>
      </div>
    </div>
    <div className='QueryResults'>
      <Button variant="contained" onClick={handleSearch}>Search</Button>
      <h1 className='results_title'> Results </h1>
      <QueryOutput data={jsonData} />
    </div>
  </div>
  );
}