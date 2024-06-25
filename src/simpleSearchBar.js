import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './simpleSearchBar.css';
import Button from '@mui/material/Button'; // MUI Button component
import TextField from '@mui/material/TextField'; // Import MUI TextField component

export default function SimpleSearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/${searchTerm}`);
        window.location.reload(false);
    };

    const handleKeyDown = (event) => {
        // If the user presses the Enter key, call the handleSearch function
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar-container">
            <TextField
                className="search-bar"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                label="Search PDB ID" // Optional: Add a label
                variant="filled" // Optional: Choose a variant, e.g., "filled", "outlined", etc.
                fullWidth // Optional: Set to true for full width
                sx= {{fontSize: '0.8em', padding: '5px', bgcolor: 'white'}}
            />
            <Button 
                className='search-button'
                onClick={handleSearch}
                variant="contained"
                sx={{ }}
            >
                Search
            </Button>
        </div>
    );
}

