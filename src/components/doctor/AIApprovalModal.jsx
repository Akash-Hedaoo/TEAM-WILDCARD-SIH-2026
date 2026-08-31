import React from 'react';
import Icon from '../shared/Icon';

export default function AIApprovalModal({ isOpen, onClose, patientName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '680px' }}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <Icon name="auto_awesome" style={{ color: 'var(--primary)' }} />
            <h2 className="text-headline-md font-bold">AI Draft Prescription</h2>
          </div>
          <button className="btn--icon" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>

        <div className="modal-body flex flex-col gap-6">
          <div className="info-banner info-banner--primary">
            <Icon name="info" style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <p className="text-body-sm">
              This draft is generated based on {patientName}'s symptoms (Fever, Vomiting, 104°F) and local PHC inventory. Please review and modify before approving.
            </p>
          </div>

          <div>
            <label className="section-label">Diagnosis</label>
            <input type="text" className="input" defaultValue="Acute Gastroenteritis with High Grade Fever" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="section-label" style={{ marginBottom: 0 }}>Medications</label>
              <button className="btn btn--ghost btn--sm">
                <Icon name="add" size={16} /> Add Drug
              </button>
            </div>
            <div className="card card--flat p-0" style={{ overflow: 'hidden' }}>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Dose / Freq</th>
                      <th>Duration</th>
                      <th style={{ width: '40px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { med: 'Tab. Paracetamol 650mg', dose: '1-1-1 (After meals)', dur: '3 Days' },
                      { med: 'Ondansetron 4mg', dose: 'SOS (for vomiting)', dur: '2 Days' },
                      { med: 'ORS Sachet', dose: '1 in 1L water', dur: '2 Days' },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td><input type="text" defaultValue={row.med} style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none' }} /></td>
                        <td><input type="text" defaultValue={row.dose} style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none' }} /></td>
                        <td><input type="text" defaultValue={row.dur} style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none' }} /></td>
                        <td style={{ textAlign: 'right' }}>
                          <Icon name="delete" style={{ color: 'var(--error)', cursor: 'pointer' }} size={18} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <label className="section-label">General Advice</label>
            <textarea className="input" rows="2" defaultValue="Rest. Drink plenty of fluids. Monitor fever every 6 hours." />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={onClose}>
            <Icon name="send" size={18} /> Approve & Dispatch E-Rx
          </button>
        </div>
      </div>
    </div>
  );
}
