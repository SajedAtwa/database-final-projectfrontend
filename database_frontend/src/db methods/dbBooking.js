import axios from 'axios';

// Function to create a booking
export async function createBooking(bookingDetails, userCredentials) {
    try {
        const { uid, hash } = userCredentials;

        const data = {
            ...bookingDetails,
            uid,
            key: hash,
        };

        const response = await axios.post(`http://127.0.0.1:5000/bookings/create`, data);

        if (response.data.error) {
            console.error('Create Booking error:', response.data.error);
            return null;
        }

        console.log('Booking created successfully:', response.data);
        return response.data;

    } catch (error) {
        console.error('Create Booking request failed:', error);
        throw error;
    }
}

// Function to get a list of bookings
export async function getBookings(userCredentials) {
    try {
        const { uid, hash } = userCredentials;

        const response = await axios.post(`${API_URL}/bookings/list`, { uid, key: hash });

        if (response.data.error) {
            console.error('Get Bookings error:', response.data.error);
            return [];
        }

        console.log('Bookings retrieved successfully:', response.data);
        return response.data.bookings;

    } catch (error) {
        console.error('Get Bookings request failed:', error);
        throw error;
    }
}

