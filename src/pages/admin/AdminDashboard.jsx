import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/shared/SideNavBar';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { currentAdmin } from '../../data/dummyData';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-shell page-shell--with-sidebar" style={{ paddingBottom: 0 }}>
      <SideNavBar role="admin" avatar={currentAdmin.avatar} />

      {/* Header */}
      <header className="header header--with-sidebar">
        <h1 className="text-headline-md font-bold text-primary" style={{ flex: 1 }}>Surveillance Dashboard</h1>
        <div className="flex items-center gap-2">
          <button className="btn--icon" onClick={() => navigate('/notifications')} style={{ position: 'relative' }}>
            <Icon name="notifications" />
            <span className="notif-dot" />
          </button>
        </div>
      </header>

      <div className="container animate-fade-in">
        {/* District Overview */}
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="section-label" style={{ marginBottom: 0 }}>District Overview</h2>
            <p className="text-headline-lg font-bold">Pune District, MH</p>
          </div>
          <div className="badge badge--success"><Icon name="trending_up" size={14} /> Normal Status</div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {[
            { label: 'Active PHCs', value: '14/15', sub: '93% Operational', icon: 'local_hospital', color: 'var(--primary)' },
            { label: 'ASHA Workers', value: '128', sub: '95% Synced Today', icon: 'groups', color: 'var(--secondary)' },
            { label: 'Critical Alerts', value: '12', sub: 'Require immediate attention', icon: 'warning', color: 'var(--error)', alert: true },
            { label: 'Teleconsults', value: '450', sub: '+12% this week', icon: 'videocam', color: 'var(--tertiary)' },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ borderLeft: stat.alert ? '4px solid var(--error)' : `4px solid ${stat.color}` }}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-body-md font-semibold text-muted">{stat.label}</span>
                <Icon name={stat.icon} style={{ color: stat.color }} />
              </div>
              <h3 className="text-headline-xl font-bold mb-1" style={{ color: stat.alert ? 'var(--error)' : 'inherit' }}>{stat.value}</h3>
              <p className="text-label-sm text-muted">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Disease Outbreak Map (Mock) */}
        <div className="card mb-6" style={{ padding: 'var(--sp-6)' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="section-label" style={{ marginBottom: 0 }}>Disease Heatmap (Malaria)</h3>
            <button className="btn btn--outline btn--sm"><Icon name="filter_list" size={16} /> Filter</button>
          </div>
          <div className="bg-surface-low rounded-lg flex items-center justify-center flex-col" style={{ background: 'var(--surface-container-low)', borderRadius: 'var(--radius-lg)', height: '300px', border: '1px dashed var(--outline-variant)' }}>
            <Icon name="map" size={48} style={{ color: 'var(--on-surface-variant)', opacity: 0.5, marginBottom: 'var(--sp-2)' }} />
            <p className="text-body-md text-muted">Interactive map visualization would load here.</p>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="card">
          <h3 className="section-label mb-3">System Alerts</h3>
          <div className="flex flex-col">
            {[
              { time: '10 mins ago', type: 'error', msg: 'High concentration of fever cases in Block C.' },
              { time: '1 hour ago', type: 'warning', msg: 'PHC-04 running low on Paracetamol stock.' },
              { time: '3 hours ago', type: 'success', msg: 'ASHA Sync completed for all blocks.' },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3" style={{ padding: 'var(--sp-3) 0', borderBottom: i < 2 ? '1px solid var(--surface-container)' : 'none' }}>
                <Icon name={alert.type === 'error' ? 'error' : alert.type === 'warning' ? 'warning' : 'check_circle'} style={{ color: `var(--${alert.type})`, marginTop: '2px' }} size={20} />
                <div>
                  <p className="text-body-md">{alert.msg}</p>
                  <p className="text-label-sm text-muted">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavBar role="admin" />
    </div>
  );
}
