import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../components/shared/SideNavBar';
import BottomNavBar from '../../components/shared/BottomNavBar';
import AIApprovalModal from '../../components/doctor/AIApprovalModal';
import Icon from '../../components/shared/Icon';
import { patients, currentDoctor } from '../../data/dummyData';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAI, setShowAI] = useState(false);

  const triageBadge = { red: 'badge--red', yellow: 'badge--yellow', green: 'badge--green' };
  const sorted = [...patients].sort((a, b) => {
    const order = { red: 0, yellow: 1, green: 2 };
    return (order[a.triageLevel] ?? 3) - (order[b.triageLevel] ?? 3);
  });

  return (
    <div className="page-shell page-shell--with-sidebar" style={{ paddingBottom: 0 }}>
      <SideNavBar role="doctor" avatar={currentDoctor.avatar} />

      {/* Mobile Header */}
      <header className="header header--with-sidebar" style={{ display: 'flex' }}>
        <h1 className="text-headline-md font-bold text-primary" style={{ flex: 1 }}>Priority Queue</h1>
        <div className="flex items-center gap-2">
          <span className="badge badge--red">{patients.filter(p => p.triageLevel === 'red').length} Critical</span>
          <button className="btn--icon" onClick={() => navigate('/notifications')} style={{ position: 'relative' }}>
            <Icon name="notifications" />
          </button>
        </div>
      </header>

      <div className="split-pane" style={{ paddingTop: 0 }}>
        {/* Queue List */}
        <div className={`split-pane-list thin-scrollbar ${selectedPatient ? 'split-pane-list--hidden' : ''}`}>
          <div style={{ padding: 'var(--sp-4)' }}>
            <div className="flex items-center gap-2" style={{ position: 'relative' }}>
              <Icon name="search" style={{ position: 'absolute', left: 'var(--sp-3)', color: 'var(--on-surface-variant)' }} size={20} />
              <input className="input input--search" placeholder="Search patients..." style={{ paddingLeft: 'var(--sp-10)' }} />
            </div>
          </div>
          {sorted.map((p) => (
            <div
              key={p.id}
              className={`queue-item ${selectedPatient?.id === p.id ? 'queue-item--active' : ''}`}
              onClick={() => setSelectedPatient(p)}
            >
              <div className="flex gap-3 items-start">
                <div className={`avatar avatar--initials avatar--${p.triageLevel || 'primary'}`} style={{ width: '36px', height: '36px', fontSize: '14px' }}>
                  {p.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex justify-between items-start">
                    <span className="text-body-md font-bold truncate">{p.name}</span>
                    <span className={`badge ${triageBadge[p.triageLevel]}`} style={{ fontSize: '9px', padding: '1px 6px' }}>{p.triageLevel}</span>
                  </div>
                  <p className="text-body-sm text-muted truncate" style={{ marginTop: '2px' }}>{p.complaint}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-label-sm text-muted"><Icon name="schedule" size={12} /> {p.waitTime}</span>
                    <span className="text-label-sm text-muted">{p.source}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className={`split-pane-detail thin-scrollbar ${selectedPatient ? 'split-pane-detail--visible' : ''}`}>
          {selectedPatient ? (
            <div style={{ padding: 'var(--sp-6)' }}>
              {/* Back button (mobile) */}
              <button className="btn btn--ghost mb-4" onClick={() => setSelectedPatient(null)} style={{ display: 'flex' }}>
                <Icon name="arrow_back" size={18} /> Back to Queue
              </button>

              {/* Patient Header */}
              <div className="flex gap-4 items-start mb-6" style={{ flexWrap: 'wrap' }}>
                <div className={`avatar avatar--xl avatar--initials avatar--${selectedPatient.triageLevel || 'primary'}`}>
                  {selectedPatient.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h2 className="text-headline-lg font-bold">{selectedPatient.name}</h2>
                  <p className="text-body-md text-muted">{selectedPatient.age} Yrs • {selectedPatient.gender} • ID: {selectedPatient.id}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`badge ${triageBadge[selectedPatient.triageLevel]}`}>{selectedPatient.triageLevel} priority</span>
                    {selectedPatient.conditions.map((c, i) => (
                      <span key={i} className="badge badge--warning">{c}</span>
                    ))}
                    {selectedPatient.allergies.length > 0 && (
                      <span className="badge badge--error">⚠ {selectedPatient.allergies.join(', ')}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Vitals */}
              <div className="card mb-4">
                <h3 className="section-label">Vitals</h3>
                <div className="grid gap-3 mt-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
                  {[
                    { label: 'Temp', value: `${selectedPatient.vitals.temp}°F`, alert: selectedPatient.vitals.temp >= 103, icon: 'device_thermostat' },
                    { label: 'Pulse', value: `${selectedPatient.vitals.pulse}`, alert: selectedPatient.vitals.pulse >= 120, icon: 'monitor_heart' },
                    { label: 'BP', value: `${selectedPatient.vitals.bpSys}/${selectedPatient.vitals.bpDia}`, alert: selectedPatient.vitals.bpSys >= 140, icon: 'bloodtype' },
                    { label: 'SpO2', value: `${selectedPatient.vitals.spo2}%`, alert: selectedPatient.vitals.spo2 <= 94, icon: 'air' },
                  ].map((v, i) => (
                    <div key={i} className={`vital-card ${v.alert ? 'vital-card--alert' : 'vital-card--normal'}`}>
                      <span className="vital-label"><Icon name={v.icon} size={14} /> {v.label}</span>
                      <span className="vital-value" style={{ color: v.alert ? 'var(--error)' : 'var(--on-surface)', fontSize: '20px' }}>{v.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complaint */}
              <div className="card mb-4">
                <h3 className="section-label">Chief Complaint</h3>
                <p className="text-body-md mt-3">{selectedPatient.complaint}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3" style={{ flexWrap: 'wrap' }}>
                <button className="btn btn--primary btn--lg" style={{ flex: 1, minWidth: '200px' }} onClick={() => setShowAI(true)}>
                  <Icon name="auto_awesome" size={18} /> AI Draft E-Prescription
                </button>
                <button className="btn btn--outline" style={{ flex: 1, minWidth: '200px' }}>
                  <Icon name="videocam" size={18} /> Start Teleconsult
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center" style={{ height: '100%', color: 'var(--on-surface-variant)', gap: 'var(--sp-4)' }}>
              <Icon name="clinical_notes" size={64} style={{ opacity: 0.3 }} />
              <p className="text-body-lg">Select a patient to view details</p>
            </div>
          )}
        </div>
      </div>

      <AIApprovalModal isOpen={showAI} onClose={() => setShowAI(false)} patientName={selectedPatient?.name} />
      <BottomNavBar role="doctor" />
    </div>
  );
}
