import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function SideNavBar({ role = 'doctor', avatar }) {
  const navigate = useNavigate();

  const navConfigs = {
    doctor: [
      { to: '/doctor', icon: 'dashboard', label: 'Priority Queue', exact: true },
      { to: '/doctor/prescriptions', icon: 'medication', label: 'E-Prescriptions' },
      { to: '/notifications', icon: 'notifications', label: 'Notifications' },
    ],
    admin: [
      { to: '/admin', icon: 'monitoring', label: 'Surveillance', exact: true },
      { to: '/admin/staff', icon: 'groups', label: 'Staff Management' },
      { to: '/admin/settings', icon: 'settings', label: 'Settings' },
      { to: '/notifications', icon: 'notifications', label: 'Notifications' },
    ],
  };

  const items = navConfigs[role] || navConfigs.doctor;

  return (
    <aside className="side-nav">
      <div className="side-nav-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <Icon name="local_hospital" fill />
        <span>RuralCare</span>
      </div>

      <div className="side-nav-items">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive }) =>
              `side-nav-item ${isActive ? 'side-nav-item--active' : ''}`
            }
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="side-nav-profile">
        {avatar ? (
          <div className="avatar">
            <img src={avatar} alt="Profile" />
          </div>
        ) : (
          <div className="avatar avatar--primary avatar--initials">
            <Icon name="person" />
          </div>
        )}
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--on-surface)' }}>
            {role === 'admin' ? 'Admin' : 'Dr. Sharma'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>
            {role === 'admin' ? 'District Admin' : 'General Medicine'}
          </div>
        </div>
      </div>
    </aside>
  );
}
