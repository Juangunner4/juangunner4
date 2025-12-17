import React, { useState, useMemo } from 'react';
import '../styles/ContentPages.css';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  // Generate time slots from 8:00 AM to 10:00 PM in 30-minute increments
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = hour <= 12
          ? `${hour === 0 ? 12 : hour}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`
          : `${hour - 12}:${minute.toString().padStart(2, '0')} PM`;
        slots.push({ timeString, displayTime });
      }
    }
    return slots;
  };

  // Generate next 7 days starting from today
  const generateDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      days.push({
        dayName,
        monthDay,
        fullDate: date.toISOString().split('T')[0]
      });
    }
    return days;
  };

  const timeSlots = generateTimeSlots();
  const days = generateDays();

  // Generate random available slots for each day (2-4 slots per day)
  const generateAvailableSlots = useMemo(() => {
    const availableSlots = {};

    days.forEach(day => {
      const daySlots = [];
      const numSlots = Math.floor(Math.random() * 3) + 2; // 2-4 slots per day

      while (daySlots.length < numSlots) {
        const randomIndex = Math.floor(Math.random() * timeSlots.length);
        const slot = timeSlots[randomIndex];
        if (!daySlots.includes(slot.timeString)) {
          daySlots.push(slot.timeString);
        }
      }

      availableSlots[day.fullDate] = daySlots;
    });

    return availableSlots;
  }, []);

  const isSlotAvailable = (day, timeSlot) => {
    return generateAvailableSlots[day.fullDate]?.includes(timeSlot.timeString);
  };

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Calendar</h1>
        <p>Schedule a call with me. Available time slots are shown below.</p>
      </div>

      <div className="page-section">
        <div className="calendar-container" style={{
          marginTop: '20px'
        }}>
          <div className="available-slots-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {days.map((day) => {
              const dayAvailableSlots = timeSlots.filter(slot => isSlotAvailable(day, slot));

              return (
                <div key={day.fullDate} style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: 'white'
                }}>
                  <div style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '12px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {day.dayName} - {day.monthDay}
                  </div>
                  <div style={{
                    padding: '15px'
                  }}>
                    {dayAvailableSlots.length > 0 ? (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '8px'
                      }}>
                        {dayAvailableSlots.map((slot) => (
                          <div key={slot.timeString} style={{
                            backgroundColor: '#d4edda',
                            color: '#155724',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '0.85em',
                            fontWeight: 'bold',
                            border: '1px solid #c3e6cb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {slot.displayTime}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{
                        color: '#6c757d',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        margin: '20px 0',
                        fontSize: '0.9em'
                      }}>
                        No available slots
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '0.9em' }}>
            All times are shown in your local timezone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
