import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { ashaSyncQueue, currentAshaWorker } from '../../data/dummyData';

export default function AshaSyncStatus() {
  const navigate = useNavigate();
  const asha = currentAshaWorker;

  const statusConfig = {
    pending: { icon: 'schedule', color: 'var(--tertiary)', badge: 'badge--warning', label: 'Pending' },
    failed: { icon: 'error', color: 'var(--error)', badge: 'badge--red', label: 'Failed' },
    synced: { icon: 'check_circle', color: 'var(--secondary)', badge: 'badge--green', label: 'Synced' },
  };

  const pending = ashaSyncQueue.filter(s => s.status === 'pending');
  const failed = ashaSyncQueue.filter(s => s.status === 'failed');
  const synced = ashaSyncQueue.filter(s => s.status === 'synced');

  return (
    <div className="page-shell">
      <header className="header">
        <button className="btn--icon" onClick={() => navigate(-1)}><Icon name="arrow_back" /></button>
        <h1 className="text-headline-md font-bold" style={{ marginLeft: 'var(--sp-2)', flex: 1 }}>Sync Status</h1>
        <button className="btn btn--primary btn--sm"><Icon name="sync" size={18} /> Sync All</button>
      </header>

      <div className="container container--narrow animate-fade-in">
        {/* Status Summary */}
        <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-card-value" style={{ color: 'var(--tertiary)' }}>{pending.length}</div>
            <div className="stat-card-label">Pending</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-card-value text-error">{failed.length}</div>
            <div className="stat-card-label">Failed</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-card-value text-secondary">{synced.length}</div>
            <div className="stat-card-label">Synced</div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="card mb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name={asha.isOnline ? 'wifi' : 'wifi_off'} style={{ color: asha.isOnline ? 'var(--secondary)' : 'var(--error)' }} />
            <div>
              <p className="text-body-md font-semibold">{asha.isOnline ? 'Connected' : 'Offline'}</p>
              <p className="text-body-sm text-muted">Last synced 2 hours ago</p>
            </div>
          </div>
          <div className={`status-dot ${asha.isOnline ? 'status-dot--online' : 'status-dot--offline'}`} />
        </div>

        {/* Sync Queue */}
        <h3 className="section-label">Sync Queue</h3>
        <div className="flex flex-col gap-3 mt-3">
          {ashaSyncQueue.map((item) => {
            const cfg = statusConfig[item.status];
            return (
              <div key={item.id} className="card flex gap-4" style={{ padding: 'var(--sp-4)' }}>
                <div className="avatar" style={{ background: 'var(--surface-container)', color: cfg.color, border: 'none' }}>
                  <Icon name={cfg.icon} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex justify-between items-start">
                    <h4 className="text-body-md font-semibold truncate">{item.patientName}</h4>
                    <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
                  </div>
                  <p className="text-body-sm text-muted mt-1">{item.type} • {item.size}</p>
                  <p className="text-label-sm text-muted mt-1">{item.timestamp}</p>
                </div>
                {item.status === 'failed' && (
                  <button className="btn--icon" style={{ color: 'var(--primary)', flexShrink: 0 }}>
                    <Icon name="refresh" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <BottomNavBar role="asha" />
    </div>
  );
}
