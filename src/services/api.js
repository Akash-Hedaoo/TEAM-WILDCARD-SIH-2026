/**
 * API Service - Centralized API communication layer
 * Currently simulated with dummy data
 * Can be replaced with real API endpoints
 */

/**
 * Simulate API delay
 */
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Authenticate user
 */
export async function authenticateUser(role, phone, otp) {
  await delay(1000);
  // In a real app, validate OTP with backend
  return { success: true, token: 'mock-token-' + Date.now(), role };
}

/**
 * Fetch patient data
 */
export async function fetchPatientData(patientId) {
  await delay(500);
  // In a real app, call GET /api/patients/:patientId
  return {};
}

/**
 * Fetch all patients (for queue)
 */
export async function fetchPatients(filters = {}) {
  await delay(500);
  // In a real app, call GET /api/patients with filters
  return [];
}

/**
 * Submit triage assessment
 */
export async function submitTriageAssessment(patientId, triageData) {
  await delay(800);
  // In a real app, call POST /api/triage-assessments
  return {
    success: true,
    id: 'triage-' + Date.now(),
    patientId,
    ...triageData,
  };
}

/**
 * Sync offline queue
 */
export async function syncOfflineQueue(queue) {
  await delay(2000);
  // In a real app, call POST /api/sync with queue items
  return {
    success: true,
    synced: queue.length,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Upload media file (photo/audio)
 */
export async function uploadMedia(file, type = 'image') {
  await delay(1500);
  // In a real app, use FormData and multipart upload
  return {
    success: true,
    url: 'https://example.com/media/' + Date.now(),
    type,
  };
}

/**
 * Fetch prescriptions
 */
export async function fetchPrescriptions(patientId = null) {
  await delay(500);
  // In a real app, call GET /api/prescriptions
  return [];
}

/**
 * Generate AI prescription draft
 */
export async function generatePrescriptionDraft(triageData) {
  await delay(1200);
  // In a real app, call POST /api/ai/prescription-draft
  return {};
}

/**
 * Submit prescription (doctor)
 */
export async function submitPrescription(prescriptionData) {
  await delay(800);
  // In a real app, call POST /api/prescriptions
  return {
    success: true,
    id: 'rx-' + Date.now(),
    ...prescriptionData,
  };
}

/**
 * Fetch user profile
 */
export async function fetchUserProfile(role, userId) {
  await delay(500);
  // In a real app, call GET /api/users/:userId
  return {};
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId, data) {
  await delay(800);
  // In a real app, call PUT /api/users/:userId
  return {
    success: true,
    ...data,
  };
}

/**
 * Fetch notifications
 */
export async function fetchNotifications(userId) {
  await delay(400);
  // In a real app, call GET /api/notifications
  return [];
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId) {
  await delay(300);
  // In a real app, call PATCH /api/notifications/:id
  return { success: true };
}

/**
 * Fetch bookings
 */
export async function fetchBookings(patientId) {
  await delay(500);
  // In a real app, call GET /api/bookings
  return [];
}

/**
 * Create booking
 */
export async function createBooking(bookingData) {
  await delay(800);
  // In a real app, call POST /api/bookings
  return {
    success: true,
    id: 'booking-' + Date.now(),
    ...bookingData,
  };
}

/**
 * Cancel booking
 */
export async function cancelBooking(bookingId) {
  await delay(600);
  // In a real app, call DELETE /api/bookings/:id
  return { success: true };
}

/**
 * Fetch family members
 */
export async function fetchFamilyMembers(patientId) {
  await delay(500);
  // In a real app, call GET /api/family-members
  return [];
}

/**
 * Add family member
 */
export async function addFamilyMember(patientId, memberData) {
  await delay(700);
  // In a real app, call POST /api/family-members
  return {
    success: true,
    id: 'fm-' + Date.now(),
    ...memberData,
  };
}

/**
 * Fetch admin dashboard data
 */
export async function fetchAdminDashboard(adminId) {
  await delay(1000);
  // In a real app, call GET /api/admin/dashboard
  return {};
}

/**
 * Fetch staff members
 */
export async function fetchStaffMembers(filters = {}) {
  await delay(600);
  // In a real app, call GET /api/staff
  return [];
}

/**
 * Error handler for API calls
 */
export function handleApiError(error) {
  if (error.response?.status === 401) {
    return { success: false, error: 'Unauthorized - please login again' };
  }
  if (error.response?.status === 403) {
    return { success: false, error: 'Access denied' };
  }
  if (error.response?.status === 404) {
    return { success: false, error: 'Resource not found' };
  }
  if (error.response?.status >= 500) {
    return { success: false, error: 'Server error - please try again later' };
  }
  return { success: false, error: error.message || 'An error occurred' };
}

export default {
  authenticateUser,
  fetchPatientData,
  fetchPatients,
  submitTriageAssessment,
  syncOfflineQueue,
  uploadMedia,
  fetchPrescriptions,
  generatePrescriptionDraft,
  submitPrescription,
  fetchUserProfile,
  updateUserProfile,
  fetchNotifications,
  markNotificationAsRead,
  fetchBookings,
  createBooking,
  cancelBooking,
  fetchFamilyMembers,
  addFamilyMember,
  fetchAdminDashboard,
  fetchStaffMembers,
  handleApiError,
};
