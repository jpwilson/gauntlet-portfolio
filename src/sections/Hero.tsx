import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('works');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-nb-charcoal"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-nb-charcoal via-nb-charcoal to-nb-dark" />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-nb-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-nb-coral/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nb-purple/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(248,249,250,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(248,249,250,0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
        <div className="flex items-center justify-between">
          <div
            className={`font-display text-3xl md:text-4xl font-black text-nb-white transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            JP<span className="text-nb-blue">.</span>WILSON
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Works', 'Services', 'Contact'].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`font-body font-medium text-sm uppercase tracking-wider text-nb-white/70 hover:text-nb-blue transition-all duration-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {[
              { Icon: Github, href: 'https://github.com/jpwilson' },
              { Icon: Linkedin, href: '#' },
              { Icon: Twitter, href: '#' },
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center border-2 border-nb-white/30 bg-nb-charcoal-light text-nb-white hover:bg-nb-blue hover:border-nb-blue transition-all duration-300 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{ transitionDelay: `${(index + 5) * 100}ms` }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full px-6 md:px-12 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Available Badge */}
              <div
                className={`inline-flex items-center gap-2 mb-6 px-4 py-2 bg-nb-emerald/20 border-2 border-nb-emerald transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <span className="w-2 h-2 bg-nb-emerald rounded-full animate-pulse" />
                <span className="font-body font-semibold text-xs uppercase tracking-wider text-nb-emerald">
                  Available for work
                </span>
              </div>

              {/* Main Heading */}
              <h1
                className={`font-display text-[14vw] md:text-[11vw] lg:text-[7vw] leading-[0.85] font-black text-nb-white mb-6 transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '300ms', textShadow: '5px 5px 0px #3B82F6' }}
              >
                AI
                <br />
                <span className="text-nb-coral" style={{ textShadow: '6px 6px 0px #FF3366' }}>ENGINEER</span>
              </h1>

              {/* Subheading */}
              <p
                className={`font-body text-lg md:text-xl text-nb-white/70 max-w-md mb-8 leading-relaxed transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                Building agents that think, evaluate, and scale.
                Turning token spend into business value, one trace at a time.
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-wrap gap-4 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <button
                  onClick={scrollToWork}
                  className="nb-button"
                >
                  View My Work
                  <ArrowDown className="ml-2" size={18} />
                </button>
                <a
                  href="#contact"
                  className="nb-button nb-button-coral"
                >
                  <Mail className="mr-2" size={18} />
                  Get in Touch
                </a>
              </div>

              {/* Stats */}
              <div
                className={`flex gap-8 mt-12 transition-all duration-700 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                {[
                  { number: '5+', label: 'Years Exp.' },
                  { number: '20+', label: 'Agents Shipped' },
                  { number: '99.7%', label: 'Eval Pass Rate' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-display text-4xl md:text-5xl font-black text-nb-white" style={{ textShadow: '2px 2px 0px #FF3366' }}>
                      {stat.number}
                    </div>
                    <div className="font-body text-xs uppercase tracking-wider text-nb-white/50 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Portrait */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div
                className={`relative transition-all duration-1000 ${
                  isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-nb-coral border-3 border-nb-white z-0 animate-float" />
                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-nb-blue border-3 border-nb-white z-0" />
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-nb-yellow border-3 border-nb-white z-20 animate-float" style={{ animationDelay: '1.5s' }} />

                {/* Portrait Container */}
                <div className="relative z-10 w-[280px] h-[350px] md:w-[340px] md:h-[420px] lg:w-[380px] lg:h-[470px] border-3 border-nb-white bg-nb-charcoal-light shadow-nb-lg overflow-hidden">
                  <img
                    src="./images/hero-portrait.png"
                    alt="JP Wilson - AI Engineer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-nb-blue py-3 overflow-hidden border-t-3 border-nb-white">
        <div className="animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-display text-xl text-nb-white mx-8">
              AGENT ARCHITECTURE • LLM SYSTEM DESIGN • RETRIEVAL SYSTEMS • MODEL EVALUATION • AI OBSERVABILITY • PROMPT DESIGN • CONTEXT ENGINEERING • MEMORY SYSTEMS • MULTI-AGENT SYSTEMS • TOOL-USING AGENTS • VECTOR DATABASES • MODEL ROUTING • AI TRACING • PROMPT REGRESSION TESTING • LATENCY OPTIMIZATION • TOKEN COST ENGINEERING • STREAMING AI INTERFACES • AI API DESIGN • GUARDRAILS & SAFETY •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
