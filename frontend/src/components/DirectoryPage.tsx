import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, CATEGORIES } from '../data/projects';
import { Project } from '../types/project';

const PLACEHOLDER_IMAGES: Record<string, string> = {
  'week1-colabboard': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop',
  'week2-ghostfolio': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
  'week3-legacylens': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
  'week4-nerdy': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
  'week4-gofundme': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop',
  'week5-zapier': 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop',
  'week5-skyfi': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=400&fit=crop',
  'week6-upstream-literacy': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop',
  'week6-servicecore': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
  'other-family-socials': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
  'other-ev-lineup': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
  'other-news-platform': 'https://images.unsplash.com/photo-1504711434969-e33886168d9c?w=600&h=400&fit=crop',
};

function getProjectImage(project: Project): string {
  return project.thumbnail || PLACEHOLDER_IMAGES[project.id] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop';
}

function getLogId(project: Project): string {
  const prefix = project.category === 'gauntlet' ? 'GAU' : 'EXT';
  const num = project.week ? String(project.week).padStart(2, '0') : '00';
  return `${prefix}-W${num}`;
}

export const DirectoryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const projectCount = filteredProjects.length;

  return (
    <>
      {/* Header */}
      <header className="mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block w-2 h-2 animate-pulse" style={{ backgroundColor: '#fd8b00' }}></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#904d00' }}>
            Live Directory Stream
          </span>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#191c1e' }}>
              Project Directory <span style={{ color: '#bcc9c8' }}>/</span> Fleet View
            </h1>
            <p className="text-sm leading-relaxed max-w-xl" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#3d4949' }}>
              A curated archive of software projects. Each node represents a deployed system,
              verified and catalogued with full telemetry data.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.15em]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}>Active Nodes</span>
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#006673' }}>{projectCount}</span>
            </div>
            <div className="h-10 w-px" style={{ backgroundColor: 'rgba(188,201,200,0.4)' }}></div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.15em]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}>Sync Status</span>
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#904d00' }}>STABLE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="flex gap-3 mb-10 flex-wrap">
        {[{ id: 'all', name: 'All Nodes' }, ...CATEGORIES].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className="px-5 py-2 text-[11px] uppercase tracking-[0.15em] font-semibold border transition-all duration-200"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              backgroundColor: activeFilter === cat.id ? '#006673' : 'transparent',
              color: activeFilter === cat.id ? '#ffffff' : '#6d7979',
              borderColor: activeFilter === cat.id ? '#006673' : '#bcc9c8',
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-16 pt-8 flex justify-end" style={{ borderTop: '1px solid rgba(188,201,200,0.3)' }}>
        <div className="text-[10px] uppercase tracking-[0.15em] text-right" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}>
          Displaying {projectCount} of {PROJECTS.length} Data Nodes<br />
          <span style={{ color: '#006673' }}>End of current transmission stream</span>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="mt-24 pt-16" style={{ borderTop: '1px solid rgba(188,201,200,0.3)' }}>
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-block w-2 h-2" style={{ backgroundColor: '#006673' }}></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#006673' }}>
            Operator Profile
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              About <span style={{ color: '#bcc9c8' }}>/</span> JP Wilson
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#3d4949' }}>
              Software engineer building full-stack applications. Currently working through
              The Gauntlet program, shipping a new project every week.
            </p>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#3d4949' }}>
              Focused on React, TypeScript, Python, and AI/ML integrations. Passionate about
              turning complex problems into clean, working software.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Primary Stack', value: 'React / TypeScript / Python / FastAPI' },
              { label: 'Current Program', value: 'The Gauntlet' },
              { label: 'Focus Areas', value: 'Full-Stack / AI-ML / RAG Systems' },
            ].map((item) => (
              <div key={item.label} className="p-5" style={{ border: '1px solid rgba(188,201,200,0.4)', backgroundColor: '#ffffff' }}>
                <span className="block text-[9px] uppercase tracking-[0.15em] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}>{item.label}</span>
                <span className="text-sm font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mt-24 pt-16 mb-8" style={{ borderTop: '1px solid rgba(188,201,200,0.3)' }}>
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-block w-2 h-2" style={{ backgroundColor: '#fd8b00' }}></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#904d00' }}>
            Communication Channel
          </span>
        </div>
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Contact <span style={{ color: '#bcc9c8' }}>/</span> Open Frequency
        </h2>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'GitHub', href: 'https://github.com/jpwilson', color: '#006673' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/jpwilson', color: '#006673' },
            { label: 'Email', href: 'mailto:jp@example.com', color: '#904d00' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-xs uppercase tracking-[0.15em] font-bold border transition-all duration-200 hover:text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                borderColor: link.color,
                color: link.color,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = link.color; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = link.color; }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

// ---- Project Card Component ----
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const logId = getLogId(project);
  const image = getProjectImage(project);

  return (
    <Link
      to={`/project/${project.id}`}
      className="group relative block overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid rgba(188,201,200,0.4)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,102,115,0.12)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-[3px] card-accent z-10" style={{ backgroundColor: '#006673' }}></div>

      <div className="p-6">
        {/* Meta row */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}>
            LOG_ID: {logId}
          </span>
          {project.featured && (
            <span className="text-[10px] font-bold uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#904d00' }}>
              FEATURED
            </span>
          )}
          {project.passwordProtected && (
            <span className="text-[10px] uppercase flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>lock</span>
              RESTRICTED
            </span>
          )}
        </div>

        {/* Image */}
        <div className="aspect-video relative mb-5 overflow-hidden blueprint-grid" style={{ backgroundColor: '#eceef1' }}>
          <img
            src={image}
            alt={project.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            style={{ mixBlendMode: 'multiply', opacity: 0.8 }}
            loading="lazy"
          />
          <div className="absolute inset-0 pointer-events-none" style={{ border: '1px solid rgba(0,102,115,0.15)' }}></div>
          <div className="scanning-line absolute w-full" style={{ top: '25%' }}></div>
          <div className="absolute bottom-2 left-2 px-2 py-0.5 text-white text-[9px]" style={{ fontFamily: "'Space Grotesk', sans-serif", backgroundColor: 'rgba(0,0,0,0.8)' }}>
            {project.category === 'gauntlet' ? `WEEK_${project.week || '??'}` : 'EXTERNAL'}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold uppercase mb-2 transition-colors duration-200 group-hover:text-[#006673]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#191c1e' }}>
          {project.name}
        </h3>
        <p className="text-[13px] leading-snug mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#3d4949', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>

        {/* Tech stack tags */}
        {project.techStack.length > 0 && project.techStack[0] !== 'TBD' && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[9px] uppercase tracking-wider"
                style={{ fontFamily: "'Space Grotesk', sans-serif", border: '1px solid rgba(188,201,200,0.4)', color: '#3d4949' }}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 text-[9px] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}>
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Bottom meta */}
        <div className="flex justify-between items-center pt-4" style={{ borderTop: '1px solid rgba(188,201,200,0.2)' }}>
          <span className="text-[9px] uppercase tracking-[0.1em]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}>
            {project.category === 'gauntlet' ? 'THE GAUNTLET' : 'EXTERNAL'}
          </span>
          <span className="text-[9px] uppercase font-bold flex items-center gap-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#006673' }}>
            VIEW DETAIL
            <span className="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-1" style={{ fontSize: '12px' }}>
              arrow_forward
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};
