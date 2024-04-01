import React from 'react';
import '../static/css/CategoryList.css';
import image from '../static/images/screen.png';
import image2 from '../static/images/battery.png';
import image3 from '../static/images/water_damage.png';
import image4 from '../static/images/camera.png';
import image5 from '../static/images/keyboard.png';
import image6 from '../static/images/charging_port.png';

function CategoryList() {
  const categories = [
    { name: 'Screen Replacement', icon: image },
    { name: 'Battery Replacement', icon: image2 },
    { name: 'Water Damage Repair', icon: image3 },
    { name: 'Keyboard Repair', icon: image5 },
    { name: 'Tablet Repair', icon: '/path-to-icons/hardware-upgrades.svg' },
    { name: 'Laptop Repair', icon: '/path-to-icons/data-recovery.svg' },
    { name: 'Charging Port Repair', icon: image6 },
    { name: 'Camera Repair', icon: image4 }
  ];

  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <div key={index} className="category">
          <img src={category.icon} alt={`${category.name} Icon`} />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
