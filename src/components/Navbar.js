import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../styles/Navbar.css';
import web2Image from '../assets/profile.png';
import web3Image from '../assets/web3.jpg';
import { useProfile } from '../ProfileContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { isWeb3, toggleProfile } = useProfile();
  const currentImage = isWeb3 ? web3Image : web2Image;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t, i18n } = useTranslation();

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
          onClick={toggleProfile}
        />
      </div>

      <div className="mobile-lang">
        <button onClick={() => i18n.changeLanguage('en')} className="lang-btn">
          {t('navbar.langEn')}
        </button>
        <button onClick={() => i18n.changeLanguage('es')} className="lang-btn">
          {t('navbar.langEs')}
        </button>
      </div>

      <div className="navbar-right">
        <Link to="/" >{t('navbar.home')}</Link>
        <Link to="/booknow" >{t('navbar.bookNow')}</Link>
        <Link to="/about" >{t('navbar.about')}</Link>
        <Link to="/projects" >{t('navbar.projects')}</Link>
        <button onClick={() => i18n.changeLanguage('en')} className="lang-btn">
          {t('navbar.langEn')}
        </button>
        <button onClick={() => i18n.changeLanguage('es')} className="lang-btn">
          {t('navbar.langEs')}
        </button>
      </div>

      <button className="hamburger" onClick={toggleDrawer(true)}>
        ☰
      </button>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.home')} />
          </ListItem>
          <ListItem button component={Link} to="/booknow" onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.bookNow')} />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.about')} />
          </ListItem>
          <ListItem button component={Link} to="/projects" onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.projects')} />
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default Navbar;
