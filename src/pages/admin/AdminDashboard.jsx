import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/shared/SideNavBar';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { adminKPIs, inventoryAlerts } from '../../data/dummyData';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen flex">
      <SideNavBar role="admin" />

      <main className="flex-1 lg:ml-64 flex flex-col h-screen pb-24 md:pb-0 overflow-hidden">
        <header className="h-16 bg-surface border-b border-outline-variant flex items-center justify-between px-4 md:px-6 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-primary hover:bg-surface-container rounded-full lg:hidden">
              <Icon name="arrow_back" />
            </button>
            <h1 className="text-headline-md font-bold text-on-surface">Surveillance Portal</h1>
          </div>
          <button onClick={() => navigate('/notifications')} className="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full lg:hidden">
            <Icon name="notifications" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">

            {/* KPI Overview Grid */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-surface rounded-xl p-4 md:p-5 border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-primary flex items-center justify-center">
                    <Icon name="groups" />
                  </div>
                  <span className="text-label-sm font-bold text-secondary bg-secondary-container px-2 py-0.5 rounded">{adminKPIs.consultsGrowth}</span>
                </div>
                <h2 className="text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Total Consults</h2>
                <p className="text-headline-lg font-bold text-on-surface mt-1">{adminKPIs.totalConsults.toLocaleString()}</p>
              </div>

              <div className="bg-error-container/30 rounded-xl p-4 md:p-5 border border-error/20 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-error text-on-error flex items-center justify-center mb-2">
                  <Icon name="emergency" size={20} />
                </div>
                <h2 className="text-label-md text-error font-semibold uppercase tracking-wider">Active Alerts</h2>
                <p className="text-headline-lg font-bold text-error mt-1">{adminKPIs.activeAlerts}</p>
                <p className="text-body-sm text-error/80 mt-1">{adminKPIs.alertsMessage}</p>
              </div>

              <div className="bg-surface rounded-xl p-4 md:p-5 border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-tertiary-container text-tertiary flex items-center justify-center mb-2">
                  <Icon name="verified" />
                </div>
                <h2 className="text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Referral Success</h2>
                <div className="flex items-end gap-2 mt-1">
                  <p className="text-headline-lg font-bold text-on-surface">{adminKPIs.referralSuccess}</p>
                  <p className="text-body-sm text-on-surface-variant mb-1">Target: {adminKPIs.referralTarget}</p>
                </div>
              </div>

              <div className="bg-surface rounded-xl p-4 md:p-5 border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-2">
                  <Icon name="inventory_2" />
                </div>
                <h2 className="text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Stockouts</h2>
                <p className="text-headline-lg font-bold text-error mt-1">{adminKPIs.stockouts}</p>
                <p className="text-body-sm text-on-surface-variant mt-1">{adminKPIs.stockoutsMessage}</p>
              </div>
            </section>

            {/* Middle Section: Map & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Heatmap Placeholder */}
              <section className="lg:col-span-2 bg-surface rounded-xl border border-outline-variant shadow-sm flex flex-col overflow-hidden h-[400px]">
                <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
                  <h2 className="text-headline-md font-bold text-on-surface flex items-center gap-2">
                    <Icon name="public" className="text-primary" /> Epidemiological Heatmap
                  </h2>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-surface-container border border-outline-variant rounded-md text-label-sm font-semibold">Weekly</button>
                    <button className="px-3 py-1 bg-primary text-on-primary rounded-md text-label-sm font-semibold">Monthly</button>
                  </div>
                </div>
                <div className="flex-1 bg-surface-container-high relative flex items-center justify-center">
                  {/* Placeholder for actual Map component */}
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQeYk4Zp9J_tA22_HjK252nN20lM7fH5c49k2_j9A6t-05i6c9X0w42_rVwL-8R2t2n6yA2j0Z6c6t0J4H_N2jL2f0tX4L_H0A4H6k4-6v4v4P_rA" alt="Map Placeholder" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-error/10"></div>
                  
                  {/* Fake heat blobs */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-error/40 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-tertiary/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  <div className="relative z-10 bg-surface/90 backdrop-blur px-4 py-2 rounded-lg border border-outline-variant shadow-lg text-center">
                    <Icon name="map" size={32} className="text-on-surface-variant mb-2 mx-auto" />
                    <p className="text-label-md font-bold text-on-surface">Map Integration Active</p>
                    <p className="text-body-sm text-on-surface-variant">Showing active outbreak zones</p>
                  </div>
                </div>
              </section>

              {/* Inventory Alerts */}
              <section className="bg-surface rounded-xl border border-outline-variant shadow-sm flex flex-col h-[400px]">
                <div className="p-4 border-b border-outline-variant bg-surface-container-lowest">
                  <h2 className="text-headline-md font-bold text-on-surface flex items-center gap-2">
                    <Icon name="warning" className="text-error" /> Inventory Alerts
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 hide-scrollbar">
                  {inventoryAlerts.map((alert) => (
                    <div key={alert.id} className={`p-3 rounded-lg border flex flex-col gap-2 ${
                      alert.status === 'critical' ? 'bg-error-container/20 border-error/30' : 'bg-surface border-outline-variant'
                    }`}>
                      <div className="flex justify-between items-start">
                        <h3 className="text-label-md font-bold text-on-surface">{alert.phcName}</h3>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          alert.status === 'critical' ? 'bg-error text-on-error' : 'bg-tertiary text-on-tertiary'
                        }`}>{alert.status}</span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant flex items-center gap-1">
                        <Icon name="location_on" size={14} /> {alert.zone}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        <span className="text-label-sm font-semibold text-on-surface mr-1">Low:</span>
                        {alert.lowStockItems.map((item, i) => (
                          <span key={i} className="text-label-sm bg-surface-container-high px-2 py-0.5 rounded">{item}</span>
                        ))}
                      </div>
                      <button className="mt-2 w-full py-1.5 border border-primary text-primary rounded-md text-label-sm font-bold hover:bg-primary/5 transition-colors">
                        Initiate Restock
                      </button>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <BottomNavBar role="doctor" /> {/* Using doctor bottom nav for admin mobile view as placeholder, could make admin specific */}
    </div>
  );
}
