import React from 'react';
import '../styles/ContentPages.css';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Contact</h1>
        <p>Let’s connect about collaborations, coaching, or product ideas.</p>
      </div>

      <div className="page-section">
        <h2>Send a quick note</h2>
        <p>Drop your info and I will reply with next steps.</p>
        <form className="page-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <label className="page-card" htmlFor="name">
            <span>Name</span>
            <input id="name" name="name" type="text" placeholder="Your name" style={{ marginTop: 8, padding: 10 }} />
          </label>
          <label className="page-card" htmlFor="email">
            <span>Email</span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              style={{ marginTop: 8, padding: 10 }}
            />
          </label>
          <label className="page-card" htmlFor="topic">
            <span>Topic</span>
            <input id="topic" name="topic" type="text" placeholder="Project, coaching, or inquiry" style={{ marginTop: 8, padding: 10 }} />
          </label>
        </form>
        <div style={{ marginTop: 14 }}>
          <a className="cta-button" href="mailto:juanje1019@gmail.com">
            Email juanje1019@gmail.com
          </a>
        </div>
      </div>

      <div className="page-section">
        <h2>Connect on socials</h2>
        <div className="inline-links">
          <a href="https://x.com/Juangunner4" target="_blank" rel="noopener noreferrer">
            X / Twitter
          </a>
          <a href="https://www.instagram.com/juangunner4" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.youtube.com/@juangunner4" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href="https://www.tiktok.com/@juangunner4" target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
        </div>
        <p style={{ marginTop: 12 }}>
          Prefer a call? Mention it in your note and I will share a calendar link.
        </p>
        <p>
          Looking for services? Visit the <Link to={`${basePath}/services`}>Services page</Link> to see how we can work together.
        </p>
      </div>
    </div>
  );
};

export default Contact;
