import React, { useMemo } from 'react';
import { Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import {
  ROAD_WIDTH,
  ROAD_LENGTH,
  PROJECT_STOPS,
  RAMPS,
  SPEED_BOOSTS,
  OBSTACLES,
  BUILDINGS,
  BuildingConfig,
} from './roadConfig';

// Solid building with glowing window rows
const Building: React.FC<{ config: BuildingConfig }> = React.memo(({ config }) => {
  const { x, z, width, height, depth, color } = config;
  // Generate window rows
  const windowRows = Math.max(1, Math.floor(height / 4));
  const windowCols = Math.max(1, Math.floor(width / 2.5));

  return (
    <group position={[x, 0, z]}>
      {/* Main building body - dark solid */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color="#0a0a15"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      {/* Roof accent line */}
      <mesh position={[0, height + 0.1, 0]}>
        <boxGeometry args={[width + 0.2, 0.2, depth + 0.2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Base accent line */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[width + 0.1, 0.3, depth + 0.1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Windows on front face (facing road) */}
      {Array.from({ length: windowRows }).map((_, row) =>
        Array.from({ length: windowCols }).map((_, col) => {
          const winX = -width / 2 + 1.2 + col * (width / windowCols);
          const winY = 2 + row * (height / windowRows);
          if (winY > height - 1) return null;
          // Some windows lit, some dark
          const lit = ((row * 7 + col * 13) % 3) !== 0;
          return (
            <mesh
              key={`w-${row}-${col}`}
              position={[winX, winY, depth / 2 + 0.01]}
            >
              <planeGeometry args={[1, 1.2]} />
              <meshBasicMaterial
                color={lit ? color : '#111122'}
                transparent
                opacity={lit ? 0.7 : 0.3}
              />
            </mesh>
          );
        })
      )}
      {/* Vertical edge lines */}
      {[
        [-width / 2, 0, -depth / 2],
        [width / 2, 0, -depth / 2],
        [-width / 2, 0, depth / 2],
        [width / 2, 0, depth / 2],
      ].map(([ex, _, ez], i) => (
        <mesh key={`edge-${i}`} position={[ex, height / 2, ez]}>
          <boxGeometry args={[0.08, height, 0.08]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
});

const ZONE_COLORS: Record<string, string> = {
  gauntlet: '#ff00ff',
  other: '#00ffff',
};

const LOCKED_COLOR = '#ff6600';

export const World: React.FC = () => {
  const roadCenter = -ROAD_LENGTH / 2;
  const halfWidth = ROAD_WIDTH / 2;

  // Sun horizontal bars (synthwave style)
  const sunBars = useMemo(() => {
    const bars = [];
    for (let i = 0; i < 8; i++) {
      const y = 30 + i * 6;
      const barHeight = 1.5 + i * 0.5;
      bars.push({ y, height: barHeight });
    }
    return bars;
  }, []);

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.15} color="#6622aa" />
      <directionalLight position={[0, 50, -100]} intensity={0.4} color="#ff88aa" />
      <directionalLight position={[20, 30, 50]} intensity={0.2} color="#00ffff" />

      {/* Fog */}
      <fog attach="fog" args={['#0a001a', 20, 350]} />

      {/* Background color */}
      <color attach="background" args={['#0a001a']} />

      {/* Stars */}
      <Stars radius={400} depth={150} count={4000} factor={5} saturation={0.5} />

      {/* Synthwave Sun */}
      <group position={[0, 50, -ROAD_LENGTH - 150]}>
        <mesh>
          <circleGeometry args={[100, 32]} />
          <meshBasicMaterial color="#ff6600" fog={false} />
        </mesh>
        {/* Gradient overlay (darker at bottom) */}
        <mesh position={[0, -30, 0.1]}>
          <planeGeometry args={[200, 60]} />
          <meshBasicMaterial color="#ff2200" fog={false} transparent opacity={0.6} />
        </mesh>
        {/* Horizontal bars across the sun */}
        {sunBars.map((bar, i) => (
          <mesh key={i} position={[0, bar.y - 50, 0.2]}>
            <planeGeometry args={[210, bar.height]} />
            <meshBasicMaterial color="#0a001a" fog={false} />
          </mesh>
        ))}
      </group>

      {/* Grid Ground */}
      <gridHelper
        args={[6000, 300, '#ff00ff', '#220033']}
        position={[0, -0.02, roadCenter]}
      />

      {/* Road Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, roadCenter]}>
        <planeGeometry args={[ROAD_WIDTH, ROAD_LENGTH + 100]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.8} />
      </mesh>

      {/* Road edge lines (neon cyan) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-halfWidth, 0.01, roadCenter]}>
        <planeGeometry args={[0.3, ROAD_LENGTH + 100]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[halfWidth, 0.01, roadCenter]}>
        <planeGeometry args={[0.3, ROAD_LENGTH + 100]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>

      {/* Center dashed line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, roadCenter]}>
        <planeGeometry args={[0.15, ROAD_LENGTH + 100]} />
        <meshBasicMaterial color="#444444" transparent opacity={0.5} />
      </mesh>

      {/* Lane dividers */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-halfWidth / 2, 0.005, roadCenter]}>
        <planeGeometry args={[0.08, ROAD_LENGTH + 100]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[halfWidth / 2, 0.005, roadCenter]}>
        <planeGeometry args={[0.08, ROAD_LENGTH + 100]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.3} />
      </mesh>

      {/* START LINE */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[ROAD_WIDTH, 2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      <Text
        position={[0, 4, 0]}
        fontSize={2}
        color="#ffffff"
        anchorY="bottom"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        START
      </Text>

      {/* FINISH LINE */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -ROAD_LENGTH]}>
        <planeGeometry args={[ROAD_WIDTH, 2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      <Text
        position={[0, 4, -ROAD_LENGTH]}
        fontSize={2}
        color="#ffff00"
        anchorY="bottom"
        outlineWidth={0.1}
        outlineColor="#000000"
      >
        FINISH
      </Text>

      {/* PROJECT ZONES */}
      {PROJECT_STOPS.map((stop) => {
        const color = stop.passwordProtected
          ? LOCKED_COLOR
          : ZONE_COLORS[stop.category] || '#ff00ff';

        return (
          <group key={stop.id} position={[0, 0, stop.z]}>
            {/* Gate pillars */}
            <mesh position={[-halfWidth + 1, 3.5, 0]}>
              <boxGeometry args={[0.5, 7, 0.5]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
              />
            </mesh>
            <mesh position={[halfWidth - 1, 3.5, 0]}>
              <boxGeometry args={[0.5, 7, 0.5]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
              />
            </mesh>
            {/* Top bar */}
            <mesh position={[0, 7.25, 0]}>
              <boxGeometry args={[ROAD_WIDTH - 2, 0.4, 0.4]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
              />
            </mesh>

            {/* Gate label */}
            <Text
              position={[0, 8.5, 0]}
              fontSize={1.4}
              color={color}
              anchorY="bottom"
              outlineWidth={0.08}
              outlineColor="#000000"
              maxWidth={18}
              textAlign="center"
            >
              {stop.passwordProtected ? `🔒 ${stop.name}` : stop.name}
            </Text>

            {/* Ground glow strip */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
              <planeGeometry args={[ROAD_WIDTH, 20]} />
              <meshBasicMaterial color={color} transparent opacity={0.08} />
            </mesh>

            {/* Side glow posts */}
            <pointLight
              position={[-halfWidth + 1, 5, 0]}
              color={color}
              intensity={3}
              distance={20}
            />
            <pointLight
              position={[halfWidth - 1, 5, 0]}
              color={color}
              intensity={3}
              distance={20}
            />
          </group>
        );
      })}

      {/* RAMPS */}
      {RAMPS.map((ramp, i) => {
        const angle = Math.atan2(ramp.height, ramp.length);
        return (
          <group key={`ramp-${i}`} position={[0, 0, ramp.z]}>
            {/* Ramp surface */}
            <mesh
              position={[0, ramp.height / 2, 0]}
              rotation={[angle, 0, 0]}
            >
              <boxGeometry args={[ramp.width, 0.25, ramp.length]} />
              <meshStandardMaterial
                color="#ff8800"
                emissive="#ff6600"
                emissiveIntensity={0.3}
                metalness={0.5}
                roughness={0.3}
              />
            </mesh>
            {/* Edge glow lines */}
            <mesh
              position={[-ramp.width / 2, ramp.height / 2, 0]}
              rotation={[angle, 0, 0]}
            >
              <boxGeometry args={[0.15, 0.3, ramp.length]} />
              <meshBasicMaterial color="#ffff00" />
            </mesh>
            <mesh
              position={[ramp.width / 2, ramp.height / 2, 0]}
              rotation={[angle, 0, 0]}
            >
              <boxGeometry args={[0.15, 0.3, ramp.length]} />
              <meshBasicMaterial color="#ffff00" />
            </mesh>
            {/* Arrow markers on ramp */}
            <Text
              position={[0, ramp.height / 2 + 0.5, 3]}
              rotation={[-Math.PI / 2 + angle, 0, 0]}
              fontSize={1.5}
              color="#ffff00"
            >
              {'▲'}
            </Text>
          </group>
        );
      })}

      {/* SPEED BOOSTS */}
      {SPEED_BOOSTS.map((boost, i) => (
        <group key={`boost-${i}`} position={[boost.x, 0, boost.z]}>
          {/* Boost pad */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
            <planeGeometry args={[6, 8]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.15} />
          </mesh>
          {/* Boost chevrons */}
          <Text
            position={[0, 0.05, 2]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={2}
            color="#00ffff"
          >
            {'>>'}
          </Text>
          <Text
            position={[0, 0.05, -1]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={2}
            color="#00ffff"
          >
            {'>>'}
          </Text>
          {/* Glow */}
          <pointLight position={[0, 1, 0]} color="#00ffff" intensity={2} distance={10} />
        </group>
      ))}

      {/* OBSTACLES */}
      {OBSTACLES.map((obs, i) => (
        <group key={`obs-${i}`} position={[obs.x, 0, obs.z]}>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[obs.width, 2, 1.5]} />
            <meshStandardMaterial
              color="#ff0044"
              emissive="#ff0022"
              emissiveIntensity={0.5}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          {/* Warning stripes */}
          <mesh position={[0, 2.1, 0]}>
            <boxGeometry args={[obs.width + 0.2, 0.15, 0.15]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>
          {/* Red glow */}
          <pointLight position={[0, 2, 0]} color="#ff0044" intensity={2} distance={8} />
        </group>
      ))}

      {/* BUILDINGS (solid with neon windows) */}
      {BUILDINGS.map((b, i) => (
        <Building key={`bld-${i}`} config={b} />
      ))}

      {/* Ground plane (extends beyond grid for fog blending) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, roadCenter]}>
        <planeGeometry args={[8000, 8000]} />
        <meshBasicMaterial color="#050010" />
      </mesh>
    </>
  );
};
