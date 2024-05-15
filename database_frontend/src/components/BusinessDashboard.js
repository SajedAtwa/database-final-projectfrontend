import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchBusinessBookings, cancelBusinessBooking } from '../db methods/dbBusinessBookings';
import { createBusinessAvailability, updateBusinessAvailability, deleteBusinessAvailability } from '../db methods/dbBusiness';
import '../static/css/BusinessDashboard.css';
import * as User from "../Users.js";

function BusinessDashboard() {
    const history = useHistory();
    const [businessId, setBusinessId] = useState('');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [availabilityDetails, setAvailabilityDetails] = useState({
        date: '',
        start_time: '',
        end_time: '',
        services: '',
        device: ''
    });

    useEffect(() => {
        if (!User.getUser("uid")) {
            history.push('/signin');
            return;
        }

        const userId = User.getUser("uid");
        const password = User.getUser("password");

        const savedBusinessId = localStorage.getItem('businessId');
        if (savedBusinessId) {
            setBusinessId(savedBusinessId);
            fetchBookings(savedBusinessId, userId, password);
        }
    }, [history]);

    const fetchBookings = async (businessId, userId, password) => {
        setLoading(true);
        try {
            const bookings = await fetchBusinessBookings(businessId, userId, password);
            setBookings(bookings);
        } catch (error) {
            setError('Failed to fetch bookings');
        }
        setLoading(false);
    };

    const handleCancelBooking = async (bookingId) => {
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        setLoading(true);
        try {
            await cancelBusinessBooking(businessId, bookingId);
            fetchBookings(businessId, userId, password);
        } catch (error) {
            setError('Failed to cancel booking');
        }
        setLoading(false);
    };

    const handleCreateAvailability = async (e) => {
        e.preventDefault();
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        setLoading(true);
        try {
            const { date, start_time, end_time, services, device } = availabilityDetails;
            const start_datetime = `${date} ${start_time}:00.000`;
            const end_datetime = `${date} ${end_time}:00.000`;
    
            if (!userId) {
                console.error('User ID is missing or not retrieved correctly.');
                return;
            }
    
            await createBusinessAvailability(userId, { start_datetime, end_datetime, start_time, end_time, services, device }, password);
            setShowCreateForm(false);
            setAvailabilityDetails({
                date: '',
                start_time: '',
                end_time: '',
                services: '',
                device: ''
            });
        } catch (error) {
            setError('Failed to create availability');
        }
        setLoading(false);
    };
      
    
    const handleUpdateAvailability = async (availabilityId, updatedDetails) => {
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        setLoading(true);
        try {
            await updateBusinessAvailability(businessId, availabilityId, updatedDetails, password);
            fetchBookings(businessId, userId, password);
        } catch (error) {
            setError('Failed to update availability');
        }
        setLoading(false);
    };

    const handleDeleteAvailability = async (availabilityId) => {
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        setLoading(true);
        try {
            await deleteBusinessAvailability(businessId, availabilityId, password);
            fetchBookings(businessId, userId, password);
        } catch (error) {
            setError('Failed to delete availability');
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAvailabilityDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return (
        <div className="business-container">
            <h1>Welcome, Business {businessId}</h1>
            <button onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? 'Cancel' : 'Create Availability'}
            </button>
            {showCreateForm && (
                <form onSubmit={handleCreateAvailability}>
                    <div>
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={availabilityDetails.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Start Time</label>
                        <input
                            type="time"
                            name="start_time"
                            value={availabilityDetails.start_time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>End Time</label>
                        <input
                            type="time"
                            name="end_time"
                            value={availabilityDetails.end_time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Device</label>
                        <select
                            name="device"
                            value={availabilityDetails.device}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select a Device</option>
                            <option value="IPHONE">IPHONE</option>
                            <option value="IPAD">IPAD</option>
                            <option value="MACBOOK">MACBOOK</option>
                            <option value="PIXEL">PIXEL</option>
                            <option value="HTC">HTC</option>
                            <option value="SAMSUNG">SAMSUNG</option>
                            <option value="XIAOMI">XIAOMI</option>
                        </select>
                    </div>
                    <div>
                        <label>Device Repair Type</label>
                        <select
                            name="services"
                            value={availabilityDetails.services}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Select a Service to Offer</option>
                            <option value="SCREEN_REPAIR">Screen Repair</option>
                            <option value="CAMERA_REPAIR">Camera Repair</option>
                            <option value="BATTERY_REPLACEMENT">Battery Replacement</option>
                        </select>
                    </div>
                    <button type="submit">Create</button>
                </form>
            )}
            {loading ? <div>Loading...</div> :
                error ? <div>Error: {error}</div> :
                    <div>
                        <h2>Bookings</h2>
                        <ul className="bookings-list">
                            {bookings.map(booking => (
                                <li key={booking.id} className="booking-item">
                                    <h3>{booking.customerName} - {booking.serviceName}</h3>
                                    <button className="cancel-button" onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
                                </li>
                            ))}
                        </ul>
                    </div>
            }
        </div>
    );
}

export default BusinessDashboard;
