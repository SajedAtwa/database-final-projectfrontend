import React from 'react';
import { useLocation } from 'react-router-dom';
import '../static/css/AvailabilityList.css';


function AvailabilityList() {
    const location = useLocation();
    const { businesses, distances } = location.state || { businesses: [], distances: [] };


    return (
        <div className="availability-list-container">
            <h2>Available Time Slots</h2>
            <ul>
                {businesses.map((business, index) => (
                    <li key={index}>
                        Business ID: {business}, Distance: {distances[index]} miles
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default AvailabilityList;
