import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

const QueryOutput = ({ data }) => {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const count = Math.ceil(data.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getData = (data, page, itemsPerPage) => {
    return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {getData(data, page, itemsPerPage).map((item) => (
        <Card key={item.id} variant="outlined" sx={{ minWidth: 275 }}>
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
              InputProps={{ readOnly: true }}
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
      <Stack spacing={2} justifyContent="center" alignItems="center" >
        <Pagination count={count} page={page} onChange={handleChange} />
      </Stack>
    </Box>
  );
};

export default QueryOutput;