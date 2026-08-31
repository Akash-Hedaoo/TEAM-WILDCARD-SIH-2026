// Centralized dummy data for all roles in the RuralCare Connect platform

// ==================== PATIENTS ====================
export const patients = [
  {
    id: 'RK-9921',
    name: 'Ramesh Kumar',
    age: 68,
    gender: 'Male',
    village: 'Pipariya',
    block: 'Block C, Sector 4',
    bloodGroup: 'O+',
    abhaId: '12-3456-7890-1234',
    phone: '+91 98765 43210',
    allergies: ['Penicillin'],
    conditions: ['Diabetic (Type 2)'],
    lastVisit: '6 Months ago',
    triageLevel: 'red',
    complaint: 'Severe chest pain radiating to left arm, shortness of breath. Onset 2 hours ago.',
    source: 'ASHA Ref.',
    waitTime: '45m',
    vitals: { temp: 98.6, pulse: 115, bpSys: 160, bpDia: 95, spo2: 94 },
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO8R5cCdUiC8D7E1A6AjQ9ZZj7f9yc38dtqhSlb2wdQ01Rdsy-dve2b81sJy8SgYwB6f7Pm5sqibCCU7MQTJpVjcZPHmc1-xYGKk_V8wd79h9QKtQdkCbD0sxkyUCUQR5K6a-DH05yIKpSCIeZOUajqqeb29lk046XBrp5lPWO0FYz-9trbx0aUD9rw-mThhwI6GzC887Yl79PunQijUzPP_0kDslmzYoF8ApP0wwykmDXXwI1EOSj',
  },
  {
    id: 'SD-4421',
    name: 'Sunita Devi',
    age: 35,
    gender: 'Female',
    village: 'Sonpur',
    block: 'Block A, Sector 2',
    bloodGroup: 'B+',
    abhaId: '12-3456-7890-5678',
    phone: '+91 87654 32109',
    allergies: [],
    conditions: ['Hypertension'],
    lastVisit: '2 weeks ago',
    triageLevel: 'yellow',
    complaint: 'Persistent headache and mild fever for 3 days.',
    source: 'Walk-in',
    waitTime: '20m',
    vitals: { temp: 100.2, pulse: 88, bpSys: 140, bpDia: 90, spo2: 97 },
    avatar: null,
  },
  {
    id: 'AS-1102',
    name: 'Arjun Singh',
    age: 12,
    gender: 'Male',
    village: 'Pipariya',
    block: 'Block B, Sector 1',
    bloodGroup: 'A+',
    abhaId: '12-3456-7890-9012',
    phone: '+91 76543 21098',
    allergies: ['Sulfa drugs'],
    conditions: [],
    lastVisit: '1 Month ago',
    triageLevel: 'green',
    complaint: 'Mild cough and cold symptoms.',
    source: 'ASHA Ref.',
    waitTime: '5m',
    vitals: { temp: 99.1, pulse: 82, bpSys: 110, bpDia: 70, spo2: 98 },
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8CgFJYXKcvIvEQo4BUXJOrwK73zzIlcsD-Nlv8gbxEuN9cbG6jG-UMRdvtwfShOSDzec3r-gktl0WOxx6i9a5EBQ7OiqP2E_WjegasJFdR5ypqSLxT0M0PaNyUldqy3uHwX-HBE0z98INfAXFdHJYVJJo0wjf1ASC8OXaQpU2Bvl1wRksKpNwqrfrAwTthTkEuYcK9HBdK8t8cZ-1MAdcuBwJMK1ehZblF9ct2AFsPxkV-fvik04y',
  },
  {
    id: 'AP-3301',
    name: 'Aarav Patel',
    age: 4,
    gender: 'Male',
    village: 'Pipariya',
    block: 'Block C, Sector 3',
    bloodGroup: 'AB+',
    abhaId: '12-3456-7890-3456',
    phone: '+91 65432 10987',
    allergies: [],
    conditions: [],
    lastVisit: 'First visit',
    triageLevel: 'red',
    complaint: 'High fever (104°F) and persistent vomiting since last night.',
    source: 'ASHA Ref.',
    waitTime: '10m',
    vitals: { temp: 104, pulse: 130, bpSys: 85, bpDia: 55, spo2: 95 },
    avatar: null,
  },
  {
    id: 'KS-2201',
    name: 'Kavita Sharma',
    age: 28,
    gender: 'Female',
    village: 'Pipariya',
    block: 'Block A, Sector 4',
    bloodGroup: 'O-',
    abhaId: '12-3456-7890-7890',
    phone: '+91 54321 09876',
    allergies: [],
    conditions: ['Pregnancy (7 months)'],
    lastVisit: '2 weeks ago',
    triageLevel: 'yellow',
    complaint: 'Routine checkup. Mild ankle swelling noted.',
    source: 'Scheduled',
    waitTime: '15m',
    vitals: { temp: 98.4, pulse: 78, bpSys: 125, bpDia: 80, spo2: 99 },
    avatar: null,
  },
  {
    id: 'RS-6601',
    name: 'Ramesh Singh',
    age: 65,
    gender: 'Male',
    village: 'Sonpur',
    block: 'Block D, Sector 1',
    bloodGroup: 'B-',
    abhaId: '12-3456-7890-1122',
    phone: '+91 43210 98765',
    allergies: ['Aspirin'],
    conditions: ['COPD', 'Diabetic (Type 2)'],
    lastVisit: '1 Month ago',
    triageLevel: 'green',
    complaint: 'Follow-up for COPD. Stable condition.',
    source: 'Scheduled',
    waitTime: '30m',
    vitals: { temp: 98.2, pulse: 72, bpSys: 130, bpDia: 85, spo2: 96 },
    avatar: null,
  },
];

