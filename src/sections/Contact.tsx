import { useEffect, useRef, useState } from 'react';
import { Send, Mail, MapPin, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'jp@example.com' },
    { icon: MapPin, label: 'Location', value: 'United States' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/jpwilson' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 bg-nb-dark overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-20 w-64 h-64 bg-nb-blue rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-nb-coral rounded-full blur-3xl" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-nb-yellow/10 border border-nb-yellow/20" />
      <div className="absolute bottom-10 left-10 w-12 h-12 bg-nb-coral/10 border border-nb-coral/20" />

      <div className="relative z-10 px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`font-display text-[16vw] md:text-[13vw] lg:text-[10vw] leading-[0.85] font-black text-nb-white mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ textShadow: '4px 4px 0px #FF3366' }}
          >
            LET'S <span className="text-nb-coral">TALK</span>
          </h2>
          <p
            className={`font-body text-nb-white/60 max-w-md mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Need an agent that survives production? Let's make it happen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Left Column - Contact Info */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="nb-box p-8 md:p-10 h-full">
              <h3 className="font-display text-4xl text-nb-white mb-6">
                GET IN <span className="text-nb-blue">TOUCH</span>
              </h3>

              <p className="font-body text-nb-white/60 mb-8 leading-relaxed">
                Whether you need a multi-agent system architected from scratch,
                an eval pipeline that catches regressions, or someone to cut your
                AI costs in half — I'm here for it.
              </p>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-nb-charcoal border border-nb-white/10 hover:border-nb-blue/50 transition-colors"
                  >
                    <div className="w-11 h-11 bg-nb-blue/20 flex items-center justify-center">
                      <item.icon size={18} className="text-nb-blue" />
                    </div>
                    <div>
                      <div className="font-body text-xs uppercase tracking-wider text-nb-white/40">
                        {item.label}
                      </div>
                      <div className="font-body font-semibold text-nb-white">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-body font-bold text-nb-white uppercase tracking-wider text-xs mb-4">
                  Follow Me
                </h4>
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
                      <social.icon size={18} className="text-nb-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="nb-box p-8 md:p-10">
              <h3 className="font-display text-4xl text-nb-white mb-6">
                SEND A <span className="text-nb-coral">MESSAGE</span>
              </h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-nb-emerald border-2 border-nb-white flex items-center justify-center mx-auto mb-5">
                    <Send size={24} className="text-nb-white" />
                  </div>
                  <h4 className="font-display text-2xl text-nb-white mb-2">
                    MESSAGE SENT!
                  </h4>
                  <p className="font-body text-nb-white/60">
                    I'll get back to you faster than a cached API call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="font-body font-bold text-nb-white uppercase tracking-wider text-xs mb-2 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="nb-input"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="font-body font-bold text-nb-white uppercase tracking-wider text-xs mb-2 block">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="nb-input"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div>
                    <label className="font-body font-bold text-nb-white uppercase tracking-wider text-xs mb-2 block">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="nb-input resize-none"
                      placeholder="Tell me about your AI challenge..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="nb-button w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-nb-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2" size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
