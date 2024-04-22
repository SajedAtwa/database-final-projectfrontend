import axios from 'axios';

export async function dbSignUp(password, email) {

    const submission = {
        'username': email,
        'password': password,
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
        return [uid, password, null];

    } catch (error) {

        console.error('SignUp request failed:', error);
        return [null, null, error.message || 'Unknown error'];
    }
}
