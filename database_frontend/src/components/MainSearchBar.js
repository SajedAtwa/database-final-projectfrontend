// MainSearchBar.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../static/css/MainSearchBar.css';
import { dbSearch } from '../db methods/dbSearch';

function MainSearchBar() {
    const history = useHistory();
    const [device, setDevice] = useState('');
    const [issue, setIssue] = useState(''); 
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState('');

    const handleSearch = async () => {
        if (!startDate || !startTime || !endDate || !endTime) {
            setError('Please fill in all date and time fields.');
            return;
        }
    
        const formattedStartDateTime = `${startDate} ${startTime}:00.000`;
        const formattedEndDateTime = `${endDate} ${endTime}:00.000`;
    
        // Validate that the start date is before the end date
        if (new Date(formattedStartDateTime) >= new Date(formattedEndDateTime)) {
            setError('Start date and time must be before end date and time.');
            return;
        }
    
        console.log('Formatted Start DateTime:', formattedStartDateTime);
        console.log('Formatted End DateTime:', formattedEndDateTime);
        try {
            const services = {
                ...(device && { device: device }), 
                ...(issue && { device_repair: issue }) 
            };
            console.log('Services being passed:', services);
            const data = await dbSearch(services, location, formattedStartDateTime, formattedEndDateTime);
            console.log('Data received from search:', data);

            console.log('Navigating to AvailabilityList with:', {
                searchResults: data,
                service: services,
                startDate: startDate,
                startTime: startTime,
                endDate: endDate,
                endTime: endTime
            });

            if (data && !data.error) {
                setSearchResults(data); // Set the search results
                history.push({
                    pathname: '/availability-list',
                    state: {
                        searchResults: data, 
                        service: services,
                        startDate: startDate,
                        startTime: startTime,
                        endDate: endDate,
                        endTime: endTime
                    }
                });
            } else {
                setError(data.error || 'Failed to fetch results.');
            }
        } catch (err) {
            console.error('Error during search:', err);
            setError('Search request failed. Please try again later.');
        }
    };

    return (
        <div className="search-container">
            <h1>Book Appointments with Nearby Repair Shops</h1>
            {error && <p className="error">{error}</p>}
            <div className="main-search-bar">
                <select value={device} onChange={(e) => setDevice(e.target.value)}>
                    <option value="" disabled selected>Select a Device</option>
                    <option value="IPHONE">IPHONE</option>
                    <option value="IPAD">IPAD</option>
                    <option value="MACBOOK">MACBOOK</option>
                    <option value="PIXEL">PIXEL</option>
                    <option value="HTC">HTC</option>
                    <option value="SAMSUNG">SAMSUNG</option>
                    <option value="XIAOMI">XIAOMI</option>
                </select>
                <select value={issue} onChange={(e) => setIssue(e.target.value)}>
                    <option value="" disabled selected>Select an Issue</option>
                    <option value="SCREEN_REPAIR">Screen Repair</option>
                    <option value="CAMERA_REPAIR">Camera Repair</option>
                    <option value="BATTERY_REPLACEMENT">Battery Replacement</option>
                </select>
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
