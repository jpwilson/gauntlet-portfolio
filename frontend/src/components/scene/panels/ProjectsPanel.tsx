import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../../data/projects';
import { img } from '../../../data/projectImages';
import { ProjectCategory } from '../../../types/project';

interface Props {
  category: ProjectCategory;
}

// createdAt holds the latest commit date (auto-updated by a scheduled workflow) —
// surface it as a freshness signal: active repos read as alive, not abandoned.
const freshness = (isoDate: string): string => {
  const days = Math.max(0, Math.floor((Date.now() - new Date(`${isoDate}T00:00:00`).getTime()) / 86400000));
  if (days === 0) return 'today';
  if (days < 7) return `${days}d ago`;
  if (days < 60) return `${Math.round(days / 7)}w ago`;
  return `${Math.round(days / 30)}mo ago`;
};

/** Master–detail inside the parchment: a list of quests, each opening its telling. */
export const ProjectsPanel: React.FC<Props> = ({ category }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const projects = PROJECTS.filter((p) => p.category === category);
  const selected = projects.find((p) => p.id === selectedId);

  if (selected) {
    return (
      <div>
        <button type="button" className="me-btn ghost" onClick={() => setSelectedId(null)} style={{ marginBottom: 12 }}>
          ← All {category === 'gauntlet' ? 'trials' : 'adventures'}
        </button>
        <img className="me-detail-img" src={img(selected)} alt={selected.name} />
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, margin: '0 0 2px', color: '#33230f' }}>
          {selected.name}
        </h3>
        <p className="me-panel-sub" style={{ marginBottom: 10 }}>
          {selected.company || (category === 'gauntlet' ? 'Gauntlet' : 'Personal')}
          {selected.week ? ` — Week ${selected.week}` : ''}
          {` · last commit ${freshness(selected.createdAt)}`}
        </p>
        <p>{selected.description}</p>
        {selected.highlights && selected.highlights.length > 0 && (
          <ul className="me-highlights">
            {selected.highlights.slice(0, 5).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
        <div className="me-chips">
          {selected.techStack.map((t) => (
            <span key={t} className="me-chip">
              {t}
            </span>
          ))}
        </div>
        <div className="me-links">
          {selected.liveUrl && (
            <a className="me-btn" href={selected.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit the work ↗
            </a>
          )}
          {selected.repoUrl && (
            <a className="me-btn" href={selected.repoUrl} target="_blank" rel="noopener noreferrer">
              Read the runes ↗
            </a>
          )}
          {selected.demoUrl && (
            <a className="me-btn ghost" href={selected.demoUrl} target="_blank" rel="noopener noreferrer">
              Watch the demo ↗
            </a>
          )}
          <Link className="me-btn ghost" to={`/project/${selected.id}`}>
            Full dossier →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="me-project-list">
      {projects.map((p) => (
        <li key={p.id}>
          <button type="button" className="me-project-card" onClick={() => setSelectedId(p.id)}>
            <img className="me-project-thumb" src={img(p)} alt="" loading="lazy" />
            <span>
              <span className="me-project-name">{p.name}</span>
              <span className="me-project-desc">{p.description}</span>
              <span className="me-fresh">⏱ {freshness(p.createdAt)}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};
