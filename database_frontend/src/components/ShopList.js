import React from 'react';

function ShopList({ shops, onSelectShop }) {
    // shops would be an array of objects containing shop details

    return (
        <div className="shop-list">
            {shops.map((shop, index) => (
                <div key={index} className="shop-item" onClick={() => onSelectShop(shop)}>
                    <h3>{shop.name}</h3>
                    <p>{shop.description}</p>
                    {/* Other details */}
                </div>
            ))}
        </div>
    );
}

export default ShopList;
