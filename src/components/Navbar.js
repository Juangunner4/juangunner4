import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import web2Image from '../assets/profile.png'; // PFP for Web2
import web3Image from '../assets/web3.png'; // PFP for Web3

const Navbar = () => {
  const location = useLocation(); // React Router hook to get the current route
  const [currentImage, setCurrentImage] = useState(web2Image); // Default PFP

  // Update PFP based on the current route
  useEffect(() => {
    if (location.pathname === '/web3') {
      setCurrentImage(web3Image); // Change to Web3 PFP
    } else {
      setCurrentImage(web2Image); // Change to Web2 PFP
    }
  }, [location]);

  const [isTabHovered, setTabHovered] = useState(false);

  return (
    <nav
      className="navbar"
      onMouseEnter={() => setTabHovered(true)}
      onMouseLeave={() => setTabHovered(false)}
    >
      {/* Left Side: Profile Picture */}
      <div className="navbar-left">
        <img src={currentImage} alt="Profile" className="navbar-pfp" />
      </div>

      {/* Middle Section: Web2 and Web3 Tabs */}
      <div className={`navbar-tabs ${isTabHovered ? 'show-tabs' : ''}`}>
        <Link to="/web2" className="tab-btn">Web2</Link>
        <Link to="/web3" className="tab-btn">Web3</Link>
      </div>

      {/* Right Side: About and Projects */}
      <div className="navbar-right">
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <button className="hamburger">☰</button>
    </nav>
  );
};

export default Navbar;
