import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Car } from './Car';
import { World } from './World';
import { HUD } from './HUD';
import './game.css';

const LoadingScreen: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#0a001a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: "'Courier New', monospace",
      zIndex: 2,
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
    <div
      style={{
        width: 200,
        height: 4,
        background: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '60%',
          height: '100%',
          background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
          borderRadius: 2,
          animation: 'loading-pulse 1.5s ease-in-out infinite',
        }}
      />
    </div>
    <style>{`
      @keyframes loading-pulse {
        0%, 100% { width: 30%; margin-left: 0; }
        50% { width: 70%; margin-left: 30%; }
      }
    `}</style>
  </div>
);

export const GameView: React.FC = () => {
  // Kill the body zoom that Win95 desktop uses - it breaks Canvas sizing
  useEffect(() => {
    const originalZoom = document.body.style.zoom;
    document.body.style.zoom = '1';
    return () => {
      document.body.style.zoom = originalZoom;
    };
  }, []);

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
        >
          <World />
          <Car />
        </Canvas>
      </Suspense>
      <HUD />
    </div>
  );
};

export default GameView;
