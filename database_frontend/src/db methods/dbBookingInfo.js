import axios from 'axios';

export async function fetchBookingInfo(bookingId, userId, password) {
    try {
        const response = await axios.post('http://localhost:5000/bookings/info', {
            uid: userId,
            id: bookingId,
            password: password
        });
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        return { ...response.data, id: bookingId };
    } catch (error) {
        console.error('Error fetching booking details:', error);
        throw error;
    }
}

