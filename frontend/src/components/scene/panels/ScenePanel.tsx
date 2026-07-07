import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHotspot } from '../../../data/hotspots';
import { PanelId } from '../../../types/scene';
import { ProjectsPanel } from './ProjectsPanel';
import { AboutPanel } from './AboutPanel';
import { ContactPanel } from './ContactPanel';
import { ResumePanel } from './ResumePanel';
import { PortalsPanel } from './PortalsPanel';
import { MoonPanel } from './MoonPanel';

const PANEL_META: Record<PanelId, { title: string; sub: string }> = {
  'gauntlet-projects': { title: 'The Gauntlet', sub: 'Every trial faced, every artifact forged' },
  'other-projects': { title: 'Other Adventures', sub: 'Journeys taken beyond the trials' },
  about: { title: 'The Tale of the Traveler', sub: 'Who is Jean-Paul Wilson?' },
  contact: { title: 'Send a Raven', sub: 'Words travel fast across this realm' },
  resume: { title: 'The Scroll of Deeds', sub: 'A record, plainly told (the resume)' },
  portals: { title: 'The Crossing', sub: 'The white horse knows older realms' },
  'moon-games': { title: 'The Watching Moon', sub: 'It hums with old games' },
};

/**
 * The parchment dialog for an open landmark (/loc/:hotspotId).
 * Lazy chunk: all panel content lives behind this one import.
 */
const ScenePanel: React.FC = () => {
  const { hotspotId } = useParams<{ hotspotId: string }>();
  const navigate = useNavigate();
  const hotspot = getHotspot(hotspotId);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Move keyboard focus into the dialog when it opens.
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  // Escape closes from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  // Invalid ids are redirected by ScenePage; route targets never render here.
  if (!hotspot || hotspot.target.kind !== 'panel') return null;

  const panel = hotspot.target.panel;
  const meta = PANEL_META[panel];
  const close = () => navigate('/');

  // Minimal focus trap: cycle Tab within the dialog.
  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="me-panel-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        className="me-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="me-panel-title"
        onKeyDown={trapFocus}
      >
        <header className="me-panel-header">
          <div>
            <h2 id="me-panel-title" className="me-panel-title">
              {meta.title}
            </h2>
            <p className="me-panel-sub">{meta.sub}</p>
          </div>
          <button ref={closeRef} type="button" className="me-close" onClick={close}>
            ✕ Close
          </button>
        </header>
        <div className="me-panel-body">
          {panel === 'gauntlet-projects' && <ProjectsPanel category="gauntlet" />}
          {panel === 'other-projects' && <ProjectsPanel category="other" />}
          {panel === 'about' && <AboutPanel />}
          {panel === 'contact' && <ContactPanel />}
          {panel === 'resume' && <ResumePanel />}
          {panel === 'portals' && <PortalsPanel />}
          {panel === 'moon-games' && <MoonPanel />}
        </div>
      </div>
    </div>
  );
};

export default ScenePanel;
