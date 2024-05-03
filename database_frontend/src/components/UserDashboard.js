import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserProfile from './UserProfile';
import '../static/css/UserDashboard.css';
import * as User from "../Users.js";

function UserDashboard() {
    const history = useHistory();
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {};
    });
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [appointmentHistory, setAppointmentHistory] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Redirect if not signed in
        if (!User.getUser("uid")) {
            console.log(user)
            history.push('/signin');
            return;
        }

        // Fetch data from the server
        fetchUserAppointments();

    }, [user, history]);

    const fetchUserAppointments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/appointments/upcoming', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUpcomingAppointments(data.upcoming);
                setAppointmentHistory(data.history);
                setNotifications(data.notifications);
            } else {
                throw new Error('Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
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

                <div className="dashboard-section">
                    <h2>Upcoming Appointments</h2>
                    <ul>
                        {upcomingAppointments.map(appointment => (
                            <li key={appointment.id}>
                                {appointment.service} - {new Date(appointment.date).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard-section">
                    <h2>Appointment History</h2>
                    <ul>
                        {appointmentHistory.map(history => (
                            <li key={history.id}>
                                {history.service} - {new Date(history.date).toLocaleString()} ({history.status})
                            </li>
                        ))}
                    </ul>
                </div>

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
