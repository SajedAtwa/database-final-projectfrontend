import axios from 'axios';
import process from 'process';

export async function createBusinessAvailability(businessId, availabilityDetails, password) {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        console.log('Requesting to create availability with details:', businessId, availabilityDetails);
        const { start_datetime, end_datetime, start_time, end_time, services, device } = availabilityDetails;
        const response = await axios.post(`${backendServer}/availabilities/create`, {
            uid: businessId, 
            start_datetime,
            end_datetime,
            start_time,
            end_time,
            services,
            device,
            password
        });
        console.log('Response from creating availability:', response.data);

        if (response.data.error) {
            console.error('Error from backend:', response.data.error);
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error creating availability:', error);
        throw error;
    }
}


export const updateBusinessAvailability = async (uid, availabilityId, updatedDetails, password) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000';
        const response = await axios.post(`${backendServer}/availabilities/update`, {
            uid,
            availabilityId,
            ...updatedDetails,
            password
        });
        console.log('Availability updated:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating availability:', error);
        throw error;
    }
};

export const deleteBusinessAvailability = async (uid, availabilityId, password) => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000';
        const response = await axios.post(`${backendServer}/availabilities/delete`, {
            uid,
            availabilityId,
            password
        });
        console.log('Availability deleted:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting availability:', error);
        throw error;
    }
};

export async function listBusinessAvailabilities(businessId, password) {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000'; 
        console.log('Requesting to list availabilities for business:', businessId);
        const response = await axios.post(`${backendServer}/availabilities/list`, {
            uid: businessId,
            password
        });
        console.log('Response from listing availabilities:', response.data);

        if (response.data.error) {
            console.error('Error from backend:', response.data.error);
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Error listing availabilities:', error);
        throw error;
    }
}

export default { createBusinessAvailability, updateBusinessAvailability, deleteBusinessAvailability, listBusinessAvailabilities };
