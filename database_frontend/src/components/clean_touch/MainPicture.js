import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for routing
import background_1 from '../../static/images/clean_touch/background_1.jpeg';
import background_2 from '../../static/images/clean_touch/background_2.jpg';
import background_3 from '../../static/images/clean_touch/background_3.jpg';

function MainPicture() {
    const handleSearch = (searchTerm, location) => {
        console.log(`Searching for: ${searchTerm} in ${location}`);
    };

    return (
        <div id="carouselExampleIndicators" className="carousel slide clean_touch-main-picture-container">
            <div className="clean_touch-search-bar">
                <Link to="/clean_touch/search" className="btn btn-primary">Go to Search</Link>
            </div>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner" style={{ position: "relative" }}>
                <div>
                    <div className="carousel-item active">
                        <img src={background_1} className="d-block w-100" style={{ height: '80vh' }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={background_2} className="d-block w-100" style={{ height: '80vh' }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={background_3} className="d-block w-100" style={{ height: '80vh' }} alt="..." />
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default MainPicture;
