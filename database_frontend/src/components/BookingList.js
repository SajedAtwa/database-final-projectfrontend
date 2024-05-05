import React, { useEffect, useState } from 'react';
import { fetchBookings } from '../db methods/dbBookingList';
import * as User from "../Users.js"; 

function BookingList() {
    console.log('BookingList rendered');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = User.getUser('uid');
        const password = User.getUser('password'); 

        if (!userId) {
            setError('User ID is missing. Please log in.');
            return;
        }

        setLoading(true);
        fetchBookings(userId, password) 
            .then(bookings => {
                setBookings(bookings);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to load bookings:', error);
                setError('Failed to load bookings');
                setLoading(false);
            });
    }, []); 

    if (loading) return <div>Loading bookings...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Your Bookings</h2>
            <ul>
                {bookings.length > 0 ? bookings.map(booking => (
                    <li key={booking.id}>
                        Booking ID: {booking.id} - Service: {booking.service}  // Adjusted based on expected data structure
                    </li>
                )) : <li>No bookings found.</li>}
            </ul>
        </div>
    );
}

export default BookingList;
