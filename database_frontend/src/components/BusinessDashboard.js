import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createBusinessAvailability, updateBusinessAvailability, deleteBusinessAvailability, listBusinessAvailabilities } from '../db methods/dbBusiness';
import { exportDatabase } from '../db methods/dbExport';
import '../static/css/BusinessDashboard.css';
import * as User from "../Users.js";

function BusinessDashboard() {
    const history = useHistory();
    const [businessId, setBusinessId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDateForm, setShowDateForm] = useState(false);

    const getCurrentDateMidnight = () => {
        const today = new Date();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const options = { timeZone: timezone, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const dateStr = formatter.format(today);
        return dateStr.split(',')[0];
    };

    const [availabilityDetails, setAvailabilityDetails] = useState({
        start_datetime: getCurrentDateMidnight(),
        end_datetime: getCurrentDateMidnight(),
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
            const { start_datetime, end_datetime, services, device } = availabilityDetails;
            const formattedStartDatetime = start_datetime.replace('T', ' ') + ":00.000";
            const formattedEndDatetime = end_datetime.replace('T', ' ') + ":00.000";
            const start_time = start_datetime.split('T')[1];
            const end_time = end_datetime.split('T')[1];

            if (!userId) {
                console.error('User ID is missing or not retrieved correctly.');
                return;
            }

            await createBusinessAvailability(userId, { start_datetime: formattedStartDatetime, end_datetime: formattedEndDatetime, start_time, end_time, services, device }, password);
            setShowCreateForm(false);
            setAvailabilityDetails({
                start_datetime: getCurrentDateMidnight(),
                end_datetime: getCurrentDateMidnight(),
                services: [],
                device: ''
            });
            alert('Availability Created Successfully');

            // Fetch updated availabilities after creating a new one
            const updatedAvailabilities = await listBusinessAvailabilities(userId, password);
            setAvailabilities(updatedAvailabilities);
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
            alert('Availability Deleted Successfully');

            // Fetch updated availabilities after deleting one
            const updatedAvailabilities = await listBusinessAvailabilities(userId, password);
            setAvailabilities(updatedAvailabilities);
        } catch (error) {
            setError('Failed to delete availability');
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

    const handleSwitchToUserDashboard = () => {
        history.push('/dashboard'); // Navigate to the user dashboard
    };

    const handleExportDatabase = async () => {
        const userId = User.getUser("uid");
        const password = User.getUser("password");
        let { start_datetime, end_datetime } = availabilityDetails;

        // Format the date and time strings
        start_datetime = start_datetime.replace('T', ' ') + ":00.000";
        end_datetime = end_datetime.replace('T', ' ') + ":00.000";

        try {
            await exportDatabase(userId, password, start_datetime, end_datetime);
            alert('Database Exported Successfully');
        } catch (error) {
            setError('Failed to export database');
        }
    };

    return (
        <div className="business-container">
            <h1>Welcome, Business {businessId}</h1>
            <button onClick={handleSwitchToUserDashboard}>Switch to User Dashboard</button>
            <button onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? 'Cancel' : 'Create Availability'}
            </button>
            <button onClick={() => setShowDateForm(!showDateForm)}>
                {showDateForm ? 'Cancel' : 'Show Date Form'}
            </button>
            {showCreateForm && (
                <form onSubmit={handleCreateAvailability}>
                    <div>
                        <label>Start Date and Time</label>
                        <input
                            type="datetime-local"
                            name="start_datetime"
                            value={availabilityDetails.start_datetime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>End Date and Time</label>
                        <input
                            type="datetime-local"
                            name="end_datetime"
                            value={availabilityDetails.end_datetime}
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
            {showDateForm && (
                <form>
                    <div>
                        <label>Start Date and Time</label>
                        <input
                            type="datetime-local"
                            name="start_datetime"
                            value={availabilityDetails.start_datetime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>End Date and Time</label>
                        <input
                            type="datetime-local"
                            name="end_datetime"
                            value={availabilityDetails.end_datetime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="button" onClick={handleExportDatabase}>Export Database</button>
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
