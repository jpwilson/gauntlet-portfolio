import React, { useMemo } from 'react';
import { Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import {
  ROAD_WIDTH,
  TRACK_CURVE,
  TRACK_LENGTH,
  PROJECT_STOPS,
  RAMPS,
  SPEED_BOOSTS,
  OBSTACLES,
  BUILDINGS,
  BuildingConfig,
  createRoadGeometry,
  getTrackPointAt,
} from './roadConfig';

// Tron-style building
const Building: React.FC<{ config: BuildingConfig }> = React.memo(({ config }) => {
  const { x, z, width, height, depth, color } = config;
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#060610" roughness={0.9} />
      </mesh>
      <mesh position={[0, height + 0.08, 0]}>
        <boxGeometry args={[width + 0.15, 0.15, depth + 0.15]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[width + 0.15, 0.15, depth + 0.15]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      {height > 15 && (
        <mesh position={[0, height / 2, 0]}>
          <boxGeometry args={[width + 0.15, 0.1, depth + 0.15]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
});

// Overhead freeway sign
const FreewaySign: React.FC<{
  position: THREE.Vector3;
  rotation: number;
  text: string;
  locked?: boolean;
}> = React.memo(({ position, rotation, text, locked }) => {
  const signColor = locked ? '#ff6600' : '#006633';
  const halfW = ROAD_WIDTH / 2;

  return (
    <group position={[position.x, 0, position.z]} rotation={[0, rotation, 0]}>
      {/* Left post */}
      <mesh position={[-halfW - 1.5, 5, 0]}>
        <boxGeometry args={[0.4, 10, 0.4]} />
        <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Right post */}
      <mesh position={[halfW + 1.5, 5, 0]}>
        <boxGeometry args={[0.4, 10, 0.4]} />
        <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Horizontal beam */}
      <mesh position={[0, 10.2, 0]}>
        <boxGeometry args={[ROAD_WIDTH + 4, 0.3, 0.3]} />
        <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Sign board */}
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[14, 4.5, 0.25]} />
        <meshStandardMaterial color={signColor} />
      </mesh>
      {/* Sign border */}
      <mesh position={[0, 10, 0.13]}>
        <planeGeometry args={[13.5, 4]} />
        <meshStandardMaterial color={signColor} emissive={signColor} emissiveIntensity={0.2} />
      </mesh>
      {/* Project name */}
      <Text
        position={[0, 10.6, 0.15]}
        fontSize={1.3}
        color="#ffffff"
        anchorY="middle"
        maxWidth={12}
        textAlign="center"
        font={undefined}
      >
        {locked ? `🔒 ${text}` : text}
      </Text>
      {/* EXIT label */}
      <Text
        position={[0, 9.2, 0.15]}
        fontSize={0.7}
        color="#ffffff"
        anchorY="middle"
      >
        {'NEXT EXIT ➜'}
      </Text>
    </group>
  );
});

export const World: React.FC = () => {
  // Generate road geometries
  const roadGeo = useMemo(() => createRoadGeometry(TRACK_CURVE, ROAD_WIDTH, 500, 0.01), []);
  const leftEdgeGeo = useMemo(() => createRoadGeometry(TRACK_CURVE, 0.4, 500, 0.05), []);
  const rightEdgeGeo = useMemo(() => createRoadGeometry(TRACK_CURVE, 0.4, 500, 0.05), []);
  const centerLineGeo = useMemo(() => createRoadGeometry(TRACK_CURVE, 0.15, 500, 0.03), []);

  // Edge line geometries offset from center
  const leftEdgeMesh = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const segments = 500;
    const vertices: number[] = [];
    const indices: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) % 1;
      const point = TRACK_CURVE.getPointAt(t);
      const tangent = TRACK_CURVE.getTangentAt(t);
      const px = -tangent.z, pz = tangent.x;
      const len = Math.sqrt(px * px + pz * pz) || 1;
      const nx = px / len, nz = pz / len;
      const offset = ROAD_WIDTH / 2;
      const cx = point.x - nx * offset;
      const cz = point.z - nz * offset;
      vertices.push(cx - nx * 0.2, 0.04, cz - nz * 0.2);
      vertices.push(cx + nx * 0.2, 0.04, cz + nz * 0.2);
    }
    for (let i = 0; i < segments; i++) {
      indices.push(i * 2, (i + 1) * 2, i * 2 + 1, i * 2 + 1, (i + 1) * 2, (i + 1) * 2 + 1);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    return geo;
  }, []);

  const rightEdgeMesh = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const segments = 500;
    const vertices: number[] = [];
    const indices: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) % 1;
      const point = TRACK_CURVE.getPointAt(t);
      const tangent = TRACK_CURVE.getTangentAt(t);
      const px = -tangent.z, pz = tangent.x;
      const len = Math.sqrt(px * px + pz * pz) || 1;
      const nx = px / len, nz = pz / len;
      const offset = ROAD_WIDTH / 2;
      const cx = point.x + nx * offset;
      const cz = point.z + nz * offset;
      vertices.push(cx - nx * 0.2, 0.04, cz - nz * 0.2);
      vertices.push(cx + nx * 0.2, 0.04, cz + nz * 0.2);
    }
    for (let i = 0; i < segments; i++) {
      indices.push(i * 2, (i + 1) * 2, i * 2 + 1, i * 2 + 1, (i + 1) * 2, (i + 1) * 2 + 1);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    return geo;
  }, []);

  // Precompute sign and zone positions
  const signData = useMemo(() => {
    return PROJECT_STOPS.map((stop) => {
      // Sign placed ~30 units before the zone
      const signOffset = 30 / TRACK_LENGTH;
      const signT = ((stop.t - signOffset) + 1) % 1;
      const { pos: signPos, tangent } = getTrackPointAt(signT);
      const signRotation = Math.atan2(-tangent.x, -tangent.z);

      // Zone position
      const { pos: zonePos, tangent: zoneTangent, perp: zonePerp } = getTrackPointAt(stop.t);
      const zoneRotation = Math.atan2(-zoneTangent.x, -zoneTangent.z);

      return { stop, signPos, signRotation, zonePos, zoneRotation };
    });
  }, []);

  // Precompute ramp positions
  const rampData = useMemo(() => {
    return RAMPS.map((ramp) => {
      const { pos, tangent, rotation } = getTrackPointAt(ramp.t);
      return { ...ramp, pos, tangent, rotation };
    });
  }, []);

  // Precompute boost positions
  const boostData = useMemo(() => {
    return SPEED_BOOSTS.map((boost) => {
      const { pos, tangent, perp, rotation } = getTrackPointAt(boost.t);
      const worldPos = pos.clone().add(perp.clone().multiplyScalar(boost.lateralOffset));
      return { ...boost, worldPos, rotation };
    });
  }, []);

  // Precompute obstacle positions
  const obstacleData = useMemo(() => {
    return OBSTACLES.map((obs) => {
      const { pos, tangent, perp, rotation } = getTrackPointAt(obs.t);
      const worldPos = pos.clone().add(perp.clone().multiplyScalar(obs.lateralOffset));
      return { ...obs, worldPos, rotation };
    });
  }, []);

  // Sun bars
  const sunBars = useMemo(() => {
    const bars = [];
    for (let i = 0; i < 8; i++) {
      bars.push({ y: 25 + i * 7, height: 1.5 + i * 0.6 });
    }
    return bars;
  }, []);

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.12} color="#4422aa" />
      <directionalLight position={[50, 80, -100]} intensity={0.35} color="#ff88aa" />
      <directionalLight position={[-30, 50, 80]} intensity={0.15} color="#00ffff" />

      {/* Fog */}
      <fog attach="fog" args={['#06000f', 30, 400]} />
      <color attach="background" args={['#06000f']} />

      {/* Stars */}
      <Stars radius={500} depth={200} count={5000} factor={5} saturation={0.5} />

      {/* Synthwave Sun */}
      <group position={[300, 40, -600]}>
        <mesh>
          <circleGeometry args={[120, 32]} />
          <meshBasicMaterial color="#ff5500" fog={false} />
        </mesh>
        <mesh position={[0, -35, 0.1]}>
          <planeGeometry args={[250, 70]} />
          <meshBasicMaterial color="#ff2200" fog={false} transparent opacity={0.5} />
        </mesh>
        {sunBars.map((bar, i) => (
          <mesh key={i} position={[0, bar.y - 60, 0.2]}>
            <planeGeometry args={[260, bar.height]} />
            <meshBasicMaterial color="#06000f" fog={false} />
          </mesh>
        ))}
      </group>

      {/* Grid ground */}
      <gridHelper args={[2000, 200, '#ff00ff', '#1a0022']} position={[290, -0.03, -170]} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[290, -0.06, -170]}>
        <planeGeometry args={[3000, 3000]} />
        <meshBasicMaterial color="#030008" />
      </mesh>

      {/* ROAD SURFACE */}
      <mesh geometry={roadGeo}>
        <meshStandardMaterial color="#0d0d0d" roughness={0.8} />
      </mesh>

      {/* Road edge lines (cyan) */}
      <mesh geometry={leftEdgeMesh}>
        <meshBasicMaterial color="#00ffff" />
      </mesh>
      <mesh geometry={rightEdgeMesh}>
        <meshBasicMaterial color="#00ffff" />
      </mesh>

      {/* Center line */}
      <mesh geometry={centerLineGeo}>
        <meshBasicMaterial color="#333333" transparent opacity={0.4} />
      </mesh>

      {/* FREEWAY SIGNS & PROJECT ZONES */}
      {signData.map(({ stop, signPos, signRotation, zonePos, zoneRotation }) => {
        const zoneColor = stop.passwordProtected ? '#ff6600' : '#ff00ff';
        const halfW = ROAD_WIDTH / 2;

        return (
          <React.Fragment key={stop.id}>
            {/* Freeway sign (before the zone) */}
            <FreewaySign
              position={signPos}
              rotation={signRotation}
              text={stop.signName}
              locked={stop.passwordProtected}
            />

            {/* Project zone gate */}
            <group position={[zonePos.x, 0, zonePos.z]} rotation={[0, zoneRotation + Math.PI, 0]}>
              <mesh position={[-halfW + 1, 3.5, 0]}>
                <boxGeometry args={[0.5, 7, 0.5]} />
                <meshStandardMaterial color={zoneColor} emissive={zoneColor} emissiveIntensity={0.6} />
              </mesh>
              <mesh position={[halfW - 1, 3.5, 0]}>
                <boxGeometry args={[0.5, 7, 0.5]} />
                <meshStandardMaterial color={zoneColor} emissive={zoneColor} emissiveIntensity={0.6} />
              </mesh>
              <mesh position={[0, 7.25, 0]}>
                <boxGeometry args={[ROAD_WIDTH - 2, 0.4, 0.4]} />
                <meshStandardMaterial color={zoneColor} emissive={zoneColor} emissiveIntensity={0.6} />
              </mesh>
              <Text
                position={[0, 8.5, 0]}
                fontSize={1.2}
                color={zoneColor}
                anchorY="bottom"
                outlineWidth={0.06}
                outlineColor="#000000"
                maxWidth={18}
                textAlign="center"
              >
                {stop.name}
              </Text>
              <pointLight position={[-halfW + 1, 5, 0]} color={zoneColor} intensity={3} distance={18} />
              <pointLight position={[halfW - 1, 5, 0]} color={zoneColor} intensity={3} distance={18} />
            </group>
          </React.Fragment>
        );
      })}

      {/* RAMPS */}
      {rampData.map((ramp, i) => {
        const angle = Math.atan2(ramp.height, ramp.length);
        return (
          <group key={`ramp-${i}`} position={[ramp.pos.x, 0, ramp.pos.z]} rotation={[0, ramp.rotation, 0]}>
            <mesh position={[0, ramp.height / 2, 0]} rotation={[angle, 0, 0]}>
              <boxGeometry args={[ramp.width, 0.25, ramp.length]} />
              <meshStandardMaterial color="#ff8800" emissive="#ff6600" emissiveIntensity={0.3} metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[-ramp.width / 2, ramp.height / 2, 0]} rotation={[angle, 0, 0]}>
              <boxGeometry args={[0.15, 0.3, ramp.length]} />
              <meshBasicMaterial color="#ffff00" />
            </mesh>
            <mesh position={[ramp.width / 2, ramp.height / 2, 0]} rotation={[angle, 0, 0]}>
              <boxGeometry args={[0.15, 0.3, ramp.length]} />
              <meshBasicMaterial color="#ffff00" />
            </mesh>
          </group>
        );
      })}

      {/* SPEED BOOSTS */}
      {boostData.map((boost, i) => (
        <group key={`boost-${i}`} position={[boost.worldPos.x, 0, boost.worldPos.z]} rotation={[0, boost.rotation, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
            <planeGeometry args={[5, 7]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.2} />
          </mesh>
          <Text position={[0, 0.06, 1.5]} rotation={[-Math.PI / 2, 0, 0]} fontSize={2} color="#00ffff">
            {'>>'}
          </Text>
          <pointLight position={[0, 1, 0]} color="#00ffff" intensity={2} distance={10} />
        </group>
      ))}

      {/* OBSTACLES */}
      {obstacleData.map((obs, i) => (
        <group key={`obs-${i}`} position={[obs.worldPos.x, 0, obs.worldPos.z]} rotation={[0, obs.rotation, 0]}>
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[obs.width, 2, 1.5]} />
            <meshStandardMaterial color="#ff0044" emissive="#ff0022" emissiveIntensity={0.5} metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0, 2.1, 0]}>
            <boxGeometry args={[obs.width + 0.2, 0.15, 0.15]} />
            <meshBasicMaterial color="#ffff00" />
          </mesh>
          <pointLight position={[0, 2, 0]} color="#ff0044" intensity={2} distance={8} />
        </group>
      ))}

      {/* TRON CITY BUILDINGS */}
      {BUILDINGS.map((b, i) => (
        <Building key={`bld-${i}`} config={b} />
      ))}
    </>
  );
};
