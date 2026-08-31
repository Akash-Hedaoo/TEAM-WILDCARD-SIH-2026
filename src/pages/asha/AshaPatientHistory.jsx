import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { patients, prescriptions } from '../../data/dummyData';

export default function AshaPatientHistory() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const patient = patients.find((p) => p.id === patientId) || patients[0];

  const triageBadge = { red: 'badge--red', yellow: 'badge--yellow', green: 'badge--green' };

  return (
    <div className="page-shell">
      <header className="header">
        <button className="btn--icon" onClick={() => navigate(-1)}><Icon name="arrow_back" /></button>
        <h1 className="text-headline-md font-bold" style={{ marginLeft: 'var(--sp-2)', flex: 1 }}>Patient History</h1>
      </header>

      <div className="container container--narrow animate-fade-in">
        {/* Patient Card */}
        <div className="card mb-4 flex items-center gap-4">
          <div className={`avatar avatar--lg avatar--initials avatar--${patient.triageLevel || 'primary'}`}>
            {patient.name.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="text-headline-md font-semibold">{patient.name}</h2>
            <p className="text-body-sm text-muted">{patient.age} Yrs • {patient.gender} • {patient.village}</p>
            <div className="flex gap-2 mt-2">
              <span className={`badge ${triageBadge[patient.triageLevel]}`}>{patient.triageLevel}</span>
              <span className="badge badge--outline">{patient.source}</span>
            </div>
          </div>
        </div>

        {/* Current Vitals */}
        <div className="card mb-4">
          <h3 className="section-label">Current Vitals</h3>
          <div className="grid gap-3 mt-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
            {[
              { label: 'Temp', value: `${patient.vitals.temp}°F`, alert: patient.vitals.temp >= 103 },
              { label: 'Pulse', value: `${patient.vitals.pulse}`, alert: patient.vitals.pulse >= 120 },
              { label: 'BP', value: `${patient.vitals.bpSys}/${patient.vitals.bpDia}`, alert: patient.vitals.bpSys >= 140 },
              { label: 'SpO2', value: `${patient.vitals.spo2}%`, alert: patient.vitals.spo2 <= 94 },
            ].map((v, i) => (
              <div key={i} className={`vital-card ${v.alert ? 'vital-card--alert' : 'vital-card--normal'}`}>
                <span className="vital-label">{v.label}</span>
                <span className="vital-value" style={{ color: v.alert ? 'var(--error)' : 'var(--on-surface)' }}>{v.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Complaint */}
        <div className="card mb-4">
          <h3 className="section-label">Chief Complaint</h3>
          <p className="text-body-md mt-3">{patient.complaint}</p>
        </div>

        {/* Past Prescriptions */}
        <div className="card">
          <h3 className="section-label">Past Prescriptions</h3>
          <div className="flex flex-col mt-3">
            {prescriptions.map((rx) => (
              <div key={rx.id} className="timeline-item">
                <div className="timeline-dot timeline-dot--green" />
                <div>
                  <p className="text-label-sm text-muted">{rx.date}</p>
                  <p className="text-body-md font-semibold">{rx.diagnosis}</p>
                  <p className="text-body-sm text-muted">By {rx.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar role="asha" />
    </div>
  );
}
