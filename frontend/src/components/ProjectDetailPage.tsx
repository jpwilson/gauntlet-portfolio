import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject, PROJECTS } from '../data/projects';

const PLACEHOLDER_IMAGES: Record<string, string> = {
  'week1-colabboard': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=700&fit=crop',
  'week2-ghostfolio': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop',
  'week3-legacylens': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=700&fit=crop',
  'week4-nerdy': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=700&fit=crop',
  'week4-gofundme': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=700&fit=crop',
  'week5-zapier': 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&h=700&fit=crop',
  'week5-skyfi': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=700&fit=crop',
  'week6-upstream-literacy': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=700&fit=crop',
  'week6-servicecore': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=700&fit=crop',
  'other-family-socials': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=700&fit=crop',
  'other-ev-lineup': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=700&fit=crop',
  'other-news-platform': 'https://images.unsplash.com/photo-1504711434969-e33886168d9c?w=1200&h=700&fit=crop',
};

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProject(id) : undefined;

  if (!project) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-headline font-bold uppercase mb-4">NODE_NOT_FOUND</h1>
        <p className="text-cmd-on-surface-variant mb-8">The requested data node could not be located in the directory.</p>
        <Link
          to="/"
          className="px-6 py-3 border border-cmd-primary text-cmd-primary font-headline font-bold text-xs uppercase tracking-widest hover:bg-cmd-primary hover:text-white transition-colors"
        >
          Return to Fleet
        </Link>
      </div>
    );
  }

  const image = project.thumbnail || PLACEHOLDER_IMAGES[project.id] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=700&fit=crop';

  // Find prev/next projects
  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <div className="py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-[10px] font-label uppercase tracking-widest">
        <Link to="/" className="text-cmd-primary hover:text-cmd-primary-light transition-colors">
          FLEET_DIR
        </Link>
        <span className="text-cmd-outline-variant">/</span>
        <span className="text-cmd-outline">{project.name}</span>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-cmd-secondary-bright animate-pulse"></span>
          <span className="text-[10px] font-label font-bold text-cmd-secondary uppercase tracking-[0.2em]">
            {project.category === 'gauntlet' ? `GAUNTLET // WEEK ${project.week || '??'}` : 'EXTERNAL PROJECT'}
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-headline font-bold uppercase tracking-tighter text-cmd-on-surface mb-4">
          {project.name}
        </h1>
        <p className="text-cmd-on-surface-variant font-body leading-relaxed max-w-3xl text-lg">
          {project.description}
        </p>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Image */}
        <div className="lg:col-span-2">
          <div className="bg-cmd-surface-container relative overflow-hidden blueprint-grid border border-cmd-outline-variant/30">
            <img
              src={image}
              alt={project.name}
              className="w-full aspect-video object-cover mix-blend-multiply opacity-90"
            />
            <div className="absolute inset-0 border border-cmd-primary/20 pointer-events-none"></div>
            <div className="scanning-line absolute top-1/3 w-full"></div>
            <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 text-white text-[10px] font-label">
              ARTIFACT_SCAN_COMPLETE
            </div>
          </div>

          {/* Long Description */}
          {project.longDescription && (
            <div className="mt-8 border border-cmd-outline-variant/30 p-6 bg-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-cmd-primary text-sm">description</span>
                <span className="text-[10px] font-label font-bold text-cmd-primary uppercase tracking-widest">
                  Mission Brief
                </span>
              </div>
              <p className="text-cmd-on-surface-variant leading-relaxed">
                {project.longDescription}
              </p>
            </div>
          )}

          {/* Challenges & Learnings */}
          {(project.challenges || project.learnings) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {project.challenges && (
                <div className="border border-cmd-outline-variant/30 p-6 bg-white">
                  <span className="text-[10px] font-label font-bold text-cmd-secondary uppercase tracking-widest mb-3 block">
                    Challenges Encountered
                  </span>
                  <p className="text-sm text-cmd-on-surface-variant leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}
              {project.learnings && (
                <div className="border border-cmd-outline-variant/30 p-6 bg-white">
                  <span className="text-[10px] font-label font-bold text-cmd-primary uppercase tracking-widest mb-3 block">
                    Key Learnings
                  </span>
                  <p className="text-sm text-cmd-on-surface-variant leading-relaxed">
                    {project.learnings}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Links */}
          <div className="border border-cmd-outline-variant/30 bg-white p-6">
            <span className="text-[10px] font-label font-bold text-cmd-primary uppercase tracking-widest mb-4 block">
              Access Points
            </span>
            <div className="space-y-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-cmd-primary text-white font-headline font-bold text-xs uppercase tracking-widest hover:bg-cmd-primary-light transition-colors flex items-center justify-between"
                >
                  <span>Live Site</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-cmd-secondary-bright text-white font-headline font-bold text-xs uppercase tracking-widest hover:bg-cmd-secondary transition-colors flex items-center justify-between"
                >
                  <span>Demo Video</span>
                  <span className="material-symbols-outlined text-sm">play_circle</span>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 border border-cmd-primary text-cmd-primary font-headline font-bold text-xs uppercase tracking-widest hover:bg-cmd-primary hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Source Code</span>
                  <span className="material-symbols-outlined text-sm">code</span>
                </a>
              )}
              {project.vizUrl && (
                <a
                  href={project.vizUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 border border-cmd-tertiary text-cmd-tertiary font-headline font-bold text-xs uppercase tracking-widest hover:bg-cmd-tertiary hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Visualization</span>
                  <span className="material-symbols-outlined text-sm">hub</span>
                </a>
              )}
              {!project.liveUrl && !project.demoUrl && !project.repoUrl && (
                <div className="py-3 px-4 border border-cmd-outline-variant/30 text-cmd-outline font-label text-xs uppercase text-center">
                  No access points available
                </div>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          {project.techStack.length > 0 && project.techStack[0] !== 'TBD' && (
            <div className="border border-cmd-outline-variant/30 bg-white p-6">
              <span className="text-[10px] font-label font-bold text-cmd-primary uppercase tracking-widest mb-4 block">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-[10px] font-label uppercase tracking-wider border border-cmd-outline-variant/30 text-cmd-on-surface-variant hover:border-cmd-primary hover:text-cmd-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="border border-cmd-outline-variant/30 bg-white p-6">
            <span className="text-[10px] font-label font-bold text-cmd-primary uppercase tracking-widest mb-4 block">
              Telemetry Data
            </span>
            <div className="space-y-3">
              <div>
                <span className="block text-[9px] font-label text-cmd-outline uppercase">Category</span>
                <span className="text-sm font-headline font-bold">
                  {project.category === 'gauntlet' ? 'THE GAUNTLET' : 'EXTERNAL'}
                </span>
              </div>
              {project.week && (
                <div>
                  <span className="block text-[9px] font-label text-cmd-outline uppercase">Week</span>
                  <span className="text-sm font-headline font-bold">WEEK_{project.week}</span>
                </div>
              )}
              <div>
                <span className="block text-[9px] font-label text-cmd-outline uppercase">Created</span>
                <span className="text-sm font-headline font-bold">{project.createdAt}</span>
              </div>
              <div>
                <span className="block text-[9px] font-label text-cmd-outline uppercase">Status</span>
                <span className="text-sm font-headline font-bold text-cmd-primary">
                  {project.featured ? 'FEATURED' : 'ACTIVE'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prev/Next Navigation */}
      <div className="mt-16 pt-8 border-t border-cmd-outline-variant/20 grid grid-cols-1 md:grid-cols-2 gap-4">
        {prevProject ? (
          <Link
            to={`/project/${prevProject.id}`}
            className="group border border-cmd-outline-variant/30 p-4 hover:border-cmd-primary transition-colors flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-cmd-outline group-hover:text-cmd-primary transition-colors">
              arrow_back
            </span>
            <div>
              <span className="text-[9px] font-label text-cmd-outline uppercase block">Previous Node</span>
              <span className="text-sm font-headline font-bold uppercase group-hover:text-cmd-primary transition-colors">
                {prevProject.name}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextProject ? (
          <Link
            to={`/project/${nextProject.id}`}
            className="group border border-cmd-outline-variant/30 p-4 hover:border-cmd-primary transition-colors flex items-center gap-3 justify-end text-right"
          >
            <div>
              <span className="text-[9px] font-label text-cmd-outline uppercase block">Next Node</span>
              <span className="text-sm font-headline font-bold uppercase group-hover:text-cmd-primary transition-colors">
                {nextProject.name}
              </span>
            </div>
            <span className="material-symbols-outlined text-cmd-outline group-hover:text-cmd-primary transition-colors">
              arrow_forward
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Back to Fleet */}
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-cmd-outline-variant text-cmd-outline font-headline font-bold text-xs uppercase tracking-widest hover:border-cmd-primary hover:text-cmd-primary transition-colors"
        >
          <span className="material-symbols-outlined text-sm">grid_view</span>
          Back to Fleet Directory
        </Link>
      </div>
    </div>
  );
};
