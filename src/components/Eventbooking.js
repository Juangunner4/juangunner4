import React, { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import '../styles/Eventbooking.css';

function Eventbooking() {
  const [selectedEvent, setSelectedEvent] = useState('event1');

  return (
    <div className="event-signup">
      <h2>Sign up for an Event</h2>
      <p>Select an event type and sign up for a session:</p>

      <div className="event-buttons">
        <button
          className={`event-btn ${selectedEvent === 'event1' ? 'active' : ''}`}
          onClick={() => setSelectedEvent('event1')}
        >
          Personal Coaching
        </button>
        <button
          className={`event-btn ${selectedEvent === 'event2' ? 'active' : ''}`}
          onClick={() => setSelectedEvent('event2')}
        >
          Group Training
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
