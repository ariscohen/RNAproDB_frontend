import React, { useState, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'; 
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const QueryOutput = ({ data, isError }) => {
  const showErrorMessage = isError || data.length === 0;
  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const count = Math.ceil(data.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getData = (data, page, itemsPerPage) => {
    return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  };

// for download dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyToClipboard = () => {
    const pdbIds = data.map(item => item.id).join(', ');
    navigator.clipboard.writeText(pdbIds);
    alert('PDB IDs copied to clipboard!');
  };

  const handleDownloadJson = () => {
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "rnaprodb_output.json"; // Name of the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const handleDownloadCSV = () => {
  //   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   const fileExtension = '.xlsx';
  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //   const dataBlob = new Blob([excelBuffer], {type: fileType});
  //   FileSaver.saveAs(dataBlob, 'pdb_data' + fileExtension);
  // };

  const handleDownloadCSV = () => {
    // Convert JSON array of objects into CSV data
    const jsonToCSV = (json) => {
      const replacer = (key, value) => (value === null ? '' : value); // Handle null values
      const header = Object.keys(json[0]);
      const csv = [
        header.join(','), // header row first
        ...json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      ].join('\r\n');
  
      return csv;
    };
  
    // Create a Blob from the CSV String
    const blob = new Blob([jsonToCSV(data)], { type: 'text/csv;charset=utf-8;' });
  
    // Create a link element, use it to download the CSV, and remove it
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'rnaprodb_output.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tableData = {
    columns: [
      {
        label: 'Quick View',
        field: 'quickView',
        sort: 'asc',
        width: 100
      },
      {
        label: 'ID',
        field: 'id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'DOI',
        field: 'doi',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Pubmed',
        field: 'pubmed',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Year Published',
        field: 'year',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Title',
        field: 'title',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Authors',
        field: 'authors',
        sort: 'asc',
        width: 250
      },
      // ... more columns as needed
    ],
    rows: data.map(item => ({
      ...item, // spread other properties
      quickView: <img src={`pdb_thumbnails/${item.id}_assembly1.png`} alt={item.id} style={{ width: '45px', height: '45px' }} />,
      id: <Link to={`/rnaprodb/${item.id}`} target='_blank' rel="noopener noreferrer">{item.id}</Link>,
      title: <Link to={`/rnaprodb/${item.id}`} target='_blank' rel="noopener noreferrer">{item.title}</Link>,
    }))
  };

  const [viewMode, setViewMode] = useState('table');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const [sortCriterion, setSortCriterion] = useState('id'); // default sort by ID
  const [sortOrder, setSortOrder] = useState('asc'); // asc or desc

  const handleSortChange = (criterion) => {
    if (sortCriterion === criterion) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriterion(criterion);
      setSortOrder('asc');
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let valA = a[sortCriterion];
      let valB = b[sortCriterion];

      if (sortCriterion === 'year') { // assuming year is a numeric value
        valA = parseInt(valA, 10);
        valB = parseInt(valB, 10);
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortCriterion, sortOrder]);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 2 }}>
      <Typography variant="h6" sx={{ margin: 2 }}>
        {`Found ${data.length} structures`}
      </Typography>
      <Button variant="contained" onClick={handleCopyToClipboard} sx={{ margin: 2, bgcolor: 'black' }}>
        Copy PDB IDs to Clipboard
      </Button>
      {/* <Button variant="contained" onClick={handleDownloadJson} sx={{ margin: 2, bgcolor: 'secondary.main' }}>
          Download JSON Data
      </Button>
      <Button variant="contained" onClick={handleDownloadCSV} sx={{ margin: 2, bgcolor: 'primary.main' }}>
          Download as CSV
      </Button> */}
      <Button
        variant="contained"
        sx={{ margin: 2 }}
        aria-controls={open ? 'download-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{bgcolor: 'green' }}
      >
        Download Data
      </Button>
      <Menu
        id="download-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'download-button',
        }}
      >
        <MenuItem onClick={() => { handleClose(); handleDownloadJson(); }}>JSON</MenuItem>
        <MenuItem onClick={() => { handleClose(); handleDownloadCSV(); }}>CSV</MenuItem>
      </Menu>
    </Box>
    
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleViewChange}
        aria-label="View mode"
        sx={{ marginBottom: 2, alignSelf: 'center', marginLeft: 2, width: '100%' }}
      >
        <ToggleButton value="table" aria-label="Table View">
          Table View
        </ToggleButton>
        <ToggleButton value="card" aria-label="Card View">
          Card View
        </ToggleButton>
      </ToggleButtonGroup>

      {showErrorMessage ? (
        <Typography sx={{ width: '100%', textAlign: 'center', mt: 3 }}>
          There are no matches for your query, please try again.
        </Typography>
      ) : (
      <>
      {viewMode === 'card' && (
        <>
        <Button onClick={() => handleSortChange('id')}>Sort by ID</Button>
        <Button onClick={() => handleSortChange('year')}>Sort by Year</Button>
        <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%', marginTop: 2 }} >
          <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
        {getData(sortedData, page, itemsPerPage).map((item) => (
        <Card key={item.id} variant="outlined" sx={{ width: 'calc(25% - 32px)', marginBottom: 2, marginLeft:"8px", marginRight:"8px" }}>
          <CardMedia
            component="img"
            height="auto"
            image={`pdb_thumbnails/${item.id}_assembly1.png`} 
            alt={`Thumbnail for ${item.id}`}
            sx={{
                height: 250, 
                width: 250,  
                objectFit: 'contain', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: 'auto' 
              }}
          />
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              <strong>
                ID:&nbsp;
              <Link to={`/rnaprodb/${item.id}`} target='_blank' rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                {item.id}
              </Link>
              </strong>
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              DOI:&nbsp;
                {item.doi}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Pubmed:&nbsp; 
                {item.pubmed}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Year Published:&nbsp; 
                {item.year}
            </Typography>
            <TextField 
              id={`title-${item.id}`} 
              label="Title" 
              defaultValue={item.title}
              InputProps={{  readOnly: true }}
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              minRows={2}
            />
            <TextField 
              id={`authors-${item.authors}`} 
              label="Authors" 
              defaultValue={item.authors} 
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              minRows={2}
            />
          </CardContent>
        </Card>
      ))}
      <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%', marginTop: 2 }} >
        <Pagination count={count} page={page} onChange={handleChange} />
      </Stack>
      </>
      )}

      {viewMode === 'table' && (
      <div style={{ width: '100%' }}>
      <MDBDataTable
        striped
        bordered
        small
        data={tableData}
        searchTop
        searchBottom={false}
      />
      </div>
      )}
      </>
      )}
    </Box>
  );
};

export default QueryOutput;