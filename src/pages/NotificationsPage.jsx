import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/shared/Icon';
import { notifications } from '../data/dummyData';

export default function NotificationsPage() {
  const navigate = useNavigate();

  const typeIcons = {
    info: { bg: 'var(--primary-container)', color: 'var(--on-primary-container)' },
    success: { bg: 'var(--secondary-container)', color: 'var(--on-secondary-container)' },
    warning: { bg: 'var(--tertiary-container)', color: 'var(--on-tertiary-container)' },
    error: { bg: 'var(--error-container)', color: 'var(--on-error-container)' },
  };

  return (
    <div className="page-shell">
      <header className="header">
        <div className="flex items-center gap-2 w-full" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <button className="btn--icon" onClick={() => navigate(-1)}>
            <Icon name="arrow_back" />
          </button>
          <h1 className="text-headline-md font-bold">Notifications</h1>
          <button className="text-label-md text-primary font-semibold" style={{ marginLeft: 'auto', background: 'none', border: 'none' }}>
            Mark all read
          </button>
        </div>
      </header>

      <div className="container container--narrow animate-fade-in">
        <div className="flex flex-col gap-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="card flex gap-4"
              style={{
                opacity: notif.read ? 0.65 : 1,
                borderColor: notif.read ? 'var(--outline-variant)' : 'var(--primary)',
                padding: 'var(--sp-4)',
              }}
            >
              <div
                className="avatar flex-shrink-0"
                style={{
                  background: typeIcons[notif.type]?.bg,
                  color: typeIcons[notif.type]?.color,
                  width: '44px', height: '44px',
                }}
              >
                <Icon name={notif.icon} size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className={`text-body-md truncate ${notif.read ? 'font-medium' : 'font-bold'}`}>
                    {notif.title}
                  </h3>
                  <span className="text-label-sm text-muted whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-body-sm text-muted">{notif.message}</p>
              </div>
              {!notif.read && <div className="status-dot status-dot--online flex-shrink-0" style={{ marginTop: '6px', background: 'var(--primary)' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
