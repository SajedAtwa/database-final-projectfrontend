import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../static/css/SignUp.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSignUp = async (event) => {
        event.preventDefault();
        setError('');

        const hashedPassword = password;

        try {
            const response = await fetch('http://127.0.0.1:5000/users/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password_hash: hashedPassword }),
            });

            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                // Redirect to sign-in with a state parameter that includes a success message
                history.push({
                    pathname: '/signin',
                    state: { successMessage: 'Sign up successful. Please sign in.' }
                });
            }
        } catch (error) {
            console.error('Sign up failed:', error);
            setError('Sign up failed. Please try again later.');
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignUp} className="signup-form">
                <h2>Sign Up</h2>
                {error && <div className="signup-error">{error}</div>}
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
