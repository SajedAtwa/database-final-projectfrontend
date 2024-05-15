import React from 'react';
import '../../static/css/clean_touch/Footer.css';

function BusinessFooter() {
  return (
    <footer className="sticky-footer text-sm py-2">
      <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
    </footer>
  );
}

export default BusinessFooter;
