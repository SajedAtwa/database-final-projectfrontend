import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import BusinessHeader from './Header';  // Adjust the path as needed
import BusinessFooter from './Footer';  // Adjust the path as needed

const DAYS_OF_WEEK = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

function CreateAvailability() {
    const history = useHistory(); // Initialize useHistory hook
    const [uid, setUid] = useState('');
    const [startDatetime, setStartDatetime] = useState('');
    const [endDatetime, setEndDatetime] = useState('');
    const [daysSupported, setDaysSupported] = useState([]);
    const [services, setServices] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCreate = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!uid.trim()) {
            setErrorMessage('User ID cannot be empty.');
            return;
        }

        const servicesArray = services.split(',').map(service => parseInt(service.trim()));

        if (servicesArray.some(isNaN)) {
            setErrorMessage('Services must be valid numbers.');
            return;
        }

        const formatDateTime = (datetime) => {
            const [date, time] = datetime.split('T');
            return `${date} ${time}:00.000000`; // Format datetime as YYYY-MM-DD HH:MM:SS.ffffff
        };

        const data = {
            uid: parseInt(uid),
            start_datetime: formatDateTime(startDatetime),
            end_datetime: formatDateTime(endDatetime),
            start_time: startDatetime.split('T')[1] + ':00', // Format time to HH:MM:SS
            end_time: endDatetime.split('T')[1] + ':00', // Format time to HH:MM:SS
            days_supported: daysSupported,
            services: servicesArray,
            available: true, // Always set available to true
            password: password
        };

        try {
            const response = await fetch('http://localhost:5000/availabilities/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                setSuccessMessage('Availability created successfully! Availability ID: ' + result.availability_id);

                // Clear form fields after successful submission
                setUid('');
                setStartDatetime('');
                setEndDatetime('');
                setDaysSupported([]);
                setServices('');
                setPassword('');

                // Scroll back to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setErrorMessage('There was a problem creating the availability.');
            }
        } catch (error) {
            setErrorMessage('There was a problem creating the availability.');
        }
    };

    const handleCancel = () => {
        history.push('/business'); // Navigate back to the business page
    };

    const handleDaysSupportedChange = (day) => {
        setDaysSupported(prevDays => 
            prevDays.includes(day)
                ? prevDays.filter(d => d !== day)
                : [...prevDays, day]
        );
    };

    return (
        <div>
            <BusinessHeader />
            <div className="flex flex-col items-center p-12">
                <div className="w-full max-w-[800px] bg-white shadow-md rounded-lg">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-[#07074D] mb-4">Create Availability</h2>
                        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                        <form onSubmit={handleCreate} className="w-full">
                            <div className="mb-5">
                                <label htmlFor="uid" className="mb-3 block text-base font-medium text-[#07074D]">
                                    User ID:
                                </label>
                                <input
                                    id="uid"
                                    name="uid"
                                    type="text"
                                    value={uid}
                                    onChange={(e) => setUid(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="startDatetime" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Start DateTime:
                                </label>
                                <input
                                    id="startDatetime"
                                    name="start_datetime"
                                    type="datetime-local"
                                    value={startDatetime}
                                    onChange={(e) => setStartDatetime(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="endDatetime" className="mb-3 block text-base font-medium text-[#07074D]">
                                    End DateTime:
                                </label>
                                <input
                                    id="endDatetime"
                                    name="end_datetime"
                                    type="datetime-local"
                                    value={endDatetime}
                                    onChange={(e) => setEndDatetime(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium text-[#07074D]">
                                    Days Supported:
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {DAYS_OF_WEEK.map(day => (
                                        <label key={day} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={daysSupported.includes(day)}
                                                onChange={() => handleDaysSupportedChange(day)}
                                                className="mr-2"
                                            />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="services" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Services (comma separated):
                                </label>
                                <input
                                    id="services"
                                    name="services"
                                    type="text"
                                    value={services}
                                    onChange={(e) => setServices(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Password:
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                    Create
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="hover:shadow-form w-full rounded-md bg-gray-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <BusinessFooter />
        </div>
    );
}

export default CreateAvailability;
