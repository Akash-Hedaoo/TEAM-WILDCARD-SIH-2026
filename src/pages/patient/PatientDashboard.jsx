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
    <div className="page-shell">
      {/* Mobile Header */}
      <header className="header" style={{ display: 'flex' }}>
        <div className="flex items-center gap-3" style={{ flex: 1 }}>
          <button className="avatar avatar--sm" onClick={() => navigate('/patient/profile')} style={{ cursor: 'pointer' }}>
            <img src={p.avatar} alt={p.name} />
          </button>
          <div>
            <span className="text-label-sm text-muted">Good morning,</span>
            <div className="text-headline-md font-bold text-primary" style={{ fontSize: '18px' }}>Namaste, {p.name.split(' ')[0]}</div>
          </div>
        </div>
        <button className="btn--icon" onClick={() => navigate('/notifications')} style={{ position: 'relative' }}>
          <Icon name="notifications" />
          <span className="notif-dot" />
        </button>
      </header>

      <div className="container animate-fade-in">
        {/* Profile Summary */}
        <section className="card mb-4">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-headline-md font-semibold">Patient Profile</h2>
            <button className="btn--icon" onClick={() => navigate('/patient/profile')}>
              <Icon name="edit" />
            </button>
          </div>
          <div className="grid grid-2 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
            {[
              { label: 'ABHA ID', value: p.abhaId },
              { label: 'Age', value: `${p.age} Yrs` },
              { label: 'Gender', value: p.gender },
              { label: 'Blood Group', value: p.bloodGroup },
            ].map((item, i) => (
              <div key={i}>
                <span className="section-label">{item.label}</span>
                <span className="text-body-lg font-semibold" style={{ display: 'block' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Consult Banner */}
        {upcomingBooking && (
          <section className="card mb-4" style={{ background: 'var(--tertiary-container)', borderColor: 'var(--tertiary)', color: 'var(--on-tertiary-container)' }}>
            <div className="flex gap-4" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
              <div className="avatar avatar--lg" style={{ background: 'var(--tertiary)', color: 'var(--on-tertiary)' }}>
                <Icon name="videocam" fill />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <span className="section-label" style={{ opacity: 0.8, marginBottom: 'var(--sp-1)' }}>Upcoming Teleconsult</span>
                <h3 className="text-body-lg font-semibold">{upcomingBooking.doctor} ({upcomingBooking.specialty})</h3>
                <p className="text-body-sm flex items-center gap-1 mt-1">
                  <Icon name="schedule" size={16} /> Today at {upcomingBooking.time}
                </p>
              </div>
              <button className="btn btn--ghost" disabled style={{ background: 'var(--surface-container-high)', color: 'var(--on-surface-variant)', border: '1px solid var(--outline-variant)' }}>
                <Icon name="video_call" /> Join Meet
              </button>
            </div>
          </section>
        )}

        {/* Action Grid */}
        <section className="grid gap-4" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {/* Check Symptoms - Primary CTA */}
          <button
            onClick={() => navigate('/patient/triage')}
            className="card"
            style={{ gridColumn: 'span 2', background: 'var(--primary)', color: 'var(--on-primary)', borderColor: 'var(--primary)', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', filter: 'blur(20px)' }} />
            <div className="flex justify-between items-start" style={{ position: 'relative', zIndex: 1 }}>
              <div className="avatar" style={{ background: 'var(--on-primary)', color: 'var(--primary)', border: 'none' }}>
                <Icon name="medical_services" fill />
              </div>
              <Icon name="arrow_forward" style={{ opacity: 0.7 }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 className="text-headline-md font-bold" style={{ color: 'inherit' }}>Check Symptoms</h3>
              <p className="text-label-sm" style={{ opacity: 0.9, marginTop: '4px' }}>Self-Triage Assessment</p>
            </div>
          </button>

          {/* My Prescriptions */}
          <button onClick={() => navigate('/patient/prescription/RX-001')} className="card flex flex-col justify-between" style={{ minHeight: '130px', cursor: 'pointer', textAlign: 'left' }}>
            <div className="avatar" style={{ background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', border: 'none' }}>
              <Icon name="medication" fill />
            </div>
            <div>
              <h3 className="text-body-md font-semibold">My Prescriptions</h3>
              <span className="text-label-sm text-primary font-medium flex items-center gap-1 mt-1">
                View {activePrescriptions.length} Active <Icon name="chevron_right" size={14} />
              </span>
            </div>
          </button>

          {/* Lab Reports */}
          <div className="card flex flex-col justify-between" style={{ minHeight: '130px' }}>
            <div className="avatar" style={{ background: 'rgba(0, 74, 198, 0.1)', color: 'var(--primary)', border: 'none' }}>
              <Icon name="science" fill />
            </div>
            <div>
              <h3 className="text-body-md font-semibold">Lab Reports</h3>
              <span className="text-label-sm text-muted mt-1">No new results</span>
            </div>
          </div>

          {/* Family Members */}
          <button onClick={() => navigate('/patient/family')} className="card flex items-center justify-between" style={{ gridColumn: 'span 2', cursor: 'pointer', textAlign: 'left' }}>
            <div className="flex items-center gap-4">
              <div className="avatar avatar--lg" style={{ background: 'var(--surface-container-high)', color: 'var(--on-surface-variant)', border: 'none' }}>
                <Icon name="diversity_3" fill />
              </div>
              <div>
                <h3 className="text-body-lg font-semibold">Family Members</h3>
                <p className="text-body-sm text-muted">Manage dependents & records</p>
              </div>
            </div>
            <Icon name="arrow_forward" style={{ color: 'var(--on-surface-variant)' }} />
          </button>
        </section>
      </div>

      <BottomNavBar role="patient" />
    </div>
  );
}
