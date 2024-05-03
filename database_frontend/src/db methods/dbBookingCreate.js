import axios from 'axios';

export async function createBooking(bookingDetails) {
    try {
        const response = await axios.post(`http://localhost:5000/bookings/create`, bookingDetails, {
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create booking:', error);
        throw error;
    }
}
