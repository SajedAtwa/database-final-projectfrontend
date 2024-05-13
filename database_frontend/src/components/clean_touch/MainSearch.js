import React, { useState } from 'react';
import CleanTouchHeader from './Header';
import CleanTouchFooter from './Footer';
import { dbSearch } from '../../db methods/dbSearch';

const VEHICLES = ["TOYOTA", "BMW", "VOLKSWAGEN", "HONDA", "FORD", "CHEVROLET", "NISSAN", "HYUNDAI"];
const SERVICES = ["DETAILING", "GENERAL_WASH", "BRAKE_FLUID"];

function MainSearch() {
    const [device, setDevice] = useState('');
    const [issue, setIssue] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('09:00');
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleSearch = async () => {
        if (!startDate || !startTime) {
            setError('Please fill in all date and time fields.');
            return;
        }

        const endDateObj = new Date(startDate);
        endDateObj.setDate(endDateObj.getDate() + 1);
        const formattedEndDate = endDateObj.toISOString().split('T')[0];
        const formattedEndTime = startTime;

        const formattedStartDateTime = `${startDate} ${startTime}:00.000`;
        const formattedEndDateTime = `${formattedEndDate} ${formattedEndTime}:00.000`;

        try {
            const data = await dbSearch({ device, device_repair: issue }, location, formattedStartDateTime, formattedEndDateTime);
            setSearchPerformed(true);
            if (data && data.businesses) {
                setSearchResults(data.businesses.map((id, index) => ({ id, distance: data.distances[index] })));
                setError('');
            } else {
                setSearchResults([]);
                setError('No data found.');
            }
        } catch (err) {
            setSearchResults([]);
            setError('Search request failed. Please try again later.');
        }
    };


    return (
        <div className="clean_touch-main-search">
            <CleanTouchHeader />
            <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="py-4 px-6">
                    <h1 className="text-2xl text-gray-900 font-bold text-center">Book Appointments with Nearby Repair Shops</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="mt-4">
                        <select className="shadow border rounded w-full py-2 px-3 text-gray-700" onChange={(e) => setDevice(e.target.value)} value={device}>
                            <option value="">Select a vehicle</option>
                            {VEHICLES.map((vehicle, index) => (
                                <option key={index} value={vehicle}>{vehicle}</option>
                            ))}
                        </select>
                        <select className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-4" onChange={(e) => setIssue(e.target.value)} value={issue}>
                            <option value="">Select a service</option>
                            {SERVICES.map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                            ))}
                        </select>
                        <input type="text" placeholder="Enter Your ZipCode" className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-4" onChange={(e) => setLocation(e.target.value)} defaultValue={location} />
                        <input type="date" className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-4" onChange={(e) => setStartDate(e.target.value)} defaultValue={startDate} />
                        <input type="time" className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-4" onChange={(e) => setStartTime(e.target.value)} defaultValue={startTime} />
                        <button className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline w-full mt-4" onClick={handleSearch}>
                            Search
                        </button>
                    </div>

                </div>


            </div>

            <div className="white-space"></div>
            <div className="white-space"></div>
            <div className="white-space"></div>
            <div className="white-space"></div>


            <h2 className="text-2xl text-gray-900 font-bold text-center">Search Results</h2>

            <div className="search-results mt-4">
                {searchPerformed && searchResults.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                    {searchResults.map((result, index) => (
                        <li key={result.id} className={`flex justify-between gap-x-6 py-5 ${index !== 0 ? 'mt-4' : ''}`}>
                            <div className="flex min-w-0 gap-x-4">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="path_to_some_default_vehicle_image" alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">Business ID: {result.id}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">Distance: {result.distance.toFixed(2)} meters</p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">Service Details</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">Available Appointments</p>
                            </div>
                        </li>
                    ))}
                </ul>
                
                ) : searchPerformed && searchResults.length === 0 ? <p></p> : null}
            </div>
            <div className="white-space"></div>
            <div className="white-space"></div>
            <div className="white-space"></div>
            <div className="white-space"></div>
            <div className="white-space"></div>
            <CleanTouchFooter />
        </div>

    );
}

export default MainSearch;
