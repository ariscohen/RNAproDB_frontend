import React from 'react';
import SearchBar from '../SearchBar';
import './Search.css';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


//Slider functionalities

function ResolutionSlider() {

  function valuetext(value) {
    return `${value} Angstroms`;
  }

  const [value, setValue] = React.useState([0, 10]);

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
      label: '5 Å',
    },  
    {
      value: 10,
      label: '10 Å',
    },
  ];

  const minDistance = 1.5;

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
        max={10}
        step={0.5}
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

//Button functionalities
const buttons = [
  <Button key="xray">X-ray</Button>,
  <Button key="em">EM</Button>,
  <Button key="nmr">NMR</Button>,
];


//Search bar functionality

function SearchTextField() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Filter by authors or specific term"
        inputProps={{ 'aria-label': 'filter by authors or specific term' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}


export default function Search() {
  return (
    <div className = 'content'>
      <h1>Search Page</h1>
      {/* Add your search functionality here */}
      <SearchBar />
    </div>
  );
}