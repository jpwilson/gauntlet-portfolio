import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../../data/projects';
import { img } from '../../../data/projectImages';
import { Project, ProjectCategory } from '../../../types/project';

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

/**
 * Centered detail card over a blurred room — the projects are the point,
 * so the telling gets the full stage instead of the narrow side panel.
 */
const ProjectDetailModal: React.FC<{
  project: Project;
  category: ProjectCategory;
  onClose: () => void;
}> = ({ project, category, onClose }) => {
  // Escape closes the detail only — capture phase so the room's own
  // Escape handler (walk back outside) doesn't also fire.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true });
  }, [onClose]);

  return createPortal(
    <div className="me-modal-backdrop" onClick={onClose} role="presentation">
      <article
        className="me-modal"
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="me-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <img className="me-modal-img" src={img(project)} alt={project.name} />
        <div className="me-modal-body">
          <h3 className="me-modal-title">{project.name}</h3>
          <p className="me-panel-sub" style={{ marginBottom: 10 }}>
            {project.company || (category === 'gauntlet' ? 'Gauntlet' : 'Personal')}
            {project.week ? ` — Week ${project.week}` : ''}
            {` · last commit ${freshness(project.createdAt)}`}
          </p>
          <p>{project.description}</p>
          {project.highlights && project.highlights.length > 0 && (
            <ul className="me-highlights">
              {project.highlights.slice(0, 5).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}
          <div className="me-chips">
            {project.techStack.map((t) => (
              <span key={t} className="me-chip">
                {t}
              </span>
            ))}
          </div>
          <div className="me-links">
            {project.liveUrl && (
              <a className="me-btn" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit the work ↗
              </a>
            )}
            {project.repoUrl && (
              <a className="me-btn" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                Read the runes ↗
              </a>
            )}
            {project.demoUrl && (
              <a className="me-btn ghost" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Watch the demo ↗
              </a>
            )}
            <Link className="me-btn ghost" to={`/project/${project.id}`}>
              Full dossier →
            </Link>
          </div>
        </div>
      </article>
    </div>,
    document.body,
  );
};

/** Compact quest cards in the side panel; clicking one summons its telling center-stage. */
export const ProjectsPanel: React.FC<Props> = ({ category }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const projects = PROJECTS.filter((p) => p.category === category);
  const selected = projects.find((p) => p.id === selectedId);

  return (
    <>
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
      {selected && (
        <ProjectDetailModal project={selected} category={category} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
};
