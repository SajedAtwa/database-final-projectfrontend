import React, { useState, useEffect } from "react";

function CleanTouchHeader() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container mx-auto">
          <a className="navbar-brand" href="/">Clean Touch</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/features">Features</a>
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
