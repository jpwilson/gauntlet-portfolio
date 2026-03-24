import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  color: string;
  type: 'agent' | 'infra' | 'gauntlet';
}

const Works = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'agent' | 'infra' | 'gauntlet'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Multi-Agent Orchestrator',
      category: 'Agent System - Production',
      image: './images/project-collabboard.jpg',
      color: 'bg-nb-blue',
      type: 'agent',
    },
    {
      id: 2,
      title: 'EvalForge',
      category: 'Evaluation Framework',
      image: './images/project-ghostfolio.jpg',
      color: 'bg-nb-emerald',
      type: 'infra',
    },
    {
      id: 3,
      title: 'TokenScope',
      category: 'Cost & Pricing Analytics',
      image: './images/project-legacylens.jpg',
      color: 'bg-nb-purple',
      type: 'infra',
    },
    {
      id: 4,
      title: 'TraceHound',
      category: 'Agent Observability Platform',
      image: './images/project-nerdy.jpg',
      color: 'bg-nb-coral',
      type: 'infra',
    },
    {
      id: 5,
      title: 'RAG Pipeline v3',
      category: 'Retrieval-Augmented Generation',
      image: './images/project-gofundme.jpg',
      color: 'bg-nb-orange',
      type: 'agent',
    },
    {
      id: 6,
      title: 'Tool-Use Sandbox',
      category: 'Agent Tool Integration',
      image: './images/project-zapier.jpg',
      color: 'bg-nb-yellow',
      type: 'agent',
    },
    {
      id: 7,
      title: 'CollabBoard',
      category: 'Gauntlet - Collaborative Whiteboard',
      image: './images/project-skyfi.jpg',
      color: 'bg-nb-blue',
      type: 'gauntlet',
    },
    {
      id: 8,
      title: 'Ghostfolio Contrib',
      category: 'Gauntlet - Open Source',
      image: './images/project-upstream.jpg',
      color: 'bg-nb-emerald',
      type: 'gauntlet',
    },
    {
      id: 9,
      title: 'LegacyLens',
      category: 'Gauntlet - Legacy Preservation',
      image: './images/project-servicecore.jpg',
      color: 'bg-nb-purple',
      type: 'gauntlet',
    },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.type === filter);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative py-24 md:py-32 bg-nb-charcoal overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-nb-charcoal-light/50 -z-0" />
      <div className="absolute top-20 left-10 w-16 h-16 bg-nb-yellow/20 border-2 border-nb-yellow/30" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-nb-blue/20 border-2 border-nb-blue/30" />

      <div className="relative z-10 px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2
              className={`font-display text-[14vw] md:text-[11vw] lg:text-[8vw] leading-[0.85] font-black text-nb-white mb-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ textShadow: '5px 5px 0px #3B82F6' }}
            >
              SELECTED
              <br />
              <span className="text-nb-coral" style={{ textShadow: '6px 6px 0px #FF3366' }}>WORKS</span>
            </h2>
          </div>
          <div
            className={`mt-6 md:mt-0 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <p className="font-body text-nb-white/60 max-w-xs">
              Agents, evals, and infrastructure that ship — not just slide decks.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {[
            { key: 'all', label: 'All Projects' },
            { key: 'agent', label: 'Agent Systems' },
            { key: 'infra', label: 'AI Infra' },
            { key: 'gauntlet', label: 'Gauntlet' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as 'all' | 'agent' | 'infra' | 'gauntlet')}
              className={`px-6 py-3 font-body font-semibold text-sm uppercase tracking-wider border-2 transition-all ${
                filter === tab.key
                  ? 'bg-nb-blue border-nb-blue text-nb-white'
                  : 'bg-transparent border-nb-white/30 text-nb-white/60 hover:border-nb-white hover:text-nb-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index + 1) * 80}ms` }}
            >
              <div className={`nb-card overflow-hidden cursor-pointer h-full ${project.type === 'gauntlet' ? 'nb-card-coral' : ''}`}>
                {/* Image Container */}
                <div className="relative overflow-hidden h-52 md:h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className={`absolute inset-0 ${project.color} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                    <div className="w-14 h-14 bg-nb-white border-3 border-nb-charcoal flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <ExternalLink size={22} className="text-nb-charcoal" />
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 font-body text-xs uppercase tracking-wider ${
                    project.type === 'agent' ? 'bg-nb-blue text-nb-white'
                    : project.type === 'infra' ? 'bg-nb-purple text-nb-white'
                    : 'bg-nb-coral text-nb-white'
                  }`}>
                    {project.type === 'agent' ? 'Agent' : project.type === 'infra' ? 'Infra' : 'Gauntlet'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 bg-nb-charcoal-light">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-body text-xs uppercase tracking-wider text-nb-white/50 mb-1">
                        {project.category}
                      </div>
                      <h3 className="font-display text-xl md:text-2xl text-nb-white group-hover:text-nb-blue transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="w-9 h-9 bg-nb-charcoal border-2 border-nb-white/30 flex items-center justify-center group-hover:bg-nb-blue group-hover:border-nb-blue transition-all">
                      <ArrowUpRight size={16} className="text-nb-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div
          className={`flex justify-center mt-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <a
            href="https://github.com/jpwilson"
            target="_blank"
            rel="noopener noreferrer"
            className="nb-button nb-button-yellow"
          >
            View All on GitHub
            <ArrowUpRight className="ml-2" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Works;
