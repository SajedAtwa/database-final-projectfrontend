import axios from 'axios';

export async function fetchBookingDetails(bookingId) {
    try {
        const response = await axios.get(`http://localhost:5000/bookings/info?id=${bookingId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching booking details:', error);
        throw error;
    }
}

export async function fetchBookings(userId, password) {
    try {
        const response = await axios.post('http://localhost:5000/bookings/list', {
            uid: userId,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.error) {
            console.error('Error fetching bookings:', response.data.error);
            throw new Error(response.data.error);
        }

        const bookingIds = response.data.bookings;

        // Fetch details for each booking
        const bookingDetailsPromises = bookingIds.map(bookingId => fetchBookingDetails(bookingId));

        // Wait for all promises to resolve
        const bookings = await Promise.all(bookingDetailsPromises);

        console.log('Bookings fetched successfully:', bookings);
        return bookings;
    } catch (error) {
        console.error('Error in fetchBookings:', error);
        throw error;
    }
}
