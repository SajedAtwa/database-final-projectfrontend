import React, { useState } from 'react';
import '../static/css/MainSearchBar.css';

function MainSearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm, location);
    };

    return (
        <div className="search-container">
            <h1>Book an Appointment with Nearby Repair Shop</h1>
            <div className="main-search-bar">
                <input
                    type="text"
                    placeholder="Enter Your Device/Issue"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Your ZipCode"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
}

export default MainSearchBar;
