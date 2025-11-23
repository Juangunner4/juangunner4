import React from 'react';
import '../styles/ContentPages.css';

const TermsOfService = () => {
  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Terms of Service</h1>
        <p>Guidelines for using this site, accessing content, and engaging with the community.</p>
      </div>

      <div className="page-section">
        <h2>Site usage</h2>
        <p>
          Please use the site for personal or professional exploration only. Do not attempt to disrupt availability, bypass
          security controls, or scrape data without permission. Respect intellectual property and reference sources when
          resharing.
        </p>
      </div>

      <div className="page-section">
        <h2>Disclaimer</h2>
        <p>
          Content shared here is for informational purposes and does not constitute financial, legal, or medical advice. Always
          consult a qualified professional before making decisions based on information found on this site.
        </p>
      </div>

      <div className="page-section">
        <h2>Limitation of liability</h2>
        <p>
          The site is provided “as is.” No guarantees are made about uptime, accuracy, or suitability for a specific purpose.
          The owner is not liable for any direct or indirect damages arising from the use of this site or linked resources.
        </p>
      </div>

      <div className="page-section">
        <h2>Contact</h2>
        <p>
          Questions about these terms? Send an email to <a href="mailto:juanje1019@gmail.com">juanje1019@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