// Current logged-in patient profile (Rohan)
export const currentPatient = {
  id: 'RHC-2901-B',
  name: 'Rohan Kumar',
  age: 32,
  gender: 'Male',
  bloodGroup: 'O+',
  abhaId: '12-3456-7890-1234',
  phone: '+91 98765 43210',
  village: 'Pipariya',
  block: 'Block C, Sector 4',
  allergies: ['None'],
  conditions: ['None'],
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArmhGKgQarOlGHnMWbb9WNdtPlzM2dmbzGi_R70jS_FyFPznwPYDKJ9qJ6t0y9ThGR8xNjlO2PQHNfL8-sotdb3HUIbohvXXfYkdtAuDD1iFYX9Bkvcbhv_scuIEaT-_0Ugmx8K8vX84pUVT4v0drC47mQ2WaGlQYRkxt7Kuuo_HSS38Nq862AYSmJNFLmqipsN5B5oxfHYel4nFb--mzDm2TEnLvQudMJb0eNKe2Oz2MBILb38Zv5',
  emergencyContacts: [
    { name: 'Priya Kumar', relation: 'Wife', phone: '+91 98765 43211' },
    { name: 'Vikram Kumar', relation: 'Brother', phone: '+91 98765 43212' },
  ],
  medicalHistory: [
    { date: '2023-10-24', event: 'Viral Fever (Suspected Dengue)', doctor: 'Dr. Sharma' },
    { date: '2023-06-15', event: 'Routine Checkup', doctor: 'Dr. Patel' },
    { date: '2023-01-10', event: 'Seasonal Flu', doctor: 'Dr. Sharma' },
  ],
};

// Family Members
export const familyMembers = [
  { id: 'FM-01', name: 'Priya Kumar', relation: 'Wife', age: 29, gender: 'Female', abhaId: '12-3456-7890-2345', triageLevel: 'green' },
  { id: 'FM-02', name: 'Ananya Kumar', relation: 'Daughter', age: 6, gender: 'Female', abhaId: '12-3456-7890-3456', triageLevel: null },
  { id: 'FM-03', name: 'Raj Kumar', relation: 'Father', age: 62, gender: 'Male', abhaId: '12-3456-7890-4567', triageLevel: 'yellow' },
];

