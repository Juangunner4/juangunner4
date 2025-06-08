import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../styles/Navbar.css';
import web2Image from '../assets/profile.png';
import web3Image from '../assets/web3.jpg';

const Navbar = () => {
  const [currentImage, setCurrentImage] = useState(web2Image);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleProfileImage = () => {
    setCurrentImage((prevImage) => (prevImage === web2Image ? web3Image : web2Image));
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
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

      <div className="navbar-right">
        <Link to="/" >Home</Link>
        <Link to="/booknow" >Book Now</Link>
        <Link to="/about" >About</Link>
        <Link to="/projects" >Projects</Link>
      </div>

      <button className="hamburger" onClick={toggleDrawer(true)}>
        ☰
      </button>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/booknow" onClick={toggleDrawer(false)}>
            <ListItemText primary="Book Now" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={toggleDrawer(false)}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} to="/projects" onClick={toggleDrawer(false)}>
            <ListItemText primary="Projects" />
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default Navbar;
