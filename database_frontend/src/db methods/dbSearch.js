// dbSearch.js
import axios from 'axios';

export async function dbSearch(issue, zipCode, startDateTime, endDateTime) {
    const submission = {
        issue,
        zip_code: zipCode,
        start_datetime: startDateTime,
        end_datetime: endDateTime,
    };

    try {
        const response = await axios.post('http://localhost:5000/availabilities/search', submission);


        if (response.data.error) {
            throw new Error(response.data.error);
        }

        return response.data;
    } catch (error) {
        console.error('Search request failed:', error);
        throw error;
    }
}
