import axios from 'axios';
import process from 'process';

// Function to view the balance of a business
export const viewBusinessBalance = async (businessId, password) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000';
        const response = await axios.post(`${backendServer}/balance/view`, { businessId, password });
        console.log('Viewing business balance:', response.data);

        if (response.data.error) {
            console.error('Error from backend:', response.data.error);
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error viewing business balance:', error);
        throw error;
    }
};

// Import money to the business balance
export const importToBusinessBalance = async (businessId, password, amount) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000';
        const response = await axios.post(`${backendServer}/balance/import`, { businessId, password, amount });
        console.log('Importing to business balance:', response.data);

        if (response.data.error) {
            console.error('Error from backend:', response.data.error);
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error importing to business balance:', error);
        throw error;
    }
};

// Export money from the business balance
export const exportFromBusinessBalance = async (businessId, password, amount) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000';
        const response = await axios.post(`${backendServer}/balance/export`, { businessId, password, amount });
        console.log('Exporting from business balance:', response.data);

        if (response.data.error) {
            if (response.data.error === 'NOT_ENOUGH_MONEY') {
                console.error('Error: Not enough money to export.');
            } else {
                console.error('Error from backend:', response.data.error);
            }
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error exporting from business balance:', error);
        throw error;
    }
};

export default { viewBusinessBalance, importToBusinessBalance, exportFromBusinessBalance };
