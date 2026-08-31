/**
 * Triage Worker - Processes patient triage data and generates risk assessment
 * Runs triage algorithm to determine priority level and recommendations
 */

/**
 * Process triage data and generate risk assessment
 * @param {Object} triageData - Contains vitals, symptoms, and patient info
 * @returns {Object} Risk assessment with priority level and recommendations
 */
export function processTriage(triageData) {
  const { vitals, symptoms, duration, patientAge, preConditions = [] } = triageData;

  if (!vitals) {
    throw new Error('Vitals data is required for triage processing');
  }

  // Extract vitals
  const { temp = 0, pulse = 0, bpSys = 0, bpDia = 0, spo2 = 100 } = vitals;

  // Calculate risk factors
  let riskScore = 0;
  const alerts = [];
  const recommendations = [];

  // Temperature assessment (Normal: 98-99.5°F)
  if (temp >= 103) {
    riskScore += 40;
    alerts.push({ type: 'CRITICAL', message: `Dangerously high fever (${temp}°F)`, severity: 'critical' });
    recommendations.push('Immediate medical attention required');
  } else if (temp >= 101) {
    riskScore += 20;
    alerts.push({ type: 'HIGH', message: `High fever (${temp}°F)`, severity: 'high' });
    recommendations.push('Fluid intake and fever management');
  } else if (temp < 95) {
    riskScore += 15;
    alerts.push({ type: 'MEDIUM', message: `Low body temperature (${temp}°F)`, severity: 'medium' });
    recommendations.push('Monitor for hypothermia');
  }

  // Pulse assessment (Normal: 60-100 bpm)
  if (pulse >= 130) {
    riskScore += 30;
    alerts.push({ type: 'CRITICAL', message: `Severe tachycardia (${pulse} bpm)`, severity: 'critical' });
    recommendations.push('Cardiac evaluation needed');
  } else if (pulse >= 120) {
    riskScore += 20;
    alerts.push({ type: 'HIGH', message: `Elevated pulse (${pulse} bpm)`, severity: 'high' });
  } else if (pulse < 50) {
    riskScore += 25;
    alerts.push({ type: 'CRITICAL', message: `Severe bradycardia (${pulse} bpm)`, severity: 'critical' });
    recommendations.push('Immediate medical evaluation required');
  }

  // Blood pressure assessment (Normal: 120/80)
  if (bpSys >= 160 || bpDia >= 100) {
    riskScore += 20;
    alerts.push({ type: 'HIGH', message: `Elevated BP (${bpSys}/${bpDia})`, severity: 'high' });
    recommendations.push('Monitor blood pressure, consider antihypertensive');
  } else if (bpSys >= 140 || bpDia >= 90) {
    riskScore += 10;
    alerts.push({ type: 'MEDIUM', message: `Slightly elevated BP (${bpSys}/${bpDia})`, severity: 'medium' });
  } else if (bpSys < 90 || bpDia < 60) {
    riskScore += 25;
    alerts.push({ type: 'CRITICAL', message: `Low BP (${bpSys}/${bpDia})`, severity: 'critical' });
    recommendations.push('Possible hypotension - medical evaluation needed');
  }

  // SpO2 assessment (Normal: >95%)
  if (spo2 < 90) {
    riskScore += 35;
    alerts.push({ type: 'CRITICAL', message: `Low oxygen saturation (${spo2}%)`, severity: 'critical' });
    recommendations.push('Oxygen therapy may be required');
  } else if (spo2 < 95) {
    riskScore += 15;
    alerts.push({ type: 'MEDIUM', message: `Slightly low SpO2 (${spo2}%)`, severity: 'medium' });
    recommendations.push('Monitor respiratory status');
  }

  // Symptoms assessment
  const criticalSymptoms = ['chest pain', 'breathlessness', 'vomiting'];
  const symptomMatches = symptoms?.filter(s =>
    criticalSymptoms.some(cs => s.toLowerCase().includes(cs))
  ) || [];

  if (symptomMatches.length > 0) {
    riskScore += symptomMatches.length * 15;
    symptomMatches.forEach(s => {
      alerts.push({ type: 'HIGH', message: `Critical symptom: ${s}`, severity: 'high' });
    });
  }

  // Duration assessment
  if (duration && duration > 7) {
    riskScore += 5;
    recommendations.push('Prolonged symptoms - consider chronic condition assessment');
  }

  // Age-adjusted risk (very young or elderly)
  if (patientAge && (patientAge < 5 || patientAge > 65)) {
    riskScore += 10;
    recommendations.push('Higher risk due to age - increase monitoring');
  }

  // Pre-existing conditions
  if (preConditions && preConditions.length > 0) {
    riskScore += preConditions.length * 5;
    preConditions.forEach(condition => {
      recommendations.push(`Monitor for complications related to ${condition}`);
    });
  }

  // Determine priority level
  let priorityLevel = 'green'; // Normal
  if (riskScore >= 50) {
    priorityLevel = 'red'; // Critical
  } else if (riskScore >= 25) {
    priorityLevel = 'yellow'; // Moderate
  }

  return {
    priorityLevel,
    riskScore,
    alerts,
    recommendations,
    vitals: { temp, pulse, bpSys, bpDia, spo2 },
    processedAt: new Date().toISOString(),
  };
}

