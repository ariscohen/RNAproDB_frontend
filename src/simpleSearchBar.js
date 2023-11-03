import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './simpleSearchBar.css';


export default function SimpleSearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/${searchTerm}`);
    };

    return (
        <div className="search-bar-container">
            <input
                className="search-bar"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='search-button' onClick={handleSearch}>Search</button>
        </div>
    );
}