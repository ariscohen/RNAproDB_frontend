import React, { useEffect, useState } from 'react';
import './Search.css';
import QueryOutput from '../queryOutputs';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';


//Slider functionalities

function ResolutionSlider(props) {

  function valuetext(value) {
    return `${value} Angstroms`;
  }

  const [value, setValue] = React.useState([0.1, 5]);


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

  const minDistance = 0.1;

  const handleChange = (event, newValue, activeThumb) => {
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

    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Resolution range'}
        onChange={handleChange}
        value={value}
        getAriaValueText={valuetext}
        track={false}
        marks={marks}
        valueLabelDisplay="on"
        min={0}
        max={5}
        step={0.1}
        disableSwap
      />
    </Box>
  );
}

function NA_Slider(props) {

  function valuetext(value) {
    return `${value} NAs`;
  }

  const [value, setValue] = React.useState([0, 100]);

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

  const handleChange = (event, newValue, activeThumb) => {
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

    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Resolution range'}
        onChange={handleChange}
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

function ProteinSlider(props) {
  function valuetext(value) {
    return `${value} Proteins`;
  }

  const [value, setValue] = React.useState([0, 100]);


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

  const handleChange = (event, newValue, activeThumb) => {
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

    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Resolution range'}
        onChange={handleChange}
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

function ExperimentalModalitySelector({ updateSearchParams }) {
  const [selectedModalities, setSelectedModalities] = React.useState(['X-ray', 'EM', 'NMR', 'Neutron', 'Multiple methods', 'Other']);

  const handleToggle = (modality) => (event) => {
    const newChecked = [...selectedModalities];
    if (event.target.checked) {
      newChecked.push(modality);
    } else {
      const index = newChecked.indexOf(modality);
      newChecked.splice(index, 1);
    }

    setSelectedModalities(newChecked);
    updateSearchParams({ experimentalModality: newChecked });
  };

  return (
    <FormGroup>
      {['X-ray', 'EM', 'NMR', 'Neutron', 'Multiple methods', 'Other'].map((modality) => (
        <FormControlLabel
          key={modality}
          control={
            <Checkbox
              checked={selectedModalities.includes(modality)}
              onChange={handleToggle(modality)}
              name={modality}
            />
          }
          label={modality}
        />
      ))}
    </FormGroup>
  );
}


//Search bar functionality

function SearchTextField( {onSearchTermChange, onEnterPress}) {
  const handleInputChange = (event) => {
    onSearchTermChange(event.target.value); 
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

function YearRangeSelector({ updateSearchParams }) {
  const [value, setValue] = React.useState([1990, 2024]);

  const marks = [
    {
      value: 1976,
      label: '1976',
    },
    {
      value: 2024,
      label: '2024',
    },
  ];

  const minDistance = 2;

  const handleInputChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 2024 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }

    if (props.onChange) {
      props.onChange(newValue);
    }
  };

    return (
      <Box sx={{ width: 300 }}>
        <Slider
        getAriaLabel={() => 'Year range'}
        onChange={handleInputChange}
        value={value}
        track={false}
        marks={marks}
        valueLabelDisplay="on"
        min={1976}
        max={2024}
        step={1}
        disableSwap
        />
      </Box>
    )
  };

   function NucleicAcidSelector() {
    const [selectedModalities, setSelectedModalities] = React.useState(['DNA', 'RNA', 'NA Hybrid']);

    const handleToggle = (modality) => (event) => {
      const newChecked = [...selectedModalities];
      if (event.target.checked) {
        newChecked.push(modality);
      } else {
        const index = newChecked.indexOf(modality);
        newChecked.splice(index, 1);
      }
  
      setSelectedModalities(newChecked);
      updateSearchParams({ nucleicAcidType: newChecked });
    };
      
      return (
        <FormGroup>
        {['RNA', 'DNA', 'NA Hybrid'].map((modality) => (
          <FormControlLabel
            key={modality}
            control={
              <Checkbox
                checked={selectedModalities.includes(modality)}
                onChange={handleToggle(modality)}
                name={modality}
              />
            }
            label={modality}
          />
        ))}
      </FormGroup>
    );
  }



export default function Search() {

  //Query Output
const [jsonData, setJsonData] = useState([]);
const [isError, setIsError] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [hasSearched, setHasSearched] = useState(false);
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

useEffect(() => {
  console.log('Search Parameters:', searchParams);
}, [searchParams]);


const updateSearchParams = (newParams) => {
  setSearchParams({ ...searchParams, ...newParams });
};

const handleSearch = async () => {
  setIsError(false);
  setIsLoading(true);
  setHasSearched(true);
  let data;
  try {
  const response = await fetch('http://localhost:8000/search/pypdb/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchParams),
  });

  if (!response.ok) {
    const errorMessage = data.error || 'No results found';
    throw new Error(errorMessage);
  }

  data = await response.json();
  setJsonData(data);
  // Process your data here
  } catch (error) {
    setIsError(true);
    console.log('Error fetching data:', error.message);
  }
  setIsLoading(false);
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
    <SearchTextField onSearchTermChange={(value) => updateSearchParams({ searchTerm: value })} onEnterPress={handleSearch} />
    </div>
    <div className='horizontal_container'>
      <div className='NucleicAcidSelector'>
        <NucleicAcidSelector updateSearchParams={updateSearchParams}/>
        <p><b> Nucleic Acid Type </b></p>
      </div>

      <div className='ResolutionSlider'>
        <ResolutionSlider onChange={(value) => updateSearchParams({ 'minResolution': value[0], 'maxResolution': value[1] })} />
        <p><b> Resolution Range (Å) </b></p>
      </div>

      <div className='NASlider'>
        <NA_Slider onChange={(value) => updateSearchParams({'minNA': value[0], 'maxNA': value[1]})} />
        <p><b> Number of Nucleic Acid Polymers </b></p>
      </div>

      <div className='ExperimentalModalitySelector'>
        <ExperimentalModalitySelector updateSearchParams={updateSearchParams} />
        <p><b> Experimental Modality </b></p>
      </div>

    </div>

    <div className='horizontal_container_2'>

      <div className='ProteinSlider'>
        <ProteinSlider onChange={(value) => updateSearchParams({'minProtein': value[0], 'maxProtein': value[1]})} />
        <p><b> Number of Protein Polymers </b></p>
      </div>

      <div className='YearRangeSelector'>
        <YearRangeSelector updateSearchParams={updateSearchParams} />
        <p><b> Publication Year </b></p>
      </div>

    </div>

    <Button variant="contained" onClick={handleSearch}>Search</Button>
  <div className='QueryResults'>
    {hasSearched && ( // Render only if a search has been performed
      isLoading ? (
        <div className='loading-container'>
          <img src="/loading2.gif" alt="Loading..." />
        </div>
      ) : isError ? (
        <p>Error occurred while fetching data.</p>
      ) : (
        <QueryOutput data={jsonData} />
      )
    )}
  </div>
</div>
  );
}