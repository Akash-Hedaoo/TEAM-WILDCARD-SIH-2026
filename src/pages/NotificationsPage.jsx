import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/shared/Icon';
import { notifications } from '../data/dummyData';

export default function NotificationsPage() {
  const navigate = useNavigate();
  
  const typeStyles = {
    info: 'bg-primary-container text-on-primary-container',
    success: 'bg-secondary-container text-on-secondary-container',
    warning: 'bg-tertiary-container text-on-tertiary-container',
    error: 'bg-error-container text-on-error-container',
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-surface shadow-sm sticky top-0 z-40">
        <div className="flex justify-between items-center w-full px-container-margin-mobile md:px-container-margin-desktop h-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-primary hover:bg-surface-container rounded-full transition-colors">
              <Icon name="arrow_back" />
            </button>
            <h1 className="text-headline-md font-bold text-on-surface">Notifications</h1>
          </div>
          <button className="text-primary text-label-md font-semibold hover:underline">Mark all read</button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-container-margin-mobile py-6 animate-fade-in">
        <div className="flex flex-col gap-2">
          {notifications.map((notif) => (
            <div key={notif.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
              notif.read ? 'bg-surface border-outline-variant opacity-70' : 'bg-surface-container-lowest border-primary shadow-sm'
            }`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${typeStyles[notif.type]}`}>
                <Icon name={notif.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className={`text-body-lg truncate ${notif.read ? 'font-medium text-on-surface-variant' : 'font-bold text-on-surface'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-label-sm text-on-surface-variant shrink-0">{notif.time}</span>
                </div>
                <p className={`text-body-sm ${notif.read ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                  {notif.message}
                </p>
              </div>
              {!notif.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2"></div>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
