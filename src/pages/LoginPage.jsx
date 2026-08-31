import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/shared/Icon';
import { useAppContext } from '../context/useAppContext';

const roles = [
  { value: 'patient', label: 'Patient', icon: 'person', desc: 'Book consults, view prescriptions' },
  { value: 'asha', label: 'ASHA Worker', icon: 'volunteer_activism', desc: 'Offline triage, patient roster' },
  { value: 'doctor', label: 'Doctor', icon: 'stethoscope', desc: 'Queue management, e-prescriptions' },
  { value: 'admin', label: 'Admin', icon: 'admin_panel_settings', desc: 'Surveillance, staff management' },
];

const roleRoutes = { patient: '/patient', asha: '/asha', doctor: '/doctor', admin: '/admin' };

/**
 * LoginPage - Multi-step authentication flow
 * Step 1: Role selection
 * Step 2: Phone number entry
 * Step 3: OTP verification
 * Uses AppContext for authentication
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, addNotification } = useAppContext();
  const [selectedRole, setSelectedRole] = useState('patient');
  const [step, setStep] = useState(1); // 1 = role, 2 = phone, 3 = otp
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(roleRoutes[selectedRole]);
    }
  }, [isAuthenticated, navigate, selectedRole]);

  /**
   * Handle OTP digit change
   */
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  /**
   * Handle OTP verification and login
   */
  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      addNotification('Please enter all 6 OTP digits', 'warning', 2000);
      return;
    }

    try {
      const result = login(selectedRole, phone, otpCode);
      if (result.success) {
        addNotification(`Logged in as ${roles.find(r => r.value === selectedRole)?.label}`, 'success', 2000);
        // Navigation handled by useEffect above
      } else {
        addNotification(`Login failed: ${result.error}`, 'error', 2000);
      }
    } catch (error) {
      addNotification(`Error: ${error.message}`, 'error', 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--surface-container-low)', padding: 'var(--sp-4)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px' }}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Icon name="local_hospital" fill style={{ color: 'var(--primary)', fontSize: '28px' }} />
            <span className="text-headline-md font-bold text-primary">RuralCare</span>
          </div>
          <p className="text-body-sm text-muted">
            {step === 1 && 'Select your role to continue'}
            {step === 2 && 'Enter your registered mobile number'}
            {step === 3 && `Enter the OTP sent to +91 ${phone.slice(-4).padStart(phone.length, '*')}`}
          </p>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="grid grid-2 gap-3">
              {roles.map((role) => (
                <div
                  key={role.value}
                  className={`role-option ${selectedRole === role.value ? 'role-option--selected' : ''}`}
                  onClick={() => setSelectedRole(role.value)}
                >
                  <Icon name={role.icon} size={28} style={{ color: selectedRole === role.value ? 'var(--primary)' : 'var(--on-surface-variant)' }} />
                  <span className="font-semibold text-body-sm">{role.label}</span>
                  <span className="text-label-sm text-muted" style={{ lineHeight: 1.3 }}>{role.desc}</span>
                </div>
              ))}
            </div>
            <button className="btn btn--primary btn--full btn--lg mt-2" onClick={() => setStep(2)}>
              Continue as {roles.find(r => r.value === selectedRole)?.label}
            </button>
          </div>
        )}

        {/* Step 2: Phone */}
        {step === 2 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 'var(--sp-4)', top: '50%', transform: 'translateY(-50%)', color: 'var(--on-surface-variant)', fontSize: '15px', fontWeight: 600 }}>+91</span>
              <input
                type="tel"
                className="input"
                style={{ paddingLeft: 'var(--sp-12)' }}
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                autoFocus
              />
            </div>
            <button className="btn btn--primary btn--full btn--lg" disabled={phone.length !== 10} onClick={() => setStep(3)}>
              Send OTP
            </button>
            <button className="btn btn--ghost btn--full" onClick={() => setStep(1)}>
              <Icon name="arrow_back" size={18} /> Change Role
            </button>
          </div>
        )}

        {/* Step 3: OTP */}
        {step === 3 && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="number"
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digit && i > 0) {
                      document.getElementById(`otp-${i - 1}`)?.focus();
                    }
                  }}
                  autoFocus={i === 0}
                  disabled={loading}
                />
              ))}
            </div>
            <button
              className="btn btn--primary btn--full btn--lg"
              onClick={handleVerify}
              disabled={loading || otp.join('').length !== 6}
            >
              {loading ? (
                <>
                  <Icon name="sync" size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Verifying...
                </>
              ) : (
                'Verify & Login'
              )}
            </button>
            <div className="text-center">
              <button
                className="text-body-sm text-primary font-semibold"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => addNotification('OTP sent to +91 ' + phone, 'info', 2000)}
              >
                Resend OTP
              </button>
            </div>
            <button className="btn btn--ghost btn--full" onClick={() => setStep(2)} disabled={loading}>
              <Icon name="arrow_back" size={18} /> Change Number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
