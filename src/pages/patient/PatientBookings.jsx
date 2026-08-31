import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { bookings } from '../../data/dummyData';

export default function PatientBookings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('upcoming');
  const filtered = bookings.filter((b) => tab === 'upcoming' ? b.status === 'upcoming' : b.status !== 'upcoming');

  const statusStyles = {
    upcoming: 'bg-primary-fixed text-on-primary-fixed',
    completed: 'bg-secondary-container text-on-secondary-container',
    cancelled: 'bg-error-container text-on-error-container',
  };

  return (
    <div className="bg-background text-on-background min-h-screen pb-24 md:pb-8">
      <header className="bg-surface shadow-sm sticky top-0 z-40">
        <div className="flex justify-between items-center w-full px-container-margin-mobile h-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors">
              <Icon name="arrow_back" />
            </button>
            <h1 className="text-headline-md font-bold text-primary">Appointments</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-container-margin-mobile py-6 flex flex-col gap-6 animate-fade-in">
        {/* Tabs */}
        <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg">
          {['upcoming', 'past'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-sm text-label-md font-semibold text-center transition-colors capitalize ${
                tab === t ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant">
              <Icon name="event_busy" className="text-5xl mb-4 opacity-50" />
              <p className="text-body-lg">No {tab} appointments</p>
            </div>
          ) : (
            filtered.map((b) => (
              <div key={b.id} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center">
                      <Icon name={b.type === 'Teleconsult' ? 'videocam' : 'local_hospital'} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-body-lg font-semibold text-on-surface">{b.doctor}</h3>
                      <p className="text-body-sm text-on-surface-variant">{b.specialty}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-label-sm font-medium capitalize ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1"><Icon name="calendar_today" size={16} /> {b.date}</span>
                  <span className="flex items-center gap-1"><Icon name="schedule" size={16} /> {b.time}</span>
                  <span className="flex items-center gap-1"><Icon name={b.type === 'Teleconsult' ? 'videocam' : 'location_on'} size={16} /> {b.type}</span>
                </div>
                {b.status === 'upcoming' && (
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-on-primary py-2 rounded-lg text-label-md font-semibold flex items-center justify-center gap-1 hover:opacity-90 transition-opacity">
                      {b.type === 'Teleconsult' ? <><Icon name="video_call" size={18} /> Join</> : <><Icon name="check" size={18} /> Confirm</>}
                    </button>
                    <button className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg text-label-md font-semibold hover:bg-surface-container transition-colors">
                      Reschedule
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      {/* FAB */}
      <button className="fixed bottom-24 right-4 md:bottom-8 z-40 w-14 h-14 bg-primary text-on-primary rounded-xl shadow-lg flex items-center justify-center hover:bg-surface-tint active:scale-90 transition-all">
        <Icon name="add" fill />
      </button>

      <BottomNavBar role="patient" />
    </div>
  );
}
