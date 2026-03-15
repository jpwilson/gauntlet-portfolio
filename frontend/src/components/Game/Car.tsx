import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from './gameStore';
import {
  TRACK_CURVE,
  TRACK_LENGTH,
  ROAD_WIDTH,
  PROJECT_STOPS,
  RAMPS,
  SPEED_BOOSTS,
  OBSTACLES,
  findClosestTrackPoint,
  getTrackPointAt,
} from './roadConfig';

const MAX_SPEED = 85;
const ACCELERATION = 40;
const DECELERATION = 0.975; // Coast when not accelerating
const STEER_SPEED = 2.0;
const GRAVITY = 30;
const ZONE_TRIGGER_DIST = 18;

const _camPos = new THREE.Vector3();
const _camLook = new THREE.Vector3();

// Precompute world positions for game elements
function precomputePositions() {
  const projectPositions = PROJECT_STOPS.map((s) => TRACK_CURVE.getPointAt(s.t));

  const rampDetails = RAMPS.map((ramp) => {
    const { pos, tangent, perp } = getTrackPointAt(ramp.t);
    return { ...ramp, pos, tangent, perp };
  });

  const boostPositions = SPEED_BOOSTS.map((boost) => {
    const { pos, perp } = getTrackPointAt(boost.t);
    return pos.clone().add(perp.clone().multiplyScalar(boost.lateralOffset));
  });

  const obstaclePositions = OBSTACLES.map((obs) => {
    const { pos, perp } = getTrackPointAt(obs.t);
    return {
      pos: pos.clone().add(perp.clone().multiplyScalar(obs.lateralOffset)),
      width: obs.width,
    };
  });

  return { projectPositions, rampDetails, boostPositions, obstaclePositions };
}

