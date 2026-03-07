import { useState, useEffect } from 'react';

const TABLET_BREAKPOINT = 1024;
const PHONE_BREAKPOINT = 600;

export function useIsMobile() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isPhone: width < PHONE_BREAKPOINT,
    isTablet: width >= PHONE_BREAKPOINT && width < TABLET_BREAKPOINT,
    isMobile: width < TABLET_BREAKPOINT,
    width,
  };
}
