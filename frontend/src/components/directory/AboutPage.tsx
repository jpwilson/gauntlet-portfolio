import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../data/projects';

const BASE = import.meta.env.BASE_URL;

const PW_HASH = 'c313c300828f3cf1e5bb10f55edb5587d2a6c72207498acc3e831d557299f947';

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Languages (alpha), then Frameworks/Tools (alpha), then Platforms (alpha)
const TECH_GROUPS = [
  {
    label: 'Languages',
    items: ['Fortran', 'Go', 'JavaScript', 'Python', 'SQL', 'Swift', 'TypeScript'],
  },
  {
    label: 'Frameworks & Tools',
    items: ['Angular', 'Anthropic Claude', 'D3.js', 'Django', 'Docker', 'FastAPI', 'Flask', 'Groq', 'Konva.js', 'LangChain', 'Langfuse', 'LiteLLM', 'LiveKit', 'MCP Protocol', 'MediaPipe', 'NestJS', 'Next.js', 'OpenAI', 'Pinecone', 'Playwright', 'Pydantic', 'React', 'Recharts', 'Turborepo', 'Vite', 'Vitest', 'Voyage AI', 'Zod', 'Zustand'],
  },
  {
    label: 'Platforms',
    items: ['GCP Cloud Run', 'GitHub Actions', 'PostgreSQL', 'Railway', 'Supabase', 'Vercel'],
  },
];

