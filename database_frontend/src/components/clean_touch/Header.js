import React, { useState, useEffect } from "react";

function CleanTouchHeader() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container mx-auto">
          <a className="navbar-brand" href="/">Clean Touch</a>
          
          <div className="" id="navbarNav">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="/clean_touch">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/clean_touch/aboutUs">About us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signIn">Sign in</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signUp">Sign up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default CleanTouchHeader;