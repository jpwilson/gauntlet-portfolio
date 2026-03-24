import { useEffect, useRef, useState } from 'react';
import { Briefcase } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const skillCategories = [
    {
      title: 'AI SYSTEMS',
      color: 'bg-nb-blue',
      items: ['Agent Architecture', 'Retrieval Systems', 'Context Engineering'],
    },
    {
      title: 'EVALUATION',
      color: 'bg-nb-coral',
      items: ['LLM Evals', 'Prompt Testing', 'Model Benchmarking'],
    },
    {
      title: 'INFRASTRUCTURE',
      color: 'bg-nb-purple',
      items: ['Vector DBs', 'AI Gateways', 'Model Routing'],
    },
    {
      title: 'RELIABILITY',
      color: 'bg-nb-emerald',
      items: ['Observability', 'Tracing', 'Guardrails'],
    },
    {
      title: 'PERFORMANCE',
      color: 'bg-nb-yellow',
      items: ['Latency Engineering', 'Token Optimization', 'Caching'],
    },
    {
      title: 'PRODUCT',
      color: 'bg-nb-orange',
      items: ['AI UX Design', 'Streaming Interfaces', 'AI API Design'],
    },
  ];

  const roles = [
    {
      company: 'VillageMD',
      title: 'Senior Software Engineer',
      description: 'Built patient onboarding and clinic workflow systems used across U.S. medical practices. Worked across React frontends, FastAPI services, EMR integrations, and AWS infrastructure, while balancing hands-on engineering with team leadership.',
    },
    {
      company: 'C.H. Robinson',
      title: 'Senior Software Engineer',
      description: 'Developed APIs and automation within a large enterprise .NET ecosystem, building ETL pipelines and internal tools that improved operational workflows.',
    },
    {
      company: 'First Stop Health',
      title: 'Software Engineer',
      description: 'Worked on one of the early telehealth platforms before the pandemic, building Django + React features for patient-doctor interactions and telehealth workflows.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 bg-nb-charcoal overflow-hidden"
    >
      {/* Background Marquee Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-[0.03]">
        <div className="animate-marquee">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="font-display text-[20vw] text-nb-white mx-4">
              ABOUT ME • AI ENGINEER • AGENT BUILDER •
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-nb-blue/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-nb-coral/10 rounded-full blur-2xl" />

      <div className="relative z-10 px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <h2
            className={`nb-section-title mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            ABOUT <span className="text-nb-coral" style={{ textShadow: '6px 6px 0px #FF3366' }}>ME</span>
          </h2>
          <div
            className={`w-24 h-1 bg-nb-coral transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Bio */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="nb-box p-8 md:p-10">
              <h3 className="font-display text-4xl md:text-5xl text-nb-white mb-6">
                HELLO, I'M <span className="text-nb-blue">JP</span>
              </h3>

              <div className="space-y-4 font-body text-nb-white/70 leading-relaxed">
                <p>
                  I'm a <strong className="text-nb-white">full-stack engineer</strong> building
                  production software and AI systems.
                </p>
                <p>
                  This site contains projects from my time in{' '}
                  <span className="bg-nb-blue/20 px-1 text-nb-blue font-semibold">Gauntlet AI</span>,
                  where I've been building and experimenting with modern AI systems — including
                  agent architectures, RAG pipelines, observability and tracing with tools like
                  Langfuse, and integrating AI into real product workflows.
                </p>
                <p>
                  Much of my work involves building end-to-end systems — from APIs and data pipelines
                  to AI agents and product features — often inside existing (brownfield) codebases
                  where the challenge is shipping real improvements without breaking production systems.
                </p>
                <p>
                  I moved to the United States from South Africa in 2017 with my wife and have been
                  building software here ever since.
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t-2 border-nb-white/10">
                <a
                  href="https://jpwilson.github.io/gauntlet-portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-button text-sm py-3 px-6"
                >
                  Gauntlet Projects
                </a>
                <a
                  href="https://github.com/jpwilson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-button nb-button-coral text-sm py-3 px-6"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jeanpaulwilson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-button text-sm py-3 px-6"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Skills Grid (6 categories) */}
          <div className="space-y-0">
            <div
              className={`grid grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {skillCategories.map((category, index) => (
                <div
                  key={index}
                  className="nb-card p-5 hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group"
                >
                  <div className={`w-full h-1 ${category.color} mb-3`} />
                  <div className="font-display text-lg text-nb-white mb-3">
                    {category.title}
                  </div>
                  <ul className="space-y-1.5">
                    {category.items.map((item, i) => (
                      <li key={i} className="font-body text-xs text-nb-white/60 flex items-start gap-2">
                        <span className={`w-1.5 h-1.5 ${category.color} mt-1 shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div
              className={`nb-box bg-nb-charcoal-light p-6 mt-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <h4 className="font-display text-2xl text-nb-white mb-4">TECH STACK</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'TypeScript', 'React', 'Node.js', 'FastAPI', 'Django', 'Claude API', 'LangChain', 'Langfuse', 'AWS', 'Docker', 'PostgreSQL', '.NET'].map((tech, index) => (
                  <span
                    key={index}
                    className="nb-tag text-nb-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Previous Engineering Roles */}
        <div
          className={`mt-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-nb-purple border-2 border-nb-white flex items-center justify-center">
              <Briefcase size={22} className="text-nb-white" />
            </div>
            <h3 className="font-display text-4xl md:text-5xl text-nb-white">
              PREVIOUS <span className="text-nb-blue">ROLES</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <div
                key={index}
                className="nb-box p-6 md:p-8"
              >
                <div className="font-display text-2xl text-nb-blue mb-1">
                  {role.company}
                </div>
                <div className="font-body font-bold text-nb-white text-sm uppercase tracking-wider mb-4">
                  {role.title}
                </div>
                <p className="font-body text-nb-white/60 text-sm leading-relaxed">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
