import React, { useState } from 'react';
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
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const basePath = getProfileBasePath(isWeb3);

  // Helper function to check if a route is active
  const isActiveRoute = (path) => {
    return location.pathname.startsWith(path);
  };

  // Check if language is active
  const isLanguageActive = (lang) => {
    return i18n.language === lang;
  };

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
            <span className={`pfp-tag ${!isWeb3 ? 'pfp-tag-active' : 'pfp-tag-inactive'}`}>Web2</span>
            <span className={`pfp-tag pfp-tag-web3 ${isWeb3 ? 'pfp-tag-active' : 'pfp-tag-inactive'}`}>Web3</span>
          </div>
        </button>
      </div>

      <div className="desktop-lang">
        <button 
          onClick={() => i18n.changeLanguage('en')} 
          className={`lang-btn ${isLanguageActive('en') ? 'lang-btn-active' : 'lang-btn-inactive'}`}
        >
          {t('navbar.langEn')}
        </button>
        <button 
          onClick={() => i18n.changeLanguage('es')} 
          className={`lang-btn ${isLanguageActive('es') ? 'lang-btn-active' : 'lang-btn-inactive'}`}
        >
          {t('navbar.langEs')}
        </button>
      </div>

      <div className="mobile-lang">
        <button 
          onClick={() => i18n.changeLanguage('en')} 
          className={`lang-btn ${isLanguageActive('en') ? 'lang-btn-active' : 'lang-btn-inactive'}`}
        >
          {t('navbar.langEn')}
        </button>
        <button 
          onClick={() => i18n.changeLanguage('es')} 
          className={`lang-btn ${isLanguageActive('es') ? 'lang-btn-active' : 'lang-btn-inactive'}`}
        >
          {t('navbar.langEs')}
        </button>
      </div>

      <div className="navbar-right">
        <Link 
          to={basePath} 
          className={isActiveRoute(basePath) && location.pathname.split('/').length === 2 ? 'nav-link active' : 'nav-link'}
        >
          {t('navbar.home')}
        </Link>
        <Link 
          to={`${basePath}/career`} 
          className={isActiveRoute(`${basePath}/career`) ? 'nav-link active' : 'nav-link'}
        >
          {t('navbar.career')}
        </Link>
        <Link 
          to={isWeb3 ? `${basePath}/content-creator` : `${basePath}/football`}
          className={isActiveRoute(isWeb3 ? `${basePath}/content-creator` : `${basePath}/football`) ? 'nav-link active' : 'nav-link'}
        >
          {isWeb3 ? t('navbar.contentCreator') : t('navbar.football')}
        </Link>
        <Link 
          to={`${basePath}/trading`}
          className={isActiveRoute(`${basePath}/trading`) ? 'nav-link active' : 'nav-link'}
        >
          {t('navbar.trading')}
        </Link>
        <Link 
          to={`${basePath}/projects`}
          className={isActiveRoute(`${basePath}/projects`) ? 'nav-link active' : 'nav-link'}
        >
          {t('navbar.projects')}
        </Link>
        <Link 
          to={`${basePath}/services`}
          className={isActiveRoute(`${basePath}/services`) ? 'nav-link active' : 'nav-link'}
        >
          {t('navbar.services')}
        </Link>
        <Link 
          to={`${basePath}/shop`}
          className={isActiveRoute(`${basePath}/shop`) ? 'nav-link active' : 'nav-link'}
        >
          {t('navbar.shop')}
        </Link>
        <Link 
          to={`${basePath}/blog`}
          className={isActiveRoute(`${basePath}/blog`) ? 'nav-link active' : 'nav-link'}
        >
          {t('navbar.blog')}
        </Link>
        <Link 
          to={`${basePath}/contact`}
          className={isActiveRoute(`${basePath}/contact`) ? 'nav-link active' : 'nav-link'}
        >
          {t('navbar.contact')}
        </Link>
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
          <ListItem 
            button 
            component={Link} 
            to={basePath} 
            onClick={toggleDrawer(false)}
            className={isActiveRoute(basePath) && location.pathname.split('/').length === 2 ? 'drawer-item-active' : ''}
          >
            <ListItemText primary={t('navbar.home')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to={`${basePath}/career`} 
            onClick={toggleDrawer(false)}
            className={isActiveRoute(`${basePath}/career`) ? 'drawer-item-active' : ''}
          >
            <ListItemText primary={t('navbar.career')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to={isWeb3 ? `${basePath}/content-creator` : `${basePath}/football`} 
            onClick={toggleDrawer(false)}
            className={isActiveRoute(isWeb3 ? `${basePath}/content-creator` : `${basePath}/football`) ? 'drawer-item-active' : ''}
          >
            <ListItemText 
              primary={isWeb3 ? t('navbar.contentCreator') : t('navbar.football')} 
              primaryTypographyProps={{ sx: { color: '#fff' } }} 
            />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to={`${basePath}/trading`} 
            onClick={toggleDrawer(false)}
            className={isActiveRoute(`${basePath}/trading`) ? 'drawer-item-active' : ''}
          >
            <ListItemText primary={t('navbar.trading')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to={`${basePath}/projects`} 
            onClick={toggleDrawer(false)}
            className={isActiveRoute(`${basePath}/projects`) ? 'drawer-item-active' : ''}
          >
            <ListItemText primary={t('navbar.projects')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to={`${basePath}/services`} 
            onClick={toggleDrawer(false)}
            className={isActiveRoute(`${basePath}/services`) ? 'drawer-item-active' : ''}
          >
            <ListItemText primary={t('navbar.services')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to={`${basePath}/shop`} 
            onClick={toggleDrawer(false)}
            className={isActiveRoute(`${basePath}/shop`) ? 'drawer-item-active' : ''}
          >
            <ListItemText primary={t('navbar.shop')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to={`${basePath}/blog`} 
            onClick={toggleDrawer(false)}
            className={isActiveRoute(`${basePath}/blog`) ? 'drawer-item-active' : ''}
          >
            <ListItemText primary={t('navbar.blog')} primaryTypographyProps={{ sx: { color: '#fff' } }} />
          </ListItem>
          <ListItem 
            button 
            component={Link} 
            to={`${basePath}/contact`} 
            onClick={toggleDrawer(false)}
            className={isActiveRoute(`${basePath}/contact`) ? 'drawer-item-active' : ''}
          >
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
