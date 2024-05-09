import axios from 'axios';

export async function fetchServiceInfo(serviceId) {
    try {
        const response = await axios.post('http://localhost:5000/services/info', {
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
