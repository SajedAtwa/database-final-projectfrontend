import axios from 'axios';
import process from 'process';

// Fetch bookings for a business
export const fetchBusinessBookings = async (businessId) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000';
        const response = await axios.post(`${backendServer}/bookings/business`, { businessId });
        console.log('Business bookings fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching business bookings:', error);
        throw error;
    }
};

// Cancel a booking for a business
export const cancelBusinessBooking = async (businessId, bookingId, password) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000';
        const response = await axios.post(`${backendServer}/bookings/cancel`, {
            businessId,
            bookingId,
            password
        });
        if (response.data.error) {
            console.error('Error cancelling booking:', response.data.error);
            throw new Error(response.data.error);
        }
        return response.data;
    } catch (error) {
        console.error('Error in cancelBusinessBooking:', error);
        throw error;
    }
};

export default { fetchBusinessBookings, cancelBusinessBooking };
