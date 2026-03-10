import React, { Suspense, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { Car } from './Car';
import { World } from './World';
import { HUD } from './HUD';
import './game.css';

const LoadingScreen: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#0a001a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: "'Courier New', monospace",
      zIndex: 99999,
    }}
  >
    <div
      style={{
        color: '#ff00ff',
        fontSize: 24,
        textShadow: '0 0 10px #ff00ff',
        marginBottom: 20,
      }}
    >
      Loading Portfolio Racer...
    </div>
  </div>
);

const GameContent: React.FC = () => {
  return (
    <div className="game-container">
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          className="game-canvas"
          camera={{
            fov: 65,
            near: 0.1,
            far: 1000,
            position: [0, 6, 18],
          }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0, -20);
          }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100vw', height: '100vh' }}
        >
          <World />
          <Car />
        </Canvas>
      </Suspense>
      <HUD />
    </div>
  );
};

export const GameView: React.FC = () => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create a div directly on document.body, OUTSIDE of #root
    // This completely escapes the zoom: 1.3 on #root
    const el = document.createElement('div');
    el.id = 'game-portal';
    document.body.appendChild(el);
    setPortalContainer(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  if (!portalContainer) return null;

  return createPortal(<GameContent />, portalContainer);
};

export default GameView;
