import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createBusinessAvailability, updateBusinessAvailability, deleteBusinessAvailability, listBusinessAvailabilities } from '../db methods/dbBusiness';
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
        services: [], 
        device: ''
    });
    const [availabilities, setAvailabilities] = useState([]);

    useEffect(() => {
        if (!User.getUser("uid")) {
            history.push('/signin');
            return;
        }

        const userId = User.getUser("uid");
        const password = User.getUser("password");

        if (userId) {
            console.log('Fetching availabilities for business:', userId);
            listBusinessAvailabilities(userId, password)
                .then(availabilities => {
                    console.log('Availabilities fetched:', availabilities);
                    setAvailabilities(availabilities);
                })
                .catch(error => {
                    console.error('Failed to fetch availabilities:', error);
                    setError('Failed to fetch availabilities');
                });
        }
    }, [history]);

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
                services: [],
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
            await deleteBusinessAvailability(userId, availabilityId, password);
            const updatedAvailabilities = availabilities.filter(id => id !== availabilityId);
            setAvailabilities(updatedAvailabilities);
        } catch (error) {
            window.alert('Failed to delete availability');
        }
        setLoading(false);
    };  

    const handleInputChange = (e) => {
        const { name, value, type, selectedOptions } = e.target;
        if (name === "services" && type === "select-multiple") {
            const values = Array.from(selectedOptions, option => option.value);
            setAvailabilityDetails(prevDetails => ({
                ...prevDetails,
                [name]: values
            }));
        } else {
            setAvailabilityDetails(prevDetails => ({
                ...prevDetails,
                [name]: value
            }));
        }
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
                            multiple
                            required
                        >
                            <option value={1}>Screen Repair</option>
                            <option value={2}>Camera Repair</option>
                            <option value={3}>Battery Replacement</option>
                        </select>
                    </div>
                    <button type="submit">Create</button>
                </form>
            )}
            {loading ? <div className="loading">Loading...</div> :
                error ? <div className="error">Error: {error}</div> :
                    <div>
                        <h2>Availabilities Created</h2>
                        <ul className="availabilities-list">
                            {availabilities.info && availabilities.info.length > 0 ? (
                                availabilities.info.map(availabilityId => (
                                    <li key={availabilityId} className="availability-item">
                                        {availabilityId}
                                        <button className="delete-button" onClick={() => handleDeleteAvailability(availabilityId)}>Delete</button>
                                    </li>
                                ))
                            ) : (
                                <li>No availabilities found.</li>
                            )}
                        </ul>
                    </div>
            }
        </div>
    );
}

export default BusinessDashboard;
