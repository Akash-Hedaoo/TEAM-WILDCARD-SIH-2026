import React, { useState } from 'react';
import Icon from '../shared/Icon';

export default function AIApprovalModal({ isOpen, onClose, patientName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <header className="bg-surface border-b border-outline-variant p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Icon name="auto_awesome" className="text-primary" />
            <h2 className="text-headline-md font-bold text-on-surface">AI Draft Prescription</h2>
          </div>
          <button onClick={onClose} className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
            <Icon name="close" />
          </button>
        </header>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-6">
          <div className="bg-primary-container/20 border border-primary/20 rounded-xl p-4 flex gap-3 text-on-surface">
            <Icon name="info" className="text-primary shrink-0" />
            <p className="text-body-sm">
              This draft is generated based on {patientName}'s symptoms (Fever, Vomiting, 104°F) and local PHC inventory. Please review and modify before approving.
            </p>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface mb-2 block">Diagnosis</label>
            <input type="text" defaultValue="Acute Gastroenteritis with High Grade Fever" className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-label-md font-semibold text-on-surface">Medications</label>
              <button className="text-primary text-label-sm font-semibold flex items-center gap-1 hover:underline">
                <Icon name="add" size={16} /> Add Drug
              </button>
            </div>
            <div className="border border-outline-variant rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low text-label-sm text-on-surface-variant">
                  <tr>
                    <th className="p-3 font-semibold border-b border-outline-variant">Medicine</th>
                    <th className="p-3 font-semibold border-b border-outline-variant">Dose/Freq</th>
                    <th className="p-3 font-semibold border-b border-outline-variant">Duration</th>
                    <th className="p-3 border-b border-outline-variant w-10"></th>
                  </tr>
                </thead>
                <tbody className="text-body-sm text-on-surface">
                  <tr>
                    <td className="p-3 border-b border-surface-container"><input type="text" defaultValue="Tab. Paracetamol 650mg" className="w-full bg-transparent outline-none" /></td>
                    <td className="p-3 border-b border-surface-container"><input type="text" defaultValue="1-1-1 (After meals)" className="w-full bg-transparent outline-none" /></td>
                    <td className="p-3 border-b border-surface-container"><input type="text" defaultValue="3 Days" className="w-full bg-transparent outline-none" /></td>
                    <td className="p-3 border-b border-surface-container text-right"><Icon name="delete" className="text-error cursor-pointer" size={18} /></td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-surface-container"><input type="text" defaultValue="Ondansetron 4mg" className="w-full bg-transparent outline-none" /></td>
                    <td className="p-3 border-b border-surface-container"><input type="text" defaultValue="SOS (for vomiting)" className="w-full bg-transparent outline-none" /></td>
                    <td className="p-3 border-b border-surface-container"><input type="text" defaultValue="2 Days" className="w-full bg-transparent outline-none" /></td>
                    <td className="p-3 border-b border-surface-container text-right"><Icon name="delete" className="text-error cursor-pointer" size={18} /></td>
                  </tr>
                  <tr>
                    <td className="p-3"><input type="text" defaultValue="ORS Sachet" className="w-full bg-transparent outline-none" /></td>
                    <td className="p-3"><input type="text" defaultValue="1 in 1L water" className="w-full bg-transparent outline-none" /></td>
                    <td className="p-3"><input type="text" defaultValue="2 Days" className="w-full bg-transparent outline-none" /></td>
                    <td className="p-3 text-right"><Icon name="delete" className="text-error cursor-pointer" size={18} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface mb-2 block">General Advice</label>
            <textarea rows="2" defaultValue="Rest. Drink plenty of fluids. Monitor fever every 6 hours." className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"></textarea>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-surface border-t border-outline-variant p-4 flex gap-4 justify-end sticky bottom-0">
          <button onClick={onClose} className="px-6 py-2 rounded-lg text-label-md font-semibold text-on-surface-variant hover:bg-surface-container transition-colors">
            Cancel
          </button>
          <button onClick={onClose} className="px-6 py-2 bg-primary text-on-primary rounded-lg text-label-md font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
            <Icon name="send" size={18} /> Approve & Dispatch E-Rx
          </button>
        </footer>
      </div>
    </div>
  );
}
