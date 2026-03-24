import { ArrowUp, Heart, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '#hero' },
        { label: 'About', href: '#about' },
        { label: 'Works', href: '#works' },
        { label: 'Services', href: '#services' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Projects',
      links: [
        { label: 'GitHub', href: 'https://github.com/jpwilson' },
        { label: 'Multi-Agent Orchestrator', href: '#works' },
        { label: 'EvalForge', href: '#works' },
        { label: 'TraceHound', href: '#works' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/jpwilson', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="relative bg-nb-charcoal-light text-nb-white overflow-hidden">
      {/* Top Border Decoration */}
      <div className="h-1 bg-gradient-to-r from-nb-blue via-nb-coral to-nb-yellow" />

      {/* Main Footer Content */}
      <div className="px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="font-display text-5xl md:text-6xl font-black mb-4" style={{ textShadow: '3px 3px 0px #3B82F6' }}>
              JP<span className="text-nb-blue">.</span>WILSON
            </div>
            <p className="font-body text-nb-white/50 max-w-md mb-6 leading-relaxed">
              AI Engineer building agents, evals, and infrastructure that actually work in production.
              Let's turn your AI ambitions into shipped products.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-nb-charcoal border border-nb-white/20 flex items-center justify-center hover:bg-nb-blue hover:border-nb-blue transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-display text-xl mb-5 text-nb-white">{column.title}</h4>
              <ul className="space-y-2.5">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="font-body text-nb-white/50 hover:text-nb-blue transition-colors inline-flex items-center group text-sm"
                    >
                      <span className="w-0 h-0.5 bg-nb-blue mr-0 group-hover:w-3 group-hover:mr-2 transition-all" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-nb-white/10 px-6 md:px-12 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-body text-xs text-nb-white/40 flex items-center gap-1">
            Made with <Heart size={12} className="text-nb-coral fill-nb-coral" /> & Claude by JP Wilson &bull; {currentYear}
          </div>

          <div className="flex items-center gap-6">
            <span className="font-body text-xs text-nb-white/40">
              Agents &bull; Evals &bull; Traces &bull; Ship It
            </span>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-5 right-5 w-12 h-12 bg-nb-blue border-2 border-nb-white flex items-center justify-center hover:bg-nb-coral transition-all group"
        aria-label="Back to top"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
};

export default Footer;
