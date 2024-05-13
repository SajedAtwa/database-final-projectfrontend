import axios from 'axios';
import process from 'process';

export async function fetchServiceInfo(serviceId) {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        const response = await axios.post(`${backendServer}/services/info`, {
            id: serviceId 
        });
        if (response.data.error) {
            console.error('Error fetching service info:', response.data.error);
            throw new Error(response.data.error);
        }
        return response.data; 
    } catch (error) {
        console.error('Error in fetchServiceInfo:', error);
        throw error;  
    }
}
