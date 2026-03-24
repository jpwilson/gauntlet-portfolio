import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const LINKS = [
  { label: 'PROJECTS', path: '/' },
  { label: 'ABOUT', path: '/about' },
];

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

export const Layout: React.FC = () => {
  const loc = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#fd8b00', borderBottom: '3px solid #1a1a1a',
        boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
      }}>
        <div className="nav-inner" style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 32px',
          height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{
            fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 22,
            color: '#1a1a1a', textDecoration: 'none',
          }}>
            <span className="hidden md:inline">JEAN-PAUL WILSON</span>
            <span className="md:hidden">JP WILSON</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {LINKS.map(l => (
              <Link key={l.label} to={l.path} style={{
                fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 700,
                textDecoration: 'none',
                color: loc.pathname === l.path ? '#006673' : '#1a1a1a',
              }}>
                {l.label}
              </Link>
            ))}
            <div style={{ width: 3, height: 20, background: '#1a1a1a', borderRadius: 2, opacity: 0.3 }} />
            <a href="https://github.com/jpwilson" target="_blank" rel="noopener noreferrer" style={{ color: '#1a1a1a', display: 'flex' }} title="GitHub"><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/jeanpaulwilson/" target="_blank" rel="noopener noreferrer" style={{ color: '#1a1a1a', display: 'flex' }} title="LinkedIn"><LinkedInIcon /></a>
            <a href="https://x.com/jeanpaulwilson" target="_blank" rel="noopener noreferrer" style={{ color: '#1a1a1a', display: 'flex' }} title="X"><XIcon /></a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{
            background: '#fff', border: '3px solid #1a1a1a', borderRadius: 8,
            padding: '6px 12px', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden" style={{
            padding: '16px 32px 20px', display: 'flex', flexDirection: 'column', gap: 12,
            borderTop: '3px solid #1a1a1a', background: '#fd8b00',
          }}>
            {LINKS.map(l => (
              <Link key={l.label} to={l.path} onClick={() => setMenuOpen(false)} style={{
                fontFamily: "'Space Grotesk'", fontSize: 14, fontWeight: 700, textDecoration: 'none', color: '#1a1a1a',
              }}>{l.label}</Link>
            ))}
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <a href="https://github.com/jpwilson" target="_blank" rel="noopener noreferrer" style={{ color: '#1a1a1a' }}><GitHubIcon /></a>
              <a href="https://www.linkedin.com/in/jeanpaulwilson/" target="_blank" rel="noopener noreferrer" style={{ color: '#1a1a1a' }}><LinkedInIcon /></a>
              <a href="https://x.com/jeanpaulwilson" target="_blank" rel="noopener noreferrer" style={{ color: '#1a1a1a' }}><XIcon /></a>
            </div>
          </div>
        )}
      </nav>

      <main style={{ flex: 1 }}><Outlet /></main>

      <footer style={{ background: '#1a1a1a', padding: '20px 32px' }}>
        <div className="footer-inner" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: "'Space Grotesk'", fontSize: 12, fontWeight: 600, color: '#888' }}>&copy; 2026 Jean-Paul Wilson</span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', position: 'relative', zIndex: 10 }}>
            <a href="https://github.com/jpwilson" target="_blank" rel="noopener noreferrer" style={{ color: '#888', display: 'flex', cursor: 'pointer' }}><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/jeanpaulwilson/" target="_blank" rel="noopener noreferrer" style={{ color: '#888', display: 'flex', cursor: 'pointer' }}><LinkedInIcon /></a>
            <a href="https://x.com/jeanpaulwilson" target="_blank" rel="noopener noreferrer" style={{ color: '#888', display: 'flex', cursor: 'pointer' }}><XIcon /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};
