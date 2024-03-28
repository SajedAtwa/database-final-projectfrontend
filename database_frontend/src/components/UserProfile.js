import React from 'react';
import '../static/css/UserProfile.css';

function UserProfile({ user, onUpdateProfile }) {

    const handleEditProfile = () => {
        // function will be called when the "Edit Profile" button is clicked.

        onUpdateProfile();
    };

    return (
        <aside className="user-profile-sidebar">
            <h2>Profile</h2>
            <div className="user-profile-info">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>

                <p><strong>Contact:</strong> {user.contact}</p>
                <p><strong>Address:</strong> {user.address}</p>

                <div className="user-profile-avatar">

                    <img src={user.avatar || 'default-avatar.png'} alt="User" />
                </div>

                <button className="user-profile-edit-btn" onClick={handleEditProfile}>
                    Edit Profile
                </button>
            </div>
        </aside>
    );
}

export default UserProfile;