export const Car: React.FC = () => {
  const carRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { camera } = useThree();

  // Get start position and rotation from track
  const startData = useRef(getTrackPointAt(0));

  const gs = useRef({
    speed: 0,
    posX: startData.current.pos.x,
    posY: 0.5,
    posZ: startData.current.pos.z,
    rotation: startData.current.rotation,
    velocityY: 0,
    isGrounded: true,
  });

  const keys = useRef({
    forward: false,
    left: false,
    right: false,
  });

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

  const visitedZones = useRef<Set<string>>(new Set());
  const lastActiveZoneId = useRef<string | null>(null);
  const boostCooldown = useRef<Set<number>>(new Set());
  const obstacleCooldown = useRef<Set<number>>(new Set());
  const speedUpdateTimer = useRef(0);
  const firstFrame = useRef(true);
  const precomputed = useRef<ReturnType<typeof precomputePositions> | null>(null);

  // Expose keys for touch controls
  useEffect(() => {
    (window as any).__gameKeys = keys.current;
    return () => { delete (window as any).__gameKeys; };
  }, []);

  // Keyboard: Space/Up = gas, Left/Right = steer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (showPasswordPrompt) return;
      switch (e.code) {
        case 'Space': case 'ArrowUp': case 'KeyW':
          keys.current.forward = true; e.preventDefault(); break;
        case 'ArrowLeft': case 'KeyA':
          keys.current.left = true; e.preventDefault(); break;
        case 'ArrowRight': case 'KeyD':
          keys.current.right = true; e.preventDefault(); break;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space': case 'ArrowUp': case 'KeyW':
          keys.current.forward = false; break;
        case 'ArrowLeft': case 'KeyA':
          keys.current.left = false; break;
        case 'ArrowRight': case 'KeyD':
          keys.current.right = false; break;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [showPasswordPrompt]);

  useFrame((_, delta) => {
    if (!carRef.current || !gameStarted) return;
    if (!precomputed.current) precomputed.current = precomputePositions();

    const state = gs.current;
    const k = keys.current;
    const dt = Math.min(delta, 0.05);
    const pre = precomputed.current;

    // --- STEERING (only when moving) ---
    if (Math.abs(state.speed) > 0.5) {
      const steerFactor = Math.min(1, Math.abs(state.speed) / 20);
      if (k.left) state.rotation += STEER_SPEED * steerFactor * dt;
      if (k.right) state.rotation -= STEER_SPEED * steerFactor * dt;
    }

    // --- ACCELERATION: Space = gas, release = coast/brake ---
    const currentMax = boosted ? MAX_SPEED * 1.4 : MAX_SPEED;
    if (k.forward) {
      state.speed = Math.min(state.speed + ACCELERATION * dt, currentMax);
    } else {
      // Auto-decelerate when not holding space
      state.speed *= DECELERATION;
      if (state.speed < 0.3) state.speed = 0;
    }

    // --- MOVEMENT ---
    state.posX += Math.sin(state.rotation) * state.speed * dt;
    state.posZ -= Math.cos(state.rotation) * state.speed * dt;

    // --- ROAD BOUNDARY ---
    const closest = findClosestTrackPoint(state.posX, state.posZ);
    const halfRoad = ROAD_WIDTH / 2;

    if (closest.distance > halfRoad + 3) {
      // Off road: heavy friction
      state.speed *= 0.93;
      // Push toward road
      const pushX = closest.point.x - state.posX;
      const pushZ = closest.point.z - state.posZ;
      const pushLen = Math.sqrt(pushX * pushX + pushZ * pushZ) || 1;
      const pushStrength = Math.min((closest.distance - halfRoad) * 0.1, 3);
      state.posX += (pushX / pushLen) * pushStrength * dt * 30;
      state.posZ += (pushZ / pushLen) * pushStrength * dt * 30;
    }

    // --- GRAVITY ---
    state.velocityY -= GRAVITY * dt;
    state.posY += state.velocityY * dt;

    // --- RAMP DETECTION ---
    let groundHeight = 0;
    for (const ramp of pre.rampDetails) {
      const dx = state.posX - ramp.pos.x;
      const dz = state.posZ - ramp.pos.z;
      const alongRoad = dx * ramp.tangent.x + dz * ramp.tangent.z;
      const lateralDist = dx * (-ramp.tangent.z) + dz * ramp.tangent.x;

      if (
        Math.abs(lateralDist) < ramp.width / 2 &&
        alongRoad > -ramp.length / 2 &&
        alongRoad < ramp.length / 2
      ) {
        const progress = (alongRoad + ramp.length / 2) / ramp.length;
        groundHeight = progress * ramp.height;

        if (progress > 0.85 && state.speed > 15 && state.isGrounded) {
          state.velocityY = Math.min(state.speed * 0.35, 28);
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
    for (let i = 0; i < PROJECT_STOPS.length; i++) {
      const zonePos = pre.projectPositions[i];
      const dx = state.posX - zonePos.x;
      const dz = state.posZ - zonePos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < ZONE_TRIGGER_DIST) {
        currentZone = PROJECT_STOPS[i];
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

    // --- SPEED BOOSTS ---
    for (let i = 0; i < pre.boostPositions.length; i++) {
      const bp = pre.boostPositions[i];
      const dx = state.posX - bp.x;
      const dz = state.posZ - bp.z;
      if (dx * dx + dz * dz < 25 && !boostCooldown.current.has(i)) {
        state.speed = Math.min(state.speed + 35, MAX_SPEED * 1.5);
        setBoosted(true);
        boostCooldown.current.add(i);
        addScore(25);
        setTimeout(() => { setBoosted(false); boostCooldown.current.delete(i); }, 2500);
      }
    }

    // --- OBSTACLES ---
    for (let i = 0; i < pre.obstaclePositions.length; i++) {
      const obs = pre.obstaclePositions[i];
      const dx = Math.abs(state.posX - obs.pos.x);
      const dz = Math.abs(state.posZ - obs.pos.z);
      if (dx < obs.width + 1 && dz < 2 && state.posY < 2.5 && !obstacleCooldown.current.has(i)) {
        state.speed *= 0.2;
        setHitFlash(true);
        obstacleCooldown.current.add(i);
        setTimeout(() => { setHitFlash(false); obstacleCooldown.current.delete(i); }, 500);
      }
    }

    // --- UPDATE VISUALS ---
    carRef.current.position.set(state.posX, state.posY, state.posZ);
    carRef.current.rotation.y = state.rotation;

    const targetTiltZ = k.left ? 0.08 : k.right ? -0.08 : 0;
    carRef.current.rotation.z = THREE.MathUtils.lerp(carRef.current.rotation.z, targetTiltZ, 0.1);

    const targetTiltX = k.forward ? -0.03 : 0;
    carRef.current.rotation.x = THREE.MathUtils.lerp(carRef.current.rotation.x, targetTiltX, 0.08);

    wheelRefs.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += state.speed * dt * 0.5;
    });

    // --- CAMERA ---
    const camBehind = 12;
    const camHeight = 5.5;
    _camPos.set(
      state.posX - Math.sin(state.rotation) * camBehind,
      state.posY + camHeight,
      state.posZ + Math.cos(state.rotation) * camBehind
    );
    _camLook.set(
      state.posX + Math.sin(state.rotation) * 25,
      state.posY + 1,
      state.posZ - Math.cos(state.rotation) * 25
    );

    if (firstFrame.current) {
      camera.position.copy(_camPos);
      camera.lookAt(_camLook);
      firstFrame.current = false;
    } else {
      camera.position.lerp(_camPos, 0.06);
      camera.lookAt(_camLook);
    }

    // --- HUD SPEED ---
    speedUpdateTimer.current += dt;
    if (speedUpdateTimer.current > 0.1) {
      setSpeed(Math.round(Math.abs(state.speed)));
      speedUpdateTimer.current = 0;
    }
  });

  const wheelPositions: [number, number, number][] = [
    [-1.05, 0.15, 1.3], [1.05, 0.15, 1.3],
    [-1.05, 0.15, -1.3], [1.05, 0.15, -1.3],
  ];

  return (
    <group ref={carRef} position={[gs.current.posX, 0.5, gs.current.posZ]} rotation={[0, gs.current.rotation, 0]}>
      {/* Body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[2, 0.6, 4.5]} />
        <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.8, -0.2]} castShadow>
        <boxGeometry args={[1.6, 0.45, 2.2]} />
        <meshStandardMaterial color="#1a0030" emissive="#ff00ff" emissiveIntensity={0.05} transparent opacity={0.85} />
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
      <mesh position={[-0.7, 0.75, 2.1]}><boxGeometry args={[0.1, 0.25, 0.1]} /><meshStandardMaterial color="#cc00cc" /></mesh>
      <mesh position={[0.7, 0.75, 2.1]}><boxGeometry args={[0.1, 0.25, 0.1]} /><meshStandardMaterial color="#cc00cc" /></mesh>
      {/* Side neon strips */}
      <mesh position={[-1.05, 0.15, 0]}><boxGeometry args={[0.1, 0.15, 4]} /><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} /></mesh>
      <mesh position={[1.05, 0.15, 0]}><boxGeometry args={[0.1, 0.15, 4]} /><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} /></mesh>
      {/* Wheels */}
      {wheelPositions.map(([x, y, z], i) => (
        <mesh key={i} ref={(el) => { wheelRefs.current[i] = el; }} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.25, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      ))}
      {/* Headlights */}
      <mesh position={[-0.7, 0.4, -2.26]}><boxGeometry args={[0.35, 0.2, 0.05]} /><meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={2} /></mesh>
      <mesh position={[0.7, 0.4, -2.26]}><boxGeometry args={[0.35, 0.2, 0.05]} /><meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={2} /></mesh>
      {/* Tail lights */}
      <mesh position={[-0.7, 0.4, 2.26]}><boxGeometry args={[0.35, 0.15, 0.05]} /><meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} /></mesh>
      <mesh position={[0.7, 0.4, 2.26]}><boxGeometry args={[0.35, 0.15, 0.05]} /><meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} /></mesh>
      {/* Underglow */}
      <pointLight position={[0, 0.05, 0]} color="#ff00ff" intensity={3} distance={6} />
    </group>
  );
};
