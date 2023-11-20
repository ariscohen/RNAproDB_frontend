import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './simpleSearchBar.css';


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
            <input
                className="search-bar"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className='search-button' onClick={handleSearch}>Search</button>
        </div>
    );
}