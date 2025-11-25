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
            <Link to={`${basePath}/career`}>Career</Link>
            <Link to={`${basePath}/contact`}>Contact</Link>
            <Link to={`${basePath}/privacy`}>Privacy</Link>
          </div>
          <p style={{ marginTop: '12px', fontSize: '0.9rem', opacity: 0.9 }}>
            © {new Date().getFullYear()} Juangunner4 LLC. All rights reserved.
          </p>
        </div>
        <div className="social-links">
          <a 
            href={isWeb3 ? "https://www.instagram.com/0x1JuanGunner4" : "https://www.instagram.com/juangunner4"} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a 
            href={isWeb3 ? "https://twitter.com/0x1JuanGunner4" : "https://twitter.com/juangunner4"} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fab fa-x-twitter"></i>
          </a>
          <a 
            href={isWeb3 ? "https://www.tiktok.com/@0x1JuanGunner4" : "https://www.tiktok.com/@juangunner4"} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fab fa-tiktok"></i>
          </a>
          <a 
            href={isWeb3 ? "https://www.youtube.com/@0x1JuanGunner4" : "https://www.youtube.com/@juangunner4"} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
