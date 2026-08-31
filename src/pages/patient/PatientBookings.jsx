import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { bookings } from '../../data/dummyData';

export default function PatientBookings() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const statusBadge = { upcoming: 'badge--primary', completed: 'badge--success', cancelled: 'badge--outline' };

  return (
    <div className="page-shell">
      <header className="header">
        <button className="btn--icon" onClick={() => navigate(-1)}><Icon name="arrow_back" /></button>
        <h1 className="text-headline-md font-bold" style={{ marginLeft: 'var(--sp-2)', flex: 1 }}>My Bookings</h1>
        <button className="btn btn--primary btn--sm"><Icon name="add" size={18} /> Book</button>
      </header>

      <div className="container container--narrow animate-fade-in">
        {/* Filters */}
        <div className="flex gap-2 mb-4" style={{ overflowX: 'auto' }}>
          {['all', 'upcoming', 'completed', 'cancelled'].map((f) => (
            <button
              key={f}
              className={`pill ${filter === f ? 'pill--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map((booking) => (
            <div key={booking.id} className="card flex gap-4" style={{ padding: 'var(--sp-4)' }}>
              <div className="avatar avatar--lg" style={{ background: booking.type === 'Teleconsult' ? 'rgba(0,74,198,0.08)' : 'var(--surface-container)', color: booking.type === 'Teleconsult' ? 'var(--primary)' : 'var(--on-surface-variant)', border: 'none' }}>
                <Icon name={booking.type === 'Teleconsult' ? 'videocam' : 'local_hospital'} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex justify-between items-start">
                  <h3 className="text-body-md font-bold truncate">{booking.doctor}</h3>
                  <span className={`badge ${statusBadge[booking.status]}`}>{booking.status}</span>
                </div>
                <p className="text-body-sm text-muted mt-1">{booking.specialty} • {booking.type}</p>
                <p className="text-label-sm text-muted flex items-center gap-1 mt-2">
                  <Icon name="calendar_month" size={14} /> {booking.date} at {booking.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNavBar role="patient" />
    </div>
  );
}
