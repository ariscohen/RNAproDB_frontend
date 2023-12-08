import React, { useState } from 'react';
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
    link.download = "pdb_data.json"; // Name of the file
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
      id: <Link to={`/${item.id}`} target='_blank' rel="noopener noreferrer">{item.id}</Link>,
      title: <Link to={`/${item.id}`} target='_blank' rel="noopener noreferrer">{item.title}</Link>,
    }))
  };

  const [viewMode, setViewMode] = useState('card');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 2 }}>
      <Typography variant="h6" sx={{ margin: 2 }}>
        {`Found ${data.length} structures`}
      </Typography>
      <Button variant="contained" onClick={handleCopyToClipboard} sx={{ margin: 2, bgcolor: 'black' }}>
        Copy PDB IDs to Clipboard
      </Button>
      <Button variant="contained" onClick={handleDownloadJson} sx={{ margin: 2, bgcolor: 'secondary.main' }}>
          Download JSON Data
      </Button>
      </Box>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleViewChange}
        aria-label="View mode"
        sx={{ marginBottom: 2, alignSelf: 'center', marginLeft: 2, width: '100%' }}
      >
        <ToggleButton value="card" aria-label="Card View">
          Card View
        </ToggleButton>
        <ToggleButton value="table" aria-label="Table View">
          Table View
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
        <Stack spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%', marginTop: 2 }} >
          <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
        {getData(data, page, itemsPerPage).map((item) => (
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
              <Link to={`/${item.id}`} target='_blank' rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
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
      <MDBDataTable
        striped
        bordered
        small
        data={tableData}
        searchTop
        searchBottom={false}
      />
      )}
      </>
      )}
    </Box>
  );
};

export default QueryOutput;