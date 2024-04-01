import React, { useState } from 'react';
import '../static/css/AvailabilityCreate.css';

function AvailabilityCreate() {
    const [availability, setAvailability] = useState({
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',

    });

    const handleChange = (e) => {
        setAvailability({ ...availability, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/availabilities/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(availability),
        });
        const data = await response.json();
        if (data.error) {
            console.error(data.error);
        } else {
            console.log('Availability created successfully!');

        }
    };

    return (
        <div className="availability-create-container">
            <form onSubmit={handleSubmit} className="availability-create-form">
                <h2>Create Availability</h2>
                {/* Input fields for availability details */}
                <div className="input-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={availability.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AvailabilityCreate;
