import axios from 'axios';
import { sha256 } from 'crypto-hash';

/**
 * Signs in a user by sending a request to the backend /users/signin endpoint.
 * 
 * @param {string} password - password provided by the user.
 * @param {string} email - username provided by the user.
 * @returns {Promise<[string, string, string|null]>} 
 */
export async function dbSignIn(password, email) {
    const password_hash = await sha256(password);

    const submission = {
        'username': email,
        'password_hash': password_hash,
    };

    try {
        const response = await axios.post('http://127.0.0.1:5000/users/signin', submission);

        const uid = response.data.uid;
        const error = response.data.error;

        if (error) {
            console.error('SignIn error:', error);
            return [null, password_hash, error];
        }

        console.log('SignIn successful. User ID:', uid);
        return [uid, password_hash, null];

    } catch (error) {
        console.error('SignIn request failed:', error);
        return [null, password_hash, error.message || 'Unknown error'];
    }
}
