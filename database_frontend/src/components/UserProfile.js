import React, { useState } from 'react';
import '../static/css/UserProfile.css';

function UserProfile({ user, onSaveProfile }) {
    const [isEditing, setIsEditing] = useState(false);
    const [localUser, setLocalUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalUser({ ...localUser, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        onSaveProfile(localUser);
        setIsEditing(false);
    };

    const renderEditView = () => {
        return (
            <>
                <input
                    type="file"
                    name="avatar"
                    onChange={(e) => {
                        const avatar = e.target.files[0];
                        setLocalUser((prevState) => ({ ...prevState, avatar }));
                    }}
                />
                <input
                    type="text"
                    name="username"
                    value={localUser.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email (optional)"
                    value={localUser.email || ''}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="contact"
                    placeholder="Phone number (optional)"
                    value={localUser.contact || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address (optional)"
                    value={localUser.address || ''}
                    onChange={handleChange}
                />
                <button onClick={handleSaveChanges}>Save Changes</button>
            </>
        );
    };

    const renderDefaultView = () => {
        return (
            <>
                {user.avatar && <img src={URL.createObjectURL(user.avatar)} alt="Profile" />}
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
                <p><strong>Contact:</strong> {user.contact || 'Not provided'}</p>
                <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
                <button onClick={handleEdit}>Edit Profile</button>
            </>
        );
    };

    return (
        <aside className="user-profile-sidebar">
            <h2>Profile</h2>
            <div className="user-profile-info">
                {isEditing ? renderEditView() : renderDefaultView()}
            </div>
        </aside>
    );
}

export default UserProfile;
