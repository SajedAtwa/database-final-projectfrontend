import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserProfile from './UserProfile';
import { fetchBookings } from '../db methods/dbBookingList';
import { deleteBooking } from '../db methods/dbBookingCancel';
import { fetchBookingInfo } from '../db methods/dbBookingInfo';
import { initializeBalance, viewBalance, importToBalance, exportFromBalance } from '../db methods/dbBalance';
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
    const [balance, setBalance] = useState(0);  
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
        handleViewBalance();  
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

    const handleNavigate = (path) => {
        history.push(path);
    };

    const handleLogout = () => {
        User.clearUser();
        setUser({});
        history.push('/');
    };

    const handleBookService = () => {
        history.push('/book-service');
    };

    const handleInitializeBalance = async () => {
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        try {
            const response = await initializeBalance(userId, password);
            alert("Balance initialized successfully!");
            handleViewBalance();  
        } catch (error) {
            alert(`Failed to initialize balance: ${error.message}`);
        }
    };

    const handleViewBalance = async () => {
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        try {
            const result = await viewBalance(userId, password);
            setBalance(result.balance);  // Set balance state
        } catch (error) {
            console.error(`Failed to view balance: ${error.message}`);
        }
    };

    const handleImportToBalance = async () => {
        const input = prompt("Enter amount to add:");
        const amount = parseInt(input, 10); 
        if (isNaN(amount) || amount <= 0) { 
            alert("Please enter a valid positive integer.");
            return; 
        }
    
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        try {
            await importToBalance(userId, password, amount);
            alert("Funds added to your balance successfully!");
            handleViewBalance(); 
        } catch (error) {
            alert(`Failed to add funds: ${error.message}`);
        }
    };

    const handleExportFromBalance = async () => {
        const input = prompt("Enter amount to export:");
        const amount = parseInt(input, 10); 
        if (isNaN(amount) || amount <= 0) { 
            alert("Please enter a valid positive integer.");
            return; 
        }
    
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        try {
            await exportFromBalance(userId, password, amount);
            alert("Funds exported from your balance successfully!");
            handleViewBalance();  
        } catch (error) {
            alert(`Failed to export funds: ${error.message}`);
        }
    };

    const onSaveProfile = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const userId = User.getUser("uid");

    return (
        <div className="user-container">
            <UserProfile user={user} onSaveProfile={onSaveProfile} />
            <div className="user-dashboard">
                <h1>Welcome, {userId}!</h1>
                {loading ? <div>Loading bookings...</div> : error ? <div>Error: {error}</div> : (
                    <div>
                        <h2>Your Bookings</h2>
                        <ul>
                            {Object.keys(bookings).length > 0 ? (
                                Object.entries(bookings).map(([bookingId, booking]) => (
                                    <li key={bookingId}>
                                        <strong>Booking ID:</strong> {booking.id}<br />
                                        <strong>Service:</strong> {booking.service}<br />
                                        <strong>Availability:</strong> {booking.availability}<br />
                                        <button onClick={() => handleDeleteBooking(bookingId)}>Cancel Booking</button>
                                    </li>
                                ))
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
                    <button onClick={() => handleNavigate('/repair_wave')}>Book New Service With Repair Wave</button>
                    <button onClick={() => handleNavigate('/clean_touch')}>Book New Service with Clean Touch</button>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={handleInitializeBalance}>Initialize Balance</button>
                    <button onClick={handleViewBalance}>View Balance</button>
                    <button onClick={handleImportToBalance}>Add Funds to Balance</button>
                    <button onClick={handleExportFromBalance}>Export Funds from Balance</button>
                </div>
                <div>
                    <h2>Current Balance: ${balance}</h2>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