// ==================== PRESCRIPTIONS ====================
export const prescriptions = [
  {
    id: 'RX-001',
    patientName: 'Rohan Kumar',
    patientId: 'RHC-2901-B',
    patientAge: 32,
    patientGender: 'Male',
    doctor: 'Dr. Amit Sharma',
    doctorCredentials: 'MBBS, MD (Gen Med)',
    doctorRegNo: '88721/MCI',
    clinic: 'Jan Swasthya Kendra',
    clinicAddress: 'Block C, Rural District Hospital',
    clinicContact: '+91 98765 43210',
    date: '2023-10-24',
    diagnosis: 'Viral Fever (Suspected Dengue)',
    medicines: [
      { name: 'Tab. Paracetamol 650mg', icon: 'medication', color: 'secondary', frequency: '1 - 1 - 1', duration: '3 Days', instructions: 'Khaane ke baad (After meals)' },
      { name: 'Cap. B-Complex', icon: 'medication', color: 'secondary', frequency: '1 - 0 - 0', duration: '5 Days', instructions: 'Subah naashte ke baad (After breakfast)' },
      { name: 'ORS Sachet', icon: 'local_drink', color: 'tertiary', frequency: 'As needed', duration: '3 Days', instructions: 'Din mein 3-4 baar (3-4 times a day)' },
    ],
    advice: 'Plenty of fluids. Rest for 3 days. Return if fever persists beyond 3 days or if experiencing severe body ache.',
    status: 'active',
  },
  {
    id: 'RX-002',
    patientName: 'Rohan Kumar',
    patientId: 'RHC-2901-B',
    patientAge: 32,
    patientGender: 'Male',
    doctor: 'Dr. Priya Patel',
    doctorCredentials: 'MBBS, DGO',
    doctorRegNo: '99432/MCI',
    clinic: 'District Health Center',
    clinicAddress: 'Main Road, Sector 2',
    clinicContact: '+91 87654 32100',
    date: '2023-06-15',
    diagnosis: 'Seasonal Allergic Rhinitis',
    medicines: [
      { name: 'Tab. Cetirizine 10mg', icon: 'medication', color: 'secondary', frequency: '0 - 0 - 1', duration: '7 Days', instructions: 'Raat ko sone se pehle (Before bedtime)' },
      { name: 'Nasal Spray (Fluticasone)', icon: 'medication', color: 'primary', frequency: '1 - 0 - 1', duration: '14 Days', instructions: 'Naak mein spray (Nasal spray)' },
    ],
    advice: 'Avoid dust and pollen. Keep windows closed during morning hours. Follow up if no improvement in 7 days.',
    status: 'completed',
  },
];

// ==================== BOOKINGS ====================
export const bookings = [
  { id: 'BK-001', doctor: 'Dr. Sharma', specialty: 'Cardiology', date: '2024-01-15', time: '2:30 PM', type: 'Teleconsult', status: 'upcoming', meetLink: '#' },
  { id: 'BK-002', doctor: 'Dr. Patel', specialty: 'General', date: '2024-01-20', time: '10:00 AM', type: 'In-Person', status: 'upcoming', meetLink: null },
  { id: 'BK-003', doctor: 'Dr. Sharma', specialty: 'Cardiology', date: '2023-12-10', time: '3:00 PM', type: 'Teleconsult', status: 'completed', meetLink: null },
  { id: 'BK-004', doctor: 'Dr. Gupta', specialty: 'Orthopedics', date: '2023-11-05', time: '11:30 AM', type: 'In-Person', status: 'completed', meetLink: null },
  { id: 'BK-005', doctor: 'Dr. Patel', specialty: 'General', date: '2023-10-24', time: '9:00 AM', type: 'In-Person', status: 'cancelled', meetLink: null },
];

// ==================== ASHA WORKER ====================
export const currentAshaWorker = {
  id: 'ASHA-001',
  name: 'Sunita Devi',
  zone: 'Block C',
  village: 'Pipariya',
  isOnline: false,
  pendingSyncs: 3,
  totalPatients: 45,
  avatar: null,
};

