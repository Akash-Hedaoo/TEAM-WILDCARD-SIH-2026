import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { useAppContext } from '../../context/useAppContext';
import { patients, currentAshaWorker } from '../../data/dummyData';

/**
 * AshaDashboard - ASHA worker main dashboard
 * Shows offline status and patient roster for triage
 */
export default function AshaDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isOnline, addNotification } = useAppContext();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      addNotification('Please log in to access your dashboard', 'warning', 2000);
      navigate('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  const asha = currentAshaWorker;

  const triageBadge = { red: 'badge--red', yellow: 'badge--yellow', green: 'badge--green' };

  return (
    <div className="page-shell">
      <header className="header">
        <span className="text-headline-md font-bold text-primary" style={{ flex: 1 }}>Rural Health Commons</span>
        <div className="flex items-center gap-2">
          <button className="btn--icon"><Icon name="sync" /></button>
          <button className="btn--icon" onClick={() => navigate('/notifications')} style={{ position: 'relative' }}>
            <Icon name="notifications" />
          </button>
          <button className="btn--icon"><Icon name="account_circle" /></button>
        </div>
      </header>

      <div className="container animate-fade-in">
        {/* Offline Banner */}
        {(!isOnline || asha.pendingSyncs > 0) && (
          <div className="info-banner info-banner--warning mb-4" style={{ borderRadius: 'var(--radius-lg)' }}>
            <Icon name="cloud_off" style={{ color: 'var(--tertiary)' }} />
            <div>
              <p className="text-label-md font-semibold" style={{ color: 'var(--tertiary)' }}>
                {!isOnline ? 'Offline Mode Active' : 'Pending Sync'}
              </p>
              <p className="text-body-sm text-muted">{asha.pendingSyncs} records pending sync</p>
            </div>
            <button className="btn btn--sm" style={{ marginLeft: 'auto', background: 'var(--tertiary)', color: 'var(--on-tertiary)' }} onClick={() => navigate('/asha/sync')}>
              Sync Now
            </button>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-card-value text-primary">{asha.totalPatients}</div>
            <div className="stat-card-label">Patients</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-card-value text-error">{patients.filter(p => p.triageLevel === 'red').length}</div>
            <div className="stat-card-label">Critical</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-card-value" style={{ color: 'var(--tertiary)' }}>{asha.pendingSyncs}</div>
            <div className="stat-card-label">Pending</div>
          </div>
        </div>

        {/* Patient Roster */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="section-label" style={{ marginBottom: 0 }}>Priority Roster</h2>
          <span className="text-label-sm text-muted">{patients.length} patients</span>
        </div>
        <div className="flex flex-col gap-3">
          {patients.map((p) => (
            <div
              key={p.id}
              className="card flex gap-4"
              style={{ padding: 'var(--sp-4)', cursor: 'pointer' }}
              onClick={() => navigate(`/asha/triage/${p.id}`)}
            >
              <div className={`avatar avatar--initials ${triageBadge[p.triageLevel]?.replace('badge--', 'avatar--') || 'avatar--primary'}`}>
                {p.name.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex justify-between items-start">
                  <h3 className="text-body-md font-bold truncate">{p.name}</h3>
                  <span className={`badge ${triageBadge[p.triageLevel]}`}>{p.triageLevel}</span>
                </div>
                <p className="text-body-sm text-muted mt-1">{p.age} Yrs • {p.gender} • {p.village}</p>
                <p className="text-body-sm text-muted line-clamp-2 mt-1">{p.complaint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNavBar role="asha" />
    </div>
  );
}
