import React, { useEffect, useState } from 'react';
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
  const [floatingMessage, setFloatingMessage] = useState(null);
  const { t, i18n } = useTranslation();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const web2Messages = [
      'Hi',
      'Click me',
      'Come on you gunners',
      'Trakas',
      'Odiame Mas',
      'Arriba las Aguilas',
    ];
    const web3Messages = ['GmGn', '$JUAN', '$troll', '$peri', '$sns', '$doggy', '$mask'];
    const sequence = isWeb3 ? web3Messages : web2Messages;

    if (sequence.length === 0) return undefined;

    let index = 0;
    let intervalId = null;
    let removalTimeoutId = null;

    const showNext = () => {
      const message = sequence[index];
      setFloatingMessage({
        value: message,
        key: `${isWeb3 ? 'web3' : 'web2'}-${index}-${Date.now()}`,
      });
      index += 1;

      if (index >= sequence.length) {
        if (intervalId) clearInterval(intervalId);
        removalTimeoutId = setTimeout(() => {
          setFloatingMessage(null);
        }, 2000);
      }
    };

    showNext();
    intervalId = setInterval(() => {
      if (index < sequence.length) {
        showNext();
      }
    }, 2000);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (removalTimeoutId) clearTimeout(removalTimeoutId);
      setFloatingMessage(null);
    };
  }, [isWeb3]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="navbar-pfp-btn"
          onClick={toggleProfile}
          aria-label={t('navbar.profile')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <div className="pfp-wrapper">
            <img
              src={currentImage}
              alt={t('navbar.profile')}
              className="navbar-pfp"
              draggable="false"
            />
            {floatingMessage && (
              <span key={floatingMessage.key} className="pfp-float-text">
                {floatingMessage.value}
              </span>
            )}
            <span className="pfp-tag">{isWeb3 ? t('navbar.web3') : t('navbar.web2')}</span>
          </div>
        </button>
      </div>

      <div className="desktop-lang">
        <button onClick={() => i18n.changeLanguage('en')} className="lang-btn">
          {t('navbar.langEn')}
        </button>
        <button onClick={() => i18n.changeLanguage('es')} className="lang-btn">
          {t('navbar.langEs')}
        </button>
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
