import React from 'react';
import '../static/css/CategoryList.css';
import image from '../static/images/screen.png';
import image2 from '../static/images/battery.png';
import image3 from '../static/images/water_damage.png';

import { Link } from 'react-router-dom';

function CategoryList() {
  const categories = [
    { 
      name: 'Screen Replacement', 
      icon: image,  
      linkName: '/repairservice'
    },
    { name: 
      'Battery Replacement', 
      icon: image2,
      linkName: '/repairservice'
    },
    { name: 'Water Damage Repair',
     icon: image3,
     linkName: '/repairservice'
    },
    { 
      name: 'Software Troubleshooting', 
      icon: '/path-to-icons/software-troubleshooting.svg',
      linkName: '/repairservice'
    },
    { name: 'Hardware Upgrades', 
    icon: '/path-to-icons/hardware-upgrades.svg',
    linkName: '/repairservice' 
  },
    { name: 'Data Recovery', 
    icon: '/path-to-icons/data-recovery.svg',
    linkName: '/repairservice'
  },
    { name: 'Charging Port Repair', 
    icon: '/path-to-icons/charging-port-repair.svg',
    linkName: '/repairservice'
  },
    { name: 'Camera Repair', 
    icon: '/path-to-icons/camera-repair.svg',
    linkName: '/repairservice' 
  },
    ];

  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <div key={index} className="category">
          <Link to={category.linkName} className=''> 
          <img src={category.icon} alt={`${category.name} Icon`} />
          <span>{category.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
