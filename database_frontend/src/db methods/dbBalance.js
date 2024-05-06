// dbBalance.js
import axios from 'axios';

// Function to initialize the balance for a user
export const initializeBalance = async (uid, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/balance/init`, { uid, password });
        console.log('Initializing balance:', response.data);

        if (response.data.error) {
            console.error('Error from backend:', response.data.error);
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error initializing balance:', error);
        throw error;
    }
};
