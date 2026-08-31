import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/shared/Icon';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      setStep(2);
      setTimer(30);
      setTimeout(() => otpRefs[0].current?.focus(), 200);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) otpRefs[index + 1].current?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    localStorage.setItem('userRole', role);
    const routes = { patient: '/patient', asha: '/asha', doctor: '/doctor', admin: '/admin' };
    navigate(routes[role] || '/patient');
  };

  const roles = [
    { id: 'patient', label: 'Patient' },
    { id: 'asha', label: 'ASHA' },
    { id: 'doctor', label: 'Doctor' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center p-container-margin-mobile md:p-container-margin-desktop">
      <main className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden relative z-10 flex flex-col animate-fade-in">
        {/* Header */}
        <header className="p-6 pb-2 text-center">
          <div className="flex justify-center mb-4 text-primary">
            <Icon name="health_and_safety" fill className="text-4xl" />
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-bold text-primary mb-1">
            Rural Health Commons
          </h1>
          <p className="text-body-md text-on-surface-variant">Welcome Back</p>
        </header>

        <div className="p-6 pt-2 flex-grow">
          {/* Role Selector */}
          <div className="mb-6">
            <p className="text-label-sm text-on-surface-variant mb-2 uppercase tracking-wide font-medium">Select Role</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-surface-container-low p-2 rounded-lg">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`block w-full text-center py-1 px-2 rounded-sm cursor-pointer text-label-md font-semibold transition-colors ${
                    role === r.id
                      ? 'bg-primary text-on-primary'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auth Flow */}
          <div className="relative">
            {/* Step 1: Mobile Input */}
            <div className={`transition-all duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0 -translate-x-4'}`}>
              <label className="block text-label-md font-semibold text-on-surface mb-1">Mobile Number</label>
              <div className="flex mb-6 shadow-sm rounded-lg overflow-hidden border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                <div className="bg-surface-container-low px-4 py-4 flex items-center border-r border-outline-variant">
                  <span className="text-body-md text-on-surface">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter your number"
                  className="w-full px-4 py-4 border-none focus:ring-0 text-body-md bg-transparent outline-none"
                />
              </div>
              <button
                onClick={handleSendOtp}
                className="w-full bg-primary text-on-primary py-4 rounded-lg text-label-md font-semibold flex items-center justify-center gap-2 hover:bg-surface-tint shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                Send OTP
                <Icon name="arrow_forward" size={18} />
              </button>
            </div>

            {/* Step 2: OTP Input */}
            <div className={`transition-all duration-300 ${step === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0 translate-x-4'}`}>
              <div className="flex items-center mb-4 gap-2">
                <button onClick={() => setStep(1)} className="text-on-surface-variant hover:text-primary transition-colors flex items-center p-1">
                  <Icon name="arrow_back" />
                </button>
                <div>
                  <label className="block text-label-md font-semibold text-on-surface">Enter OTP</label>
                  <p className="text-body-sm text-on-surface-variant">Sent to +91 ******{phone.slice(-4) || '0000'}</p>
                </div>
              </div>
              <div className="flex justify-between gap-2 mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={otpRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="otp-input w-full aspect-square text-center text-headline-md font-semibold border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-transparent outline-none max-w-[64px]"
                  />
                ))}
              </div>
              <button
                onClick={handleVerify}
                className="w-full bg-secondary text-on-secondary py-4 rounded-lg text-label-md font-semibold flex items-center justify-center gap-2 hover:opacity-90 shadow-sm hover:shadow-md transition-all active:scale-95 mb-4"
              >
                <Icon name="verified_user" size={18} />
                Verify & Secure Login
              </button>
              <div className="text-center">
                <button
                  className="text-label-sm text-primary hover:underline bg-transparent border-none cursor-pointer font-medium"
                  onClick={() => setTimer(30)}
                  disabled={timer > 0}
                >
                  Resend OTP <span className="text-on-surface-variant">({String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')})</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-surface-container p-4 border-t border-outline-variant/30 flex items-center justify-center gap-1">
          <Icon name="lock" fill className="text-on-surface-variant text-base" size={16} />
          <p className="text-body-sm text-on-surface-variant text-center">Data encrypted & Ayushman Bharat compliant</p>
        </footer>
      </main>
    </div>
  );
}
