import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import BusinessHeader from './Header';  // Adjust the path as needed
import BusinessFooter from './Footer';  // Adjust the path as needed

function CreateAvailability() {
    const history = useHistory(); // Initialize useHistory hook
    const [uid, setUid] = useState('');
    const [business, setBusiness] = useState('');
    const [startDatetime, setStartDatetime] = useState('');
    const [endDatetime, setEndDatetime] = useState('');
    const [daysSupported, setDaysSupported] = useState('');
    const [services, setServices] = useState('');
    const [available, setAvailable] = useState(true);
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCreate = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Simulate successful creation
            setSuccessMessage('Availability created successfully!');

            // Clear form fields after successful submission
            setUid('');
            setBusiness('');
            setStartDatetime('');
            setEndDatetime('');
            setDaysSupported('');
            setServices('');
            setAvailable(true);
            setPassword('');

            // Scroll back to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            setErrorMessage('There was a problem creating the availability.');
        }
    };

    const handleCancel = () => {
        history.push('/business'); // Navigate back to the business page
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
                                <label htmlFor="business" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Business ID:
                                </label>
                                <input
                                    id="business"
                                    name="business"
                                    type="text"
                                    value={business}
                                    onChange={(e) => setBusiness(e.target.value)}
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
                                <label htmlFor="daysSupported" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Days Supported (comma separated):
                                </label>
                                <input
                                    id="daysSupported"
                                    name="days_supported"
                                    type="text"
                                    value={daysSupported}
                                    onChange={(e) => setDaysSupported(e.target.value)}
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
                                    value={services}
                                    onChange={(e) => setServices(e.target.value)}
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
                                    checked={available}
                                    onChange={(e) => setAvailable(e.target.checked)}
                                    className="rounded border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
