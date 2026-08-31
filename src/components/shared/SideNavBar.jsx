import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function SideNavBar({ role = 'doctor', avatar = null }) {
  const navigate = useNavigate();

  const doctorLinks = [
    { to: '/doctor', icon: 'dashboard', label: 'Overview', exact: true },
    { to: '/doctor', icon: 'group', label: 'Patient Queue', exact: true, isActive: true },
    { to: '/admin', icon: 'monitoring', label: 'Surveillance' },
    { to: '/doctor/prescriptions', icon: 'medication', label: 'E-Prescriptions' },
    { to: '#', icon: 'medical_information', label: 'Staff Management' },
    { to: '#', icon: 'settings', label: 'Settings' },
  ];

  const adminLinks = [
    { to: '/admin', icon: 'dashboard', label: 'Overview', exact: true },
    { to: '/doctor', icon: 'group', label: 'Patient Queue' },
    { to: '/admin', icon: 'monitoring', label: 'Surveillance', exact: true },
    { to: '/doctor/prescriptions', icon: 'medication', label: 'E-Prescriptions' },
    { to: '/admin/staff', icon: 'medical_information', label: 'Staff Management' },
    { to: '/admin/settings', icon: 'settings', label: 'Settings' },
  ];

  const links = role === 'admin' ? adminLinks : doctorLinks;

  return (
    <nav className="h-screen w-64 hidden lg:flex flex-col border-r border-outline-variant bg-surface-container-low fixed left-0 top-0 p-4 gap-2 z-50">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <Icon name="person" className="text-on-primary-container" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-label-md font-bold text-primary">Health Admin</span>
          <span className="text-label-sm text-on-surface-variant">District Zone A</span>
        </div>
      </div>

      <button
        onClick={() => {}}
        className="w-full py-2 px-4 mb-4 bg-primary text-on-primary rounded-lg text-label-md font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
      >
        <Icon name="add" size={18} /> New Entry
      </button>

      <div className="flex-1 flex flex-col gap-1 overflow-y-auto hide-scrollbar">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            end={link.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-label-md transition-colors ${
                isActive
                  ? 'text-primary font-bold bg-secondary-container translate-x-1'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={link.icon} fill={isActive} />
                {link.label}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1 border-t border-outline-variant pt-4">
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant text-label-md hover:bg-surface-container-high transition-colors">
          <Icon name="cloud_done" /> Sync Status
        </a>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-error text-label-md hover:bg-error-container hover:text-on-error-container transition-colors w-full text-left"
        >
          <Icon name="logout" /> Logout
        </button>
      </div>
    </nav>
  );
}
