import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { useAppContext } from '../../context/useAppContext';
import { processTriage, generatePrescriptionDraft, validateTriageData } from '../../workers/triageWorker';
import { patients } from '../../data/dummyData';

/**
 * AshaTriageForm - ASHA worker triage assessment form
 * Collects vitals, symptoms, and complaints
 * Processes data through triageWorker and queues for sync
 */
export default function AshaTriageForm() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const { addToOfflineQueue, addNotification, isOnline, updatePatientData } = useAppContext();
  const patient = patients.find((p) => p.id === patientId) || patients[0];

  // Vitals state
  const [temp, setTemp] = useState(patient.vitals?.temp || '');
  const [pulse, setPulse] = useState(patient.vitals?.pulse || '');
  const [bpSys, setBpSys] = useState(patient.vitals?.bpSys || '');
  const [bpDia, setBpDia] = useState(patient.vitals?.bpDia || '');
  const [spo2, setSpo2] = useState(patient.vitals?.spo2 || '');
  const [complaint, setComplaint] = useState(patient.complaint || '');
  const [isRecording, setIsRecording] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [triageResult, setTriageResult] = useState(null);

  const isHighTemp = parseFloat(temp) >= 103;
  const isHighPulse = parseInt(pulse) >= 120;

  /**
   * Handle triage form submission
   * Validates data, processes through worker, and queues for sync
   */
  const handleSubmitAssessment = async () => {
    try {
      setSubmitting(true);

      // Prepare triage data
      const triageData = {
        vitals: {
          temp: parseFloat(temp),
          pulse: parseInt(pulse),
          bpSys: parseInt(bpSys),
          bpDia: parseInt(bpDia),
          spo2: parseInt(spo2),
        },
        symptoms,
        complaint,
        duration: 1,
        patientAge: patient.age,
        preConditions: patient.conditions || [],
      };

      // Validate data
      const validation = validateTriageData(triageData);
      if (!validation.isValid) {
        addNotification(`Validation failed: ${validation.errors.join(', ')}`, 'error', 3000);
        setSubmitting(false);
        return;
      }

      // Process through triage worker
      const result = processTriage(triageData);
      setTriageResult(result);

      // Generate prescription draft
      const prescriptionDraft = generatePrescriptionDraft(result, symptoms);

      // Create action object for offline queue
      const triageAction = {
        type: 'TRIAGE_ASSESSMENT',
        patientId: patient.id,
        data: {
          triageData,
          triageResult: result,
          prescriptionDraft,
          recordedAt: new Date().toISOString(),
        },
      };

      // Queue for sync
      addToOfflineQueue(triageAction);

      // Update patient data with new triage level
      updatePatientData(patient.id, {
        triageLevel: result.priorityLevel,
        vitals: triageData.vitals,
        lastTriageTime: new Date().toISOString(),
      });

      // Show success message
      addNotification(
        `Triage submitted - Priority: ${result.priorityLevel.toUpperCase()}`,
        'success',
        2000
      );

      // Navigate after delay
      setTimeout(() => navigate('/asha'), 1500);
    } catch (error) {
      addNotification(`Error: ${error.message}`, 'error', 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <header className="header">
        <button className="btn--icon" onClick={() => navigate(-1)}><Icon name="arrow_back" /></button>
        <h1 className="text-headline-md font-bold text-primary" style={{ marginLeft: 'var(--sp-2)', flex: 1 }}>Triage Assessment</h1>
        {!isOnline && <span className="badge badge--warning">Offline Mode</span>}
      </header>

      <div className="container container--narrow animate-fade-in">
        {/* Patient Info */}
        <div className="card mb-4 flex items-center gap-4" style={{ padding: 'var(--sp-4)' }}>
          <div className={`avatar avatar--lg avatar--initials avatar--${patient.triageLevel || 'primary'}`}>
            {patient.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-headline-md font-semibold">{patient.name}</h2>
            <p className="text-body-sm text-muted">{patient.age} Yrs • {patient.gender} • {patient.village}</p>
          </div>
        </div>

        {/* Processing Result (if available) */}
        {triageResult && (
          <div className={`info-banner info-banner--${triageResult.priorityLevel === 'red' ? 'error' : triageResult.priorityLevel === 'yellow' ? 'warning' : 'success'} mb-4`}>
            <Icon name={triageResult.priorityLevel === 'red' ? 'emergency' : 'check_circle'} />
            <div>
              <p className="text-label-md font-bold">
                Priority: {triageResult.priorityLevel.toUpperCase()}
              </p>
              <p className="text-body-sm">Risk Score: {triageResult.riskScore}</p>
              {triageResult.alerts.length > 0 && (
                <ul style={{ marginTop: 'var(--sp-2)', paddingLeft: 'var(--sp-4)' }}>
                  {triageResult.alerts.slice(0, 2).map((alert, i) => (
                    <li key={i} className="text-body-sm">{alert.message}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Emergency Alert */}
        {(isHighTemp || isHighPulse) && (
          <div className="info-banner info-banner--error mb-4 animate-pulse-alert" style={{ borderRadius: 'var(--radius-lg)' }}>
            <Icon name="emergency" style={{ color: 'var(--error)' }} />
            <div>
              <p className="text-label-md font-bold text-error">CRITICAL ALERT</p>
              <p className="text-body-sm">{isHighTemp ? `Temperature ${temp}°F is dangerously high.` : ''} {isHighPulse ? `Pulse ${pulse} bpm is elevated.` : ''}</p>
              <p className="text-body-sm text-error font-semibold mt-1">Consider immediate referral.</p>
            </div>
          </div>
        )}

        {/* Vitals Input */}
        <div className="card mb-4">
          <h3 className="section-label">Vitals Capture</h3>
          <div className="grid gap-3 mt-3" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {[
              { label: 'Temp (°F)', icon: 'device_thermostat', value: temp, set: setTemp, alert: isHighTemp },
              { label: 'Pulse (bpm)', icon: 'monitor_heart', value: pulse, set: setPulse, alert: isHighPulse },
              { label: 'BP Sys', icon: 'bloodtype', value: bpSys, set: setBpSys },
              { label: 'BP Dia', icon: 'bloodtype', value: bpDia, set: setBpDia },
              { label: 'SpO2 (%)', icon: 'air', value: spo2, set: setSpo2 },
            ].map((v, i) => (
              <div key={i} className={`vital-card ${v.alert ? 'vital-card--alert' : 'vital-card--normal'}`}>
                <label className="vital-label" style={{ color: v.alert ? 'var(--error)' : 'var(--on-surface-variant)' }}>
                  <Icon name={v.icon} size={16} /> {v.label}
                </label>
                <input
                  type="number"
                  className="input"
                  value={v.value}
                  onChange={(e) => v.set(e.target.value)}
                  style={{ padding: 'var(--sp-2)', fontSize: '18px', fontWeight: 700, borderColor: v.alert ? 'var(--error)' : 'var(--outline-variant)' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Symptoms Selection */}
        <div className="card mb-4">
          <h3 className="section-label">Symptoms</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {['Fever', 'Cough', 'Nausea', 'Headache', 'Vomiting', 'Body Pain', 'Fatigue', 'Breathlessness'].map((s) => (
              <button
                key={s}
                className={`symptom-chip ${symptoms.includes(s) ? 'symptom-chip--selected' : ''}`}
                onClick={() => setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
              >
                {symptoms.includes(s) && <Icon name="check" size={14} />}
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Complaint */}
        <div className="card mb-4">
          <h3 className="section-label">Chief Complaint</h3>
          <textarea
            className="input mt-3"
            placeholder="Describe the patient's main complaint..."
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            rows={3}
          />
        </div>

        {/* Media Capture */}
        <div className="card mb-4">
          <h3 className="section-label">Media Capture</h3>
          <div className="flex gap-3 mt-3">
            <button
              className={`media-thumb ${isRecording ? 'animate-recording' : ''}`}
              style={{ flexDirection: 'column', gap: 'var(--sp-1)', color: isRecording ? 'var(--error)' : 'var(--on-surface-variant)' }}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Icon name={isRecording ? 'stop_circle' : 'mic'} size={28} />
              <span className="text-label-sm font-medium">{isRecording ? 'Stop' : 'Record'}</span>
            </button>
            <button className="media-thumb" style={{ flexDirection: 'column', gap: 'var(--sp-1)', color: 'var(--on-surface-variant)' }}>
              <Icon name="photo_camera" size={28} />
              <span className="text-label-sm font-medium">Photo</span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          className="btn btn--primary btn--full btn--lg mb-4"
          onClick={handleSubmitAssessment}
          disabled={submitting || !temp || !pulse || !bpSys || !bpDia || !spo2}
        >
          {submitting ? <Icon name="sync" size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Icon name="send" size={18} />}
          {submitting ? ' Processing...' : ' Submit Assessment & Queue'}
        </button>
        <button className="btn btn--outline btn--full mb-4" onClick={() => navigate(`/asha/history/${patient.id}`)}>
          <Icon name="history" size={18} /> View Patient History
        </button>
      </div>
      <BottomNavBar role="asha" />
    </div>
  );
}
