import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserProfile from './UserProfile';
import { fetchBookings } from '../db methods/dbBookingList';
import '../static/css/UserDashboard.css';
import * as User from "../Users.js";

function UserDashboard() {
    const history = useHistory();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {};
    });
    const [bookings, setBookings] = useState([]);
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
            .then(fetchedBookings => {
                setBookings(fetchedBookings);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch bookings:', err);
                setError('Failed to load bookings');
                setLoading(false);
            });

        setNotifications(["Your next appointment is approaching!"]);

    }, [history]);

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
                            {bookings.length > 0 ? bookings.map(booking => (
                                <li key={booking.id}>
                                    Booking ID: {booking.id} - Service: {booking.service}
                                </li>
                            )) : <li>No bookings found.</li>}
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
