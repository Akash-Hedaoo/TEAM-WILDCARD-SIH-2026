import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/shared/SideNavBar';
import Icon from '../../components/shared/Icon';
import AIApprovalModal from '../../components/doctor/AIApprovalModal';
import { currentDoctor, patients } from '../../data/dummyData';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(patients[3]); // Aarav Patel
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triageBadge = {
    red: { bg: 'bg-error', text: 'text-on-error' },
    yellow: { bg: 'bg-tertiary', text: 'text-on-tertiary' },
    green: { bg: 'bg-secondary', text: 'text-on-secondary' },
  };

  const getBadgeClass = (level) => {
    return triageBadge[level] ? `${triageBadge[level].bg} ${triageBadge[level].text}` : 'bg-surface-variant text-on-surface-variant';
  };

  return (
    <div className="bg-background min-h-screen flex">
      {/* Sidebar (Desktop) */}
      <SideNavBar role="doctor" avatar={currentDoctor.avatar} />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-surface border-b border-outline-variant flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-headline-md font-bold text-on-surface hidden sm:block">Priority Queue</h1>
            <div className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="text-label-sm font-semibold">Online • Accepting Patients</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
              <input type="text" placeholder="Search ABHA ID or Name..." className="pl-10 pr-4 py-2 rounded-lg bg-surface-container border border-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 text-body-sm" />
            </div>
            <button className="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-full">
              <Icon name="notifications" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container lg:hidden">
              <img src={currentDoctor.avatar} alt="Dr." className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Queue */}
          <section className={`w-full lg:w-[400px] bg-surface flex flex-col border-r border-outline-variant shrink-0 ${selectedPatient ? 'hidden lg:flex' : 'flex'}`}>
            <div className="p-4 border-b border-outline-variant shrink-0">
              <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg">
                <button className="flex-1 py-1.5 bg-surface text-on-surface shadow-sm rounded-md text-label-sm font-semibold">Priority (4)</button>
                <button className="flex-1 py-1.5 text-on-surface-variant hover:text-on-surface rounded-md text-label-sm font-medium">Scheduled (12)</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 hide-scrollbar">
              {patients.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedPatient?.id === p.id
                      ? 'border-primary bg-primary-container/10 shadow-sm'
                      : 'border-outline-variant hover:border-primary/50 hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-label-md font-bold ${getBadgeClass(p.triageLevel)}`}>
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-label-md font-bold text-on-surface">{p.name}</h3>
                        <p className="text-label-sm text-on-surface-variant">{p.age} Yrs • {p.gender}</p>
                      </div>
                    </div>
                    <span className="text-label-sm text-error font-semibold flex items-center gap-1">
                      <Icon name="timer" size={14} /> {p.waitTime}
                    </span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">{p.complaint}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-surface-container-high rounded text-on-surface-variant">{p.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Panel: Workspace */}
          {selectedPatient ? (
            <section className="flex-1 bg-background flex flex-col min-w-0">
              {/* Mobile Back Button */}
              <div className="lg:hidden p-4 bg-surface border-b border-outline-variant flex items-center gap-2 shrink-0">
                <button onClick={() => setSelectedPatient(null)} className="p-2 -ml-2 text-primary hover:bg-surface-container rounded-full">
                  <Icon name="arrow_back" />
                </button>
                <span className="font-semibold text-on-surface">Back to Queue</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-24 lg:pb-6">
                <div className="max-w-5xl mx-auto flex flex-col gap-6 animate-fade-in">
                  
                  {/* Patient Header Card */}
                  <div className="bg-surface rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-headline-md font-bold shadow-sm ${getBadgeClass(selectedPatient.triageLevel)}`}>
                        {selectedPatient.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-headline-md font-bold text-on-surface">{selectedPatient.name}</h2>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getBadgeClass(selectedPatient.triageLevel)}`}>
                            {selectedPatient.triageLevel} Priority
                          </span>
                        </div>
                        <p className="text-body-md text-on-surface-variant mt-1">ID: {selectedPatient.id} • {selectedPatient.age} Yrs • {selectedPatient.gender}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                      <button className="flex-1 md:flex-none px-4 py-2 rounded-lg border-2 border-primary text-primary text-label-md font-bold hover:bg-primary-container/20 transition-colors flex items-center justify-center gap-2">
                        <Icon name="history" size={18} /> History
                      </button>
                      <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-primary text-on-primary text-label-md font-bold hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2">
                        <Icon name="videocam" size={18} /> Call Patient
                      </button>
                    </div>
                  </div>

                  {/* Vitals & Complaint Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                      {/* Vitals */}
                      <div className="bg-surface rounded-2xl p-6 border border-outline-variant shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-label-md font-bold uppercase tracking-wider text-on-surface-variant">Latest Vitals (via ASHA)</h3>
                          <span className="text-label-sm text-on-surface-variant flex items-center gap-1"><Icon name="schedule" size={14} /> 10m ago</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="bg-error-container/20 border border-error/20 p-3 rounded-xl">
                            <p className="text-label-sm text-error font-medium flex items-center gap-1 mb-1"><Icon name="device_thermostat" size={14} /> Temp</p>
                            <p className="text-headline-md font-bold text-error">{selectedPatient.vitals?.temp}°F</p>
                          </div>
                          <div className="bg-error-container/20 border border-error/20 p-3 rounded-xl">
                            <p className="text-label-sm text-error font-medium flex items-center gap-1 mb-1"><Icon name="monitor_heart" size={14} /> Pulse</p>
                            <p className="text-headline-md font-bold text-error">{selectedPatient.vitals?.pulse}</p>
                          </div>
                          <div className="bg-surface-container p-3 rounded-xl">
                            <p className="text-label-sm text-on-surface-variant font-medium flex items-center gap-1 mb-1"><Icon name="blood_pressure" size={14} /> BP</p>
                            <p className="text-headline-md font-bold text-on-surface">{selectedPatient.vitals?.bpSys}/{selectedPatient.vitals?.bpDia}</p>
                          </div>
                          <div className="bg-surface-container p-3 rounded-xl">
                            <p className="text-label-sm text-on-surface-variant font-medium flex items-center gap-1 mb-1"><Icon name="air" size={14} /> SpO2</p>
                            <p className="text-headline-md font-bold text-on-surface">{selectedPatient.vitals?.spo2}%</p>
                          </div>
                        </div>
                      </div>

                      {/* Complaint & Media */}
                      <div className="bg-surface rounded-2xl p-6 border border-outline-variant shadow-sm flex flex-col gap-4">
                        <h3 className="text-label-md font-bold uppercase tracking-wider text-on-surface-variant">Chief Complaint & Media</h3>
                        <p className="text-body-lg text-on-surface font-medium leading-relaxed bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
                          "{selectedPatient.complaint}"
                        </p>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                          <div className="w-32 h-32 rounded-xl bg-surface-container border border-outline-variant flex flex-col items-center justify-center text-on-surface-variant shrink-0 cursor-pointer hover:bg-surface-container-high transition-colors">
                            <Icon name="play_circle" size={32} />
                            <span className="text-label-sm mt-2 font-medium">Audio Note</span>
                          </div>
                          <div className="w-32 h-32 rounded-xl bg-surface-container border border-outline-variant overflow-hidden shrink-0 cursor-pointer relative group">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPWN6dhG7Ap6VZoQhzLXnzjDavFH8WCBiU__K_6uWt-nrDO9PFKh7e6dcG4crWq_ZEITHdv6TiWh38QRyo4rkoLHW9uDqRRvL03BMg2llktz4BXfq3p6evcnhets4Wkael90k7J19yXz4DYMU-wAC90izArZ3rkAkARwItxSRWQassX4gaOarsPcX3ixrpVbED_sqyw84goDnME9498Bb4WzKE9XLWY67UUMt2sO8mXuZXWZEMDY1i" alt="Clinical" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Icon name="zoom_in" size={24} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col gap-6">
                      {/* Clinical Notes */}
                      <div className="bg-surface rounded-2xl p-6 border border-outline-variant shadow-sm flex-1 flex flex-col">
                        <h3 className="text-label-md font-bold uppercase tracking-wider text-on-surface-variant mb-4">Clinical Notes</h3>
                        <textarea 
                          placeholder="Type examination notes here..." 
                          className="flex-1 w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none min-h-[150px]"
                        ></textarea>
                        
                        <div className="mt-4 flex flex-col gap-2">
                          <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-3 bg-primary-container text-on-primary-container rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors shadow-sm"
                          >
                            <Icon name="auto_awesome" /> Generate AI E-Rx
                          </button>
                          <button className="w-full py-3 bg-surface border border-outline-variant text-on-surface font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container transition-colors">
                            <Icon name="edit_document" /> Manual Prescription
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          ) : (
            <section className="flex-1 bg-surface-container-lowest flex items-center justify-center">
              <div className="text-center text-on-surface-variant flex flex-col items-center">
                <Icon name="clinical_notes" size={64} className="mb-4 opacity-50" />
                <h2 className="text-headline-md font-semibold mb-2">Select a Patient</h2>
                <p className="text-body-md max-w-sm">Choose a patient from the queue to view their profile, vitals, and begin consultation.</p>
              </div>
            </section>
          )}
        </div>
      </main>

      <AIApprovalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} patientName={selectedPatient?.name} />
    </div>
  );
}
