import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../data/projects';
import { Project } from '../../types/project';

const BASE = import.meta.env.BASE_URL;

const PROJECT_IMAGES: Record<string, string> = {
  'week1-colabboard': `${BASE}images/collabboard.png`,
  'week2-agentfolio': `${BASE}images/agent-folio.png`,
  'week3-legacylens': `${BASE}images/legacylens.png`,
  'week4-nerdy-live': `${BASE}images/nerdy-livesesh.png`,
  'week4-nerdy-tutor': `${BASE}images/nerdy-ai-tutor.png`,
  'week4-gofundme': `${BASE}images/gofundme.png`,
  'week5-zapier-triggers': `${BASE}images/triggers-api.png`,
  'week5-skyfi': `${BASE}images/skyfi.png`,
  'week6-upstream-community': `${BASE}images/upstreamliteracyleaders.png`,
  'week6-upstream-ecommerce': `${BASE}images/upstream-ecom.png`,
  'week6-servicecore': `${BASE}images/service-core.png`,
  'week6-equinox': `${BASE}images/peak6-equinox.png`,
  'week6-st6': `${BASE}images/st6-commit.png`,
  'other-family-socials': `${BASE}images/ourfamilysocials.png`,
  'other-ev-lineup': `${BASE}images/evlineup.png`,
  'other-news-platform': `${BASE}images/newsplatform.png`,
};
// Supports both .gif and .jpg — put a .gif in public/images/ with same name to use it
// e.g. project-collabboard.gif will be used if it exists, otherwise falls back to .jpg
const GIF_PROJECTS = new Set<string>(); // Add project IDs here when you have GIFs, e.g. 'week1-colabboard'

const img = (p: Project) => {
  if (p.thumbnail) return p.thumbnail;
  const key = PROJECT_IMAGES[p.id];
  if (!key) return `${BASE}images/project-1.jpg`;
  if (GIF_PROJECTS.has(p.id)) return key.replace('.jpg', '.gif');
  return key;
};

type ViewMode = 'tiles' | 'table' | 'coverflow';

export const ProjectsPage: React.FC = () => {
  const [view, setView] = useState<ViewMode>('coverflow');

  return (
    <div className="page-projects" style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px 0' }}>
      {/* Header */}
      <div className="page-projects-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 32, color: '#1a1a1a' }}>
          PROJECTS
        </h1>

        {/* Full toggle (desktop) */}
        <div className="view-toggle-full" style={{
          display: 'inline-flex', border: '3px solid #1a1a1a', borderRadius: 10, overflow: 'hidden',
        }}>
          {(['tiles', 'table', 'coverflow'] as ViewMode[]).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                fontFamily: "'Space Grotesk'", fontSize: 12, fontWeight: 700,
                padding: '8px 18px', border: 'none', cursor: 'pointer',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                background: view === v ? '#1a1a1a' : '#fff',
                color: view === v ? '#fff' : '#1a1a1a',
                borderRight: v !== 'coverflow' ? '2px solid #1a1a1a' : 'none',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {v === 'tiles' ? '⊞ Tiles' : v === 'table' ? '☰ Table' : '◆ Carousel'}
            </button>
          ))}
        </div>

        {/* Compact icon toggle (mobile) */}
        <div className="view-toggle-compact" style={{
          display: 'none', border: '2px solid #1a1a1a', borderRadius: 8, overflow: 'hidden',
        }}>
          {([
            { mode: 'tiles' as ViewMode, icon: '⊞' },
            { mode: 'table' as ViewMode, icon: '☰' },
            { mode: 'coverflow' as ViewMode, icon: '◆' },
          ]).map(({ mode, icon }) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              style={{
                fontSize: 14, padding: '5px 10px', border: 'none', cursor: 'pointer',
                background: view === mode ? '#1a1a1a' : '#fff',
                color: view === mode ? '#fff' : '#1a1a1a',
                borderRight: mode !== 'coverflow' ? '1.5px solid #1a1a1a' : 'none',
                transition: 'background 0.15s, color 0.15s',
                lineHeight: 1,
              }}
              title={mode.charAt(0).toUpperCase() + mode.slice(1)}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {view === 'tiles' && <TilesView />}
      {view === 'table' && <TableView />}
      {view === 'coverflow' && <CoverFlowView />}
    </div>
  );
};

