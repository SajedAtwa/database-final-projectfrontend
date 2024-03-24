import React from 'react';
import '../static/css/InfoSection.css';

function InfoSection() {
    return (
        <section className="info-section">
            <h2>What is RepairWave?</h2>
            <p>Find and compare top local repair shops, check estimated costs of repairs, and book services anytime, anywhere.</p>
            <div className="info-points">
                <div className="info-point">
                    <span className="info-point-number">1</span>
                    <p>Search and compare repair solutions for your tech based on price, expertise, and user reviews.</p>
                </div>
                <div className="info-point">
                    <span className="info-point-number">2</span>
                    <p>Instantly book an appointment with your chosen repair shop with just a few clicks.</p>
                </div>
                <div className="info-point">
                    <span className="info-point-number">3</span>
                    <p>Manage your bookings, payments, and leave reviews all in one user-friendly platform.</p>
                </div>
            </div>
        </section>
    );
}

export default InfoSection;
