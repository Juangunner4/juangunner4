import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import '../styles/CookieConsent.css';

const CookieConsent = () => {
  const { t } = useTranslation();
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
    essential: true, // Always true
  });

  // Check if user has already consented - only run once on mount
  useEffect(() => {
    const loadStoredConsent = () => {
      try {
        const storedConsent = localStorage.getItem('cookieConsent');
        
        if (!storedConsent) {
          // No consent stored - show banner
          setShowBanner(true);
        } else {
          // Load stored preferences
          const stored = JSON.parse(storedConsent);
          setPreferences(stored);
          setShowBanner(false);
        }
      } catch (error) {
        console.error('Error loading cookie consent:', error);
        // If localStorage is unavailable, show banner
        setShowBanner(true);
      } finally {
        // Mark preferences as loaded
        setPreferencesLoaded(true);
      }
    };

    loadStoredConsent();
  }, []); // Empty dependency array - runs only once on mount

  const handleAcceptAll = () => {
    try {
      const newPreferences = {
        essential: true,
        analytics: true,
        marketing: true,
      };
      localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      setShowBanner(false);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
      // Still hide banner even if localStorage fails
      setShowBanner(false);
    }
  };

  const handleRejectAll = () => {
    try {
      const newPreferences = {
        essential: true,
        analytics: false,
        marketing: false,
      };
      localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      setShowBanner(false);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
      // Still hide banner even if localStorage fails
      setShowBanner(false);
    }
  };

  const handleSavePreferences = () => {
    try {
      const newPreferences = {
        ...preferences,
        essential: true, // Always include essential
      };
      localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      setShowBanner(false);
      setShowPreferences(false);
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
      // Still hide banner and modal even if localStorage fails
      setShowBanner(false);
      setShowPreferences(false);
    }
  };

  const handleTogglePreference = (key) => {
    if (key === 'essential') return; // Can't toggle essential
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Don't render until preferences are loaded to avoid flash of banner
  if (!preferencesLoaded) {
    return null;
  }

  if (!showBanner) return null;

  return (
    <>
      {/* Main Consent Banner */}
      {!showPreferences && (
        <div className="cookie-consent-banner">
          <div className="cookie-consent-content">
            <div className="cookie-consent-text">
              <h3>{t('cookie.title')}</h3>
              <p>{t('cookie.description')}</p>
              <p className="cookie-consent-details">
                {t('cookie.details')} <a href={`${basePath}/privacy`}>{t('cookie.privacyLink')}</a>
              </p>
            </div>
            <div className="cookie-consent-buttons">
              <button
                className="cookie-btn cookie-btn-secondary"
                onClick={handleRejectAll}
              >
                {t('cookie.rejectAll')}
              </button>
              <button
                className="cookie-btn cookie-btn-preferences"
                onClick={() => setShowPreferences(true)}
              >
                {t('cookie.preferences')}
              </button>
              <button
                className="cookie-btn cookie-btn-primary"
                onClick={handleAcceptAll}
              >
                {t('cookie.acceptAll')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="cookie-consent-modal-overlay">
          <div className="cookie-consent-modal">
            <div className="cookie-modal-header">
              <h2>{t('cookie.preferences')}</h2>
              <button
                className="cookie-modal-close"
                onClick={() => setShowPreferences(false)}
              >
                ✕
              </button>
            </div>

            <div className="cookie-modal-content">
              <p>{t('cookie.preferencesDescription')}</p>

              {/* Essential Cookies */}
              <div className="cookie-preference-item">
                <div className="cookie-preference-header">
                  <h4>{t('cookie.essentialTitle')}</h4>
                  <span className="cookie-badge">{t('cookie.always')}</span>
                </div>
                <p>{t('cookie.essentialDescription')}</p>
                <div className="cookie-toggle disabled">
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    id="essential-toggle"
                  />
                  <label htmlFor="essential-toggle">{t('cookie.enabled')}</label>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="cookie-preference-item">
                <div className="cookie-preference-header">
                  <h4>{t('cookie.analyticsTitle')}</h4>
                </div>
                <p>{t('cookie.analyticsDescription')}</p>
                <div className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handleTogglePreference('analytics')}
                    id="analytics-toggle"
                  />
                  <label htmlFor="analytics-toggle">
                    {preferences.analytics ? t('cookie.enabled') : t('cookie.disabled')}
                  </label>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="cookie-preference-item">
                <div className="cookie-preference-header">
                  <h4>{t('cookie.marketingTitle')}</h4>
                </div>
                <p>{t('cookie.marketingDescription')}</p>
                <div className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handleTogglePreference('marketing')}
                    id="marketing-toggle"
                  />
                  <label htmlFor="marketing-toggle">
                    {preferences.marketing ? t('cookie.enabled') : t('cookie.disabled')}
                  </label>
                </div>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <button
                className="cookie-btn cookie-btn-secondary"
                onClick={() => setShowPreferences(false)}
              >
                {t('cookie.cancel')}
              </button>
              <button
                className="cookie-btn cookie-btn-primary"
                onClick={handleSavePreferences}
              >
                {t('cookie.savePreferences')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
