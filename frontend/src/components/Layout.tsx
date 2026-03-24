import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'FLEET', path: '/' },
  { label: 'ABOUT', path: '/#about' },
  { label: 'CONTACT', path: '/#contact' },
];

export const Layout: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#bcc9c8]/30" style={{ backgroundColor: 'rgba(247,249,252,0.95)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 flex justify-between items-center h-14">
          <div className="flex items-center gap-10">
            <Link to="/" className="font-bold tracking-tighter text-xl" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#004e59' }}>
              JP_WILSON<span style={{ color: '#fd8b00' }}>_v2.0</span>
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="uppercase tracking-[0.15em] text-xs font-medium pb-0.5 transition-colors"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: location.pathname === item.path && item.path === '/' ? '#006673' : '#6d7979',
                    borderBottom: location.pathname === item.path && item.path === '/' ? '2px solid #006673' : '2px solid transparent',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#22c55e' }}></span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}>ONLINE</span>
            </div>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined" style={{ color: '#006673' }}>
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-14 left-0 right-0 z-40 md:hidden border-b" style={{ backgroundColor: '#f7f9fc', borderColor: 'rgba(188,201,200,0.3)' }}>
          <div className="flex flex-col p-4 gap-1 max-w-[1400px] mx-auto">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="uppercase tracking-[0.15em] text-xs font-medium py-3 px-4 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t" style={{ borderColor: 'rgba(188,201,200,0.3)', backgroundColor: 'rgba(247,249,252,0.95)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 flex flex-col sm:flex-row justify-between items-center py-4">
          <span className="text-[10px] tracking-tight uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}>
            &copy; 2026 JP_WILSON // ALL_RIGHTS_RESERVED
          </span>
          <div className="flex gap-6 mt-2 sm:mt-0">
            <a
              href="https://github.com/jpwilson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-tight uppercase underline underline-offset-4 transition-colors hover:text-[#fd8b00]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}
            >
              GITHUB
            </a>
            <a
              href="https://linkedin.com/in/jpwilson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-tight uppercase underline underline-offset-4 transition-colors hover:text-[#fd8b00]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#6d7979' }}
            >
              LINKEDIN
            </a>
            <span className="text-[10px] tracking-tight uppercase font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#fd8b00' }}>
              STATUS_STABLE
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
