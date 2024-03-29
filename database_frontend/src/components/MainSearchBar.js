import React, { useState } from 'react';
import '../static/css/MainSearchBar.css';
import { dbSearch } from '../db methods/dbSearch';

function MainSearchBar({ onResults }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!startDate || !startTime || !endDate || !endTime) {
            setError('Please fill in all date and time fields.');
            return;
        }

        // Convert the dates to the expected backend format '%Y-%m-%d %H:%M:%S.%f'
        const formattedStartDateTime = `${startDate} ${startTime}:00.000`;
        const formattedEndDateTime = `${endDate} ${endTime}:00.000`;

        try {
            const data = await dbSearch(searchTerm, location, formattedStartDateTime, formattedEndDateTime);
            if (!data.error) {
                onResults(data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Search request failed. Please try again later.');
        }
    };

    return (
        <div className="search-container">
            <h1>Book an Appointment with Nearby Repair Shop</h1>
            {error && <p className="error">{error}</p>}
            <div className="main-search-bar">
                <input type="text" placeholder="Enter Your Device/Issue" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <input type="text" placeholder="Enter Your ZipCode" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
}

export default MainSearchBar;
