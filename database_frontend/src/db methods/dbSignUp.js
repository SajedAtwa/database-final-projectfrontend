import axios from 'axios';
import { sha256 } from 'crypto-hash';

/**
 * Signs up a new user by sending their details to the backend /users/create endpoint.
 *
 * @param {string} password - password provided by the user.
 * @param {string} email - email provided by the user as username.
 * @returns {Promise<[string|null, string|null, string|null]>} 
 */
export async function dbSignUp(password, email) {
    const password_hash = await sha256(password);

    const submission = {
        'username': email,
        'password_hash': password_hash,
    };

    try {
        const response = await axios.post('http://127.0.0.1:5000/users/create', submission);

        const uid = response.data.uid;
        const error = response.data.error;

        if (error) {
            console.error('SignUp error:', error);
            return [null, null, error];
        }

        console.log('SignUp successful. User ID:', uid);
        return [uid, password_hash, null];

    } catch (error) {

        console.error('SignUp request failed:', error);
        return [null, null, error.message || 'Unknown error'];
    }
}