const PROJECT_IMAGES: Record<string, string> = {
  'week1-colabboard': `${BASE}images/collabboard.png`,
  'week2-agentfolio': `${BASE}images/agent-folio.png`,
  'week3-legacylens': `${BASE}images/legacylens.png`,
  'week4-nerdy-live': `${BASE}images/nerdy-livesesh.png`,
  'week4-nerdy-tutor': `${BASE}images/nerdy-livesesh.png`,
  'week4-gofundme': `${BASE}images/gofundme.png`,
  'week5-zapier-triggers': `${BASE}images/triggers-api.png`,
  'week5-skyfi': `${BASE}images/skyfi.png`,
  'week6-upstream-community': `${BASE}images/upstreamliteracyleaders.png`,
  'week6-upstream-ecommerce': `${BASE}images/upstream-ecom.png`,
  'week6-equinox': `${BASE}images/service-core.png`,
  'week6-st6': `${BASE}images/st6-commit.png`,
  'other-family-socials': `${BASE}images/ourfamilysocials.png`,
  'other-ev-lineup': `${BASE}images/evlineup.png`,
  'other-news-platform': `${BASE}images/newsplatform.png`,
};

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
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const [runningOpen, setRunningOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(true);

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

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => {
      if (prev.includes(tech)) return prev.filter(t => t !== tech);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, tech];
    });
  };

  // Find projects matching ALL selected techs
  const matchingProjects = selectedTechs.length > 0
    ? PROJECTS.filter(p => selectedTechs.every(t => p.techStack.includes(t)))
    : [];

  const totalCountries = COUNTRIES.reduce((a, r) => a + r.items.length, 0);

  return (
    <div className="page-about" style={{ maxWidth: 800, margin: '0 auto', padding: '48px 32px 96px' }}>

      {/* ---- HERO: Bio left (2/3), Photo right (1/3) ---- */}
      <div className="about-hero" style={{ display: 'flex', gap: 32, alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap' }}>

        <div className="about-photo" style={{ flex: '1 1 200px', maxWidth: 240 }}>
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

        <div className="about-bio" style={{ flex: '2 1 320px' }}>
          <span className="nb-label" style={{ marginBottom: 16, display: 'inline-flex' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a' }} />
            ABOUT ME
          </span>

          <h1 style={{
            fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)',
            color: '#1a1a1a', lineHeight: 1.1, marginTop: 16, marginBottom: 20,
            textTransform: 'uppercase',
          }}>
            Hey, Nice To Meet You!
          </h1>

          <div className="nb-stat" style={{ padding: 24 }}>
            <p style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: '#444', lineHeight: 1.75, marginBottom: 12 }}>
              Hi, I'm JP, thanks for visiting my gauntletAI portfolio.
            </p>
            <p style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: '#444', lineHeight: 1.75, marginBottom: 12 }}>
              I am a software engineer with over 8 years experience building production front end and
              backend systems — from APIs and data pipelines to infrastructure, AI agents and product features.
            </p>
            <p style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: '#444', lineHeight: 1.75, marginBottom: 16 }}>
              My previous roles in the US (I moved here from South Africa in 2017) can be summarized as:
            </p>
            <ul style={{ fontFamily: "'Space Grotesk'", fontSize: 14, color: '#444', lineHeight: 1.75, paddingLeft: 20, listStyleType: 'disc' }}>
              <li style={{ marginBottom: 14 }}>
                <strong>VillageMD</strong> — Senior Software Engineer (IC + management)<br />
                <span style={{ color: '#666' }}>
                  Built patient onboarding systems used across clinics. Worked across React frontends,
                  Flask (which I migrated to) FastAPI services, EMR integrations, and AWS infrastructure.
                  I led development efforts while remaining a hands-on IC.
                </span>
              </li>
              <li style={{ marginBottom: 14 }}>
                <strong>C.H. Robinson</strong> — Senior Software Engineer<br />
                <span style={{ color: '#666' }}>
                  Developed APIs and automation systems within a large enterprise .NET ecosystem.
                  Built ETL pipelines and internal tooling that improved operational workflows.
                </span>
              </li>
              <li>
                <strong>First Stop Health</strong> — Software Engineer<br />
                <span style={{ color: '#666' }}>
                  Worked on one of the early telehealth platforms prior to the pandemic. Built features
                  using Django and React for patient-doctor interactions and telehealth workflows.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---- INTERACTIVE TECH PILLS ---- */}
      <div style={{ marginBottom: 48 }}>
        <div
          className="personal-toggle"
          onClick={() => setTechOpen(!techOpen)}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4, cursor: 'pointer' }}
        >
          <h3 style={{
            fontFamily: "'Space Grotesk'", fontSize: 20, fontWeight: 700,
            color: '#1a1a1a',
          }}>
            Tech Stack
          </h3>
          <span className="personal-chevron" style={{
            fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 700, color: '#1a1a1a',
            transition: 'transform 0.2s',
            transform: techOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}>
            ▶
          </span>
          {selectedTechs.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedTechs([]); }}
              className="nb-btn nb-btn-white"
              style={{ padding: '4px 12px', fontSize: 11 }}
            >
              Clear ({selectedTechs.length}/3)
            </button>
          )}
        </div>
        <p style={{
          fontFamily: "'Space Grotesk'", fontSize: 13, color: '#666',
          marginBottom: 16,
        }}>
          Technologies used across these projects
        </p>

        <div className={`personal-section ${techOpen ? 'personal-open' : 'personal-closed'}`}>
        {TECH_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: 12 }}>
            <span style={{
              fontFamily: "'Space Grotesk'", fontSize: 10, fontWeight: 700,
              color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em',
              display: 'block', marginBottom: 6,
            }}>
              {group.label}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {group.items.map(tech => {
                const isSelected = selectedTechs.includes(tech);
                const isMaxed = selectedTechs.length >= 3 && !isSelected;
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    disabled={isMaxed}
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 600,
                      border: isSelected ? '2px solid #006673' : '2px solid #1a1a1a',
                      borderRadius: 999,
                      background: isSelected ? '#006673' : '#fff',
                      color: isSelected ? '#fff' : '#1a1a1a',
                      cursor: isMaxed ? 'not-allowed' : 'pointer',
                      opacity: isMaxed ? 0.4 : 1,
                      transition: 'all 0.2s ease',
                      transform: isSelected ? 'translate(-2px, -2px)' : 'translate(0, 0)',
                      boxShadow: isSelected ? '3px 3px 0 #1a1a1a' : 'none',
                    }}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Matching projects */}
        {selectedTechs.length > 0 && (
          <div style={{ marginTop: 20, animation: 'fadeIn 0.3s ease' }}>
            <span style={{
              fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 700,
              color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em',
              display: 'block', marginBottom: 10,
            }}>
              {matchingProjects.length} project{matchingProjects.length !== 1 ? 's' : ''} using {selectedTechs.join(' + ')}
            </span>
            {matchingProjects.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {matchingProjects.map(p => (
                  <Link
                    key={p.id}
                    to={`/project/${p.id}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 14px 8px 8px',
                      background: '#fff', border: '2px solid #1a1a1a', borderRadius: 10,
                      textDecoration: 'none', color: '#1a1a1a',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '4px 4px 0 #006673'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <img
                      src={PROJECT_IMAGES[p.id] || `${BASE}images/project-1.jpg`}
                      alt={p.name}
                      style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover', border: '2px solid #1a1a1a' }}
                    />
                    <span style={{ fontFamily: "'Space Grotesk'", fontSize: 13, fontWeight: 700 }}>
                      {p.name}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{
                fontFamily: "'Space Grotesk'", fontSize: 13, color: '#999',
                padding: '16px 20px', background: '#fff', border: '2px solid #ddd', borderRadius: 10,
              }}>
                No projects match this combination
              </div>
            )}
          </div>
        )}
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

        {/* Running - collapsible on mobile */}
        <div
          className="personal-toggle"
          onClick={() => setRunningOpen(!runningOpen)}
          style={{ marginTop: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <span style={{ fontSize: 28 }}>🏃</span>
          <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20, color: '#1a1a1a' }}>Running</h3>
          <span className="personal-chevron" style={{
            fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 700, color: '#1a1a1a',
            transition: 'transform 0.2s',
            transform: runningOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}>
            ▶
          </span>
        </div>

        <div className={`personal-section ${runningOpen ? 'personal-open' : 'personal-closed'}`}>
          <div className="personal-stats" style={{ display: 'flex', gap: 16, alignItems: 'stretch', marginBottom: 32, flexWrap: 'wrap' }}>
            <div className="nb-stat" style={{
              background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a',
              display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px',
              flex: '1 1 200px',
            }}>
              <span style={{ fontSize: 28 }}>🏅</span>
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
        </div>

        {/* Travel - collapsible on mobile */}
        <div
          className="personal-toggle"
          onClick={() => setCountriesOpen(!countriesOpen)}
          style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <span style={{ fontSize: 28 }}>🌍</span>
          <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20, color: '#1a1a1a' }}>Travel</h3>
          <span className="personal-chevron" style={{
            fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 700, color: '#1a1a1a',
            transition: 'transform 0.2s',
            transform: countriesOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}>
            ▶
          </span>
        </div>

        <div className={`personal-section ${countriesOpen ? 'personal-open' : 'personal-closed'}`}>
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
