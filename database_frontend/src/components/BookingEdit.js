import React, { useState, useEffect } from 'react';


function BookingEdit({ bookingId }) {
    const [bookingDetails, setBookingDetails] = useState({
        service: '',
        date: '',
        time: '',

    });

    useEffect(() => {
        const fetchBookingDetails = async () => {

            const response = await fetch(`/bookings/info?id=${bookingId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            const data = await response.json();
            if (!data.error) {
                setBookingDetails(data);
            } else {
                console.error(data.error);
            }
        };
        fetchBookingDetails();
    }, [bookingId]);

    const handleChange = (e) => {
        setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/bookings/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: bookingId,
                ...bookingDetails,
            }),
        });
        const data = await response.json();
        if (data.error) {
            console.error(data.error);
        } else {
            console.log('Booking updated successfully!');

        }
    };

    return (
        <div className="booking-edit-container">
            <form onSubmit={handleSubmit} className="booking-edit-form">
                <h2>Edit Booking</h2>

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

                <button type="submit">Update Booking</button>
            </form>
        </div>
    );
}

export default BookingEdit;
