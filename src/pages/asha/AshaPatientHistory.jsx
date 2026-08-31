import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { patients } from '../../data/dummyData';

export default function AshaPatientHistory() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const patient = patients.find((p) => p.id === patientId) || patients[0];

  const history = patient.medicalHistory || [
    { date: '2023-10-24', event: 'Triage Assessment - Fever', triage: 'red', vitals: 'T:104, P:130' },
    { date: '2023-06-15', event: 'Routine Checkup', triage: 'green', vitals: 'T:98, P:72' },
  ];

  const triageColors = { red: 'text-error', yellow: 'text-tertiary', green: 'text-secondary' };

  return (
    <div className="bg-background text-on-background min-h-screen pt-16 pb-24">
      <header className="fixed top-0 z-40 bg-surface shadow-sm flex justify-between items-center w-full px-container-margin-mobile h-16">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors">
            <Icon name="arrow_back" />
          </button>
          <h1 className="text-headline-md font-bold text-primary">Patient History</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-container-margin-mobile py-6 flex flex-col gap-6 mt-6 animate-fade-in">
        {/* Patient Info */}
        <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-6 flex items-center justify-between">
          <div>
            <h2 className="text-headline-md font-semibold text-on-surface">{patient.name}</h2>
            <p className="text-body-md text-on-surface-variant">{patient.age} yrs • {patient.gender}</p>
          </div>
          <button onClick={() => navigate(`/asha/triage/${patient.id}`)} className="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-md font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all">
            New Triage
          </button>
        </section>

        {/* History Timeline */}
        <section className="flex flex-col gap-2">
          <h2 className="text-label-md text-on-surface-variant uppercase font-semibold">Visit History</h2>
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-4">
            {history.map((record, i) => (
              <div key={i} className="flex gap-4 border-b border-surface-container last:border-0 pb-4 last:pb-0 pt-4 first:pt-0">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full bg-outline-variant ${record.triage ? triageColors[record.triage].replace('text-', 'bg-') : ''}`}></div>
                  {i < history.length - 1 && <div className="w-px h-full bg-outline-variant mt-2"></div>}
                </div>
                <div className="flex flex-col pb-2">
                  <p className="text-label-sm text-on-surface-variant font-medium">{record.date}</p>
                  <p className="text-body-lg text-on-surface font-semibold">{record.event}</p>
                  {record.vitals && <p className="text-body-sm text-on-surface-variant mt-1 bg-surface-container px-2 py-1 rounded w-max">{record.vitals}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNavBar role="asha" />
    </div>
  );
}
