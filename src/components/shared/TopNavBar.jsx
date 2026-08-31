import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function TopNavBar({ title = 'Rural Health Commons', role = 'patient', avatar = null }) {
  const navigate = useNavigate();

  const patientLinks = [
    { to: '/patient', label: 'Dashboard', exact: true },
    { to: '/patient/triage', label: 'Triage' },
    { to: '/patient/bookings', label: 'Bookings' },
    { to: '/patient/prescription/RX-001', label: 'Prescriptions' },
  ];

  const ashaLinks = [
    { to: '/asha', label: 'Dashboard', exact: true },
    { to: '/asha/triage/new', label: 'Triage' },
    { to: '/asha/sync', label: 'Sync' },
  ];

  const links = role === 'asha' ? ashaLinks : patientLinks;

  return (
    <nav className="hidden md:flex justify-between items-center w-full px-container-margin-desktop h-16 bg-surface shadow-sm sticky top-0 z-40">
      <div className="flex items-center gap-6">
        <span className="text-headline-md font-semibold text-primary cursor-pointer" onClick={() => navigate(`/${role}`)}>
          {title}
        </span>
        <div className="flex gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              className={({ isActive }) =>
                `text-label-md px-2 flex items-center transition-colors ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant font-medium hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/patient/triage')}
          className="bg-error text-on-error hover:bg-on-error-container transition-colors rounded-lg px-4 py-2 text-label-md font-semibold shadow-sm"
        >
          Emergency
        </button>
        <div className="flex gap-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
            <Icon name="sync" />
          </button>
          <button
            onClick={() => navigate('/notifications')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant relative"
          >
            <Icon name="notifications" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button
            onClick={() => navigate(`/${role === 'asha' ? 'asha' : 'patient'}/profile`)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant overflow-hidden border border-outline-variant bg-surface-container"
          >
            {avatar ? (
              <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Icon name="account_circle" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
