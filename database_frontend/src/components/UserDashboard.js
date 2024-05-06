import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserProfile from './UserProfile';
import { fetchBookings } from '../db methods/dbBookingList';
import { deleteBooking } from '../db methods/dbBookingCancel';
import { fetchBookingInfo } from '../db methods/dbBookingInfo';
import '../static/css/UserDashboard.css';
import * as User from "../Users.js";

function UserDashboard() {
    const history = useHistory();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {};
    });
    const [bookings, setBookings] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        console.log("UserDashboard rendered");

        if (!User.getUser("uid")) {
            history.push('/signin');
            return;
        }

        const userId = User.getUser("uid");
        const password = User.getUser("password");

        setLoading(true);
        console.log("Fetching bookings for UID:", userId, "with password:", password);
        fetchBookings(userId, password)
            .then(async (bookingIds) => {
                const detailedBookings = await Promise.all(bookingIds.map(bookingId =>
                    fetchBookingInfo(bookingId, userId, password)
                ));
                console.log("Detailed bookings fetched:", detailedBookings);
                const bookingsDict = {};
                detailedBookings.forEach(booking => {
                    bookingsDict[booking.id] = booking;
                });
                setBookings(bookingsDict);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch bookings:', err);
                setError('Failed to load bookings');
                setLoading(false);
            });

        setNotifications(["Your next appointment is approaching!"]);
    }, [history]);

    const handleDeleteBooking = (bookingId) => {
        console.log("Attempting to delete booking with ID:", bookingId);  
    
        const password = User.getUser('password');
        const userId = User.getUser('uid');
        
        console.log("Deleting booking with ID:", bookingId);
        deleteBooking(userId, bookingId, password)
            .then(() => {
                const updatedBookings = { ...bookings };
                delete updatedBookings[bookingId];
                setBookings(updatedBookings);
                alert('Booking deleted successfully');
            })
            .catch(err => {
                console.error('Failed to delete booking:', err);
                alert('Failed to delete booking');
            });
    };
    

    const handleLogout = () => {
        User.clearUser();
        setUser({});
        history.push('/');
    };

    const handleBookService = () => {
        history.push('/book-service');
    };

    const onSaveProfile = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <div className="user-container">
            <UserProfile user={user} onSaveProfile={onSaveProfile} />
            <div className="user-dashboard">
                <h1>Welcome, {user.username}!</h1>
                {loading ? <div>Loading bookings...</div> : error ? <div>Error: {error}</div> : (
                    <div>
                        <h2>Your Bookings</h2>
                        <ul>
                        {Object.keys(bookings).length > 0 ? (
                            <ul>
                                {Object.entries(bookings).map(([bookingId, booking]) => (
                                    <li key={bookingId}>
                                        Booking ID: {booking.id} {}
                                        
                                        <button onClick={() => handleDeleteBooking(bookingId)}>Cancel Booking</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <li>No bookings found.</li>
                        )}

                        </ul>
                    </div>
                )}
                <div className="dashboard-section">
                    <h2>Notifications</h2>
                    {notifications.map((note, index) => (
                        <p key={index}>{note}</p>
                    ))}
                </div>
                <div className="dashboard-section actions">
                    <button onClick={handleBookService}>Book New Service</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
