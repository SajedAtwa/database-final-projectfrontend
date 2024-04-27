// MainSearchBar.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../static/css/MainSearchBar.css';
import { dbSearch } from '../db methods/dbSearch';

function MainSearchBar() {
    const history = useHistory();
    const [device, setDevice] = useState('');
    const [issue, setIssue] = useState(''); // Renaming searchTerm to issue for clarity
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const handleSearch = async () => {
        if (!startDate || !startTime || !endDate || !endTime) {
            setError('Please fill in all date and time fields.');
            return;
        }

        const formattedStartDateTime = `${startDate} ${startTime}:00.000`;
        const formattedEndDateTime = `${endDate} ${endTime}:00.000`;

        try {
            const data = await dbSearch({ device, device_repair: issue }, location, formattedStartDateTime, formattedEndDateTime);
            if (data && !data.error) {
                setSearchResults(data); // Set the search results
                history.push({
                    pathname: '/availability-list',
                    state: { searchResults: data } // Pass the results to the next page
                });
            } else {
                setError(data.error || 'Failed to fetch results.');
            }
        } catch (err) {
            setError('Search request failed. Please try again later.');
        }
    };

    return (
        <div className="search-container">
            <h1>Book Appointments with Nearby Repair Shops</h1>
            {error && <p className="error">{error}</p>}
            <div className="main-search-bar">
                <input type="text" placeholder="Enter Your Device (e.g., iPhone)" value={device} onChange={(e) => setDevice(e.target.value)} />
                <input type="text" placeholder="Enter Issue (e.g., Screen Replacement)" value={issue} onChange={(e) => setIssue(e.target.value)} />
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
