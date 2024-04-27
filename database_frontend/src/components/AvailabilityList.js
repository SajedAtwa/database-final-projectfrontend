// AvailabilityList.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function AvailabilityList() {
    const location = useLocation();
    // Ensuring default values if state or searchResults are undefined
    const { searchResults } = location.state || { searchResults: { businesses: [], distances: [] } };

    // Debugging: Log the search results to check what is received
    console.log("Received search results:", searchResults);

    // Check if businesses are available in the searchResults
    if (!searchResults.businesses || searchResults.businesses.length === 0) {
        return <div>No available services found. Please try again with different parameters.</div>;
    }

    return (
        <div>
            <h1>Available Services</h1>
            <ul>
                {searchResults.businesses.map((business, index) => (
                    <li key={business}> {/* Assuming business has a unique identifier; otherwise, use index */}
                        Business ID: {business}, Distance: {searchResults.distances[index]} miles
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AvailabilityList;
