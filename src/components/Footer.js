import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';

const Footer = () => {
  const { t } = useTranslation();
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact">
          <p>
            {t('footer.contact')} <a href="mailto:juanje1019@gmail.com">juanje1019@gmail.com</a>
          </p>
          <div className="footer-links">
            <Link to={`${basePath}/about`}>About</Link>
            <Link to={`${basePath}/contact`}>Contact</Link>
            <Link to={`${basePath}/privacy`}>Privacy</Link>
          </div>
        </div>
        <div className="social-links">
          <a href="https://www.instagram.com/juangunner4" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com/juangunner4" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-x-twitter"></i>
          </a>
          <a href="https://www.tiktok.com/@juangunner4" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="https://www.youtube.com/@juangunner4" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
