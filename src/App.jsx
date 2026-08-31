import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Shared
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/shared/ProfilePage';

// Patient
import PatientDashboard from './pages/patient/PatientDashboard';
import SelfTriageFlow from './pages/patient/SelfTriageFlow';
import PrescriptionViewer from './pages/patient/PrescriptionViewer';
import PatientProfile from './pages/patient/PatientProfile';
import PatientBookings from './pages/patient/PatientBookings';
import FamilyMembers from './pages/patient/FamilyMembers';

// ASHA
import AshaDashboard from './pages/asha/AshaDashboard';
import AshaTriageForm from './pages/asha/AshaTriageForm';
import AshaSyncStatus from './pages/asha/AshaSyncStatus';
import AshaPatientHistory from './pages/asha/AshaPatientHistory';

// Doctor
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorPrescriptions from './pages/doctor/DoctorPrescriptions';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStaffManagement from './pages/admin/AdminStaffManagement';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Patient Routes */}
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/profile" element={<ProfilePage />} />
          <Route path="/patient/triage" element={<SelfTriageFlow />} />
          <Route path="/patient/prescription/:id" element={<PrescriptionViewer />} />
          <Route path="/patient/profile-edit" element={<PatientProfile />} />
          <Route path="/patient/bookings" element={<PatientBookings />} />
          <Route path="/patient/family" element={<FamilyMembers />} />

          {/* ASHA Routes */}
          <Route path="/asha" element={<AshaDashboard />} />
          <Route path="/asha/profile" element={<ProfilePage />} />
          <Route path="/asha/triage/:patientId" element={<AshaTriageForm />} />
          <Route path="/asha/sync" element={<AshaSyncStatus />} />
          <Route path="/asha/history/:patientId" element={<AshaPatientHistory />} />

          {/* Doctor Routes */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/profile" element={<ProfilePage />} />
          <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<ProfilePage />} />
          <Route path="/admin/staff" element={<AdminStaffManagement />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
