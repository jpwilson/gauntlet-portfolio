import React from 'react';
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
  const onAbout = loc.pathname === '/about';
  const otherLink = onAbout
    ? { label: 'PROJECTS', path: '/' }
    : { label: 'ABOUT', path: '/about' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(10,15,19,0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,219,233,0.35)',
        boxShadow: '0 0 24px rgba(0,240,255,0.15)',
      }}>
        <div className="nav-inner" style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 32px',
          height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{
            fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 22,
            letterSpacing: '0.08em',
            color: '#dbfcff', textDecoration: 'none',
            textShadow: '0 0 12px rgba(0,240,255,0.5)',
          }}>
            <span className="hidden md:inline">JEAN-PAUL WILSON</span>
            <span className="md:hidden">JP WILSON</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {LINKS.map(l => {
              const active = loc.pathname === l.path;
              return (
                <Link key={l.label} to={l.path} style={{
                  fontFamily: "'Space Grotesk'", fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: active ? '#00f0ff' : 'rgba(219,252,255,0.6)',
                  paddingBottom: 2,
                  borderBottom: active ? '1px solid #00f0ff' : '1px solid transparent',
                  textShadow: active ? '0 0 10px rgba(0,240,255,0.6)' : 'none',
                  transition: 'all 0.2s ease',
                }}>
                  {l.label}
                </Link>
              );
            })}
            <div style={{ width: 1, height: 20, background: 'rgba(0,219,233,0.35)' }} />
            <a href="https://github.com/jpwilson" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(219,252,255,0.6)', display: 'flex' }} title="GitHub"><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/jeanpaulwilson/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(219,252,255,0.6)', display: 'flex' }} title="LinkedIn"><LinkedInIcon /></a>
            <a href="https://x.com/jeanpaulwilson" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(219,252,255,0.6)', display: 'flex' }} title="X"><XIcon /></a>
          </div>

          <Link to={otherLink.path} className="md:hidden" style={{
            background: 'transparent', border: '1px solid #00dbe9', borderRadius: 0,
            padding: '6px 14px', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 12,
            letterSpacing: '0.15em', color: '#00f0ff', textDecoration: 'none',
            textShadow: '0 0 10px rgba(0,240,255,0.5)',
            boxShadow: '0 0 10px rgba(0,240,255,0.15)',
          }}>
            {otherLink.label}
          </Link>
        </div>
      </nav>

      <main style={{ flex: 1 }}><Outlet /></main>

      <footer style={{
        background: 'rgba(5,8,13,0.9)',
        borderTop: '1px solid rgba(0,219,233,0.25)',
        padding: '20px 32px',
      }}>
        <div className="footer-inner" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 600, color: '#849495', letterSpacing: '0.1em', textTransform: 'uppercase' }}>&copy; 2026 Jean-Paul Wilson</span>
          <div className="footer-socials" style={{ display: 'flex', gap: 16, alignItems: 'center', position: 'relative', zIndex: 10 }}>
            <a href="https://github.com/jpwilson" target="_blank" rel="noopener noreferrer" style={{ color: '#849495', display: 'flex', cursor: 'pointer' }}><GitHubIcon /></a>
            <a href="https://www.linkedin.com/in/jeanpaulwilson/" target="_blank" rel="noopener noreferrer" style={{ color: '#849495', display: 'flex', cursor: 'pointer' }}><LinkedInIcon /></a>
            <a href="https://x.com/jeanpaulwilson" target="_blank" rel="noopener noreferrer" style={{ color: '#849495', display: 'flex', cursor: 'pointer' }}><XIcon /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};
