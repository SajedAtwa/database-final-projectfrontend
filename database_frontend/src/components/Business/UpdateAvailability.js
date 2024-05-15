import React, { useEffect, useState } from 'react';
import BusinessHeader from './Header';  // Adjust the path as needed
import BusinessFooter from './Footer';  // Adjust the path as needed

function UpdateAvailability() {
    const [availabilities, setAvailabilities] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [editingAvailabilityId, setEditingAvailabilityId] = useState(null);
    const [editingAvailability, setEditingAvailability] = useState({});

    // Simulated data for testing
    const simulatedData = [
        {
            uid: '9800',
            business: '67890',
            start_datetime: '2024-05-16T08:00:00Z',
            end_datetime: '2024-05-16T17:00:00Z',
            days_supported: [1, 3, 5],
            services: ['service1_id', 'service2_id'],
            available: true,
        },
        {
            uid: '9801',
            business: '67891',
            start_datetime: '2024-05-17T09:00:00Z',
            end_datetime: '2024-05-17T18:00:00Z',
            days_supported: [2, 4, 6],
            services: ['service3_id', 'service4_id'],
            available: false,
        },
    ];

    useEffect(() => {
        // Simulate fetching data
        const fetchAvailabilities = async () => {
            try {
                // Simulate network delay
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Set simulated data
                setAvailabilities(simulatedData);
            } catch (error) {
                setErrorMessage('There was a problem fetching the availabilities.');
            }
        };

        fetchAvailabilities();
    }, []);

    const handleEdit = (availability) => {
        setEditingAvailabilityId(availability.uid);
        setEditingAvailability(availability);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Update availability in the state
            setAvailabilities((prev) =>
                prev.map((av) => (av.uid === editingAvailability.uid ? editingAvailability : av))
            );
            setSuccessMessage('Availability updated successfully!');
            setEditingAvailabilityId(null);
        } catch (error) {
            setErrorMessage('There was a problem updating the availability.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingAvailability((prev) => ({
            ...prev,
            [name]: name === 'days_supported' || name === 'services' ? value.split(',').map(Number) : value,
        }));
    };

    const handleCancel = () => {
        setEditingAvailabilityId(null);
        setEditingAvailability({});
    };

    return (
        <div>
        <BusinessHeader />
        <div className="flex flex-col items-center p-12">
            <div className="w-full max-w-[800px] bg-white shadow-md rounded-lg">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-[#07074D] mb-4">Availabilities</h2>
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                    {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                    {availabilities.length > 0 ? (
                        availabilities.map((availability) => (
                            <div key={availability.uid} className="flex flex-col p-4 mb-4 border-b border-[#e0e0e0]">
                                {editingAvailabilityId === availability.uid ? (
                                    <form onSubmit={handleUpdate} className="w-full">
                                        <div className="mb-5">
                                            <label htmlFor="uid" className="mb-3 block text-base font-medium text-[#07074D]">
                                                User ID:
                                            </label>
                                            <input
                                                id="uid"
                                                name="uid"
                                                type="text"
                                                value={editingAvailability.uid}
                                                onChange={handleChange}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                                disabled
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="business" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Business ID:
                                            </label>
                                            <input
                                                id="business"
                                                name="business"
                                                type="text"
                                                value={editingAvailability.business}
                                                onChange={handleChange}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="start_datetime" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Start DateTime:
                                            </label>
                                            <input
                                                id="start_datetime"
                                                name="start_datetime"
                                                type="datetime-local"
                                                value={editingAvailability.start_datetime}
                                                onChange={handleChange}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="end_datetime" className="mb-3 block text-base font-medium text-[#07074D]">
                                                End DateTime:
                                            </label>
                                            <input
                                                id="end_datetime"
                                                name="end_datetime"
                                                type="datetime-local"
                                                value={editingAvailability.end_datetime}
                                                onChange={handleChange}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="days_supported" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Days Supported (comma separated):
                                            </label>
                                            <input
                                                id="days_supported"
                                                name="days_supported"
                                                type="text"
                                                value={editingAvailability.days_supported.join(', ')}
                                                onChange={handleChange}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="services" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Services (comma separated):
                                            </label>
                                            <input
                                                id="services"
                                                name="services"
                                                type="text"
                                                value={editingAvailability.services.join(', ')}
                                                onChange={handleChange}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="available" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Available:
                                            </label>
                                            <input
                                                id="available"
                                                name="available"
                                                type="checkbox"
                                                checked={editingAvailability.available}
                                                onChange={(e) => setEditingAvailability((prev) => ({ ...prev, available: e.target.checked }))}
                                                className="rounded border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        <div className="flex space-x-4">
                                            <button
                                                type="submit"
                                                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                                Update
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="hover:shadow-form w-full rounded-md bg-gray-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-base font-medium text-[#6B7280]">User ID: {availability.uid}</p>
                                            <p className="text-base font-medium text-[#6B7280]">Business ID: {availability.business}</p>
                                            <p className="text-base font-medium text-[#6B7280]">Start: {new Date(availability.start_datetime).toLocaleString()}</p>
                                            <p className="text-base font-medium text-[#6B7280]">End: {new Date(availability.end_datetime).toLocaleString()}</p>
                                            <p className="text-base font-medium text-[#6B7280]">Days Supported: {availability.days_supported.join(', ')}</p>
                                            <p className="text-base font-medium text-[#6B7280]">Services: {availability.services.join(', ')}</p>
                                            <p className="text-base font-medium text-[#6B7280]">Available: {availability.available ? 'Yes' : 'No'}</p>
                                        </div>
                                        <button
                                            onClick={() => handleEdit(availability)}
                                            className="ml-4 rounded-md bg-[#6A64F1] py-2 px-4 text-base font-semibold text-white hover:bg-[#5852d6]"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-base font-medium text-[#6B7280]">No availabilities found.</p>
                    )}
                </div>
            </div>
        </div>
        <BusinessFooter />
        </div>
    );
}

export default UpdateAvailability;
