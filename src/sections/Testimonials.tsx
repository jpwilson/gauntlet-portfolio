import { useEffect, useRef, useState } from 'react';
import { Quote, Bot, FlaskConical, Activity } from 'lucide-react';

const Testimonials = () => {
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

  const highlights = [
    {
      icon: Bot,
      title: 'Agent Builder',
      desc: 'Multi-agent systems in production',
      color: 'text-nb-blue',
      bg: 'bg-nb-blue/10',
    },
    {
      icon: FlaskConical,
      title: 'Eval Obsessed',
      desc: 'If you can\'t measure it, don\'t ship it',
      color: 'text-nb-emerald',
      bg: 'bg-nb-emerald/10',
    },
    {
      icon: Activity,
      title: 'Trace Everything',
      desc: 'Every token, every decision, every ms',
      color: 'text-nb-coral',
      bg: 'bg-nb-coral/10',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 md:py-32 bg-nb-charcoal overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-nb-blue via-nb-coral to-nb-yellow" />

      {/* Decorative Shapes */}
      <div className="absolute top-40 right-10 w-20 h-20 bg-nb-blue/10 border border-nb-blue/20 animate-float" />
      <div className="absolute bottom-40 left-10 w-14 h-14 bg-nb-coral/10 border border-nb-coral/20 animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-display text-[14vw] md:text-[11vw] lg:text-[8vw] leading-[0.85] font-black text-nb-white mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ textShadow: '4px 4px 0px #3B82F6' }}
          >
            THE AI <span className="text-nb-blue">PHILOSOPHY</span>
          </h2>
          <p
            className={`font-body text-nb-white/60 max-w-md mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Ship fast. Eval harder. Trace everything. Bill wisely.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`nb-box p-8 text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div className={`w-16 h-16 ${item.bg} border-2 border-nb-white/20 flex items-center justify-center mx-auto mb-5`}>
                <item.icon size={28} className={item.color} />
              </div>
              <h3 className="font-display text-2xl text-nb-white mb-2">{item.title}</h3>
              <p className="font-body text-nb-white/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="nb-box p-8 md:p-12 relative">
            <div className="absolute -top-6 left-8 w-12 h-12 bg-nb-coral border-2 border-nb-white flex items-center justify-center">
              <Quote size={20} className="text-nb-white" />
            </div>

            <p className="font-body text-xl md:text-2xl text-nb-white/80 leading-relaxed italic mb-6">
              "Software ate the world. AI ate software."
            </p>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-nb-blue border-2 border-nb-white flex items-center justify-center">
                <span className="font-display text-lg text-nb-white">NR</span>
              </div>
              <div>
                <a
                  href="https://x.com/naval/status/2032893617644384525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl text-nb-white hover:text-nb-blue transition-colors"
                >
                  Naval Ravikant
                </a>
                <div className="font-body text-xs uppercase tracking-wider text-nb-white/50">
                  @naval
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            { number: '20+', label: 'Agents Shipped' },
            { number: '1M+', label: 'Traces Analyzed' },
            { number: '40%', label: 'Cost Reduced' },
            { number: '99.7%', label: 'Eval Pass Rate' },
          ].map((stat, index) => (
            <div
              key={index}
              className="nb-box bg-nb-charcoal-light p-6 text-center"
            >
              <div className="font-display text-4xl md:text-5xl text-nb-coral mb-2" style={{ textShadow: '2px 2px 0px #3B82F6' }}>
                {stat.number}
              </div>
              <div className="font-body text-xs uppercase tracking-wider text-nb-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
