import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { currentPatient } from '../../data/dummyData';

export default function PatientProfile() {
  const navigate = useNavigate();
  const p = currentPatient;

  return (
    <div className="page-shell">
      <header className="header">
        <button className="btn--icon" onClick={() => navigate(-1)}><Icon name="arrow_back" /></button>
        <h1 className="text-headline-md font-bold" style={{ marginLeft: 'var(--sp-2)' }}>My Profile</h1>
      </header>

      <div className="container container--narrow animate-fade-in">
        {/* Profile Card */}
        <div className="card mb-4" style={{ textAlign: 'center' }}>
          <div className="avatar avatar--xl" style={{ margin: '0 auto var(--sp-4)', width: '80px', height: '80px' }}>
            <img src={p.avatar} alt={p.name} />
          </div>
          <h2 className="text-headline-md font-bold">{p.name}</h2>
          <p className="text-body-sm text-muted mt-1">{p.village} • {p.block}</p>
          <div className="badge badge--primary mt-2">ABHA: {p.abhaId}</div>
        </div>

        {/* Details */}
        <div className="card mb-4">
          <h3 className="section-label">Personal Info</h3>
          <div className="flex flex-col gap-4 mt-3">
            {[
              { icon: 'cake', label: 'Age', value: `${p.age} Years` },
              { icon: 'wc', label: 'Gender', value: p.gender },
              { icon: 'bloodtype', label: 'Blood Group', value: p.bloodGroup },
              { icon: 'call', label: 'Phone', value: p.phone },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4" style={{ paddingBottom: 'var(--sp-3)', borderBottom: i < 3 ? '1px solid var(--surface-container)' : 'none' }}>
                <div className="avatar avatar--sm" style={{ background: 'var(--primary-container)', color: 'var(--primary)', border: 'none' }}>
                  <Icon name={item.icon} size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="text-label-sm text-muted">{item.label}</span>
                  <span className="text-body-md font-semibold" style={{ display: 'block' }}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical History */}
        <div className="card mb-4">
          <h3 className="section-label">Medical History</h3>
          <div className="flex flex-col mt-3">
            {p.medicalHistory.map((record, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div>
                  <p className="text-label-sm text-muted">{record.date}</p>
                  <p className="text-body-md font-semibold">{record.event}</p>
                  <p className="text-body-sm text-muted">By {record.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="card">
          <h3 className="section-label">Emergency Contacts</h3>
          <div className="flex flex-col gap-3 mt-3">
            {p.emergencyContacts.map((contact, i) => (
              <div key={i} className="flex items-center justify-between" style={{ padding: 'var(--sp-3)', background: 'var(--surface-container-low)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <p className="text-body-md font-semibold">{contact.name}</p>
                  <p className="text-body-sm text-muted">{contact.relation} • {contact.phone}</p>
                </div>
                <button className="btn--icon" style={{ color: 'var(--secondary)' }}><Icon name="call" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavBar role="patient" />
    </div>
  );
}
