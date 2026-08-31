import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/shared/SideNavBar';
import Icon from '../../components/shared/Icon';

export default function AdminSettings() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen flex">
      <SideNavBar role="admin" />

      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-surface border-b border-outline-variant flex items-center px-4 md:px-6 shrink-0 z-10 sticky top-0">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-primary hover:bg-surface-container rounded-full lg:hidden mr-2">
            <Icon name="arrow_back" />
          </button>
          <h1 className="text-headline-md font-bold text-on-surface">Platform Settings</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">

            <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="p-4 border-b border-outline-variant bg-surface-container-lowest">
                <h2 className="text-label-md font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
                  <Icon name="notifications" size={20} /> Notification Preferences
                </h2>
              </div>
              <div className="p-4 flex flex-col gap-4">
                {[
                  { label: 'Critical Outbreak Alerts', desc: 'Immediate push and email for epidemiological anomalies', checked: true },
                  { label: 'Inventory Stockouts', desc: 'Daily summary of PHCs with critical low stock', checked: true },
                  { label: 'Staff Inactivity', desc: 'Alert when a staff member is offline for >48hrs', checked: false },
                  { label: 'System Updates', desc: 'Maintenance windows and app updates', checked: true }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-body-lg font-semibold text-on-surface">{item.label}</p>
                      <p className="text-body-sm text-on-surface-variant">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                      <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="p-4 border-b border-outline-variant bg-surface-container-lowest">
                <h2 className="text-label-md font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
                  <Icon name="security" size={20} /> Security & Access
                </h2>
              </div>
              <div className="p-4 flex flex-col gap-4">
                <button className="flex items-center justify-between p-3 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors text-left">
                  <div>
                    <p className="text-body-md font-semibold text-on-surface">Manage Role Permissions</p>
                    <p className="text-body-sm text-on-surface-variant">Configure access levels for ASHA and Doctors</p>
                  </div>
                  <Icon name="chevron_right" />
                </button>
                <button className="flex items-center justify-between p-3 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors text-left">
                  <div>
                    <p className="text-body-md font-semibold text-on-surface">Audit Logs</p>
                    <p className="text-body-sm text-on-surface-variant">View system access and activity history</p>
                  </div>
                  <Icon name="chevron_right" />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-primary text-on-primary px-6 py-2 rounded-lg text-label-md font-bold hover:bg-primary/90 transition-colors shadow-sm">
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