/**
 * Generate AI recommendation for prescription
 * @param {Object} triageResult - Result from processTriage
 * @param {Array} symptoms - Patient symptoms
 * @param {Object} availableInventory - Available medicines in PHC
 * @returns {Object} Suggested prescription draft
 */
export function generatePrescriptionDraft(triageResult, symptoms, availableInventory = {}) {
  const { priorityLevel, alerts } = triageResult;
  const medicines = [];
  const advice = [];

  // Map symptoms to possible treatments
  const symptomTreatments = {
    'fever': { med: 'Tab. Paracetamol 650mg', dose: '1-1-1', duration: '3 Days', freq: 'After meals' },
    'cough': { med: 'Cough Syrup', dose: '2 tsp', duration: '5 Days', freq: 'Twice daily' },
    'nausea': { med: 'Ondansetron 4mg', dose: 'SOS', duration: '2 Days', freq: 'For nausea' },
    'headache': { med: 'Tab. Ibuprofen 400mg', dose: '1-0-1', duration: '3 Days', freq: 'As needed' },
    'vomiting': { med: 'Metoclopramide 10mg', dose: '1-1-1', duration: '3 Days', freq: 'Before meals' },
    'diarrhea': { med: 'ORS Sachet', dose: '1 in 1L water', duration: '3 Days', freq: 'Regular intake' },
  };

  // Add medicines based on symptoms
  if (symptoms && Array.isArray(symptoms)) {
    symptoms.forEach(symptom => {
      const treatment = symptomTreatments[symptom.toLowerCase()];
      if (treatment) {
        medicines.push(treatment);
      }
    });
  }

  // Add supportive care
  if (medicines.length === 0) {
    medicines.push({ med: 'Tab. Vitamin B-Complex', dose: '1 tablet', duration: '5 Days', freq: 'Once daily' });
  }

  // Generate advice based on priority
  if (priorityLevel === 'red') {
    advice.push('URGENT: Medical evaluation required immediately');
    advice.push('If symptoms worsen, seek emergency care');
  } else if (priorityLevel === 'yellow') {
    advice.push('Follow up with doctor within 24-48 hours');
    advice.push('Monitor vital signs every 4-6 hours');
  } else {
    advice.push('Rest and maintain hydration');
    advice.push('Follow up if symptoms persist beyond 3 days');
  }

  return {
    medicines,
    advice: advice.join('. '),
    diagnosis: generateDiagnosis(symptoms, priorityLevel),
    priority: priorityLevel,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Generate diagnosis based on symptoms and priority
 */
function generateDiagnosis(symptoms, priorityLevel) {
  if (!symptoms || symptoms.length === 0) {
    return 'General Check-up';
  }

  const symptomSet = new Set(symptoms.map(s => s.toLowerCase()));

  // Simple diagnosis logic
  if (symptomSet.has('fever') && symptomSet.has('cough')) {
    return 'Possible Viral Respiratory Infection';
  }
  if (symptomSet.has('fever') && symptomSet.has('vomiting')) {
    return 'Possible Acute Gastroenteritis';
  }
  if (symptomSet.has('chest pain') || symptomSet.has('breathlessness')) {
    return 'Possible Cardiovascular Concern - Urgent Evaluation Needed';
  }
  if (symptomSet.has('headache') && symptomSet.has('fever')) {
    return 'Possible Viral Fever with Headache';
  }
  if (symptomSet.has('rash')) {
    return 'Possible Dermatological Condition';
  }

  return `${[...symptomSet][0]} - Requires Medical Evaluation`;
}

/**
 * Validate triage data
 */
export function validateTriageData(data) {
  const errors = [];

  if (!data.vitals) {
    errors.push('Vitals data is required');
  } else {
    const { temp, pulse, bpSys, bpDia, spo2 } = data.vitals;
    if (temp === undefined || temp === null || isNaN(temp) || temp < 90 || temp > 110) errors.push('Temperature is required and must be in a valid range');
    if (pulse === undefined || pulse === null || isNaN(pulse) || pulse < 30 || pulse > 200) errors.push('Pulse is required and must be in a valid range');
    if (spo2 === undefined || spo2 === null || isNaN(spo2) || spo2 < 0 || spo2 > 100) errors.push('SpO2 is required and must be in a valid range');
    if (bpSys === undefined || bpSys === null || isNaN(bpSys) || bpSys < 50 || bpSys > 250) errors.push('Systolic BP is required and must be in a valid range');
    if (bpDia === undefined || bpDia === null || isNaN(bpDia) || bpDia < 30 || bpDia > 150) errors.push('Diastolic BP is required and must be in a valid range');
  }

  if (!data.symptoms || data.symptoms.length === 0) {
    errors.push('At least one symptom must be selected');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export default {
  processTriage,
  generatePrescriptionDraft,
  validateTriageData,
};
