import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { prescriptions } from '../../data/dummyData';

export default function PrescriptionViewer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const rx = prescriptions.find((p) => p.id === id) || prescriptions[0];

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col pb-24 md:pb-0">
      {/* Top Bar */}
      <header className="bg-surface shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-container-margin-mobile h-16">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors">
              <Icon name="arrow_back" />
            </button>
            <h1 className="text-headline-md font-bold text-primary">Prescription</h1>
          </div>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
            <Icon name="more_vert" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-container-margin-mobile pb-8 max-w-2xl mx-auto w-full">
        <div className="mb-6 animate-fade-in">
          <h2 className="text-headline-lg-mobile font-bold text-on-background mb-1">Prescription from {rx.doctor}</h2>
          <p className="text-body-md text-on-surface-variant flex items-center gap-2">
            <Icon name="calendar_month" size={16} /> {rx.date}
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex gap-4 mb-8">
          <button className="flex-1 bg-primary text-on-primary py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-colors shadow-sm text-label-md font-semibold">
            <Icon name="download" /> Download PDF
          </button>
          <button className="flex-1 bg-surface border border-primary text-primary py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm text-label-md font-semibold">
            <Icon name="share" /> Share
          </button>
        </div>

        {/* Medical Slip Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-6 relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>

          {/* Clinic Info */}
          <div className="flex justify-between items-start mb-6 border-b border-surface-container-high pb-4">
            <div>
              <h3 className="text-headline-md font-semibold text-primary mb-1">{rx.clinic}</h3>
              <p className="text-body-sm text-on-surface-variant">{rx.clinicAddress}</p>
              <p className="text-body-sm text-on-surface-variant">Contact: {rx.clinicContact}</p>
            </div>
            <Icon name="medical_services" fill className="text-primary text-4xl" />
          </div>

          {/* Patient Info */}
          <div className="bg-surface-container-low p-4 rounded-lg mb-6 flex justify-between items-center">
            <div>
              <p className="text-label-md text-on-surface-variant mb-1 font-semibold">Patient Details</p>
              <p className="text-body-lg text-on-background font-semibold">{rx.patientName}</p>
            </div>
            <div className="text-right">
              <p className="text-body-md text-on-background">{rx.patientAge} Yrs, {rx.patientGender}</p>
              <p className="text-body-sm text-on-surface-variant">ID: {rx.patientId}</p>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="mb-8">
            <p className="text-label-md text-on-surface-variant mb-1 font-semibold">Diagnosis</p>
            <p className="text-body-lg text-on-background bg-error-container text-on-error-container inline-block px-3 py-1 rounded-md font-medium">{rx.diagnosis}</p>
          </div>

          {/* Rx Symbol */}
          <div className="mb-4">
            <span className="text-headline-lg font-bold text-primary italic">Rx</span>
          </div>

          {/* Medicines */}
          <div className="mb-8 space-y-4">
            {rx.medicines.map((med, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container p-2 gap-2 last:border-b-0">
                <div className="flex-1">
                  <p className="text-body-lg text-on-background font-bold flex items-center gap-2">
                    <Icon name={med.icon} className={`text-${med.color}`} size={16} />
                    {med.name}
                  </p>
                  <p className="text-body-sm text-on-surface-variant mt-1 italic">{med.instructions}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                  <span className={`bg-${med.color === 'tertiary' ? 'tertiary-container text-on-tertiary-container' : 'secondary-container text-on-secondary-container'} px-2 py-1 rounded text-label-md font-semibold`}>
                    {med.frequency}
                  </span>
                  <span className="text-body-sm text-on-surface-variant mt-1">{med.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Advice */}
          <div className="bg-surface-container-low p-4 rounded-lg mt-6 border-l-4 border-secondary">
            <p className="text-label-md text-on-surface-variant mb-1 flex items-center gap-1 font-semibold">
              <Icon name="info" size={16} /> General Advice
            </p>
            <p className="text-body-md text-on-background">{rx.advice}</p>
          </div>

          {/* Signature */}
          <div className="mt-8 flex justify-end">
            <div className="text-center">
              <div className="font-serif text-2xl text-primary opacity-80 mb-1 border-b border-surface-container-high pb-2 italic">
                {rx.doctor.replace('Dr. ', 'Dr. ')}
              </div>
              <p className="text-label-md text-on-background font-semibold">{rx.doctor}</p>
              <p className="text-body-sm text-on-surface-variant">{rx.doctorCredentials}</p>
              <p className="text-body-sm text-on-surface-variant">Reg No: {rx.doctorRegNo}</p>
            </div>
          </div>

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Icon name="health_and_safety" fill style={{ fontSize: '200px' }} />
          </div>
        </div>
      </main>

      <BottomNavBar role="patient" />
    </div>
  );
}
