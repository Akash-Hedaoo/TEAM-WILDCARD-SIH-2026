import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';

export default function BottomNavBar({ role = 'patient' }) {
  const navConfigs = {
    patient: [
      { to: '/patient', icon: 'home_health', label: 'Home', exact: true },
      { to: '/patient/triage', icon: 'medical_services', label: 'Triage' },
      { to: '/patient/bookings', icon: 'calendar_month', label: 'Bookings' },
      { to: '/notifications', icon: 'notifications', label: 'Alerts' },
      { to: '/patient/profile', icon: 'person', label: 'Profile' },
    ],
    asha: [
      { to: '/asha', icon: 'assignment', label: 'Roster', exact: true },
      { to: '/asha/sync', icon: 'sync', label: 'Sync' },
      { to: '/notifications', icon: 'notifications', label: 'Alerts' },
      { to: '/asha/profile', icon: 'person', label: 'Profile' },
    ],
    doctor: [
      { to: '/doctor', icon: 'dashboard', label: 'Queue', exact: true },
      { to: '/doctor/prescriptions', icon: 'medication', label: 'E-Rx' },
      { to: '/notifications', icon: 'notifications', label: 'Alerts' },
      { to: '/doctor/profile', icon: 'person', label: 'Profile' },
    ],
    admin: [
      { to: '/admin', icon: 'monitoring', label: 'Dashboard', exact: true },
      { to: '/admin/staff', icon: 'groups', label: 'Staff' },
      { to: '/admin/settings', icon: 'settings', label: 'Settings' },
      { to: '/notifications', icon: 'notifications', label: 'Alerts' },
      { to: '/admin/profile', icon: 'person', label: 'Profile' },
    ],
  };

  const items = navConfigs[role] || navConfigs.patient;

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.exact}
          className={({ isActive }) =>
            `bottom-nav-item ${isActive ? 'bottom-nav-item--active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} fill={isActive} />
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
