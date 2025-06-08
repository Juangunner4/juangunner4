import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import web2Image from '../assets/profile.png';
import web3Image from '../assets/web3.jpg';

const Navbar = () => {
  const [currentImage, setCurrentImage] = useState(web2Image);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleProfileImage = () => {
    setCurrentImage((prevImage) => (prevImage === web2Image ? web3Image : web2Image));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={currentImage}
          alt="Profile"
          className="navbar-pfp"
          onClick={toggleProfileImage}
        />
      </div>

      <div className={`navbar-right ${isMobileMenuOpen ? 'show' : ''}`}>
        <Link to="/" >Home</Link>
        <Link to="/booknow" >Book Now</Link>
        <Link to="/about" >About</Link>
        <Link to="/projects" >Projects</Link>
      </div>

      <button className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </button>


      {isMobileMenuOpen && <div className="mobile-overlay" onClick={toggleMobileMenu}></div>}
    </nav>
  );
};

export default Navbar;
