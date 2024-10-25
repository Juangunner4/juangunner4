import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import web2Image from '../assets/profile.png';
import web3Image from '../assets/web3.png';

const Navbar = () => {
  const location = useLocation();
  const [currentImage, setCurrentImage] = useState(web2Image);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    if (location.pathname === '/web3') {
      setCurrentImage(web3Image);
    } else {
      setCurrentImage(web2Image);
    }
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">

      <div className="navbar-left">
        <img src={currentImage} alt="Profile" className="navbar-pfp" />
      </div>



      <div className={`navbar-right ${isMobileMenuOpen ? 'show' : ''}`}>
        <Link to="/web2" onClick={toggleMobileMenu}>Web2</Link>
        <Link to="/web3" onClick={toggleMobileMenu}>Web3</Link>
        <Link to="/about" onClick={toggleMobileMenu}>About</Link>
        <Link to="/projects" onClick={toggleMobileMenu}>Projects</Link>
      </div>

      <button className="hamburger" onClick={toggleMobileMenu}>
        ☰
      </button>


      {isMobileMenuOpen && <div className="mobile-overlay" onClick={toggleMobileMenu}></div>}
    </nav>
  );
};

export default Navbar;
