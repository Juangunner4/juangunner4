import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../styles/Navbar.css';
import web2Image from '../assets/profile.png';
import web3Image from '../assets/web3.jpg';
import { useProfile } from '../ProfileContext';
import { useTranslation } from 'react-i18next';
import { buildProfileAwarePath, getProfileBasePath } from '../utils/profileRouting';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';

const Navbar = () => {
  const { isWeb3, setProfile } = useProfile();
  const { user, isAuthenticated, logout } = useAuth();
  const currentImage = isWeb3 ? web3Image : web2Image;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [floatingMessage, setFloatingMessage] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const basePath = getProfileBasePath(isWeb3);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleToggleProfile = () => {
    const nextIsWeb3 = !isWeb3;
    const targetPath = buildProfileAwarePath(location.pathname, nextIsWeb3);
    setProfile(nextIsWeb3);
    navigate(targetPath);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleSwitchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
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

    const displayDuration = 4000;

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
        }, displayDuration);
      }
    };

    showNext();
    intervalId = setInterval(() => {
      if (index < sequence.length) {
        showNext();
      }
    }, displayDuration);

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
          onClick={handleToggleProfile}
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
        <Link to={basePath}>{t('navbar.home')}</Link>
        <Link to={`${basePath}/career`}>{t('navbar.career')}</Link>
        <Link to={isWeb3 ? `${basePath}/content-creator` : `${basePath}/football`}>{isWeb3 ? t('navbar.contentCreator') : t('navbar.football')}</Link>
        <Link to={`${basePath}/trading`}>{t('navbar.trading')}</Link>
        <Link to={`${basePath}/projects`}>{t('navbar.projects')}</Link>
        <Link to={`${basePath}/services`}>{t('navbar.services')}</Link>
        <Link to={`${basePath}/shop`}>{t('navbar.shop')}</Link>
        <Link to={`${basePath}/blog`}>{t('navbar.blog')}</Link>
        <Link to={`${basePath}/contact`}>{t('navbar.contact')}</Link>
      </div>

      <div className="navbar-actions">
        <div className="auth-controls">
          {isAuthenticated && user?.username && (
            <button
              type="button"
              className="user-profile-btn"
              onClick={() => navigate(`/user/${user.username}`)}
              aria-label="Go to profile"
              title="Profile"
            >
              <PersonIcon />
            </button>
          )}

          {isAuthenticated && (
            <div className="user-menu">
              <button
                type="button"
                className="user-menu-button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label="User menu"
              >
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar" style={{ background: '#ff0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{user?.username}</span>
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  <button
                    className="user-dropdown-item"
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate(`${basePath}/profile`);
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="user-dropdown-item"
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate(`${basePath}/settings`);
                    }}
                  >
                    Settings
                  </button>
                  <button
                    className="user-dropdown-item logout"
                    onClick={handleLogout}
                  >
                    {t('navbar.logout')}
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            className="lang-btn"
            onClick={isAuthenticated ? handleLogout : handleLoginClick}
            aria-label={
              isAuthenticated
                ? t('navbar.logoutAria', 'Logout of your account')
                : t('navbar.loginAria', 'Login to your account')
            }
          >
            {isAuthenticated ? t('navbar.logout') : t('navbar.login')}
          </button>
        </div>

        <button
          className="hamburger"
          onClick={toggleDrawer(true)}
          aria-label={t('navbar.menuLabel', 'Open navigation menu')}
        >
          <MenuIcon fontSize="inherit" aria-hidden="true" />
        </button>
      </div>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: '#FF0000', color: '#fff', width: 260 },
        }}
      >
        <List>
          <ListItem button component={Link} to={basePath} onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.home')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem button component={Link} to={`${basePath}/career`} onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.career')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem button component={Link} to={isWeb3 ? `${basePath}/content-creator` : `${basePath}/football`} onClick={toggleDrawer(false)}>
            <ListItemText primary={isWeb3 ? t('navbar.contentCreator') : t('navbar.football')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem button component={Link} to={`${basePath}/trading`} onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.trading')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem button component={Link} to={`${basePath}/projects`} onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.projects')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem button component={Link} to={`${basePath}/services`} onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.services')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem button component={Link} to={`${basePath}/shop`} onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.shop')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem button component={Link} to={`${basePath}/blog`} onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.blog')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem button component={Link} to={`${basePath}/contact`} onClick={toggleDrawer(false)}>
            <ListItemText primary={t('navbar.contact')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Auth Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </nav>
  );
};

export default Navbar;
