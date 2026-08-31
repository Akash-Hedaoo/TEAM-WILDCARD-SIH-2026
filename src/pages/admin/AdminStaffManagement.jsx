import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/shared/SideNavBar';
import Icon from '../../components/shared/Icon';
import { staffMembers } from '../../data/dummyData';

export default function AdminStaffManagement() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filteredStaff = filter === 'All' ? staffMembers : staffMembers.filter(s => s.role.includes(filter));

  return (
    <div className="bg-background min-h-screen flex">
      <SideNavBar role="admin" />

      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-surface border-b border-outline-variant flex items-center px-4 md:px-6 shrink-0 z-10 sticky top-0">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-primary hover:bg-surface-container rounded-full lg:hidden mr-2">
            <Icon name="arrow_back" />
          </button>
          <h1 className="text-headline-md font-bold text-on-surface">Staff Management</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">

            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex gap-2">
                {['All', 'ASHA', 'Doctor'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-label-md font-semibold transition-colors ${
                      filter === f ? 'bg-primary text-on-primary' : 'bg-surface text-on-surface border border-outline-variant hover:bg-surface-container'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-md font-semibold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
                <Icon name="person_add" size={18} /> Add Staff
              </button>
            </div>

            <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-surface-container-lowest text-label-sm text-on-surface-variant uppercase tracking-wider">
                    <tr>
                      <th className="p-4 border-b border-outline-variant">Name & Role</th>
                      <th className="p-4 border-b border-outline-variant">Zone</th>
                      <th className="p-4 border-b border-outline-variant text-center">Patients</th>
                      <th className="p-4 border-b border-outline-variant text-center">Sync / KPI</th>
                      <th className="p-4 border-b border-outline-variant">Status</th>
                      <th className="p-4 border-b border-outline-variant"></th>
                    </tr>
                  </thead>
                  <tbody className="text-body-md text-on-surface">
                    {filteredStaff.map((staff) => (
                      <tr key={staff.id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="p-4 border-b border-surface-container">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold">
                              {staff.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold">{staff.name}</p>
                              <p className="text-label-sm text-on-surface-variant">{staff.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-surface-container text-on-surface-variant">{staff.zone}</td>
                        <td className="p-4 border-b border-surface-container text-center font-semibold">{staff.patients}</td>
                        <td className="p-4 border-b border-surface-container text-center">
                          <span className={`px-2 py-1 rounded text-label-sm font-bold ${parseInt(staff.syncRate) > 90 ? 'bg-secondary-container text-secondary' : 'bg-tertiary-container text-tertiary'}`}>
                            {staff.syncRate}
                          </span>
                        </td>
                        <td className="p-4 border-b border-surface-container">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex items-center gap-1 text-label-sm font-bold ${staff.status === 'active' ? 'text-secondary' : 'text-error'}`}>
                              <div className={`w-2 h-2 rounded-full ${staff.status === 'active' ? 'bg-secondary' : 'bg-error'}`}></div>
                              {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                            </span>
                            <span className="text-[10px] text-on-surface-variant">{staff.lastActive}</span>
                          </div>
                        </td>
                        <td className="p-4 border-b border-surface-container text-right">
                          <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors">
                            <Icon name="more_vert" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
