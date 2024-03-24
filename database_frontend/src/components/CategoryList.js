import React from 'react';
import '../static/css/CategoryList.css';
import image from '../static/images/screen_replace.png';
import image2 from '../static/images/battery.png';

function CategoryList() {
  const categories = [
    { name: 'Screen Replacement', icon: image },
    { name: 'Battery Replacement', icon: image2 },
    { name: 'Water Damage Repair', icon: '/path-to-icons/water-damage-repair.svg' },
    { name: 'Software Troubleshooting', icon: '/path-to-icons/software-troubleshooting.svg' },
    { name: 'Hardware Upgrades', icon: '/path-to-icons/hardware-upgrades.svg' },
    { name: 'Data Recovery', icon: '/path-to-icons/data-recovery.svg' },
    { name: 'Charging Port Repair', icon: '/path-to-icons/charging-port-repair.svg' },
    { name: 'Camera Repair', icon: '/path-to-icons/camera-repair.svg' }
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
