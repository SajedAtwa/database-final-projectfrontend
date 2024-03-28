import React, { useState, useEffect } from 'react';
import '../static/css/AvailabilityList.css';

function AvailabilityList() {
    const [availabilities, setAvailabilities] = useState([]);

    useEffect(() => {
        const fetchAvailabilities = async () => {
            const response = await fetch('/availabilities/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            const data = await response.json();
            if (!data.error) {
                setAvailabilities(data.availabilities);
            } else {
                console.error(data.error);
            }
        };

        fetchAvailabilities();
    }, []);

    return (
        <div className="availability-list-container">
            <h2>Available Time Slots</h2>
            <ul>
                {availabilities.map((availability, index) => (
                    <li key={index}>
                        Start: {availability.startDate} at {availability.startTime}, End: {availability.endDate} at {availability.endTime}

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AvailabilityList;
