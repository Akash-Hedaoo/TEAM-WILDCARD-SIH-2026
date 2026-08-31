import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/shared/SideNavBar';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { currentAdmin } from '../../data/dummyData';

export default function AdminSettings() {
  const navigate = useNavigate();

  return (
    <div className="page-shell page-shell--with-sidebar" style={{ paddingBottom: 0 }}>
      <SideNavBar role="admin" avatar={currentAdmin.avatar} />

      {/* Header */}
      <header className="header header--with-sidebar">
        <h1 className="text-headline-md font-bold text-primary" style={{ flex: 1 }}>Settings</h1>
        <button className="btn--icon hide-mobile" onClick={() => navigate('/notifications')} style={{ position: 'relative' }}>
          <Icon name="notifications" />
        </button>
      </header>

      <div className="container animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Profile Section */}
        <section className="mb-8">
          <h2 className="section-label mb-4">Profile & Account</h2>
          <div className="card flex items-center gap-4" style={{ padding: 'var(--sp-6)' }}>
            <div className="avatar avatar--xl" style={{ width: '80px', height: '80px' }}>
              <img src={currentAdmin.avatar} alt="Admin" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="text-headline-md font-bold">{currentAdmin.name}</h3>
              <p className="text-body-md text-muted">{currentAdmin.role} • {currentAdmin.district}</p>
            </div>
            <button className="btn btn--outline">Edit Profile</button>
          </div>
        </section>

        {/* System Settings */}
        <section className="mb-8">
          <h2 className="section-label mb-4">System Preferences</h2>
          <div className="card p-0" style={{ overflow: 'hidden' }}>
            <div className="flex justify-between items-center p-4 border-b border-surface-container" style={{ borderBottom: '1px solid var(--surface-container)' }}>
              <div>
                <h4 className="text-body-md font-semibold">Enable SMS Alerts</h4>
                <p className="text-body-sm text-muted">Send critical notifications via SMS</p>
              </div>
              <div style={{ width: '44px', height: '24px', background: 'var(--primary)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', right: '2px', top: '2px', width: '20px', height: '20px', background: 'white', borderRadius: '50%' }} />
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 border-b border-surface-container" style={{ borderBottom: '1px solid var(--surface-container)' }}>
              <div>
                <h4 className="text-body-md font-semibold">Auto-Sync Interval</h4>
                <p className="text-body-sm text-muted">Frequency for background ASHA data sync</p>
              </div>
              <select className="input" style={{ width: 'auto', padding: 'var(--sp-2) var(--sp-4)' }} defaultValue="30">
                <option value="15">15 mins</option>
                <option value="30">30 mins</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            <div className="flex justify-between items-center p-4">
              <div>
                <h4 className="text-body-md font-semibold">Teleconsult Recording</h4>
                <p className="text-body-sm text-muted">Save video consults for audit purposes</p>
              </div>
              <div style={{ width: '44px', height: '24px', background: 'var(--surface-container-highest)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', left: '2px', top: '2px', width: '20px', height: '20px', background: 'white', borderRadius: '50%' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Security & Access */}
        <section className="mb-8">
          <h2 className="section-label mb-4">Security</h2>
          <div className="card p-0" style={{ overflow: 'hidden' }}>
            <button className="flex justify-between items-center w-full p-4 hover:bg-surface-low text-left" style={{ borderBottom: '1px solid var(--surface-container)' }}>
              <div className="flex items-center gap-3">
                <Icon name="lock" style={{ color: 'var(--on-surface-variant)' }} />
                <span className="text-body-md font-semibold">Change Password</span>
              </div>
              <Icon name="chevron_right" style={{ color: 'var(--on-surface-variant)' }} />
            </button>
            <button className="flex justify-between items-center w-full p-4 hover:bg-surface-low text-left">
              <div className="flex items-center gap-3">
                <Icon name="security" style={{ color: 'var(--on-surface-variant)' }} />
                <span className="text-body-md font-semibold">Two-Factor Authentication</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge--success">Enabled</span>
                <Icon name="chevron_right" style={{ color: 'var(--on-surface-variant)' }} />
              </div>
            </button>
          </div>
        </section>

        <div className="flex justify-center mb-8">
          <button className="btn btn--outline" style={{ color: 'var(--error)', borderColor: 'var(--error)' }} onClick={() => navigate('/login')}>
            <Icon name="logout" /> Sign Out
          </button>
        </div>

      </div>

      <BottomNavBar role="admin" />
    </div>
  );
}
