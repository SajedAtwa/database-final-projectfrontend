
import React from 'react';
import CleanTouchHeader from './Header';
import MainPicture from './MainPicture';
import CleanTouchCategoryList from './CategoryList';
import CleanTouchFooter from './Footer';
import '../../static/css/clean_touch/HomePage.css';

function CleanTouchHomePage() {
    
    return (
        <div className="clean_touch-home-page">

            <CleanTouchHeader />
            <MainPicture className="clean_touch-main-picture"/>

            
            <div className="clean_touch-category-section">
                <h2>Popular dealers near you</h2>
                <CleanTouchCategoryList />
            </div>
            <CleanTouchFooter />
        </div>
    );
}

export default CleanTouchHomePage;
