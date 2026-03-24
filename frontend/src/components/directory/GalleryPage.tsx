import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../data/projects';
import { Project } from '../../types/project';

const BASE = import.meta.env.BASE_URL;

const PROJECT_IMAGES: Record<string, string> = {
  'week1-colabboard': `${BASE}images/project-collabboard.jpg`,
  'week2-ghostfolio': `${BASE}images/project-ghostfolio.jpg`,
  'week3-legacylens': `${BASE}images/project-legacylens.jpg`,
  'week4-nerdy': `${BASE}images/project-nerdy.jpg`,
  'week4-gofundme': `${BASE}images/project-gofundme.jpg`,
  'week5-zapier': `${BASE}images/project-zapier.jpg`,
  'week5-skyfi': `${BASE}images/project-skyfi.jpg`,
  'week6-upstream-literacy': `${BASE}images/project-upstream.jpg`,
  'week6-servicecore': `${BASE}images/project-servicecore.jpg`,
  'other-family-socials': `${BASE}images/project-family.jpg`,
  'other-ev-lineup': `${BASE}images/project-ev.jpg`,
  'other-news-platform': `${BASE}images/project-news.jpg`,
};

const img = (p: Project) => p.thumbnail || PROJECT_IMAGES[p.id] || `${BASE}images/project-1.jpg`;

export const GalleryPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = PROJECTS[activeIndex];

  const goTo = useCallback((i: number) => {
    setActiveIndex(Math.max(0, Math.min(PROJECTS.length - 1, i)));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeIndex, goTo]);

  return (
    <div style={{
      height: 'calc(100vh - 60px)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', background: '#1a1a1a',
    }}>
      {/* ---- COVER FLOW AREA ---- */}
      <div style={{
        flex: '1 1 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: 1200,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 0,
      }}>
        {/* Reflection gradient at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to top, #1a1a1a, transparent)',
          zIndex: 10, pointerEvents: 'none',
        }} />

        {/* Cards */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          width: '100%', height: '100%',
        }}>
          {PROJECTS.map((p, i) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 4;

            if (!isVisible) return null;

            // 3D transforms
            const translateX = isActive ? 0 : offset * 220;
            const translateZ = isActive ? 100 : -150;
            const rotateY = isActive ? 0 : (offset < 0 ? 45 : -45);
            const scale = isActive ? 1 : 0.7;
            const opacity = isActive ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.2);
            const zIndex = isActive ? 20 : 10 - Math.abs(offset);

            return (
              <div
                key={p.id}
                onClick={() => goTo(i)}
                style={{
                  position: 'absolute',
                  width: 340,
                  height: 420,
                  cursor: isActive ? 'default' : 'pointer',
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Card */}
                <div style={{
                  width: '100%', height: '100%',
                  border: isActive ? '4px solid #fd8b00' : '3px solid #444',
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: isActive
                    ? '0 20px 60px rgba(0,0,0,0.6), 0 0 0 2px rgba(253,139,0,0.3)'
                    : '0 10px 30px rgba(0,0,0,0.4)',
                  background: '#222',
                }}>
                  <img
                    src={img(p)}
                    alt={p.name}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', display: 'block',
                    }}
                  />
                  {/* Title overlay at bottom */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '40px 16px 14px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                  }}>
                    <div style={{
                      fontFamily: "'Space Grotesk'", fontSize: 16, fontWeight: 700,
                      color: '#fff',
                    }}>
                      {p.name}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- DETAILS PANEL ---- */}
      <div style={{
        flexShrink: 0,
        background: '#222',
        borderTop: '3px solid #333',
        padding: '24px 32px 28px',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {/* Nav + badges */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => goTo(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="nb-btn nb-btn-white"
                style={{
                  padding: '6px 14px', fontSize: 14,
                  opacity: activeIndex === 0 ? 0.3 : 1,
                }}
              >
                ←
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                disabled={activeIndex === PROJECTS.length - 1}
                className="nb-btn nb-btn-orange"
                style={{
                  padding: '6px 14px', fontSize: 14,
                  opacity: activeIndex === PROJECTS.length - 1 ? 0.3 : 1,
                }}
              >
                →
              </button>
              <span style={{
                fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 600,
                color: '#666',
              }}>
                {activeIndex + 1} / {PROJECTS.length}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 6 }}>
              {project.category === 'gauntlet' && project.week && (
                <span style={{
                  fontFamily: "'Space Grotesk'", fontSize: 10, fontWeight: 700,
                  background: '#006673', color: '#fff',
                  padding: '3px 10px', borderRadius: 6, border: '2px solid #444',
                }}>
                  WEEK {project.week}
                </span>
              )}
              {project.featured && (
                <span style={{
                  fontFamily: "'Space Grotesk'", fontSize: 10, fontWeight: 700,
                  background: '#fd8b00', color: '#1a1a1a',
                  padding: '3px 10px', borderRadius: 6, border: '2px solid #444',
                }}>
                  FEATURED
                </span>
              )}
            </div>
          </div>

          {/* Title + description */}
          <h2 style={{
            fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 26,
            color: '#fff', marginBottom: 6,
          }}>
            {project.name}
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk'", fontSize: 14, color: '#999',
            lineHeight: 1.5, marginBottom: 16, maxWidth: 550,
          }}>
            {project.description}
          </p>

          {/* Tech tags + view button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.techStack.length > 0 && project.techStack[0] !== 'TBD' &&
                project.techStack.slice(0, 4).map(t => (
                  <span key={t} style={{
                    fontFamily: "'Space Grotesk'", fontSize: 10, fontWeight: 600,
                    border: '2px solid #444', borderRadius: 999,
                    padding: '3px 10px', color: '#aaa', background: '#2a2a2a',
                  }}>
                    {t}
                  </span>
                ))
              }
            </div>
            <Link
              to={`/project/${project.id}`}
              className="nb-btn nb-btn-teal"
              style={{ padding: '8px 20px', fontSize: 12 }}
            >
              View Project →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
