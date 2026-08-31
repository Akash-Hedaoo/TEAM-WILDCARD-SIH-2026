import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/shared/SideNavBar';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { currentAdmin } from '../../data/dummyData';

export default function AdminStaffManagement() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const staff = [
    { id: 'S001', name: 'Dr. Ramesh Kumar', role: 'Doctor', location: 'PHC-01', status: 'active', lastActive: '2 mins ago' },
    { id: 'S002', name: 'Dr. Sunita Patel', role: 'Doctor', location: 'PHC-02', status: 'offline', lastActive: '2 hours ago' },
    { id: 'A001', name: 'Sita Devi', role: 'ASHA', location: 'Block A', status: 'active', lastActive: 'Just now' },
    { id: 'A002', name: 'Anita Sharma', role: 'ASHA', location: 'Block B', status: 'offline', lastActive: '1 day ago' },
    { id: 'N001', name: 'Priya Singh', role: 'Nurse', location: 'PHC-01', status: 'active', lastActive: '10 mins ago' },
  ];

  const filteredStaff = filter === 'all' ? staff : staff.filter(s => s.role.toLowerCase() === filter.toLowerCase());

  return (
    <div className="page-shell page-shell--with-sidebar" style={{ paddingBottom: 0 }}>
      <SideNavBar role="admin" avatar={currentAdmin.avatar} />

      {/* Header */}
      <header className="header header--with-sidebar">
        <h1 className="text-headline-md font-bold text-primary" style={{ flex: 1 }}>Staff Management</h1>
        <button className="btn btn--primary btn--sm hide-mobile"><Icon name="person_add" size={18} /> Add Staff</button>
      </header>

      <div className="container animate-fade-in">
        {/* Actions / Filters */}
        <div className="flex justify-between items-center mb-6" style={{ flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
          <div className="flex gap-2" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
            {['all', 'doctor', 'asha', 'nurse'].map((f) => (
              <button
                key={f}
                className={`pill ${filter === f ? 'pill--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2" style={{ position: 'relative' }}>
            <Icon name="search" style={{ position: 'absolute', left: 'var(--sp-3)', color: 'var(--on-surface-variant)' }} size={20} />
            <input className="input input--search" placeholder="Search staff..." style={{ paddingLeft: 'var(--sp-10)' }} />
          </div>
        </div>

        {/* Staff Table (Desktop) / Cards (Mobile) */}
        <div className="card card--flat p-0" style={{ overflow: 'hidden' }}>
          <div className="table-wrap hide-mobile">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((person) => (
                  <tr key={person.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar avatar--sm avatar--initials avatar--primary">{person.name.charAt(0)}</div>
                        <span className="font-semibold">{person.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge--outline">{person.role}</span></td>
                    <td>{person.location}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className={`status-dot ${person.status === 'active' ? 'status-dot--online' : 'status-dot--offline'}`} />
                        <span className="text-body-sm capitalize">{person.status}</span>
                      </div>
                    </td>
                    <td className="text-muted">{person.lastActive}</td>
                    <td>
                      <button className="btn--icon" style={{ color: 'var(--on-surface-variant)' }}><Icon name="more_vert" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="show-mobile-block" style={{ display: 'none' }}>
            <style>{`@media (max-width: 767px) { .show-mobile-block { display: block !important; } }`}</style>
            <div className="flex flex-col">
              {filteredStaff.map((person, i) => (
                <div key={person.id} className="flex items-center justify-between p-4" style={{ borderBottom: i < filteredStaff.length - 1 ? '1px solid var(--surface-container)' : 'none' }}>
                  <div className="flex items-center gap-3">
                    <div className="avatar avatar--initials avatar--primary">{person.name.charAt(0)}</div>
                    <div>
                      <h4 className="text-body-md font-bold">{person.name}</h4>
                      <p className="text-body-sm text-muted">{person.role} • {person.location}</p>
                    </div>
                  </div>
                  <div className={`status-dot ${person.status === 'active' ? 'status-dot--online' : 'status-dot--offline'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Action Button (Mobile) */}
        <button className="fab show-mobile-block" style={{ display: 'none' }}>
          <Icon name="person_add" />
        </button>
      </div>

      <BottomNavBar role="admin" />
    </div>
  );
}
