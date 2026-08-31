import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/shared/Icon';
import { patients } from '../../data/dummyData';

export default function AshaTriageForm() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const patient = patients.find((p) => p.id === patientId) || patients[0];

  const [vitals, setVitals] = useState({
    temp: patient.vitals?.temp || 98.6,
    pulse: patient.vitals?.pulse || 72,
    bpSys: patient.vitals?.bpSys || 120,
    bpDia: patient.vitals?.bpDia || 80,
  });

  const [isRecording, setIsRecording] = useState(true);
  const isEmergency = vitals.temp > 102 || vitals.pulse > 110 || vitals.bpSys > 150 || vitals.bpDia < 60;

  const vitalColor = (val, type) => {
    if (type === 'temp' && val > 101) return 'border-error text-error';
    if (type === 'pulse' && (val > 100 || val < 60)) return 'border-error text-error';
    if (type === 'bp' && (vitals.bpSys > 140 || vitals.bpDia < 60)) return 'border-error text-error';
    return 'border-secondary text-secondary';
  };

  return (
    <div className="bg-background min-h-screen text-on-background pb-32">
      {/* Header */}
      <header className="bg-surface sticky top-0 z-40 border-b border-outline-variant shadow-sm">
        <div className="flex items-center justify-between h-16 px-container-margin-mobile">
          <button onClick={() => navigate(-1)} className="text-on-surface p-2 -ml-2 rounded-full hover:bg-surface-container-highest transition-colors">
            <Icon name="arrow_back" />
          </button>
          <h1 className="text-headline-md font-semibold text-on-surface">Vitals Intake</h1>
          <div className="w-10 flex justify-end">
            <Icon name="wifi" className="text-primary" />
          </div>
        </div>
      </header>

      <main className="px-container-margin-mobile pt-6 flex flex-col gap-gutter max-w-2xl mx-auto animate-fade-in">
        {/* Patient Card */}
        <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-headline-md font-semibold shrink-0">
            {patient.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <h2 className="text-headline-md font-semibold text-on-surface">{patient.name}</h2>
            <p className="text-body-md text-on-surface-variant">{patient.age} yrs • {patient.gender}</p>
            <div className="mt-2 inline-flex items-center gap-1 bg-surface-container px-2 py-1 rounded w-max">
              <Icon name="pin_drop" size={16} className="text-on-surface-variant" />
              <span className="text-label-sm text-on-surface-variant font-medium">{patient.block}</span>
            </div>
          </div>
        </section>

        {/* Vitals Grid */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-4 flex flex-col gap-2">
            <label className="text-label-md text-on-surface-variant flex items-center gap-1 font-semibold">
              <Icon name="device_thermostat" size={20} className="text-error" /> Temp
            </label>
            <div className={`flex items-end gap-1 border-b-2 pb-1 ${vitalColor(vitals.temp, 'temp')}`}>
              <input type="number" value={vitals.temp} onChange={(e) => setVitals({ ...vitals, temp: Number(e.target.value) })}
                className="w-full bg-transparent border-0 focus:ring-0 px-0 text-[40px] leading-[48px] font-bold text-on-surface text-center p-0 outline-none" />
              <span className="text-body-md text-on-surface-variant pb-2 shrink-0">°F</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-4 flex flex-col gap-2">
            <label className="text-label-md text-on-surface-variant flex items-center gap-1 font-semibold">
              <Icon name="monitor_heart" size={20} className="text-error" /> Pulse
            </label>
            <div className={`flex items-end gap-1 border-b-2 pb-1 ${vitalColor(vitals.pulse, 'pulse')}`}>
              <input type="number" value={vitals.pulse} onChange={(e) => setVitals({ ...vitals, pulse: Number(e.target.value) })}
                className="w-full bg-transparent border-0 focus:ring-0 px-0 text-[40px] leading-[48px] font-bold text-on-surface text-center p-0 outline-none" />
              <span className="text-body-md text-on-surface-variant pb-2 shrink-0">bpm</span>
            </div>
          </div>
          <div className="col-span-2 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-4 flex flex-col gap-2">
            <label className="text-label-md text-on-surface-variant flex items-center gap-1 font-semibold">
              <Icon name="blood_pressure" size={20} className="text-error" /> Blood Pressure
            </label>
            <div className={`flex items-end gap-2 border-b-2 pb-1 ${vitalColor(0, 'bp')}`}>
              <input type="number" value={vitals.bpSys} onChange={(e) => setVitals({ ...vitals, bpSys: Number(e.target.value) })}
                className="flex-1 bg-transparent border-0 focus:ring-0 px-0 text-[40px] leading-[48px] font-bold text-on-surface text-right p-0 outline-none" />
              <span className="text-[40px] leading-[48px] font-bold text-outline-variant pb-1">/</span>
              <input type="number" value={vitals.bpDia} onChange={(e) => setVitals({ ...vitals, bpDia: Number(e.target.value) })}
                className="flex-1 bg-transparent border-0 focus:ring-0 px-0 text-[40px] leading-[48px] font-bold text-on-surface text-left p-0 outline-none" />
              <span className="text-body-md text-on-surface-variant pb-2 shrink-0">mmHg</span>
            </div>
          </div>
        </section>

        {/* Emergency Alert */}
        {isEmergency && (
          <section className="bg-error-container rounded-xl p-6 border-2 border-error flex gap-4 animate-pulse-alert shadow-sm">
            <div className="shrink-0 mt-1">
              <Icon name="warning" fill size={32} className="text-error" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-headline-md font-semibold text-on-error-container uppercase tracking-wide">Emergency Protocol</h3>
              <p className="text-body-md text-on-error-container">Patient exhibits signs of severe systemic infection or shock. Immediate physician intervention is required.</p>
            </div>
          </section>
        )}

        {/* Store & Forward Media */}
        <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-6 flex flex-col gap-4">
          <h3 className="text-label-md text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">Store & Forward Media</h3>
          {/* Audio Recording */}
          <div className="bg-surface border-2 border-error rounded-lg h-16 flex items-center justify-between px-4 relative overflow-hidden cursor-pointer shadow-inner"
               onClick={() => setIsRecording(!isRecording)}>
            {isRecording && <div className="absolute inset-y-0 left-0 bg-error/20 w-2/5 animate-pulse"></div>}
            <div className="flex items-center gap-3 relative z-10">
              <Icon name="mic" fill size={28} className="text-error" />
              <span className="text-label-md text-on-surface font-semibold">{isRecording ? 'Recording Audio...' : 'Tap to Record'}</span>
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <span className="text-body-md text-error font-mono font-bold tracking-widest">00:15</span>
              {isRecording && <div className="w-4 h-4 rounded-full bg-error animate-recording"></div>}
            </div>
          </div>

          {/* Camera Button */}
          <button className="w-full h-16 mt-2 border-2 border-dashed border-primary bg-primary/5 rounded-lg flex items-center justify-center gap-2 text-primary hover:bg-primary/10 transition-colors">
            <Icon name="photo_camera" size={24} />
            <span className="text-label-md font-bold">Capture Symptom Photo</span>
          </button>

          {/* Image Grid */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="aspect-square rounded-lg bg-surface-dim border border-outline-variant overflow-hidden relative shadow-sm">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPWN6dhG7Ap6VZoQhzLXnzjDavFH8WCBiU__K_6uWt-nrDO9PFKh7e6dcG4crWq_ZEITHdv6TiWh38QRyo4rkoLHW9uDqRRvL03BMg2llktz4BXfq3p6evcnhets4Wkael90k7J19yXz4DYMU-wAC90izArZ3rkAkARwItxSRWQassX4gaOarsPcX3ixrpVbED_sqyw84goDnME9498Bb4WzKE9XLWY67UUMt2sO8mXuZXWZEMDY1i" alt="Clinical photo" />
              <button className="absolute top-2 right-2 w-6 h-6 bg-inverse-surface/80 rounded-full flex items-center justify-center text-inverse-on-surface backdrop-blur-md">
                <Icon name="close" size={16} />
              </button>
            </div>
            {[1, 2].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-surface-container-low border border-dashed border-outline-variant flex items-center justify-center text-outline">
                <Icon name="image" size={32} className="opacity-50" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant p-4 flex gap-4 z-50 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.05)] pb-[calc(16px+env(safe-area-inset-bottom))]">
        <button className="flex-1 h-14 border-2 border-outline-variant rounded-xl flex items-center justify-center gap-2 text-on-surface hover:bg-surface-container transition-colors">
          <Icon name="save" /> <span className="text-label-md font-bold">Save Locally</span>
        </button>
        <button className="flex-[1.5] h-14 bg-error rounded-xl flex items-center justify-center gap-2 text-on-error shadow-md hover:bg-error/90 transition-colors">
          <Icon name="emergency" fill size={20} />
          <span className="text-label-md font-bold uppercase tracking-wide">Sync Urgent</span>
        </button>
      </div>
    </div>
  );
}
