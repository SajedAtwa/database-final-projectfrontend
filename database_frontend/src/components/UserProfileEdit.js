import React, { useState } from 'react';
import '../static/css/UserProfileEdit.css';

function UserProfileEdit({ user, onSaveProfile }) {
    const [editUser, setEditUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveProfile(editUser);
    };

    return (
        <form onSubmit={handleSubmit} className="user-profile-edit-form">
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                name="username"
                type="text"
                value={editUser.username}
                onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                type="email"
                value={editUser.email}
                onChange={handleChange}
            />
            <label htmlFor="contact">Contact:</label>
            <input
                id="contact"
                name="contact"
                type="text"
                value={editUser.contact}
                onChange={handleChange}
            />
            <label htmlFor="address">Address:</label>
            <input
                id="address"
                name="address"
                type="text"
                value={editUser.address}
                onChange={handleChange}
            />
            <label htmlFor="avatar">Profile Picture:</label>
            <input
                id="avatar"
                name="avatar"
                type="file"
                onChange={(e) => {
                    const avatar = e.target.files[0];
                    setEditUser((prevState) => ({ ...prevState, avatar }));
                }}
            />
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default UserProfileEdit;
