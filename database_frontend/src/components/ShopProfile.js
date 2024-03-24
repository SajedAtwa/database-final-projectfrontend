import React from 'react';

function ShopProfile({ shop }) {
    // shop is an object containing detailed info about the shop

    return (
        <div className="shop-profile">
            <h2>{shop.name}</h2>
            <p>{shop.description}</p>
            {/* Other details and actions like booking */}
        </div>
    );
}

export default ShopProfile;
