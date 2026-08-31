import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../../components/shared/TopNavBar';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { bodyAreas, symptoms, severityOptions } from '../../data/dummyData';

export default function SelfTriageFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [days, setDays] = useState(3);
  const [severity, setSeverity] = useState('mild');

  const toggleSymptom = (s) => {
    setSelectedSymptoms((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const severityColors = { mild: 'secondary', moderate: 'tertiary', severe: 'error' };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col pb-24 md:pb-0">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-surface shadow-sm h-16 flex justify-between items-center px-container-margin-mobile md:px-container-margin-desktop">
        <div className="flex items-center gap-2">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors">
              <Icon name="arrow_back" />
            </button>
          ) : (
            <button onClick={() => navigate(-1)} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors">
              <Icon name="arrow_back" />
            </button>
          )}
          <span className="text-headline-md font-bold text-primary">Self-Triage</span>
        </div>
        <span className="text-label-md text-on-surface-variant font-semibold">Step {step} of 3</span>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col px-container-margin-mobile md:px-container-margin-desktop pt-24 max-w-2xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        {/* Flow Container */}
        <div className="flex-grow bg-surface-container-lowest shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] border border-outline-variant/30 rounded-xl p-6 animate-fade-in">
          {/* Step 1: Body Grid */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-headline-md font-semibold text-on-surface mb-2">Where are you experiencing discomfort?</h2>
                <p className="text-body-md text-on-surface-variant">Select the primary area.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {bodyAreas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all group bg-surface ${
                      selectedArea === area.id
                        ? 'border-primary bg-primary-container/10 shadow-sm'
                        : 'border-outline-variant/50 hover:border-primary hover:bg-primary-container/10'
                    }`}
                  >
                    <Icon name={area.icon} className={`text-4xl mb-3 transition-colors ${selectedArea === area.id ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`} />
                    <span className={`text-label-md font-semibold transition-colors ${selectedArea === area.id ? 'text-primary' : 'text-on-surface group-hover:text-primary'}`}>
                      {area.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-auto pt-6 flex justify-end">
                <button onClick={() => setStep(2)} disabled={!selectedArea} className="bg-primary text-on-primary px-6 py-3 rounded-full text-label-md font-semibold hover:bg-on-primary-fixed-variant transition-colors shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Symptoms */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-headline-md font-semibold text-on-surface mb-2">What specific symptoms do you have?</h2>
                <p className="text-body-md text-on-surface-variant">Select all that apply.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-5 py-3 rounded-full border transition-all text-body-sm flex items-center gap-2 ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-primary-container text-primary border-primary font-semibold'
                        : 'bg-surface text-on-surface border-outline-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {selectedSymptoms.includes(symptom) && <Icon name="check" size={18} />}
                    {symptom}
                  </button>
                ))}
              </div>
              <div className="mt-auto pt-6 flex justify-end">
                <button onClick={() => setStep(3)} disabled={selectedSymptoms.length === 0} className="bg-primary text-on-primary px-6 py-3 rounded-full text-label-md font-semibold hover:bg-on-primary-fixed-variant transition-colors shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Details & Severity */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-headline-md font-semibold text-on-surface mb-2">Additional Details</h2>

              {/* Duration Slider */}
              <div className="mb-4">
                <label className="block text-label-md font-semibold text-on-surface mb-4">How many days have you felt this way?</label>
                <div className="flex items-center gap-4">
                  <span className="text-body-sm text-on-surface-variant w-8 text-right">1</span>
                  <input
                    type="range" min="1" max="14" value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="text-body-sm text-on-surface-variant w-8">14+</span>
                </div>
                <div className="text-center mt-2 text-primary font-bold text-label-md">{days}{days === 14 ? '+ Days' : ' Days'}</div>
              </div>

              {/* Severity */}
              <div>
                <p className="block text-label-md font-semibold text-on-surface mb-4">How severe is the discomfort?</p>
                <div className="flex flex-col gap-3">
                  {severityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSeverity(opt.value)}
                      className={`p-4 rounded-xl border flex justify-between items-center transition-all ${
                        severity === opt.value
                          ? `bg-${opt.color}-container/20 border-${opt.color} shadow-sm`
                          : 'border-outline-variant bg-surface hover:bg-surface-container-high'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          severity === opt.value ? `border-${opt.color} bg-${opt.color}` : 'border-outline-variant'
                        }`}>
                          {severity === opt.value && <div className="w-1.5 h-1.5 bg-surface rounded-full"></div>}
                        </div>
                        <span className="text-body-md text-on-surface font-medium">{opt.label}</span>
                      </div>
                      <Icon name={opt.icon} fill className={`text-${opt.color}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-20 md:h-0"></div>
            </div>
          )}
        </div>
      </main>

      {/* Sticky Footer (Step 3) */}
      {step === 3 && (
        <div className="fixed bottom-16 md:bottom-0 left-0 w-full p-4 bg-surface/90 backdrop-blur-md border-t border-outline-variant/30 z-30">
          <div className="max-w-2xl mx-auto flex gap-4">
            <button className="flex-1 bg-surface-container-high text-on-surface px-6 py-4 rounded-xl text-label-md font-semibold hover:bg-surface-variant transition-colors shadow-sm active:scale-95">
              Save for Later
            </button>
            <button onClick={() => navigate('/patient/bookings')} className="flex-[2] bg-primary text-on-primary px-6 py-4 rounded-xl text-label-md font-semibold hover:bg-on-primary-fixed-variant transition-colors shadow-sm active:scale-95 flex items-center justify-center gap-2">
              <Icon name="search" size={20} /> Find Next Available Doctor
            </button>
          </div>
        </div>
      )}

      <BottomNavBar role="patient" />
    </div>
  );
}
