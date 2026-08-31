import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/shared/Icon';
import { prescriptions } from '../../data/dummyData';

export default function PrescriptionViewer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const rx = prescriptions.find((p) => p.id === id) || prescriptions[0];

  return (
    <div className="page-shell">
      <header className="header">
        <div className="flex items-center gap-2 w-full" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <button className="btn--icon" onClick={() => navigate(-1)}><Icon name="arrow_back" /></button>
          <h1 className="text-headline-md font-bold text-primary" style={{ flex: 1 }}>Prescription</h1>
        </div>
      </header>

      <div className="container container--narrow animate-fade-in">
        {/* Title + Actions */}
        <div className="mb-4">
          <h2 className="text-headline-lg font-bold mb-1">Prescription from {rx.doctor}</h2>
          <p className="text-body-md text-muted flex items-center gap-2">
            <Icon name="calendar_month" size={16} /> {rx.date} • <span className="badge badge--primary">{rx.status}</span>
          </p>
        </div>
        <div className="flex gap-3 mb-6">
          <button className="btn btn--primary" style={{ flex: 1 }}><Icon name="download" size={18} /> Download PDF</button>
          <button className="btn btn--outline" style={{ flex: 1 }}><Icon name="share" size={18} /> Share</button>
        </div>

        {/* Prescription Card */}
        <div className="card animate-fade-in" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary)' }} />

          {/* Clinic Header */}
          <div className="flex items-center gap-4 mb-4" style={{ paddingTop: 'var(--sp-2)' }}>
            <div className="avatar avatar--lg" style={{ background: 'var(--primary)', color: 'var(--on-primary)', border: 'none' }}>
              <Icon name="local_hospital" fill />
            </div>
            <div>
              <h3 className="text-headline-md font-semibold text-primary mb-1">{rx.clinic}</h3>
              <p className="text-body-sm text-muted">{rx.clinicAddress}</p>
              <p className="text-body-sm text-muted">Contact: {rx.clinicContact}</p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px dashed var(--outline-variant)', margin: 'var(--sp-4) 0' }} />

          {/* Patient Details */}
          <div className="card card--flat p-4 mb-4" style={{ background: 'var(--surface-container-low)', borderRadius: 'var(--radius-md)' }}>
            <div className="flex justify-between items-start gap-4" style={{ flexWrap: 'wrap' }}>
              <div>
                <p className="section-label">Patient Details</p>
                <p className="text-body-lg font-semibold">{rx.patientName}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="text-body-md">{rx.patientAge} Yrs, {rx.patientGender}</p>
                <p className="text-body-sm text-muted">ID: {rx.patientId}</p>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="mb-4">
            <p className="section-label">Diagnosis</p>
            <p className="badge badge--error" style={{ fontSize: '14px', padding: '4px 12px' }}>{rx.diagnosis}</p>
          </div>

          {/* Medicines */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-headline-lg font-bold text-primary italic">Rx</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--outline-variant)' }} />
            </div>
            <div className="flex flex-col gap-4">
              {rx.medicines.map((med, i) => (
                <div key={i} className="flex justify-between items-start gap-4" style={{ paddingBottom: 'var(--sp-4)', borderBottom: i < rx.medicines.length - 1 ? '1px solid var(--surface-container)' : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <p className="text-body-lg font-bold flex items-center gap-2">
                      <Icon name={med.icon} size={18} style={{ color: 'var(--primary)' }} /> {med.name}
                    </p>
                    <p className="text-body-sm text-muted mt-1 italic">{med.instructions}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span className="badge badge--secondary" style={{ marginBottom: '4px' }}>{med.frequency}</span>
                    <span className="text-body-sm text-muted" style={{ display: 'block', marginTop: '4px' }}>{med.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advice */}
          <div className="card card--flat p-4 mb-4" style={{ background: 'var(--surface-container-low)', borderLeft: '4px solid var(--secondary)', borderRadius: 'var(--radius-md)' }}>
            <p className="section-label flex items-center gap-1">
              <Icon name="info" size={16} /> Advice
            </p>
            <p className="text-body-md">{rx.advice}</p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px dashed var(--outline-variant)', margin: 'var(--sp-4) 0' }} />

          {/* Doctor Signature */}
          <div className="flex justify-between items-end">
            <div>
              <p className="section-label">Signed by</p>
              <p className="text-label-md font-semibold">{rx.doctor}</p>
              <p className="text-body-sm text-muted">{rx.doctorCredentials}</p>
              <p className="text-body-sm text-muted">Reg No: {rx.doctorRegNo}</p>
            </div>
            <div className="badge badge--success"><Icon name="verified" size={14} /> Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
}