/* ============================================ */
/* TILES VIEW */
/* ============================================ */
const TilesView: React.FC = () => (
  <div className="tiles-grid" style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: 24,
  }}>
    {PROJECTS.map(p => (
      <Link key={p.id} to={`/project/${p.id}`} className="nb-card">
        <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderBottom: '3px solid #1a1a1a', background: '#ddd' }}>
          <img src={img(p)} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div style={{ padding: '20px 24px 24px' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            {(p.company || p.category === 'gauntlet') && (
              <span style={{ fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 700, background: '#2563eb', color: '#fff', padding: '3px 10px', borderRadius: 6, border: '2px solid #1a1a1a' }}>{p.company || 'Gauntlet'}</span>
            )}
            {p.featured && (
              <span style={{ fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 700, background: '#fd8b00', color: '#1a1a1a', padding: '3px 10px', borderRadius: 6, border: '2px solid #1a1a1a' }}>FEATURED</span>
            )}
          </div>
          <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 22, marginBottom: 6, color: '#1a1a1a' }}>{p.name}</h3>
          <p style={{ fontFamily: "'Space Grotesk'", fontSize: 14, color: '#666', lineHeight: 1.5, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
          {p.techStack.length > 0 && p.techStack[0] !== 'TBD' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.techStack.slice(0, 3).map(t => <span key={t} className="nb-tag">{t}</span>)}
            </div>
          )}
        </div>
      </Link>
    ))}
  </div>
);

/* ============================================ */
/* TABLE VIEW */
/* ============================================ */

type SortKey = 'name' | 'company' | 'date';
type SortDir = 'asc' | 'desc';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = String(d.getFullYear()).slice(2);
  return `${day}, ${date} ${month} ${year}`;
}

function getCompany(p: Project): string {
  return p.company || (p.category === 'gauntlet' ? 'Gauntlet' : 'Personal');
}

