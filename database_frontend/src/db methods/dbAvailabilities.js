import axios from 'axios';

export async function fetchbusinessInfo(businessId) {
    console.log(`Fetching info for business ID: ${businessId}`);
  try {
    const response = await axios.post('http://localhost:5000/users/info', {
        params: { id: businessId }  // Sending the business ID with the correct key 'id' expected by the backend
    });

    if (response.data.error) {
      console.error('Fetching business info error:', response.data.error);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Request to fetch business info failed:', error);
    throw error;
  }
}
