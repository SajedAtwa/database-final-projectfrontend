import React, { useState, useEffect } from 'react';

function BookingList() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await fetch('/bookings/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            const data = await response.json();
            if (!data.error) {
                setBookings(data.bookings);
            } else {
                console.error(data.error);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="booking-list-container">
            <h2>Your Bookings</h2>
            <ul>
                {bookings.map((booking, index) => (
                    <li key={index}>
                        Booking ID: {booking.id}, Service: {booking.service}, Date: {booking.date}

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookingList;
