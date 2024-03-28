import React, { useState, useEffect } from 'react';
import '../static/css/UserProfileEdit.css';

function UserProfileEdit({ userId }) {
    const [userProfile, setUserProfile] = useState({
        username: '',
        profile: '',

    });

    useEffect(() => {
        // Fetch the current user profile
        const fetchUserProfile = async () => {
            const response = await fetch(`/users/info?uid=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.error) {
                console.error(data.error);
            } else {
                setUserProfile({
                    username: data.username,
                    profile: data.profile,

                });
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleChange = (e) => {
        setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Update user profile
        const response = await fetch('/users/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: userId,
                ...userProfile,
            }),
        });
        const data = await response.json();
        if (data.error) {
            console.error(data.error);
        } else {
            console.log('Profile updated successfully');

        }
    };

    return (
        <div className="user-profile-edit-container">
            <form onSubmit={handleSubmit} className="user-profile-edit-form">
                <h2>Edit Profile</h2>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={userProfile.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="profile">Profile:</label>
                    <textarea
                        id="profile"
                        name="profile"
                        value={userProfile.profile}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default UserProfileEdit;
