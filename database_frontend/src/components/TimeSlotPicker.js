import React, { useState } from 'react';

function TimeSlotPicker({ timeSlots, onTimeSlotSelect }) {
    // timeSlots would be an array of date-time strings

    return (
        <div className="time-slot-picker">
            {timeSlots.map((timeSlot, index) => (
                <button key={index} onClick={() => onTimeSlotSelect(timeSlot)}>
                    {new Date(timeSlot).toLocaleTimeString()}
                </button>
            ))}
        </div>
    );
}

export default TimeSlotPicker;
