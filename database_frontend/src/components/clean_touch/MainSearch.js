import React, { useState } from 'react';
import { dbSearch } from '../../db methods/dbSearch';

const VEHICLES = ["TOYOTA", "BMW", "VOLKSWAGEN", "HONDA", "FORD", "CHEVROLET", "NISSAN", "HYUNDAI"];
const SERVICES = ["DETAILING", "GENERAL_WASH", "BRAKE_FLUID"];

function MainSearch() {
    const [device, setDevice] = useState('');
    const [issue, setIssue] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('09:00');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);  // State to track if a search has been performed

    // Function to handle the search operation
    const handleSearch = async () => {
        if (!startDate || !startTime) {
            setError('Please fill in all date and time fields.');
            return;
        }

        // Set endDate to be one day after startDate
        const endDateObj = new Date(startDate);
        endDateObj.setDate(endDateObj.getDate() + 1);
        const formattedEndDate = endDateObj.toISOString().split('T')[0];

        // Set endTime to be the same as startTime
        const formattedEndTime = startTime;

        const formattedStartDateTime = `${startDate} ${startTime}:00.000`;
        const formattedEndDateTime = `${formattedEndDate} ${formattedEndTime}:00.000`;

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

            <select onChange={(e) => setDevice(e.target.value)} value={device}>
                <option value="">Select a vehicle</option>
                {VEHICLES.map((vehicle, index) => (
                    <option key={index} value={vehicle}>{vehicle}</option>
                ))}
            </select>

            <select onChange={(e) => setIssue(e.target.value)} value={issue}>
                <option value="">Select a service</option>
                {SERVICES.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                ))}
            </select>
                <input type="text" placeholder="Enter Your ZipCode" onChange={(e) => setLocation(e.target.value)} defaultValue={location} />
                <input type="date" onChange={(e) => setStartDate(e.target.value)} defaultValue={startDate} />
                <input type="time" onChange={(e) => setStartTime(e.target.value)} defaultValue={startTime} />
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
