import React, { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import '../styles/Eventbooking.css';
import { useTranslation } from 'react-i18next';

function Eventbooking() {
  const [selectedEvent, setSelectedEvent] = useState('event1');
  const { t } = useTranslation();

  return (
    <div className="event-signup">
      <h2>{t('eventbooking.signUp')}</h2>
      <p>{t('eventbooking.selectEvent')}</p>

      <div className="event-buttons">
        <button
          className={`event-btn ${selectedEvent === 'event1' ? 'active' : ''}`}
          onClick={() => setSelectedEvent('event1')}
        >
          {t('eventbooking.personal')}
        </button>
        <button
          className={`event-btn ${selectedEvent === 'event2' ? 'active' : ''}`}
          onClick={() => setSelectedEvent('event2')}
        >
          {t('eventbooking.group')}
        </button>
      </div>

      {selectedEvent === 'event1' && (
        <InlineWidget url="https://calendly.com/juangunner4/futbol-coaching-1-on-1" />
      )}
      {selectedEvent === 'event2' && (
        <InlineWidget url="https://calendly.com/juangunner4" />
      )}
    </div>
  );
}

export default Eventbooking;
