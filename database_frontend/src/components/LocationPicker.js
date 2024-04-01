import React, { useState } from 'react';

function LocationPicker({ onLocationSelect }) {
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLocationSelect(location);
    };

    return (
        <form className="location-picker" onSubmit={handleSubmit}>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
            />
            <button type="submit">Confirm Location</button>
        </form>
    );
}

export default LocationPicker;
