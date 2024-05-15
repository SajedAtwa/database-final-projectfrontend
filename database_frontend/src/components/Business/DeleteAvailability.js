import React, { useEffect, useState } from 'react';
import BusinessHeader from './Header';  // Adjust the path as needed
import BusinessFooter from './Footer';  // Adjust the path as needed

function DeleteAvailability() {
    const [availabilities, setAvailabilities] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleDelete = async (uid) => {
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Simulate successful deletion
            setAvailabilities((prev) => prev.filter((av) => av.uid !== uid));
            setSuccessMessage('Availability deleted successfully!');
        } catch (error) {
            setErrorMessage('There was a problem deleting the availability.');
        }
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
                            <div key={availability.uid} className="flex items-center justify-between p-4 mb-4 border-b border-[#e0e0e0]">
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
                                    onClick={() => handleDelete(availability.uid)}
                                    className="ml-4 rounded-md bg-red-600 py-2 px-4 text-base font-semibold text-white hover:bg-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-base font-medium text-[#6B7280]">No availabilities found.</p>
                    )}
                </div>
            </div>
        </div><BusinessFooter />
        </div>
    );
}

export default DeleteAvailability;
