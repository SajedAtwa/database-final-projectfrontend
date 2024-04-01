// UserDashboard.js
import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserProfile from './UserProfile';
import '../static/css/UserDashboard.css';

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
        if (!user.username) {
            history.push('/signin');
            return;
        }

        // mock data
        setUpcomingAppointments([
            { id: 1, service: "Service A", date: "2024-04-05T09:00:00Z" },
            { id: 2, service: "Service B", date: "2024-04-10T14:00:00Z" },
        ]);
        setAppointmentHistory([
            { id: 3, service: "Service C", date: "2024-03-01T11:00:00Z", status: "Completed" },
            { id: 4, service: "Service D", date: "2024-02-20T16:00:00Z", status: "Cancelled" },
        ]);
        setNotifications(["Your appointment with Service A is tomorrow!"]);
    }, [user, history]);

    const handleLogout = () => {
        localStorage.removeItem('user');
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
