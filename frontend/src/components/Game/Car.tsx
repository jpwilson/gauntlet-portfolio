import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from './gameStore';
import {
  PROJECT_STOPS,
  RAMPS,
  SPEED_BOOSTS,
  OBSTACLES,
  ROAD_WIDTH,
  ROAD_LENGTH,
} from './roadConfig';

const GRAVITY = 30;
const MAX_SPEED = 80;
const ACCELERATION = 35;
const BRAKE_FORCE = 50;
const STEER_SPEED = 2.2;
const FRICTION = 0.985;
const ZONE_TRIGGER_DIST = 15;

// Pre-allocated vectors
const _camPos = new THREE.Vector3();
const _camLook = new THREE.Vector3();

export const Car: React.FC = () => {
  const carRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { camera } = useThree();

  // Game physics state (not in React state for performance)
  const gs = useRef({
    speed: 0,
    posX: 0,
    posY: 0.5,
    posZ: 5,
    rotation: 0,
    velocityY: 0,
    isGrounded: true,
  });

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Store selectors
  const gameStarted = useGameStore((s) => s.gameStarted);
  const boosted = useGameStore((s) => s.boosted);
  const unlockedProjects = useGameStore((s) => s.unlockedProjects);
  const showPasswordPrompt = useGameStore((s) => s.showPasswordPrompt);
  const setSpeed = useGameStore((s) => s.setSpeed);
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const setShowPasswordPrompt = useGameStore((s) => s.setShowPasswordPrompt);
  const setBoosted = useGameStore((s) => s.setBoosted);
  const addScore = useGameStore((s) => s.addScore);
  const setHitFlash = useGameStore((s) => s.setHitFlash);

  // Tracking refs
  const visitedZones = useRef<Set<string>>(new Set());
  const lastActiveZoneId = useRef<string | null>(null);
  const boostCooldown = useRef<Set<number>>(new Set());
  const obstacleCooldown = useRef<Set<number>>(new Set());
  const speedUpdateTimer = useRef(0);
  const firstFrame = useRef(true);

  // Expose touch controls globally
  useEffect(() => {
    (window as any).__gameKeys = keys.current;
    return () => { delete (window as any).__gameKeys; };
  }, []);

  // Keyboard input
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (showPasswordPrompt) return;
      switch (e.code) {
        case 'ArrowUp': case 'Space': case 'KeyW': keys.current.forward = true; e.preventDefault(); break;
        case 'ArrowDown': case 'KeyS': keys.current.backward = true; e.preventDefault(); break;
        case 'ArrowLeft': case 'KeyA': keys.current.left = true; e.preventDefault(); break;
        case 'ArrowRight': case 'KeyD': keys.current.right = true; e.preventDefault(); break;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp': case 'Space': case 'KeyW': keys.current.forward = false; break;
        case 'ArrowDown': case 'KeyS': keys.current.backward = false; break;
        case 'ArrowLeft': case 'KeyA': keys.current.left = false; break;
        case 'ArrowRight': case 'KeyD': keys.current.right = false; break;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [showPasswordPrompt]);

  // Main game loop
  useFrame((_, delta) => {
    if (!carRef.current || !gameStarted) return;

    const state = gs.current;
    const k = keys.current;
    const dt = Math.min(delta, 0.05); // Clamp delta

    // --- STEERING ---
    if (Math.abs(state.speed) > 1) {
      const steerFactor = Math.min(1, Math.abs(state.speed) / 25);
      if (k.left) state.rotation += STEER_SPEED * steerFactor * dt;
      if (k.right) state.rotation -= STEER_SPEED * steerFactor * dt;
    }

    // --- ACCELERATION ---
    const currentMax = boosted ? MAX_SPEED * 1.4 : MAX_SPEED;
    if (k.forward) {
      state.speed = Math.min(state.speed + ACCELERATION * dt, currentMax);
    } else if (k.backward) {
      state.speed = Math.max(state.speed - BRAKE_FORCE * dt, -MAX_SPEED * 0.2);
    } else {
      state.speed *= FRICTION;
      if (Math.abs(state.speed) < 0.5) state.speed = 0;
    }

    // --- MOVEMENT ---
    state.posX += Math.sin(state.rotation) * state.speed * dt;
    state.posZ -= Math.cos(state.rotation) * state.speed * dt;

    // Road boundaries (soft walls)
    const halfRoad = ROAD_WIDTH / 2;
    if (Math.abs(state.posX) > halfRoad + 5) {
      state.speed *= 0.96; // Off-road friction
    }
    if (Math.abs(state.posX) > halfRoad + 25) {
      state.posX = Math.sign(state.posX) * (halfRoad + 25);
    }

    // Prevent going backwards past start
    if (state.posZ > 20) {
      state.posZ = 20;
      state.speed = 0;
    }
    // Prevent going past end
    if (state.posZ < -(ROAD_LENGTH + 50)) {
      state.posZ = -(ROAD_LENGTH + 50);
      state.speed = Math.min(state.speed, 0);
    }

    // --- GRAVITY ---
    state.velocityY -= GRAVITY * dt;
    state.posY += state.velocityY * dt;

    // --- GROUND / RAMP DETECTION ---
    let groundHeight = 0;
    let onRampSurface = false;

    for (const ramp of RAMPS) {
      const rampFront = ramp.z + ramp.length / 2; // Player enters here (higher Z)
      const rampBack = ramp.z - ramp.length / 2;  // Exit (lower Z, higher Y)
      if (
        state.posZ <= rampFront &&
        state.posZ >= rampBack &&
        Math.abs(state.posX) < ramp.width / 2
      ) {
        const progress = (rampFront - state.posZ) / ramp.length;
        groundHeight = progress * ramp.height;
        onRampSurface = true;

        // Launch off ramp tip
        if (progress > 0.9 && state.speed > 15 && state.isGrounded) {
          state.velocityY = Math.min(state.speed * 0.35, 25);
          state.isGrounded = false;
        }
        break;
      }
    }

    if (state.posY <= groundHeight) {
      state.posY = groundHeight;
      state.velocityY = 0;
      state.isGrounded = true;
    } else if (state.posY > groundHeight + 0.5) {
      state.isGrounded = false;
    }

    // --- PROJECT ZONE DETECTION ---
    let currentZone = null;
    for (const stop of PROJECT_STOPS) {
      const dz = Math.abs(state.posZ - stop.z);
      if (dz < ZONE_TRIGGER_DIST && Math.abs(state.posX) < halfRoad) {
        currentZone = stop;
        break;
      }
    }

    if (currentZone && currentZone.id !== lastActiveZoneId.current) {
      lastActiveZoneId.current = currentZone.id;
      setActiveZone(currentZone);

      if (currentZone.passwordProtected && !unlockedProjects.includes(currentZone.id)) {
        setShowPasswordPrompt(true);
      }

      if (!visitedZones.current.has(currentZone.id)) {
        visitedZones.current.add(currentZone.id);
        addScore(100);
      }
    } else if (!currentZone && lastActiveZoneId.current) {
      lastActiveZoneId.current = null;
      setActiveZone(null);
      setShowPasswordPrompt(false);
    }

    // --- SPEED BOOST DETECTION ---
    for (let i = 0; i < SPEED_BOOSTS.length; i++) {
      const boost = SPEED_BOOSTS[i];
      if (
        Math.abs(state.posX - boost.x) < 4 &&
        Math.abs(state.posZ - boost.z) < 5 &&
        !boostCooldown.current.has(i)
      ) {
        state.speed = Math.min(state.speed + 35, MAX_SPEED * 1.5);
        setBoosted(true);
        boostCooldown.current.add(i);
        addScore(25);
        setTimeout(() => {
          setBoosted(false);
          boostCooldown.current.delete(i);
        }, 2500);
      }
    }

    // --- OBSTACLE DETECTION ---
    for (let i = 0; i < OBSTACLES.length; i++) {
      const obs = OBSTACLES[i];
      if (
        Math.abs(state.posX - obs.x) < obs.width + 0.5 &&
        Math.abs(state.posZ - obs.z) < 2 &&
        state.posY < 2.5 &&
        !obstacleCooldown.current.has(i)
      ) {
        state.speed *= 0.25;
        state.posX += Math.sign(state.posX - obs.x) * 2;
        setHitFlash(true);
        obstacleCooldown.current.add(i);
        setTimeout(() => {
          setHitFlash(false);
          obstacleCooldown.current.delete(i);
        }, 500);
      }
    }

    // --- UPDATE VISUALS ---
    carRef.current.position.set(state.posX, state.posY, state.posZ);
    carRef.current.rotation.y = state.rotation;

    // Steering tilt
    const targetTiltZ = k.left ? 0.08 : k.right ? -0.08 : 0;
    carRef.current.rotation.z = THREE.MathUtils.lerp(
      carRef.current.rotation.z,
      targetTiltZ,
      0.1
    );

    // Nose tilt based on acceleration
    const targetTiltX = k.forward ? -0.03 : k.backward ? 0.05 : 0;
    carRef.current.rotation.x = THREE.MathUtils.lerp(
      carRef.current.rotation.x,
      targetTiltX,
      0.08
    );

    // Wheel rotation
    wheelRefs.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += state.speed * dt * 0.5;
    });

    // --- CAMERA ---
    const camBehindDist = 12;
    const camHeight = 5.5;
    _camPos.set(
      state.posX - Math.sin(state.rotation) * camBehindDist,
      state.posY + camHeight,
      state.posZ + Math.cos(state.rotation) * camBehindDist
    );
    _camLook.set(
      state.posX + Math.sin(state.rotation) * 20,
      state.posY + 1,
      state.posZ - Math.cos(state.rotation) * 20
    );

    if (firstFrame.current) {
      // Snap camera on first frame - no lerp
      camera.position.copy(_camPos);
      camera.lookAt(_camLook);
      firstFrame.current = false;
    } else {
      camera.position.lerp(_camPos, 0.06);
      camera.lookAt(_camLook);
    }

    // --- UPDATE HUD SPEED (throttled) ---
    speedUpdateTimer.current += dt;
    if (speedUpdateTimer.current > 0.1) {
      setSpeed(Math.round(Math.abs(state.speed)));
      speedUpdateTimer.current = 0;
    }
  });

  const wheelPositions: [number, number, number][] = [
    [-1.05, 0.15, 1.3],
    [1.05, 0.15, 1.3],
    [-1.05, 0.15, -1.3],
    [1.05, 0.15, -1.3],
  ];

  return (
    <group ref={carRef} position={[0, 0.5, 5]}>
      {/* Main body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 4.5]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.8, -0.2]} castShadow>
        <boxGeometry args={[1.6, 0.45, 2.2]} />
        <meshStandardMaterial
          color="#1a0030"
          emissive="#ff00ff"
          emissiveIntensity={0.05}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Hood scoop */}
      <mesh position={[0, 0.7, -1.5]}>
        <boxGeometry args={[0.6, 0.15, 0.8]} />
        <meshStandardMaterial color="#cc00cc" emissive="#ff00ff" emissiveIntensity={0.2} />
      </mesh>

      {/* Spoiler */}
      <mesh position={[0, 0.9, 2.1]}>
        <boxGeometry args={[2.2, 0.08, 0.4]} />
        <meshStandardMaterial color="#cc00cc" emissive="#ff00ff" emissiveIntensity={0.2} />
      </mesh>
      {/* Spoiler supports */}
      <mesh position={[-0.7, 0.75, 2.1]}>
        <boxGeometry args={[0.1, 0.25, 0.1]} />
        <meshStandardMaterial color="#cc00cc" />
      </mesh>
      <mesh position={[0.7, 0.75, 2.1]}>
        <boxGeometry args={[0.1, 0.25, 0.1]} />
        <meshStandardMaterial color="#cc00cc" />
      </mesh>

      {/* Side skirts */}
      <mesh position={[-1.05, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.15, 4]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.05, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.15, 4]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Wheels */}
      {wheelPositions.map(([x, y, z], i) => (
        <mesh
          key={i}
          ref={(el) => { wheelRefs.current[i] = el; }}
          position={[x, y, z]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.3, 0.3, 0.25, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}

      {/* Headlights */}
      <mesh position={[-0.7, 0.4, -2.26]}>
        <boxGeometry args={[0.35, 0.2, 0.05]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.7, 0.4, -2.26]}>
        <boxGeometry args={[0.35, 0.2, 0.05]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={2} />
      </mesh>

      {/* Tail lights */}
      <mesh position={[-0.7, 0.4, 2.26]}>
        <boxGeometry args={[0.35, 0.15, 0.05]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.7, 0.4, 2.26]}>
        <boxGeometry args={[0.35, 0.15, 0.05]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} />
      </mesh>

      {/* Neon underglow */}
      <pointLight position={[0, 0.05, 0]} color="#ff00ff" intensity={3} distance={6} />
    </group>
  );
};
