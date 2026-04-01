import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../../data/projects';

const BASE = import.meta.env.BASE_URL;

const IMAGES: Record<string, string> = {
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
  'week7-pilotbase': `${BASE}images/pilotbase.png`,
  'other-family-socials': `${BASE}images/ourfamilysocials.png`,
  'other-ev-lineup': `${BASE}images/evlineup.png`,
  'other-news-platform': `${BASE}images/newsplatform.png`,
};

const GIF_PROJECTS = new Set<string>();

const getImage = (id: string) => {
  const base = IMAGES[id];
  if (!base) return `${BASE}images/project-1.jpg`;
  if (GIF_PROJECTS.has(id)) return base.replace('.jpg', '.gif');
  return base;
};

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProject(id) : undefined;
  const [specOpen, setSpecOpen] = useState(false);

  if (!project) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 36, marginBottom: 24, textTransform: 'uppercase' }}>
          Project not found
        </h1>
        <Link to="/" className="nb-btn nb-btn-teal">&larr; Back to projects</Link>
      </div>
    );
  }

  const image = project.thumbnail || getImage(project.id);
  const screenshots = project.screenshots || [];
  const company = project.company || (project.category === 'gauntlet' ? 'Gauntlet' : 'Personal');

  return (
    <div className="page-detail" style={{ maxWidth: 900, margin: '0 auto', padding: '48px 32px 96px' }}>
      {/* Back link */}
      <Link to="/" className="nb-btn nb-btn-white" style={{ marginBottom: 32, display: 'inline-flex' }}>
        &larr; All Projects
      </Link>

      {/* Hero image — clickable to live site */}
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
          display: 'block', border: '3px solid #1a1a1a', borderRadius: 16, overflow: 'hidden',
          marginBottom: 24, background: '#111', cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0 #1a1a1a'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {project.video ? (
            <video src={project.video} autoPlay muted loop playsInline style={{ width: '100%', height: 'auto', maxHeight: 480, objectFit: 'cover', display: 'block' }} />
          ) : (
            <img src={image} alt={project.name} style={{ width: '100%', height: 'auto', maxHeight: 480, objectFit: 'cover', display: 'block' }} />
          )}
        </a>
      ) : (
        <div style={{
          border: '3px solid #1a1a1a', borderRadius: 16, overflow: 'hidden',
          marginBottom: 24, background: '#111',
        }}>
          {project.video ? (
            <video src={project.video} autoPlay muted loop playsInline style={{ width: '100%', height: 'auto', maxHeight: 480, objectFit: 'cover', display: 'block' }} />
          ) : (
            <img src={image} alt={project.name} style={{ width: '100%', height: 'auto', maxHeight: 480, objectFit: 'cover', display: 'block' }} />
          )}
        </div>
      )}

      {/* Screenshot gallery */}
      {screenshots.length > 0 && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto', paddingBottom: 8 }} className="gallery-scroll">
          {screenshots.map((src, i) => (
            <div key={i} style={{
              flexShrink: 0, width: 200, height: 130,
              border: '3px solid #1a1a1a', borderRadius: 10, overflow: 'hidden',
              cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '4px 4px 0 #1a1a1a'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <img src={src} alt={`${project.name} screenshot ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      )}

      {/* Company badge only */}
      <div style={{ marginBottom: 12 }}>
        <span style={{
          fontFamily: "'Space Grotesk'", fontSize: 12, fontWeight: 700,
          background: '#2563eb', color: '#fff',
          padding: '5px 14px', borderRadius: 8, border: '2px solid #1a1a1a',
        }}>
          {company}
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: "'Space Grotesk'", fontWeight: 900,
        fontSize: 'clamp(36px, 6vw, 56px)',
        color: '#1a1a1a', lineHeight: 1.05, marginBottom: 16, textTransform: 'uppercase',
        letterSpacing: '-0.02em',
      }}>
        {project.name}
      </h1>

      {/* ACTION BUTTONS: Deployed Site, Demo Video, GitHub */}
      <div className="detail-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="nb-btn" style={{
            background: '#fff', color: '#1a1a1a', border: '3px solid #fd8b00',
          }}>
            Deployed Site &rarr;
          </a>
        )}
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="nb-btn nb-btn-orange">
            ▶ Demo Video
          </a>
        ) : (
          <span className="nb-btn nb-btn-white" style={{ opacity: 0.5, cursor: 'default' }}>
            Demo (coming soon)
          </span>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="nb-btn nb-btn-white">
            GitHub
          </a>
        )}
      </div>

      {/* Tech pills */}
      {project.techStack.length > 0 && project.techStack[0] !== 'TBD' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 28 }}>
          {project.techStack.map(t => (
            <span key={t} className="nb-tag nb-tag-detail">{t}</span>
          ))}
        </div>
      )}

      {/* OVERVIEW */}
      {project.longDescription && (
        <div className="nb-stat" style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18, marginBottom: 12, color: '#1a1a1a' }}>
            Overview
          </h2>
          <p style={{ fontFamily: "'Space Grotesk'", fontSize: 15, color: '#444', lineHeight: 1.75 }}>
            {project.longDescription}
          </p>
        </div>
      )}

      {/* COLLAPSIBLE PROJECT SPEC — separate from challenges/learnings */}
      {project.spec && (
        <div className="nb-stat" style={{ marginBottom: 20 }}>
          <button
            onClick={() => setSpecOpen(!specOpen)}
            style={{
              fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 14,
              color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: 0,
            }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 20, height: 20, borderRadius: 4, border: '2px solid #1a1a1a',
              fontSize: 12, fontWeight: 700, transition: 'transform 0.2s',
              transform: specOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}>
              ▶
            </span>
            Project Spec
          </button>
          {specOpen && (
            <div style={{ marginTop: 16, animation: 'fadeIn 0.3s ease' }}>
              <p style={{ fontFamily: "'Space Grotesk'", fontSize: 14, color: '#444', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
                {project.spec}
              </p>
            </div>
          )}
        </div>
      )}

      {/* CHALLENGES / KEY LEARNINGS — visible cards side by side */}
      {(project.challenges || project.learnings) && (
        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: project.challenges && project.learnings ? '1fr 1fr' : '1fr', gap: 16, marginBottom: 24 }}>
          {project.challenges && (
            <div className="nb-stat" style={{ borderColor: '#fd8b00' }}>
              <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 13, fontWeight: 700, color: '#904d00', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Challenges
              </h3>
              <p style={{ fontFamily: "'Space Grotesk'", fontSize: 14, color: '#444', lineHeight: 1.65 }}>
                {project.challenges}
              </p>
            </div>
          )}
          {project.learnings && (
            <div className="nb-stat" style={{ borderColor: '#006673' }}>
              <h3 style={{ fontFamily: "'Space Grotesk'", fontSize: 13, fontWeight: 700, color: '#006673', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Key Learnings
              </h3>
              <p style={{ fontFamily: "'Space Grotesk'", fontSize: 14, color: '#444', lineHeight: 1.65 }}>
                {project.learnings}
              </p>
            </div>
          )}
        </div>
      )}

      {/* BACK */}
      <div style={{ marginTop: 48 }}>
        <Link to="/" className="nb-btn nb-btn-teal">&larr; Back to all projects</Link>
      </div>
    </div>
  );
};
