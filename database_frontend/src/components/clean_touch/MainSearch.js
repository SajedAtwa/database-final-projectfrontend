import React, { useState } from 'react';
import { dbSearch } from '../../db methods/dbSearch';

function MainSearch() {
    const [device, setDevice] = useState('IPAD');
    const [issue, setIssue] = useState('SCREEN_REPAIR');
    const [location, setLocation] = useState('12345');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('09:00');
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [endTime, setEndTime] = useState('17:00');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);  // State to track if a search has been performed

    const handleSearch = async () => {
        if (!startDate || !startTime || !endDate || !endTime) {
            setError('Please fill in all date and time fields.');
            return;
        }

        const formattedStartDateTime = `${startDate} ${startTime}:00.000`;
        const formattedEndDateTime = `${endDate} ${endTime}:00.000`;

        try {
            const data = await dbSearch({ device, device_repair: issue }, location, formattedStartDateTime, formattedEndDateTime);
            setSearchPerformed(true);  // Set to true when a search is performed
            if (data && data.businesses) {
                setSearchResults(data.businesses.map((id, index) => ({ id, distance: data.distances[index] })));
                setError(''); // Reset error if search is successful
            } else {
                setSearchResults([]);
                setError('No data found or invalid data structure.');
            }
        } catch (err) {
            setSearchResults([]);
            setError('Search request failed. Please try again later.');
        }
    };

    return (
        <div className="search-container">
            <h1>Book Appointments with Nearby Repair Shops</h1>
            {error && <p className="error">{error}</p>}
            <div className="main-search-bar">
                <input type="text" placeholder="Enter Your Device (e.g., iPhone)" onChange={(e) => setDevice(e.target.value)} defaultValue={device} />
                <input type="text" placeholder="Enter Issue (e.g., Screen Replacement)" onChange={(e) => setIssue(e.target.value)} defaultValue={issue} />
                <input type="text" placeholder="Enter Your ZipCode" onChange={(e) => setLocation(e.target.value)} defaultValue={location} />
                <input type="date" onChange={(e) => setStartDate(e.target.value)} defaultValue={startDate} />
                <input type="time" onChange={(e) => setStartTime(e.target.value)} defaultValue={startTime} />
                <input type="date" onChange={(e) => setEndDate(e.target.value)} defaultValue={endDate} />
                <input type="time" onChange={(e) => setEndTime(e.target.value)} defaultValue={endTime} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
                {searchPerformed && searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map(result => (
                            <li key={result.id}>Business ID: {result.id}, Distance: {result.distance.toFixed(2)} meters</li>
                        ))}
                    </ul>
                ) : searchPerformed && searchResults.length === 0 ? <p>No results found.</p> : null}
            </div>
        </div>
    );
}

export default MainSearch;
