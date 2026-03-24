import { useEffect, useState } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Works from './sections/Works';
import Services from './sections/Services';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { ArrowUp } from 'lucide-react';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-nb-charcoal min-h-screen">
      <main>
        <Hero />
        <About />
        <Works />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-nb-blue border-2 border-nb-white flex items-center justify-center shadow-nb transition-all duration-300 ${
          showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} className="text-nb-white" />
      </button>

      <CustomCursor />
    </div>
  );
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(checkTouch);
    if (checkTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    handleMouseEnter();

    const observer = new MutationObserver(handleMouseEnter);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-3 h-3 bg-nb-blue rounded-full transition-all duration-150 ${
            isHovering ? 'scale-200' : 'scale-100'
          }`}
          style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
        />
      </div>

      <div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.08s ease-out, top 0.08s ease-out',
        }}
      >
        <div
          className={`w-7 h-7 border border-nb-blue/50 rounded-full transition-all duration-200 ${
            isHovering ? 'scale-150 opacity-40' : 'scale-100 opacity-20'
          }`}
        />
      </div>
    </>
  );
}

export default App;
