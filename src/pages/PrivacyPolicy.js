import React from 'react';
import '../styles/ContentPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Privacy Policy</h1>
        <p>How data is collected, used, and protected across this site and connected services.</p>
      </div>

      <div className="page-section">
        <h2>AdSense disclosure</h2>
        <p>
          This site may display Google AdSense ads. AdSense uses cookies to deliver ads based on previous visits and interests.
          You can opt out of personalized ads through Google’s Ads Settings.
        </p>
      </div>

      <div className="page-section">
        <h2>Cookies and tracking</h2>
        <p>
          Cookies and similar technologies are used to keep the experience smooth—remembering preferences, measuring engagement,
          and improving page performance. You can disable cookies in your browser, but some features may feel slower or less
          personalized.
        </p>
      </div>

      <div className="page-section">
        <h2>Data collection</h2>
        <p>
          Basic analytics capture anonymized usage data such as page views, device type, and general location. If you submit a
          form, your name and email are stored only long enough to respond to your request. No personal data is sold or shared
          with brokers.
        </p>
      </div>

      <div className="page-section">
        <h2>Third-party partners</h2>
        <p>
          Embedded content and ad partners may set their own cookies and follow their respective privacy policies. Please review
          their notices for details on how they handle data and how to manage your preferences.
        </p>
      </div>

      <div className="page-section">
        <h2>Contact</h2>
        <p>
          If you have questions about privacy or would like to request data removal, email
          {' '}
          <a href="mailto:juanje1019@gmail.com">juanje1019@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
