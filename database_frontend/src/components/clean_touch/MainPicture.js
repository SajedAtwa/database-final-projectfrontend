import React from 'react';
import background_1 from '../../static/images/clean_touch/background_1.jpeg';
import background_2 from '../../static/images/clean_touch/background_2.jpg';
import background_3 from '../../static/images/clean_touch/background_3.jpg';
import MainSearchBar from '../MainSearchBar';   


function MainPicture() {
    const handleSearch = (searchTerm, location) => {
        console.log(`Searching for: ${searchTerm} in ${location}`);
    };


        return (
            <div id="carouselExampleIndicators" class="carousel slide clean_touch-main-picture-container">
                <div className="clean_touch-search-bar">
                            <MainSearchBar onSearch={handleSearch} /></div>

                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner" style={{position:"relative"}}>
                    <div>
                        <div class="carousel-item active">
                            <img src={background_1} class="d-block w-100  " style={{height: '80vh'}}  alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={background_2} class="d-block w-100" style={{height: '80vh'}}  alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={background_3} class="d-block w-100" style={{height: '80vh'}} alt="..." />
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                
            </div>
        );
  }
  
  export default MainPicture;