import React, { useState } from 'react';
import '../static/css/BookingCreate.css';

function BookingCreate() {
    const [bookingDetails, setBookingDetails] = useState({
        service: '',
        date: '',
        time: '',
    });

    const handleChange = (e) => {
        setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/bookings/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...bookingDetails,

            }),
        });
        const data = await response.json();
        if (data.error) {
            console.error(data.error);
        } else {
            console.log('Booking created successfully!');

        }
    };

    return (
        <div className="booking-create-container">
            <form onSubmit={handleSubmit} className="booking-create-form">
                <h2>Create Booking</h2>
                <div className="input-group">
                    <label htmlFor="service">Service:</label>
                    <input
                        id="service"
                        name="service"
                        type="text"
                        value={bookingDetails.service}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={bookingDetails.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="time">Time:</label>
                    <input
                        id="time"
                        name="time"
                        type="time"
                        value={bookingDetails.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Booking</button>
            </form>
        </div>
    );
}

export default BookingCreate;
