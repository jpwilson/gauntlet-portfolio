import React from 'react';
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

export const DirectoryPage: React.FC = () => (
  <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 80px' }}>
    {/* HERO — left text, right photo */}
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 32, marginBottom: 48, flexWrap: 'wrap',
    }}>
      <div style={{ flex: '1 1 400px' }}>
        <span className="nb-label" style={{ marginBottom: 16, display: 'inline-flex' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a' }} />
          PORTFOLIO
        </span>
        <h1 style={{
          fontFamily: "'Space Grotesk'", fontWeight: 700,
          fontSize: 'clamp(36px, 6vw, 56px)',
          color: '#1a1a1a', lineHeight: 1.05, marginTop: 16, marginBottom: 12,
        }}>
          Projects
        </h1>
        <p style={{
          fontFamily: "'Space Grotesk'", fontSize: 16, color: '#666',
          maxWidth: 420, lineHeight: 1.6,
        }}>
          Full-stack apps, AI systems, and more — built and shipped during The Gauntlet and beyond.
        </p>
      </div>

      {/* Photo on right */}
      <div style={{
        width: 90, height: 90, borderRadius: '50%', border: '3px solid #1a1a1a',
        overflow: 'hidden', boxShadow: '4px 4px 0 #006673', flexShrink: 0,
      }}>
        <img
          src={`${BASE}images/hero-portrait.png`}
          alt="Jean-Paul Wilson"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>

    {/* GRID */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
      gap: 24,
    }}>
      {PROJECTS.map(p => <Card key={p.id} project={p} />)}
    </div>
  </div>
);

const Card: React.FC<{ project: Project }> = ({ project }) => (
  <Link to={`/project/${project.id}`} className="nb-card">
    <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderBottom: '3px solid #1a1a1a', background: '#ddd' }}>
      <img
        src={img(project)}
        alt={project.name}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
    <div style={{ padding: '20px 24px 24px' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        {project.category === 'gauntlet' && project.week && (
          <span style={{
            fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 700,
            background: '#006673', color: '#fff',
            padding: '3px 10px', borderRadius: 6, border: '2px solid #1a1a1a',
          }}>
            WEEK {project.week}
          </span>
        )}
        {project.featured && (
          <span style={{
            fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 700,
            background: '#fd8b00', color: '#1a1a1a',
            padding: '3px 10px', borderRadius: 6, border: '2px solid #1a1a1a',
          }}>
            FEATURED
          </span>
        )}
        {project.passwordProtected && (
          <span style={{
            fontFamily: "'Space Grotesk'", fontSize: 11, fontWeight: 700,
            background: '#eee', color: '#666',
            padding: '3px 10px', borderRadius: 6, border: '2px solid #1a1a1a',
          }}>
            RESTRICTED
          </span>
        )}
      </div>
      <h3 style={{
        fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 22,
        marginBottom: 6, color: '#1a1a1a',
      }}>
        {project.name}
      </h3>
      <p style={{
        fontFamily: "'Space Grotesk'", fontSize: 14, color: '#666',
        lineHeight: 1.5, marginBottom: 14,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {project.description}
      </p>
      {project.techStack.length > 0 && project.techStack[0] !== 'TBD' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.techStack.slice(0, 3).map(t => (
            <span key={t} className="nb-tag">{t}</span>
          ))}
        </div>
      )}
    </div>
  </Link>
);