export const ashaSyncQueue = [
  { id: 'SQ-01', patientName: 'Aarav Patel', type: 'Triage Assessment', timestamp: '10:30 AM', status: 'pending', size: '2.4 MB' },
  { id: 'SQ-02', patientName: 'Kavita Sharma', type: 'Vitals Update', timestamp: '09:15 AM', status: 'pending', size: '0.8 MB' },
  { id: 'SQ-03', patientName: 'Ramesh Singh', type: 'Photo Upload', timestamp: 'Yesterday', status: 'failed', size: '5.1 MB' },
  { id: 'SQ-04', patientName: 'Meera Bai', type: 'Audio Note', timestamp: 'Yesterday', status: 'synced', size: '1.2 MB' },
  { id: 'SQ-05', patientName: 'Gopal Das', type: 'Triage Assessment', timestamp: '2 days ago', status: 'synced', size: '3.0 MB' },
];

// ==================== DOCTOR ====================
export const currentDoctor = {
  id: 'DOC-001',
  name: 'Dr. Amit Sharma',
  specialty: 'General Medicine',
  credentials: 'MBBS, MD (Gen Med)',
  regNo: '88721/MCI',
  zone: 'District Zone A',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWy_Gem8zA-h30NBYvC_gmMB72mgkymqTZpMELWiNbs0CSiQ9ot-7-76i1Ied7oeysqXAF5Tk-tWoPfZXc2x2wG9UEFZroh_TceCP0o84oLNzcrocXzHJBn0fLbL5cvbpnwcW8qkNaJp-bjMRYqYtSBXSvM1WxfTyM8S62tU_G-ekousgT6wZbDrWMlugpu-p8WdqCSVyuMTgvVwet_qve84WHJESLkERN4PWkc27ATS0hj11mNEzB',
};

export const doctorPrescriptions = [
  { id: 'DRX-001', patientName: 'Rohan Kumar', date: '2023-10-24', diagnosis: 'Viral Fever', status: 'dispensed' },
  { id: 'DRX-002', patientName: 'Ramesh Kumar', date: '2023-10-23', diagnosis: 'Acute Bronchitis', status: 'sent' },
  { id: 'DRX-003', patientName: 'Kavita Sharma', date: '2023-10-22', diagnosis: 'Prenatal Checkup', status: 'viewed' },
  { id: 'DRX-004', patientName: 'Sunita Devi', date: '2023-10-21', diagnosis: 'Hypertension Follow-up', status: 'dispensed' },
  { id: 'DRX-005', patientName: 'Arjun Singh', date: '2023-10-20', diagnosis: 'Upper Respiratory Infection', status: 'sent' },
];

// ==================== ADMIN ====================
export const adminKPIs = {
  totalConsults: 4289,
  consultsGrowth: '+12%',
  activeAlerts: 14,
  alertsMessage: 'Requires immediate attention',
  referralSuccess: '86%',
  referralTarget: '90%',
  stockouts: 3,
  stockoutsMessage: 'PHCs critically low',
};

export const inventoryAlerts = [
  {
    id: 'INV-01',
    phcName: 'Bhavani Rural Clinic',
    zone: 'North Sector',
    lowStockItems: ['ORS', 'PCM'],
    status: 'critical',
  },
  {
    id: 'INV-02',
    phcName: 'Lakshmi Health Post',
    zone: 'East Sector',
    lowStockItems: ['Amoxicillin'],
    status: 'warning',
  },
  {
    id: 'INV-03',
    phcName: 'Gandhi Memorial PHC',
    zone: 'South Sector',
    lowStockItems: ['Iron Tablets', 'Folic Acid'],
    status: 'warning',
  },
];

