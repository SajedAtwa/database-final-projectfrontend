import React from 'react';
import '../../static/css/clean_touch/Footer.css';

function CleanTouchFooter() {
  return (
    <footer className="sticky-footer">
      <p>&copy; {new Date().getFullYear()} Clean Touch</p>
    </footer>
  );
}

export default CleanTouchFooter;
