import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function BottomNavBar({ role = 'patient' }) {
  const navConfigs = {
    patient: [
      { to: '/patient', icon: 'home_health', label: 'Home', exact: true },
      { to: '/patient/triage', icon: 'medical_services', label: 'Triage' },
      { to: '/patient/bookings', icon: 'history_edu', label: 'History' },
      { to: '/patient/profile', icon: 'person', label: 'Profile' },
    ],
    asha: [
      { to: '/asha', icon: 'home_health', label: 'Home', exact: true },
      { to: '/asha/triage/new', icon: 'medical_services', label: 'Triage' },
      { to: '/asha/sync', icon: 'cloud_sync', label: 'Sync' },
      { to: '/asha/history', icon: 'person', label: 'Profile' },
    ],
    doctor: [
      { to: '/doctor', icon: 'group', label: 'Queue', exact: true },
      { to: '/doctor/prescriptions', icon: 'medication', label: 'E-Rx' },
      { to: '/notifications', icon: 'notifications', label: 'Alerts' },
      { to: '/login', icon: 'person', label: 'Profile' },
    ],
  };

  const items = navConfigs[role] || navConfigs.patient;

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 md:hidden bg-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.exact}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-150 w-16 ${
              isActive
                ? 'bg-primary-container text-on-primary-container scale-90'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} fill={isActive} className="text-2xl" />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
