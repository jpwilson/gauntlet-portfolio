import React, { useState } from 'react';

const BASE = import.meta.env.BASE_URL;

const PW_HASH = 'c313c300828f3cf1e5bb10f55edb5587d2a6c72207498acc3e831d557299f947';

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Languages, Frameworks, Tools, Platforms — grouped in that order, alphabetical within
const TECH_PILLS = [
  // Languages
  'CSS', 'Fortran', 'HTML', 'JavaScript', 'Python', 'SQL', 'TypeScript',
  // Frameworks
  'Angular', 'FastAPI', 'Flask', 'NestJS', 'Next.js', 'React',
  // Tools & Libraries
  'Claude API', 'Docker', 'Git', 'Pinecone', 'Prisma', 'Supabase', 'Tailwind CSS', 'Zustand',
  // Platforms
  'AWS', 'GitHub Actions', 'Railway', 'Vercel',
];

const COUNTRIES: { region: string; items: string[] }[] = [
  { region: 'Americas', items: ['United States', 'Canada', 'Mexico', 'Argentina', 'Uruguay'] },
  { region: 'Africa', items: ['South Africa', 'Mozambique', 'Namibia'] },
  { region: 'Europe', items: ['England', 'Scotland', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Portugal', 'Czech Republic', 'Greece'] },
  { region: 'Asia & Oceania', items: ['India', 'Thailand', 'Australia'] },
];

const US_STATES = [
  'Arizona', 'California', 'Colorado', 'Connecticut', 'Florida',
  'Georgia', 'Illinois', 'Massachusetts', 'Nevada', 'New Jersey',
  'New York', 'North Carolina', 'Oregon', 'Pennsylvania', 'Texas',
  'Virginia', 'Washington',
];

const NbCheck: React.FC<{ label: string }> = ({ label }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '4px 10px', background: '#fff',
    border: '2px solid #1a1a1a', borderRadius: 6,
    fontFamily: "'Space Grotesk'", fontSize: 12, fontWeight: 600, color: '#1a1a1a',
  }}>
    <div style={{
      width: 14, height: 14, border: '2px solid #1a1a1a', borderRadius: 3,
      background: '#006673', display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
    {label}
  </div>
);

export const AboutPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const hash = await sha256(password);
    if (hash === PW_HASH) {
      localStorage.setItem('portfolio_admin', 'true');
      alert('Edit mode enabled! (Coming soon)');
      setShowLogin(false);
    } else {
      alert('Access denied.');
    }
    setPassword('');
  };

  const totalCountries = COUNTRIES.reduce((a, r) => a + r.items.length, 0);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 32px 96px' }}>

      {/* ---- HERO: Bio left (2/3), Photo right (1/3) ---- */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap' }}>
        {/* Left — bio in white card */}
        <div style={{ flex: '2 1 320px' }}>
          <span className="nb-label" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a' }} />
            ABOUT ME
          </span>

          <h1 style={{
            fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)',
            color: '#1a1a1a', lineHeight: 1.1, marginTop: 16, marginBottom: 20,
            textTransform: 'uppercase',
          }}>
            Hey, I'm Jean-Paul Wilson
          </h1>

          <div className="nb-stat" style={{ padding: 24 }}>
            <p style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: '#444', lineHeight: 1.75, marginBottom: 12 }}>
              Software engineer building full-stack applications and AI-powered systems.
              Currently in The Gauntlet — shipping a new project every week.
            </p>
            <p style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: '#444', lineHeight: 1.75, marginBottom: 12 }}>
              React & TypeScript on the front end, Python & FastAPI on the back end,
              with a growing focus on AI/ML, RAG pipelines, and developer tools.
            </p>
            <p style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: '#444', lineHeight: 1.75 }}>
              I believe in shipping real software, learning by building, and writing code that other people can read.
            </p>
          </div>
        </div>

        {/* Right — photo */}
        <div style={{ flex: '1 1 200px', maxWidth: 240 }}>
          <div style={{
            border: '3px solid #1a1a1a', borderRadius: 14,
            overflow: 'hidden', boxShadow: '6px 6px 0 #fd8b00',
            aspectRatio: '3/4',
          }}>
            <img
              src={`${BASE}images/hero-portrait.png`}
              alt="Jean-Paul Wilson"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* ---- TECH PILLS ---- */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{
          fontFamily: "'Space Grotesk'", fontSize: 13, fontWeight: 700,
          color: '#006673', textTransform: 'uppercase', letterSpacing: '0.08em',
          marginBottom: 12,
        }}>
          Technologies
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {TECH_PILLS.map(t => (
            <span key={t} className="nb-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* ============================================ */}
      {/* ---- PERSONAL SECTION ---- */}
      {/* ============================================ */}
      <div style={{ borderTop: '3px solid #1a1a1a', paddingTop: 32, marginBottom: 40 }}>
        <span className="nb-label" style={{ marginBottom: 24, display: 'inline-flex', background: '#006673', color: '#fff' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
          PERSONAL
        </span>

        {/* ---- Running ---- */}
        <div style={{ marginTop: 16, display: 'flex', gap: 16, alignItems: 'stretch', marginBottom: 32, flexWrap: 'wrap' }}>
          <div className="nb-stat" style={{
            background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a',
            display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px',
            flex: '1 1 200px',
          }}>
            <span style={{ fontSize: 28 }}>🏃</span>
            <div>
              <div style={{ fontFamily: "'Space Grotesk'", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#fd8b00', textTransform: 'uppercase' }}>
                NYC MARATHON
              </div>
              <div style={{ fontFamily: "'Space Grotesk'", fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                3:27
              </div>
            </div>
          </div>

          <div className="nb-stat" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', flex: '0 1 auto' }}>
            <span style={{ fontSize: 20 }}>📍</span>
            <div>
              <div style={{ fontFamily: "'Space Grotesk'", fontSize: 10, fontWeight: 700, color: '#006673', textTransform: 'uppercase', letterSpacing: '0.08em' }}>DISTANCE</div>
              <div style={{ fontFamily: "'Space Grotesk'", fontSize: 16, fontWeight: 700 }}>26.2 mi</div>
            </div>
          </div>

          <div className="nb-stat" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', flex: '0 1 auto' }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <div>
              <div style={{ fontFamily: "'Space Grotesk'", fontSize: 10, fontWeight: 700, color: '#006673', textTransform: 'uppercase', letterSpacing: '0.08em' }}>PACE</div>
              <div style={{ fontFamily: "'Space Grotesk'", fontSize: 16, fontWeight: 700 }}>7:56 /mi</div>
            </div>
          </div>
        </div>

        {/* ---- Travel ---- */}
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28 }}>🌍</span>
          <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20, color: '#1a1a1a' }}>
            Travel
          </h3>
          <span style={{
            fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 700,
            background: '#fd8b00', border: '2px solid #1a1a1a', borderRadius: 6,
            padding: '2px 10px', color: '#1a1a1a',
          }}>
            {totalCountries} COUNTRIES
          </span>
        </div>

        {COUNTRIES.map(region => (
          <div key={region.region} style={{ marginBottom: 14 }}>
            <h4 style={{
              fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 700,
              color: '#006673', textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: 8,
            }}>
              {region.region}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {region.items.map(c => <NbCheck key={c} label={c} />)}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 14 }}>
          <h4 style={{
            fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 700,
            color: '#006673', textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: 8,
          }}>
            US States ({US_STATES.length})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {US_STATES.map(s => <NbCheck key={s} label={s} />)}
          </div>
        </div>
      </div>

      {/* ---- HIDDEN ADMIN LOGIN ---- */}
      <div style={{ marginTop: 100, textAlign: 'center' }}>
        <button
          onClick={() => setShowLogin(!showLogin)}
          style={{
            background: 'none', border: 'none', cursor: 'default',
            fontFamily: "'Space Grotesk'", fontSize: 10, color: '#ccc',
            padding: 4, opacity: 0.3,
          }}
          aria-label="settings"
        >
          ·
        </button>

        {showLogin && (
          <form onSubmit={handleLogin} style={{
            background: '#fff', border: '3px solid #1a1a1a', borderRadius: 12,
            padding: 24, marginTop: 12, boxShadow: '6px 6px 0 #1a1a1a',
            maxWidth: 320, margin: '12px auto 0',
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="..."
                autoComplete="off"
                style={{
                  fontFamily: "'Space Grotesk'", fontSize: 14, padding: '10px 16px',
                  border: '2px solid #1a1a1a', borderRadius: 8, flex: 1, outline: 'none',
                }}
              />
              <button type="submit" className="nb-btn nb-btn-teal" style={{ padding: '10px 20px' }}>
                →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
