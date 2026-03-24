import { useEffect, useRef, useState } from 'react';
import { Bot, FlaskConical, DollarSign, Activity, ArrowRight } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  features: string[];
}

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(1);
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

  const services: Service[] = [
    {
      id: 1,
      title: 'Agent Architecture',
      description: 'Designing and building multi-agent systems that coordinate, reason, and act. From single-shot tool use to complex agentic workflows with human-in-the-loop — agents that work in production, not just in notebooks.',
      icon: Bot,
      color: 'bg-nb-blue',
      features: ['Multi-Agent Orchestration', 'Tool Use & Function Calling', 'RAG Pipelines', 'Human-in-the-Loop', 'Claude & OpenAI'],
    },
    {
      id: 2,
      title: 'Eval Engineering',
      description: 'Building evaluation frameworks that actually predict production quality. LLM-as-judge, human annotation pipelines, regression suites — because "it looks good" is not a metric. Your evals are your moat.',
      icon: FlaskConical,
      color: 'bg-nb-coral',
      features: ['LLM-as-Judge', 'Golden Dataset Curation', 'Regression Testing', 'A/B Eval Pipelines', 'Braintrust & Custom'],
    },
    {
      id: 3,
      title: 'Cost & Pricing',
      description: 'Making AI economics work at scale. Token optimization, intelligent caching, model routing, and pricing strategies that turn "too expensive" into "surprisingly affordable." Your CFO will thank me.',
      icon: DollarSign,
      color: 'bg-nb-yellow',
      features: ['Token Optimization', 'Prompt Caching', 'Model Routing', 'Cost Attribution', 'Pricing Strategy'],
    },
    {
      id: 4,
      title: 'Tracing & Observability',
      description: 'End-to-end visibility into every agent decision, every tool call, every token. When something goes wrong at 3am, traces tell you exactly where, why, and how to fix it. No more black-box debugging.',
      icon: Activity,
      color: 'bg-nb-emerald',
      features: ['LangSmith & LangFuse', 'Custom Trace Pipelines', 'Latency Monitoring', 'Error Attribution', 'Performance Dashboards'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 bg-nb-dark overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(248,249,250,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(248,249,250,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-nb-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-nb-coral/10 rounded-full blur-3xl" />

      <div className="relative z-10 px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <h2
            className={`font-display text-[14vw] md:text-[11vw] lg:text-[8vw] leading-[0.85] font-black text-nb-white mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            WHAT I <span className="text-nb-blue">DO</span>
          </h2>
          <div
            className={`w-24 h-1 bg-nb-coral transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          />
        </div>

        {/* Services Accordion */}
        <div className="space-y-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div
                className={`relative border-2 overflow-hidden transition-all duration-500 cursor-pointer ${
                  activeService === service.id
                    ? 'border-nb-blue bg-nb-charcoal-light'
                    : 'border-nb-white/20 bg-transparent hover:border-nb-white/40'
                }`}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              >
                {/* Main Bar */}
                <div className="flex items-center justify-between p-5 md:p-6">
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 ${service.color} border-2 border-nb-white flex items-center justify-center transition-transform duration-500 ${activeService === service.id ? 'rotate-[360deg]' : ''}`}>
                      <service.icon size={24} className="text-nb-charcoal" />
                    </div>
                    <h3 className={`font-display text-2xl md:text-4xl transition-colors ${activeService === service.id ? 'text-nb-white' : 'text-nb-white/70'}`}>
                      {service.title}
                    </h3>
                  </div>

                  <div className={`w-10 h-10 border-2 flex items-center justify-center transition-all ${activeService === service.id ? 'border-nb-blue bg-nb-blue' : 'border-nb-white/30'}`}>
                    <ArrowRight
                      size={20}
                      className={`transition-all duration-300 ${activeService === service.id ? 'text-nb-white rotate-90' : 'text-nb-white/50'}`}
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeService === service.id ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 md:px-6 pb-6 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-body text-nb-white/60 leading-relaxed mb-5">
                          {service.description}
                        </p>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 text-nb-blue font-semibold hover:text-nb-coral transition-colors"
                        >
                          Let's Talk <ArrowRight size={16} />
                        </a>
                      </div>

                      <div>
                        <h4 className="font-body font-bold text-nb-white uppercase tracking-wider text-xs mb-3">
                          Key Capabilities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, fIndex) => (
                            <span
                              key={fIndex}
                              className="px-3 py-1.5 bg-nb-charcoal border border-nb-white/20 text-nb-white/80 text-xs font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Bar Indicator */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 ${service.color} transition-all duration-500 ${
                    activeService === service.id ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="font-body text-nb-white/40 mb-4">Need an agent that actually works?</p>
          <a
            href="#contact"
            className="inline-flex items-center font-display text-3xl md:text-4xl text-nb-white hover:text-nb-blue transition-colors"
            style={{ textShadow: '3px 3px 0px #FF3366' }}
          >
            Let's Build Together
            <ArrowRight className="ml-4" size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
