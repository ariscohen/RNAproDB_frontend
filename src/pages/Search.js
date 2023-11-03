import React from 'react';
import SearchBar from '../SearchBar';
import './Search.css';

export default function Search() {
  return (
    <div className = 'content'>
      <h1>Search Page</h1>
      {/* Add your search functionality here */}
      <SearchBar />
    </div>
  );
}