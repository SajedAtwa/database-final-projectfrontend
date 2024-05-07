import axios from 'axios';

// Assuming you're fetching userId and password the same way you do for booking creation
export async function fetchBookings(userId, password) {
    try {
        const response = await axios.post('http://localhost:5000/bookings/list', {
            uid: userId,  // user ID
            password: password  // password needs to be included if backend expects it
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data.error) {
            console.error('Error fetching bookings:', response.data.error);
            throw new Error(response.data.error);
        }

        console.log('Bookings fetched successfully:', response.data);
        return response.data.bookings; // Adjust based on actual API response
    } catch (error) {
        console.error('Error in fetchBookings:', error);
        throw error;
    }
}