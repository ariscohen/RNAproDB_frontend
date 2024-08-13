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
import TextField from '@mui/material/TextField';

// export function MolecularWeightRange(props) {
//   const [minWeight, setMinWeight] = useState(0);
//   const [maxWeight, setMaxWeight] = useState(100);

//   const handleMinWeightChange = (event) => {
//     const value = event.target.value;
//     setMinWeight(value);
//     if (props.onChange) {
//       props.onChange([value, maxWeight]);
//     }
//   };

//   const handleMaxWeightChange = (event) => {
//     const value = event.target.value;
//     setMaxWeight(value);
//     if (props.onChange) {
//       props.onChange([minWeight, value]);
//     }
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           id="min-weight"
//           label={`Minimum`}
//           value={minWeight}
//           onChange={handleMinWeightChange}
//           type="number"
//         />
//         <TextField
//           id="max-weight"
//           label={`Maximum`}
//           value={maxWeight}
//           onChange={handleMaxWeightChange}
//           type="number"
//         />
//       </div>
//     </Box>
//   );
// }


function MolecularWeightSlider(props) {
  const [value, setValue] = React.useState([0.01, 800]);

  const marks = [
    { value: 0, label: '0' },
    { value: 800, label: '800' },
  ];

  const minDistance = 2;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 800 - minDistance);
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
    <Box className="Slider-container" sx={{ width: 150 }}>
      <Slider
        getAriaLabel={() => 'Year range'}
        onChange={handleChange}
        value={value}
        track={false}
        marks={marks}
        valueLabelDisplay="on"
        min={0}
        max={800}
        step={1}
        disableSwap
      />
    </Box>
  );
}


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
    <Box className="Slider-container" sx={{ width: 150 }}>
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
    <Box className="Slider-container" sx={{ width: 150 }}>
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
    <Box className="Slider-container" sx={{ width: 150 }}>
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
    <FormGroup className="FormGroup">
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
      className="paper-style"
      onKeyDown={handleKeyDown}
    >
      <InputBase
        className="input-base-style"
        placeholder="Filter by authors or keyword"
        inputProps={{ 'aria-label': 'filter by authors or keyword' }}
        onChange={handleInputChange}
      />
    </Paper>
  );
}

function YearRangeSlider(props) {
  const [value, setValue] = React.useState([1989, 2024]);

  const marks = [
    { value: 1989, label: '1989' },
    { value: 2024, label: '2024' },
  ];

  const minDistance = 2;

  const handleChange = (event, newValue, activeThumb) => {
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
    <Box className="Slider-container" sx={{ width: 150 }}>
      <Slider
        getAriaLabel={() => 'Year range'}
        onChange={handleChange}
        value={value}
        track={false}
        marks={marks}
        valueLabelDisplay="on"
        min={1989}
        max={2024}
        step={1}
        disableSwap
      />
    </Box>
  );
}


function NucleicAcidSelector({ updateSearchParams }) {
  const [selectedNucleicAcids, setSelectedNucleicAcids] = React.useState(['DNA', 'RNA', 'Protein']);
  // const [selectedNucleicAcids, setSelectedNucleicAcids] = React.useState(['RNA (only)']);


  const handleToggle = (type) => (event) => {
    const newChecked = [...selectedNucleicAcids];
    if (event.target.checked) {
      newChecked.push(type);
    } else {
      const index = newChecked.indexOf(type);
      newChecked.splice(index, 1);
    }

    setSelectedNucleicAcids(newChecked);
    updateSearchParams({ nucleicAcidType: newChecked });
  };

  return (
    <FormGroup className="FormGroup">
      {['RNA', 'DNA', 'Protein'].map((type) => (
        <FormControlLabel
          key={type}
          control={
            <Checkbox
              checked={selectedNucleicAcids.includes(type)}
              onChange={handleToggle(type)}
              name={type}
            />
          }
          label={type}
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
  minYear: '',
  maxYear: '',
  nucleicAcidType: '',
  minWeight: '',
  maxWeight: '',
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
  const response = await fetch('/rnaprodb-backend/search/pypdb/', {
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

useEffect(() => {
  handleSearch();  // Call the search function to load initial data
}, []);  // Empty dependency array means this effect runs once after initial render

return (
  <div className='content'>
    <div className='search-container'>
      <h4 className='search_title'>Search</h4>
      <div className='SearchTextField'>
        <SearchTextField onSearchTermChange={(value) => updateSearchParams({ searchTerm: value })} onEnterPress={handleSearch} />
      </div>
      <Button className="ari-search-button" variant="contained" onClick={handleSearch}>Search</Button>
        <div className='NucleicAcidSelector'>
          <p><b>Nucleic Acid Type</b></p>
          <NucleicAcidSelector updateSearchParams={updateSearchParams}/>
        </div>

        <div className='ExperimentalModalitySelector'>
          <p><b>Experimental Modality</b></p>
          <ExperimentalModalitySelector updateSearchParams={updateSearchParams} />
        </div>

        <div className='ResolutionSlider'>
          <ResolutionSlider onChange={(value) => updateSearchParams({ 'minResolution': value[0], 'maxResolution': value[1] })} />
          <p><b>Resolution Range (Å)</b></p>
        </div>

        <div className='YearRangeSlider'>
          <YearRangeSlider onChange={(value) => updateSearchParams({'minYear': value[0], 'maxYear': value[1]})} />
          <p><b>Publication Year</b></p>
        </div>

        <div className='NASlider'>
          <NA_Slider onChange={(value) => updateSearchParams({'minNA': value[0], 'maxNA': value[1]})} />
          <p><b>Number of Nucleic Acid Polymers</b></p>
        </div>


        <div className='ProteinSlider'>
          <ProteinSlider onChange={(value) => updateSearchParams({'minProtein': value[0], 'maxProtein': value[1]})} />
          <p><b>Number of Protein Polymers</b></p>
        </div>

        <div className='MolecularWeightSlider'>
          <MolecularWeightSlider onChange={(value) => updateSearchParams({'minWeight': value[0], 'maxWeight': value[1]})} />
          <p><b>Molecular Weight (kDa)</b></p>
        </div>
    </div>

    <div className='QueryResults'>
      {hasSearched && (
        isLoading ? (
          <div className='loading-container'>
            <img src="/rnaprodb/loading2.gif" alt="Loading..." />
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