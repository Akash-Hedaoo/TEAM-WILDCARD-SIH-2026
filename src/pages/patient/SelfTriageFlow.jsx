import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/shared/Icon';
import { bodyAreas, symptoms, severityOptions } from '../../data/dummyData';

export default function SelfTriageFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severity, setSeverity] = useState(null);
  const [days, setDays] = useState(3);

  const toggleSymptom = (s) => setSelectedSymptoms((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  return (
    <div className="page-shell" style={{ display: 'flex', flexDirection: 'column' }}>
      <header className="header">
        <div className="flex items-center gap-3 w-full">
          <button className="btn--icon" onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}>
            <Icon name="arrow_back" />
          </button>
          <span className="text-headline-md font-bold text-primary" style={{ flex: 1 }}>Self-Triage</span>
          <span className="text-label-md text-muted font-semibold">Step {step} of 3</span>
        </div>
      </header>

      {/* Progress */}
      <div className="progress-bar" style={{ position: 'sticky', top: 'var(--header-h)', zIndex: 40 }}>
        <div className="progress-bar-fill" style={{ width: `${(step / 3) * 100}%` }} />
      </div>

      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="card animate-fade-in" style={{ flex: 1 }}>
          {/* Step 1: Body Area */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-headline-md font-semibold mb-2">Where are you experiencing discomfort?</h2>
                <p className="text-body-md text-muted">Select the primary area.</p>
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
                {bodyAreas.map((area) => (
                  <button
                    key={area.id}
                    className={`role-option ${selectedArea === area.id ? 'role-option--selected' : ''}`}
                    onClick={() => setSelectedArea(area.id)}
                  >
                    <Icon name={area.icon} size={28} style={{ color: selectedArea === area.id ? 'var(--primary)' : 'var(--on-surface-variant)' }} />
                    <span className="text-label-md font-semibold">{area.label}</span>
                  </button>
                ))}
              </div>
              <button className="btn btn--primary btn--full" disabled={!selectedArea} onClick={() => setStep(2)}>
                Next — Select Symptoms
              </button>
            </div>
          )}

          {/* Step 2: Symptoms */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-headline-md font-semibold mb-2">What specific symptoms do you have?</h2>
                <p className="text-body-md text-muted">Select all that apply.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {symptoms.map((s) => (
                  <button
                    key={s}
                    className={`symptom-chip ${selectedSymptoms.includes(s) ? 'symptom-chip--selected' : ''}`}
                    onClick={() => toggleSymptom(s)}
                  >
                    {selectedSymptoms.includes(s) && <Icon name="check" size={16} />}
                    {s}
                  </button>
                ))}
              </div>
              <button className="btn btn--primary btn--full" disabled={selectedSymptoms.length === 0} onClick={() => setStep(3)}>
                Next — Additional Details
              </button>
            </div>
          )}

          {/* Step 3: Duration & Severity */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-headline-md font-semibold mb-2">Additional Details</h2>

              <div>
                <label className="text-label-md font-semibold mb-4" style={{ display: 'block' }}>How many days have you felt this way?</label>
                <div className="flex items-center gap-3">
                  <span className="text-body-sm text-muted">1</span>
                  <input
                    type="range" min="1" max="14" value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--primary)' }}
                  />
                  <span className="text-body-sm text-muted">14+</span>
                </div>
                <div className="text-center mt-2 text-primary font-bold text-label-md">{days}{days === 14 ? '+ Days' : ' Days'}</div>
              </div>

              <div>
                <p className="text-label-md font-semibold mb-4">How severe is the discomfort?</p>
                <div className="flex flex-col gap-3">
                  {severityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      className={`severity-option ${severity === opt.value ? 'severity-option--selected' : ''}`}
                      onClick={() => setSeverity(opt.value)}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={opt.icon} size={24} style={{ color: severity === opt.value ? 'var(--primary)' : 'var(--on-surface-variant)' }} />
                        <span className="font-semibold">{opt.label}</span>
                      </div>
                      {severity === opt.value && <Icon name="check_circle" style={{ color: 'var(--primary)' }} />}
                    </button>
                  ))}
                </div>
              </div>

              <button className="btn btn--primary btn--full btn--lg" onClick={() => navigate('/patient')}>
                <Icon name="send" size={18} /> Submit Triage Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
