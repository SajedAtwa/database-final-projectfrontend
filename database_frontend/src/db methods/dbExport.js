// dbExport.js
import axios from 'axios';
import process from 'process';

// Function to call the export endpoint
export const exportDatabase = async (uid, password, start_datetime, end_datetime, timezone = 'UTC') => {
    try {
        const backendServer = process.env.BACKEND_SERVER || 'http://localhost:5000';
        const response = await axios.post(`${backendServer}/tables/export`, {
            uid,
            password,
            start_datetime,
            end_datetime,
            timezone,
        });
        console.log('Database exported:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error exporting database:', error);
    }
};

export default { exportDatabase };
