import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/shared/Icon';
import { features } from '../data/dummyData';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-surface shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-container-margin-mobile md:px-container-margin-desktop h-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Icon name="local_hospital" fill className="text-primary" />
            <span className="text-headline-md font-bold text-primary">Rural Health Commons</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-6">
              <a href="#features" className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-md">Features</a>
              <a href="#about" className="text-on-surface-variant font-medium hover:text-primary transition-colors text-label-md">About</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="bg-primary text-on-primary px-5 py-2 rounded-lg text-label-md font-semibold shadow-sm hover:opacity-90 transition-opacity">
              Login
            </button>
            <button className="bg-error text-on-error px-4 py-2 rounded-full text-label-md font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              <Icon name="emergency" size={16} />
              <span className="hidden sm:inline">Emergency</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop py-8 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 animate-fade-in">
            <h1 className="text-headline-lg-mobile md:text-[40px] md:leading-[48px] font-bold text-on-surface">
              Bridging the Gap in <br />
              <span className="text-primary">Rural Healthcare</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-lg">
              Empowering communities with offline-first ASHA worker support and instant doctor consultations. Reliable healthcare access, no matter where you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-primary text-on-primary px-8 py-4 rounded-xl text-label-md font-semibold shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_8px_16px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Icon name="calendar_month" /> Book Consult (Citizens)
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border-2 border-primary text-primary bg-surface px-8 py-4 rounded-xl text-label-md font-semibold hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 active:scale-95"
              >
                <Icon name="medical_information" /> Worker Portal (ASHA)
              </button>
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-lg border border-outline-variant bg-surface-container">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaSEtKFvCWCf2KGBjaxvjX91-fh0RrUNPc8gqDyWbCmn8-2QFviBCnC8SK0JA5dwaNk9FRiNMWO1fmINXQo76yO1f11amKS0l_K0bAv2LJ57ByBW7ueXzx53h9DaVus_cgdnseTZbG8DoPbklJRyZCKKEvWcovvhVKO8cvQI5RRiBUj2et11QaLX-yd4lQsqKQzgWpjYmDLk2jDAnhTirYO-LBnFME_OSt7Y18R1qchkY5pBEQtHL1"
              alt="Doctor with rural patient"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-surface-container-low py-8 md:py-24">
          <div className="max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="text-headline-lg font-bold text-on-surface mb-4">Core Capabilities</h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Designed for low-bandwidth environments, ensuring continuous care delivery.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="bg-surface rounded-2xl p-6 border border-outline-variant shadow-sm hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.06)] transition-all group">
                  <div className={`w-12 h-12 ${feature.bgClass} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon name={feature.icon} className={`text-${feature.color} text-2xl`} />
                  </div>
                  <h3 className="text-headline-md font-semibold text-on-surface mb-3">{feature.title}</h3>
                  <p className="text-body-md text-on-surface-variant">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest border-t border-outline-variant py-8 mt-auto">
        <div className="w-full px-container-margin-mobile md:px-container-margin-desktop max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-8">
            <div className="flex items-center gap-2">
              <Icon name="local_hospital" fill className="text-primary text-xl" />
              <span className="text-label-md font-bold text-primary">Rural Health Commons</span>
            </div>
            <div className="flex gap-4 md:justify-end flex-wrap">
              <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-label-sm font-bold flex items-center gap-1">
                <Icon name="call" size={14} /> Emergency: 108
              </span>
              <span className="bg-surface text-on-surface-variant px-3 py-1 rounded-full text-label-sm border border-outline-variant flex items-center gap-1">
                <Icon name="verified_user" size={14} /> ABHA Compliant
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-body-sm text-on-surface">© 2024 Rural Health Commons. Dedicated to rural healthcare accessibility.</p>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 md:hidden bg-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-3 py-1 scale-90">
          <Icon name="home_health" fill /> <span className="text-[10px] font-medium mt-1">Home</span>
        </button>
        <button onClick={() => navigate('/login')} className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 hover:bg-surface-container-high rounded-xl">
          <Icon name="medical_services" /> <span className="text-[10px] font-medium mt-1">Triage</span>
        </button>
        <button onClick={() => navigate('/login')} className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 hover:bg-surface-container-high rounded-xl">
          <Icon name="history_edu" /> <span className="text-[10px] font-medium mt-1">History</span>
        </button>
        <button onClick={() => navigate('/login')} className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 hover:bg-surface-container-high rounded-xl">
          <Icon name="person" /> <span className="text-[10px] font-medium mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
}