export const staffMembers = [
  { id: 'STF-01', name: 'Sunita Devi', role: 'ASHA Worker', zone: 'Block C - Pipariya', patients: 45, syncRate: '92%', status: 'active', lastActive: '2 hours ago' },
  { id: 'STF-02', name: 'Meera Bai', role: 'ASHA Worker', zone: 'Block A - Sonpur', patients: 38, syncRate: '88%', status: 'active', lastActive: '1 hour ago' },
  { id: 'STF-03', name: 'Geeta Kumari', role: 'ASHA Worker', zone: 'Block D - Rampur', patients: 52, syncRate: '75%', status: 'inactive', lastActive: '3 days ago' },
  { id: 'STF-04', name: 'Dr. Amit Sharma', role: 'Doctor', zone: 'District Zone A', patients: 120, syncRate: '99%', status: 'active', lastActive: '30 min ago' },
  { id: 'STF-05', name: 'Dr. Priya Patel', role: 'Doctor', zone: 'District Zone B', patients: 95, syncRate: '97%', status: 'active', lastActive: '1 hour ago' },
  { id: 'STF-06', name: 'Dr. Rajesh Gupta', role: 'Doctor', zone: 'District Zone A', patients: 80, syncRate: '100%', status: 'active', lastActive: '15 min ago' },
];

// ==================== NOTIFICATIONS ====================
export const notifications = [
  { id: 'N-01', title: 'Upcoming Teleconsult', message: 'Your appointment with Dr. Sharma is in 2 hours.', time: '10 min ago', type: 'info', read: false, icon: 'videocam' },
  { id: 'N-02', title: 'Prescription Ready', message: 'Your prescription from Dr. Patel is ready for download.', time: '1 hour ago', type: 'success', read: false, icon: 'medication' },
  { id: 'N-03', title: 'Lab Results Available', message: 'Your blood test results are now available.', time: '3 hours ago', type: 'info', read: true, icon: 'science' },
  { id: 'N-04', title: 'Sync Failed', message: '1 patient record failed to sync. Please retry.', time: 'Yesterday', type: 'error', read: true, icon: 'cloud_off' },
  { id: 'N-05', title: 'Medicine Stockout Alert', message: 'ORS and PCM critically low at Bhavani Clinic.', time: 'Yesterday', type: 'warning', read: true, icon: 'inventory_2' },
];

// ==================== TRIAGE OPTIONS ====================
export const bodyAreas = [
  { id: 'head', label: 'Head & Neck', icon: 'face' },
  { id: 'chest', label: 'Chest', icon: 'pulmonology' },
  { id: 'stomach', label: 'Stomach', icon: 'gastroenterology' },
  { id: 'limbs', label: 'Limbs', icon: 'sports_gymnastics' },
  { id: 'skin', label: 'Skin', icon: 'dermatology' },
  { id: 'general', label: 'General / Whole Body', icon: 'accessibility_new' },
];

export const symptoms = [
  'Fever', 'Cough', 'Nausea', 'Headache', 'Vomiting', 'Diarrhea',
  'Body Pain', 'Fatigue', 'Breathlessness', 'Dizziness', 'Rash',
  'Sore Throat', 'Chest Pain', 'Joint Pain', 'Abdominal Pain',
];

export const severityOptions = [
  { value: 'mild', label: 'Mild', icon: 'sentiment_satisfied', color: 'secondary' },
  { value: 'moderate', label: 'Moderate', icon: 'sentiment_neutral', color: 'tertiary' },
  { value: 'severe', label: 'Severe', icon: 'sentiment_very_dissatisfied', color: 'error' },
];

// ==================== LANDING PAGE FEATURES ====================
export const features = [
  {
    icon: 'wifi_off',
    title: 'Offline Triage',
    description: 'Local data capture allows ASHA workers to triage patients even without internet, syncing automatically when connectivity returns.',
    color: 'secondary',
    bgClass: 'bg-secondary-fixed/20',
  },
  {
    icon: 'prescriptions',
    title: 'AI E-Prescriptions',
    description: 'Smart prescription generation assists doctors in quickly selecting appropriate medications based on local availability.',
    color: 'primary',
    bgClass: 'bg-primary-fixed/50',
  },
  {
    icon: 'video_camera_front',
    title: 'Teleconsults',
    description: 'Seamless integration for low-bandwidth video consultations, bringing specialist care directly to remote villages.',
    color: 'tertiary',
    bgClass: 'bg-tertiary-fixed/40',
  },
];
