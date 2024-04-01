import React from 'react';

function BookingConfirmation({ bookingDetails, onConfirm, onCancel }) {
    // bookingDetails contains the summary of the booking
    // including service, time, shop details, etc.

    return (
        <div className="booking-confirmation">
            <h2>Booking Summary</h2>
            <p>Service: {bookingDetails.service}</p>
            <p>Date: {new Date(bookingDetails.date).toLocaleDateString()}</p>
            <p>Time: {new Date(bookingDetails.time).toLocaleTimeString()}</p>
            <p>Shop: {bookingDetails.shopName}</p>
            <p>Location: {bookingDetails.location}</p>


            {/* Confirmation and Cancel buttons */}
            <div className="actions">
                <button onClick={onConfirm}>Confirm Booking</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default BookingConfirmation;
