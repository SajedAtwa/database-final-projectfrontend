import axios from 'axios';

export async function dbSignIn(password, email) {

    const submission = {
        'username': email,
        'password': password,
    };

    try {
        const response = await axios.post('http://127.0.0.1:5000/users/signin', submission);

        const uid = response.data.uid;
        const error = response.data.error;

        if (error) {
            console.error('SignIn error:', error);
            return [null, password, error];
        }

        console.log('SignIn successful. User ID:', uid);
        return [uid, password, null];

    } catch (error) {
        console.error('SignIn request failed:', error);
        return [null, password, error.message || 'Unknown error'];
    }
}
