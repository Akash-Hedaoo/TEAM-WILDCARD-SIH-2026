import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/shared/Icon';
import { features } from '../data/dummyData';

export default function LandingPage() {
  const navigate = useNavigate();

  const featureColors = {
    secondary: { bg: 'rgba(0, 108, 73, 0.08)', text: 'var(--secondary)' },
    primary: { bg: 'rgba(0, 74, 198, 0.08)', text: 'var(--primary)' },
    tertiary: { bg: 'rgba(120, 75, 0, 0.08)', text: 'var(--tertiary)' },
  };

  return (
    <div className="min-h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="header" style={{ position: 'sticky' }}>
        <div className="flex items-center justify-between w-full" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <div className="header-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <Icon name="local_hospital" fill />
            <span>Rural Health Commons</span>
          </div>
          <nav className="flex items-center gap-6 hide-mobile">
            <a href="#features" className="text-label-md text-muted" style={{ transition: 'color 0.15s' }}>Features</a>
            <a href="#about" className="text-label-md text-muted">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="btn btn--primary" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn--error btn--sm rounded-full" onClick={() => navigate('/login')}>
              <Icon name="emergency" size={16} />
              <span className="hide-mobile">Emergency</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-gradient" style={{ flex: 1 }}>
        <div className="container container--wide" style={{ paddingTop: 'var(--sp-12)', paddingBottom: 'var(--sp-12)' }}>
          <div className="grid gap-8 landing-grid" style={{ gridTemplateColumns: '1fr', alignItems: 'center' }}>
            <div className="flex flex-col gap-6 animate-fade-in">
              <h1 className="text-headline-xl">
                Bridging the Gap in <br />
                <span className="text-primary">Rural Healthcare</span>
              </h1>
              <p className="text-body-lg text-muted" style={{ maxWidth: '520px' }}>
                Empowering communities with offline-first ASHA worker support and instant doctor consultations. Reliable healthcare access, no matter where you are.
              </p>
              <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
                <button className="btn btn--primary btn--lg" onClick={() => navigate('/login')}>
                  <Icon name="calendar_month" /> Book Consult (Citizens)
                </button>
                <button className="btn btn--outline btn--lg" onClick={() => navigate('/login')}>
                  <Icon name="medical_information" /> Worker Portal (ASHA)
                </button>
              </div>
            </div>
            <div className="animate-slide-up landing-hero-img" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--outline-variant)', height: '280px', display: 'none' }}>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaSEtKFvCWCf2KGBjaxvjX91-fh0RrUNPc8gqDyWbCmn8-2QFviBCnC8SK0JA5dwaNk9FRiNMWO1fmINXQo76yO1f11amKS0l_K0bAv2LJ57ByBW7ueXzx53h9DaVus_cgdnseTZbG8DoPbklJRyZCKKEvWcovvhVKO8cvQI5RRiBUj2et11QaLX-yd4lQsqKQzgWpjYmDLk2jDAnhTirYO-LBnFME_OSt7Y18R1qchkY5pBEQtHL1" alt="Doctor with rural patient" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <style>{`
            @media (min-width: 768px) {
              .landing-grid { grid-template-columns: 1fr 1fr !important; }
              .landing-hero-img { display: block !important; height: 400px !important; }
            }
          `}</style>

        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ background: 'var(--surface-container-low)', padding: 'var(--sp-12) 0' }}>
        <div className="container container--wide">
          <div className="text-center mb-8">
            <h2 className="text-headline-lg mb-3">Core Capabilities</h2>
            <p className="text-body-md text-muted" style={{ maxWidth: '560px', margin: '0 auto' }}>
              Designed for low-bandwidth environments, ensuring continuous care delivery.
            </p>
          </div>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {features.map((feature, i) => (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                <div className="feature-icon-wrap" style={{ background: featureColors[feature.color]?.bg }}>
                  <Icon name={feature.icon} style={{ color: featureColors[feature.color]?.text, fontSize: '24px' }} />
                </div>
                <h3 className="text-headline-md">{feature.title}</h3>
                <p className="text-body-md text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--surface-container-highest)', borderTop: '1px solid var(--outline-variant)', padding: 'var(--sp-8) 0' }}>
        <div className="container container--wide">
          <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
            <div className="flex items-center gap-2">
              <Icon name="local_hospital" fill style={{ color: 'var(--primary)' }} size={20} />
              <span className="text-label-md font-bold text-primary">Rural Health Commons</span>
            </div>
            <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
              <span className="badge badge--error" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon name="call" size={14} /> Emergency: 108
              </span>
              <span className="badge badge--outline">
                <Icon name="verified_user" size={14} /> ABHA Compliant
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6" style={{ flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
            <p className="text-body-sm text-muted">© {new Date().getFullYear()} Rural Health Commons. Dedicated to rural healthcare accessibility.</p>
            <div className="flex gap-4">
              <a href="#" className="text-body-sm text-muted">Privacy</a>
              <a href="#" className="text-body-sm text-muted">Terms</a>
              <a href="#" className="text-body-sm text-muted">Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        <button className="bottom-nav-item bottom-nav-item--active" onClick={() => navigate('/')}>
          <Icon name="home_health" fill /> <span>Home</span>
        </button>
        <button className="bottom-nav-item" onClick={() => navigate('/login')}>
          <Icon name="medical_services" /> <span>Triage</span>
        </button>
        <button className="bottom-nav-item" onClick={() => navigate('/login')}>
          <Icon name="history_edu" /> <span>History</span>
        </button>
        <button className="bottom-nav-item" onClick={() => navigate('/login')}>
          <Icon name="person" /> <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}
