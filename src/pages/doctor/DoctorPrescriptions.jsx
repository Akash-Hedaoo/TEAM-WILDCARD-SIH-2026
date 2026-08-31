import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/shared/SideNavBar';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { prescriptions, currentDoctor } from '../../data/dummyData';

export default function DoctorPrescriptions() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('active');

  const filteredRx = filter === 'all' ? prescriptions : prescriptions.filter(p => p.status === filter);
  
  const statusBadge = { active: 'badge--success', completed: 'badge--outline' };

  return (
    <div className="page-shell page-shell--with-sidebar" style={{ paddingBottom: 0 }}>
      <SideNavBar role="doctor" avatar={currentDoctor.avatar} />

      {/* Header */}
      <header className="header header--with-sidebar">
        <h1 className="text-headline-md font-bold text-primary" style={{ flex: 1 }}>E-Prescriptions</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2" style={{ position: 'relative' }}>
            <Icon name="search" style={{ position: 'absolute', left: 'var(--sp-3)', color: 'var(--on-surface-variant)' }} size={20} />
            <input className="input input--search" placeholder="Search Rx..." style={{ paddingLeft: 'var(--sp-10)', width: '200px' }} />
          </div>
          <button className="btn--icon hide-mobile" onClick={() => navigate('/notifications')} style={{ position: 'relative' }}>
            <Icon name="notifications" />
          </button>
        </div>
      </header>

      <div className="container animate-fade-in">
        {/* Filters */}
        <div className="flex gap-2 mb-6" style={{ overflowX: 'auto' }}>
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`pill ${filter === f ? 'pill--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Rx List */}
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {filteredRx.map((rx) => (
            <div key={rx.id} className="card flex flex-col justify-between" style={{ padding: 'var(--sp-5)' }}>
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-headline-md font-bold">{rx.patientName}</h3>
                    <p className="text-body-sm text-muted">{rx.patientAge} Yrs • {rx.patientGender}</p>
                  </div>
                  <span className={`badge ${statusBadge[rx.status]}`}>{rx.status}</span>
                </div>
                
                <div className="mb-3">
                  <span className="section-label">Diagnosis</span>
                  <p className="text-body-md font-semibold">{rx.diagnosis}</p>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <span className="section-label">Medicines ({rx.medicines.length})</span>
                  {rx.medicines.slice(0, 2).map((med, i) => (
                    <div key={i} className="flex justify-between items-center bg-surface-low rounded p-2" style={{ background: 'var(--surface-container-low)', borderRadius: 'var(--radius-sm)', padding: 'var(--sp-2)' }}>
                      <span className="text-body-sm font-medium">{med.name}</span>
                      <span className="badge badge--secondary" style={{ fontSize: '10px' }}>{med.frequency}</span>
                    </div>
                  ))}
                  {rx.medicines.length > 2 && (
                    <span className="text-label-sm text-muted">+{rx.medicines.length - 2} more...</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center" style={{ marginTop: 'auto', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--surface-container)' }}>
                <span className="text-label-sm text-muted"><Icon name="calendar_month" size={14} /> {rx.date}</span>
                <button className="btn btn--ghost btn--sm text-primary">
                  View Full <Icon name="arrow_forward" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavBar role="doctor" />
    </div>
  );
}
