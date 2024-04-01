import React, { useState } from 'react';
import '../static/css/BookingCreate.css';

function BookingCreate() {
    const [bookingDetails, setBookingDetails] = useState({
        service: '',
        date: '',
        time: '',
        uid: '',
        businessId: '',
    });

    const handleChange = (e) => {
        setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/bookings/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
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

                <button type="submit">Create Booking</button>
            </form>
        </div>
    );
}

export default BookingCreate;
