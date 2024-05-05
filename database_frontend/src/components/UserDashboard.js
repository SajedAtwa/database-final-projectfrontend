import React, { useEffect } from 'react';
import BookingList from './BookingList';

function UserDashboard() {
    useEffect(() => {
        console.log("UserDashboard rendered");
    });
    
    return (
        <div className="user-dashboard">
            <h1>Welcome to Your Dashboard</h1>
            <BookingList />
        </div>
    );
}
export default UserDashboard;
