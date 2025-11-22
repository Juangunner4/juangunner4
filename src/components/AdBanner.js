import React, { useEffect, useRef } from 'react';
import '../styles/Ads.css';

const AdBanner = () => {
  const adLoaded = useRef(false);

  useEffect(() => {
    if (adLoaded.current) return;

    const scriptPresent = document.querySelector(
      'script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]',
    );

    if (!scriptPresent) {
      const script = document.createElement('script');
      script.setAttribute('data-adsbygoogle', 'true');
      script.async = true;
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1314296138710251';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adLoaded.current = true;
    } catch (error) {
      console.error('Adsense load error', error);
    }
  }, []);

  return (
    <div className="ad-banner" aria-label="Advertisement" role="complementary">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', maxWidth: '100%' }}
        data-ad-client="ca-pub-1314296138710251"
        data-ad-slot="6955899834"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
