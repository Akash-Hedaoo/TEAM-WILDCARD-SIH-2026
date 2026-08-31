import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../../components/shared/TopNavBar';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { currentPatient, prescriptions, bookings } from '../../data/dummyData';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const p = currentPatient;
  const upcomingBooking = bookings.find((b) => b.status === 'upcoming');
  const activePrescriptions = prescriptions.filter((rx) => rx.status === 'active');

  return (
    <div className="bg-background text-on-background min-h-screen pb-24 md:pb-0">
      {/* Mobile Header */}
      <header className="flex justify-between items-center w-full px-container-margin-mobile h-16 bg-surface shadow-sm sticky top-0 z-40 md:hidden">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/patient/profile')} className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant flex-shrink-0 bg-surface-container">
            <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
          </button>
          <div className="flex flex-col justify-center">
            <span className="text-label-sm text-on-surface-variant font-medium">Good morning,</span>
            <span className="text-headline-md font-bold text-primary truncate">Namaste, {p.name.split(' ')[0]}</span>
          </div>
        </div>
        <button onClick={() => navigate('/notifications')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-primary relative">
          <Icon name="notifications" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-surface"></span>
        </button>
      </header>

      {/* Desktop Nav */}
      <TopNavBar role="patient" avatar={p.avatar} />

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop py-6 flex flex-col gap-6">
        {/* Profile Summary */}
        <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] p-6 flex flex-col gap-4 relative animate-fade-in">
          <div className="flex justify-between items-start">
            <h2 className="text-headline-md font-semibold text-on-surface">Patient Profile</h2>
            <button onClick={() => navigate('/patient/profile')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high text-primary transition-colors bg-surface-container-low">
              <Icon name="edit" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'ABHA ID', value: p.abhaId },
              { label: 'Age', value: `${p.age} Yrs` },
              { label: 'Gender', value: p.gender },
              { label: 'Blood Group', value: p.bloodGroup, dot: true },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">{item.label}</span>
                <span className="text-body-lg text-on-surface font-semibold flex items-center gap-1">
                  {item.dot && <span className="w-3 h-3 rounded-full bg-error inline-block"></span>}
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Consult Banner */}
        {upcomingBooking && (
          <section className="bg-tertiary-container text-on-tertiary-container rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm border border-tertiary-fixed-dim animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed flex-shrink-0">
                <Icon name="videocam" fill className="text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-label-sm uppercase tracking-wider opacity-80 font-medium">Upcoming Teleconsult</span>
                <h3 className="text-body-lg font-semibold">{upcomingBooking.doctor} ({upcomingBooking.specialty})</h3>
                <p className="text-body-sm flex items-center gap-1 mt-1">
                  <Icon name="schedule" size={16} /> Today at {upcomingBooking.time}
                </p>
              </div>
            </div>
            <button disabled className="w-full md:w-auto bg-surface-container-high text-on-surface-variant opacity-50 cursor-not-allowed rounded-lg px-6 py-3 text-label-md font-semibold flex justify-center items-center gap-2 border border-outline-variant">
              <Icon name="video_call" /> Join Google Meet
            </button>
          </section>
        )}

        {/* Action Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {/* Check Symptoms - Primary CTA */}
          <button onClick={() => navigate('/patient/triage')} className="col-span-2 bg-primary text-on-primary rounded-xl p-6 flex flex-col justify-between min-h-[140px] shadow-md hover:shadow-lg transition-all active:scale-95 group relative overflow-hidden text-left">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white opacity-10 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-full bg-on-primary text-primary flex items-center justify-center shadow-sm">
                <Icon name="medical_services" fill />
              </div>
              <Icon name="arrow_forward" className="opacity-70 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="flex flex-col mt-4 relative z-10">
              <h3 className="text-headline-md font-bold text-on-primary">Check Symptoms</h3>
              <p className="text-label-sm opacity-90 mt-1">Self-Triage Assessment</p>
            </div>
          </button>

          {/* My Prescriptions */}
          <button onClick={() => navigate('/patient/prescription/RX-001')} className="col-span-1 bg-surface-container-lowest rounded-xl p-4 border border-outline-variant flex flex-col justify-between min-h-[140px] hover:bg-surface-container-low hover:shadow-sm transition-all active:scale-95 group text-left">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-2">
              <Icon name="medication" fill />
            </div>
            <div className="flex flex-col">
              <h3 className="text-body-md text-on-surface font-semibold">My Prescriptions</h3>
              <span className="text-label-sm text-primary mt-1 flex items-center gap-1 group-hover:underline font-medium">
                View {activePrescriptions.length} Active <Icon name="chevron_right" size={14} />
              </span>
            </div>
          </button>

          {/* Lab Reports */}
          <div className="col-span-1 bg-surface-container-lowest rounded-xl p-4 border border-outline-variant flex flex-col justify-between min-h-[140px] hover:bg-surface-container-low hover:shadow-sm transition-all active:scale-95 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-surface-tint text-on-primary flex items-center justify-center mb-2">
              <Icon name="science" fill />
            </div>
            <div className="flex flex-col">
              <h3 className="text-body-md text-on-surface font-semibold">Lab Reports</h3>
              <span className="text-label-sm text-on-surface-variant mt-1">No new results</span>
            </div>
          </div>

          {/* Family Members */}
          <button onClick={() => navigate('/patient/family')} className="col-span-2 md:col-span-4 bg-surface-container-lowest rounded-xl p-4 border border-outline-variant flex items-center justify-between hover:bg-surface-container-low hover:shadow-sm transition-all active:scale-[0.98] group text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <Icon name="diversity_3" fill />
              </div>
              <div className="flex flex-col">
                <h3 className="text-body-lg text-on-surface font-semibold">Family Members</h3>
                <p className="text-body-sm text-on-surface-variant">Manage dependents & records</p>
              </div>
            </div>
            <Icon name="arrow_forward" className="text-on-surface-variant group-hover:translate-x-1 transition-transform" />
          </button>
        </section>
      </main>

      {/* Desktop Footer */}
      <footer className="hidden md:block w-full px-container-margin-desktop bg-surface-container-highest border-t border-outline-variant py-8 mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <p className="text-body-sm text-on-surface">© 2024 Rural Health Commons. Dedicated to rural healthcare accessibility.</p>
          <div className="flex gap-4 md:justify-end text-body-sm">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>

      <BottomNavBar role="patient" />
    </div>
  );
}
