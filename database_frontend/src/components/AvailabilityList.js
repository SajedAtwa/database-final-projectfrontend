import React from 'react';
import { useLocation } from 'react-router-dom';
import '../static/css/AvailabilityList.css';
import { createBooking } from '../db methods/dbBookingCreate';
import * as User from "../Users.js";

function AvailabilityList() {
    const location = useLocation();
    console.log("Location state:", location.state);
    
    const { searchResults, startDate, startTime, endDate, endTime } = location.state || { searchResults: { businesses: [], distances: [] }, startDate: '', startTime: '', endDate: '', endTime: '' };

    const handleBookingClick = async (business) => {
        const userId = User.getUser('uid');
        const password = User.getUser('password')
        if (!userId) {
            alert('User ID is missing. Please log in.');
            return;
        }

        const formattedStartDateTime = startDate && startTime ? `${startDate} ${startTime}:00.000` : null;
        const formattedEndDateTime = endDate && endTime ? `${endDate} ${endTime}:00.000` : null;

        if (!formattedStartDateTime || !formattedEndDateTime) {
            alert('Invalid date or time. Please check your inputs.');
            return;
        }
        
        const bookingDetails = {
            uid: userId,
            password: password,
            business: business,
            start_datetime: formattedStartDateTime,
            end_datetime: formattedEndDateTime,
            service: searchResults
        };

        try {
            const result = await createBooking(bookingDetails);
            if (result.error) {
                alert(`Booking Failed: ${result.error}`);
            } else {
                alert('Booking successful!');
               
            }
        } catch (error) {
            alert('Failed to create booking. Please try again.');
            console.error('Error creating booking:', error);
        }
    };

    if (!searchResults.businesses || searchResults.businesses.length === 0) {
        return <div className="AvailabilityList">No available services found. Please try again with different parameters.</div>;
    }

    return (
        <div className="AvailabilityList">
            <h1>Available Businesses</h1>
            <ul>
                {searchResults.businesses.map((business, index) => (
                    <li key={business} className="business-list-item">
                        Business ID: {business}, Distance: {searchResults.distances[index]} km
                        <button onClick={() => handleBookingClick(business)} className="booking-button">
                            Create Booking
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AvailabilityList;
