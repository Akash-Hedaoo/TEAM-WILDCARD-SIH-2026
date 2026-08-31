import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/shared/SideNavBar';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { doctorPrescriptions, currentDoctor } from '../../data/dummyData';

export default function DoctorPrescriptions() {
  const navigate = useNavigate();

  const statusStyles = {
    dispensed: 'bg-secondary-container text-on-secondary-container',
    sent: 'bg-primary-container text-on-primary-container',
    viewed: 'bg-tertiary-fixed text-on-tertiary-fixed',
  };

  return (
    <div className="bg-background min-h-screen flex">
      <SideNavBar role="doctor" avatar={currentDoctor.avatar} />

      <main className="flex-1 lg:ml-64 flex flex-col h-screen pb-24 md:pb-0 overflow-hidden">
        <header className="h-16 bg-surface border-b border-outline-variant flex items-center px-4 md:px-6 shrink-0 z-10 sticky top-0">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-primary hover:bg-surface-container rounded-full lg:hidden mr-2">
            <Icon name="arrow_back" />
          </button>
          <h1 className="text-headline-md font-bold text-on-surface">E-Prescriptions History</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-surface p-4 rounded-xl border border-outline-variant shadow-sm">
              <div className="relative w-full md:w-auto flex-1 max-w-md">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input type="text" placeholder="Search Patient Name or Rx ID..." className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container border border-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md" />
              </div>
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
                <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold whitespace-nowrap">All</button>
                <button className="px-4 py-2 bg-surface text-on-surface border border-outline-variant hover:bg-surface-container rounded-lg text-label-md font-semibold whitespace-nowrap">Sent</button>
                <button className="px-4 py-2 bg-surface text-on-surface border border-outline-variant hover:bg-surface-container rounded-lg text-label-md font-semibold whitespace-nowrap">Dispensed</button>
              </div>
            </div>

            {/* List */}
            <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
              {doctorPrescriptions.map((rx, index) => (
                <div key={rx.id} className={`p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${index !== doctorPrescriptions.length - 1 ? 'border-b border-outline-variant' : ''} hover:bg-surface-container-lowest transition-colors`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-primary flex items-center justify-center shrink-0">
                      <Icon name="medication" size={24} />
                    </div>
                    <div>
                      <h3 className="text-body-lg font-bold text-on-surface">{rx.patientName}</h3>
                      <div className="flex items-center gap-2 text-body-sm text-on-surface-variant mt-1">
                        <span className="font-mono">{rx.id}</span>
                        <span>•</span>
                        <span>{rx.date}</span>
                      </div>
                      <p className="text-body-sm text-on-surface mt-1"><span className="font-semibold">Dx:</span> {rx.diagnosis}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end justify-between sm:justify-center">
                    <span className={`px-3 py-1 rounded-full text-label-sm font-bold uppercase tracking-wider ${statusStyles[rx.status]}`}>
                      {rx.status}
                    </span>
                    <button className="text-primary hover:underline text-label-sm font-semibold flex items-center gap-1">
                      View PDF <Icon name="open_in_new" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>

      <BottomNavBar role="doctor" />
    </div>
  );
}
