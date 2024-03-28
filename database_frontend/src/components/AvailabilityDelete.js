import React from 'react';
import '../static/css/AvailabilityDelete.css';

function AvailabilityDelete({ availabilityId, onDeletionSuccess }) {
    const handleDelete = async () => {
        const response = await fetch(`/availabilities/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: availabilityId }),
        });
        const data = await response.json();
        if (!data.error) {
            console.log('Availability deleted successfully');
            onDeletionSuccess();
        } else {
            console.error('Failed to delete availability:', data.error);
        }
    };

    return (
        <button className="availability-delete-button" onClick={handleDelete}>
            Delete Availability
        </button>
    );
}

export default AvailabilityDelete;