const TableView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = PROJECTS.filter(p => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q)
      || p.description.toLowerCase().includes(q)
      || p.techStack.some(t => t.toLowerCase().includes(q))
      || getCompany(p).toLowerCase().includes(q);
  });

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
    else if (sortKey === 'company') cmp = getCompany(a).localeCompare(getCompany(b));
    else cmp = a.createdAt.localeCompare(b.createdAt);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const SortHeader: React.FC<{ label: string; k: SortKey }> = ({ label, k }) => (
    <th
      onClick={() => toggleSort(k)}
      style={{
        padding: '12px 16px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.08em', textAlign: 'left', borderBottom: '3px solid #1a1a1a',
        cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
      }}
    >
      {label} {sortKey === k ? (sortDir === 'asc' ? '↑' : '↓') : ''}
    </th>
  );

  return (
    <div>
      {/* Search bar */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search projects..."
          style={{
            fontFamily: "'Space Grotesk'", fontSize: 14, padding: '10px 16px',
            border: '3px solid #1a1a1a', borderRadius: 10, width: '100%', maxWidth: 360,
            outline: 'none', background: '#fff',
          }}
        />
      </div>

      <div className="table-wrapper" style={{ border: '3px solid #1a1a1a', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Space Grotesk'" }}>
          <thead>
            <tr style={{ background: '#1a1a1a', color: '#fff' }}>
              <SortHeader label="Project" k="name" />
              <th style={{ padding: '12px 16px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left', borderBottom: '3px solid #1a1a1a' }}>
                Description
              </th>
              <th style={{ padding: '12px 16px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left', borderBottom: '3px solid #1a1a1a' }}>
                Tech
              </th>
              <SortHeader label="Company" k="company" />
              <SortHeader label="Latest Commit" k="date" />
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: 32, textAlign: 'center', color: '#999', fontSize: 14 }}>No projects match "{search}"</td></tr>
            ) : sorted.map((p, i) => (
              <tr key={p.id} style={{ cursor: 'pointer' }}>
                <td style={{ padding: '14px 16px' }}>
                  <Link to={`/project/${p.id}`} style={{ fontWeight: 700, fontSize: 14, color: '#006673', textDecoration: 'none' }}>
                    {p.name}
                  </Link>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: '#666', maxWidth: 300 }}>
                  <span style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {p.techStack.length > 0 && p.techStack[0] !== 'TBD'
                      ? p.techStack.slice(0, 2).map(t => (
                        <span key={t} style={{ fontSize: 10, fontWeight: 600, border: '1.5px solid #ddd', borderRadius: 4, padding: '2px 6px', color: '#666' }}>{t}</span>
                      ))
                      : <span style={{ fontSize: 10, color: '#ccc' }}>—</span>
                    }
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                  {getCompany(p)}
                </td>
                <td style={{ padding: '14px 16px', fontSize: 12, color: '#999', whiteSpace: 'nowrap' }}>
                  {formatDate(p.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================ */
/* COVER FLOW VIEW */
/* ============================================ */
const CoverFlowView: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const n = PROJECTS.length;
  const project = PROJECTS[activeIndex];
  const [displayedProject, setDisplayedProject] = useState(project);
  const [panelVisible, setPanelVisible] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setPanelVisible(false);
    const t = setTimeout(() => {
      setDisplayedProject(PROJECTS[activeIndex]);
      setPanelVisible(true);
    }, 220);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const goTo = useCallback((i: number) => {
    // Wrap around
    setActiveIndex(((i % n) + n) % n);
  }, [n]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeIndex, goTo]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only swipe if horizontal movement is dominant and > 50px
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [activeIndex, goTo]);

  // Build a map of projectIndex -> offset from active (show more cards for smoother entry)
  const offsets = new Map<number, number>();
  for (let off = -6; off <= 6; off++) {
    const idx = ((activeIndex + off) % n + n) % n;
    if (!offsets.has(idx)) offsets.set(idx, off);
  }

  return (
    <div>
      {/* Cover flow area */}
      <div
        className="coverflow-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          height: 410, perspective: 1200, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', margin: '0 -32px', padding: '0 32px',
        }}
      >
        {PROJECTS.map((p, idx) => {
          const offset = offsets.get(idx);
          if (offset === undefined) return null;

          const isActive = offset === 0;
          const absOff = Math.abs(offset);

          // Tighter spacing on mobile so side cards stay visible in viewport
          const spacing = isMobile ? 60 : 180;
          const gap = isMobile ? 30 : 120;
          const depth = isMobile ? -60 : -120;
          const angle = isMobile ? 40 : 50;

          const tx = isActive ? 0 : offset * spacing + (offset > 0 ? gap : -gap);
          const tz = isActive ? 0 : depth;
          const ry = isActive ? 0 : (offset < 0 ? angle : -angle);
          const op = isActive ? 1 : Math.max(0.15, 1 - absOff * 0.2);
          const sc = isActive ? 1 : Math.max(0.6, 1 - absOff * 0.08);
          const z = isActive ? 20 : 10 - absOff;

          return (
            <div
              key={p.id}
              className="coverflow-card"
              data-active={isActive ? "true" : "false"}
              onClick={() => {
                if (isActive) {
                  window.location.hash = `/project/${p.id}`;
                } else {
                  goTo(activeIndex + offset);
                }
              }}
              style={{
                position: 'absolute',
                width: isActive ? 572 : 200,
                height: isActive ? 352 : 140,
                cursor: 'pointer',
                transform: isActive
                  ? `translateX(0px) scale(1)`
                  : `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`,
                opacity: op, zIndex: z,
                transition: 'transform 1s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 1s ease',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
              }}
            >
              <div style={{
                width: '100%', height: '100%',
                border: isActive ? '3px solid #1a1a1a' : '2px solid rgba(0,0,0,0.2)',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: isActive ? '0 20px 60px rgba(0,0,0,0.3)' : '0 8px 20px rgba(0,0,0,0.1)',
                background: '#ddd',
                transition: 'border 0.6s, box-shadow 0.6s',
              }}>
                <img src={img(p)} alt={p.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  imageRendering: 'auto',
                  backfaceVisibility: 'hidden',
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Details panel for active project */}
      <div className="coverflow-detail" style={{
        padding: '16px 24px',
        background: '#fff', border: '3px solid #1a1a1a', borderRadius: 12,
        maxWidth: 860, margin: '12px auto 0',
        opacity: panelVisible ? 1 : 0,
        transition: 'opacity 0.22s ease',
        boxShadow: '0 16px 48px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12)',
      }}>
        {/* Top row: title + badges + controls */}
        <div className="coverflow-detail-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="coverflow-detail-title" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20, color: '#1a1a1a' }}>{displayedProject.name}</h2>
            {(displayedProject.company || displayedProject.category === 'gauntlet') && (
              <span style={{ fontFamily: "'Space Grotesk'", fontSize: 10, fontWeight: 700, background: '#2563eb', color: '#fff', padding: '2px 8px', borderRadius: 5, border: '2px solid #1a1a1a' }}>{displayedProject.company || 'Gauntlet'}</span>
            )}
            <span style={{ fontFamily: "'Space Grotesk'", fontSize: 10, fontWeight: 600, color: '#bbb' }}>
              {activeIndex + 1}/{n}
            </span>
          </div>
          <div className="coverflow-detail-controls" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button onClick={() => goTo(activeIndex - 1)} className="nb-btn nb-btn-white" style={{ padding: '8px 14px', fontSize: 16 }}>←</button>
            <button onClick={() => goTo(activeIndex + 1)} className="nb-btn nb-btn-orange" style={{ padding: '8px 14px', fontSize: 16 }}>→</button>
            <Link to={`/project/${displayedProject.id}`} className="nb-btn nb-btn-teal" style={{ padding: '8px 18px', fontSize: 12 }}>
              View →
            </Link>
          </div>
        </div>
        {/* Description */}
        <p className="coverflow-detail-desc" style={{ fontFamily: "'Space Grotesk'", fontSize: 13, color: '#666', lineHeight: 1.4, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayedProject.description}</p>
        {/* Tech pills — full width, wrapping (hidden on mobile) */}
        {displayedProject.techStack.length > 0 && displayedProject.techStack[0] !== 'TBD' && (
          <div className="coverflow-tech-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {displayedProject.techStack.map(t => <span key={t} className="nb-tag">{t}</span>)}
          </div>
        )}
      </div>
    </div>
  );
};
