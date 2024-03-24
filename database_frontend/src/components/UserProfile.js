import React from 'react';

function UserProfile({ user, onSaveProfile }) {
    // user contains the user profile details
    // onSaveProfile is a function to save the edited profile

    return (
        <div className="user-profile">
            <h2>Profile</h2>
            {/* Display user profile details */}
            <button onClick={() => onSaveProfile(user)}>Save Profile</button>
        </div>
    );
}

export default UserProfile;
