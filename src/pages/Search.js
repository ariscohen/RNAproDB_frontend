import React, { useEffect, useState } from 'react';

import './Search.css';

import QueryOutput from '../queryOutputs';

import Box from '@mui/material/Box';

import Slider from '@mui/material/Slider';

import Button from '@mui/material/Button';

import ButtonGroup from '@mui/material/ButtonGroup';

import Paper from '@mui/material/Paper';

import InputBase from '@mui/material/InputBase';

// import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';

import FormGroup from '@mui/material/FormGroup';

import ToggleButton from '@mui/material/ToggleButton';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import '../queryOutputs.css';


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

  const [selectedModalities, setSelectedModalities] = React.useState([]);


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

          <label key={modality} className="search-checkbox">
          <input
            type="checkbox"

              checked={selectedModalities.includes(modality)}

              onChange={handleToggle(modality)}

              name={modality}

            />
          <span>{modality}</span>
          </label>
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

  const [selectedNucleicAcids, setSelectedNucleicAcids] = React.useState([]);

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

<label key={type} className="search-checkbox">
<input
  type="checkbox"

              checked={selectedNucleicAcids.includes(type)}

              onChange={handleToggle(type)}

              name={type}

            />
            <span>{type}</span>
            </label>

      ))}

    </FormGroup>

  );

}




function AND_OR_ToggleButton( { updateSearchParams } ) {

  const [selected, setSelected] = React.useState('and');


  const handleChange = (event, newSelected) => {

    console.log('New conditional value:', newSelected);

    setSelected(newSelected);

    updateSearchParams({ conditional: newSelected });

  };


  return (

    <ToggleButtonGroup

      color="primary"

      value={selected}

      exclusive

      onChange={handleChange}

      aria-label="Conditional"

    >

      <ToggleButton value="and">AND</ToggleButton>

      <ToggleButton value="or">OR</ToggleButton>

    </ToggleButtonGroup>

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

  conditional: '',

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

  } catch (error) {

    setIsError(true);

    console.log('Error:', error.message);

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

          <div className= 'NASelectorGroup'>

              <p><b>Molecule Type</b></p>

              <AND_OR_ToggleButton updateSearchParams={updateSearchParams} />

          </div>

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

<button type="button" class="p-paginator-first p-paginator-element p-link p-disabled" disabled="" aria-label="First Page" data-pc-section="firstpagebutton"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon p-paginator-icon" aria-hidden="true" data-pc-section="firstpageicon"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.71602 11.164C5.80782 11.2021 5.9063 11.2215 6.00569 11.221C6.20216 11.2301 6.39427 11.1612 6.54025 11.0294C6.68191 10.8875 6.76148 10.6953 6.76148 10.4948C6.76148 10.2943 6.68191 10.1021 6.54025 9.96024L3.51441 6.9344L6.54025 3.90855C6.624 3.76126 6.65587 3.59011 6.63076 3.42254C6.60564 3.25498 6.525 3.10069 6.40175 2.98442C6.2785 2.86815 6.11978 2.79662 5.95104 2.7813C5.78229 2.76598 5.61329 2.80776 5.47112 2.89994L1.97123 6.39983C1.82957 6.54167 1.75 6.73393 1.75 6.9344C1.75 7.13486 1.82957 7.32712 1.97123 7.46896L5.47112 10.9991C5.54096 11.0698 5.62422 11.1259 5.71602 11.164ZM11.0488 10.9689C11.1775 11.1156 11.3585 11.2061 11.5531 11.221C11.7477 11.2061 11.9288 11.1156 12.0574 10.9689C12.1815 10.8302 12.25 10.6506 12.25 10.4645C12.25 10.2785 12.1815 10.0989 12.0574 9.96024L9.03158 6.93439L12.0574 3.90855C12.1248 3.76739 12.1468 3.60881 12.1204 3.45463C12.0939 3.30045 12.0203 3.15826 11.9097 3.04765C11.7991 2.93703 11.6569 2.86343 11.5027 2.83698C11.3486 2.81053 11.19 2.83252 11.0488 2.89994L7.51865 6.36957C7.37699 6.51141 7.29742 6.70367 7.29742 6.90414C7.29742 7.1046 7.37699 7.29686 7.51865 7.4387L11.0488 10.9689Z" fill="currentColor"></path></svg></button>