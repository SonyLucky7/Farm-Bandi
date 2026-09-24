"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text3D, Center, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Floating Grocery Emoji Orbs ─── */
function GroceryOrb({ position, emoji, speed = 1, radius = 0.45 }: { position: [number, number, number]; emoji: string; speed?: number; radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    meshRef.current.position.y = initialY + Math.sin(t + offset) * 0.15;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.z = Math.sin(t * 0.5 + offset) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.1}
          metalness={0.0}
          transmission={0.92}
          thickness={0.5}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
        />
      </mesh>
    </Float>
  );
}

/* ─── Particle Field Background ─── */
function ParticleField({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 4 - 1,
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      scale: 0.015 + Math.random() * 0.025,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.3,
        p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.2,
        p.z
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#D4A373" transparent opacity={0.35} />
    </instancedMesh>
  );
}

/* ─── Rotating Ring ─── */
function FloatingRing({ radius = 2.2, tubeRadius = 0.02 }: { radius?: number; tubeRadius?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.3) * 0.05;
    ref.current.rotation.z = t * 0.15;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tubeRadius, 16, 100]} />
      <meshPhysicalMaterial
        color="#2D6A4F"
        roughness={0.3}
        metalness={0.6}
        emissive="#155E40"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/* ─── Central Logo Emblem ─── */
function CentralEmblem() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshPhysicalMaterial
          color="#2D6A4F"
          roughness={0.05}
          metalness={0.2}
          transmission={0.85}
          thickness={1.2}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.8}
        />
      </mesh>
      {/* Inner glow */}
      <mesh scale={0.35}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#D4A373" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* ─── Mouse-Reactive Camera ─── */
function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouseRef.current.x * 0.3 - camera.position.x) * 0.02;
    camera.position.y += (-mouseRef.current.y * 0.2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── 3D Scene Composition ─── */
function Scene() {
  const orbPositions: [number, number, number][] = [
    [-2.2, 0.8, 0.5],
    [2.4, 0.6, -0.3],
    [-1.5, -0.7, 0.8],
    [1.8, -0.9, 0.4],
    [-0.5, 1.4, -0.5],
    [0.8, -1.3, 0.6],
    [2.8, 0.1, -0.8],
    [-2.6, -0.3, 0.2],
  ];

  const groceryEmojis = ["🌾", "🥜", "🫘", "🌶️", "🥭", "🍚", "🧈", "🫒"];

  return (
    <>
      <CameraRig />
      <Environment preset="city" environmentIntensity={0.4} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFF8E1" />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#D4A373" />
      <pointLight position={[3, -2, 1]} intensity={0.3} color="#2D6A4F" />

      {/* Central emblem */}
      <CentralEmblem />

      {/* Orbital rings */}
      <FloatingRing radius={2.0} tubeRadius={0.015} />
      <FloatingRing radius={2.8} tubeRadius={0.01} />

      {/* Floating grocery glass orbs */}
      {orbPositions.map((pos, i) => (
        <GroceryOrb
          key={i}
          position={pos}
          emoji={groceryEmojis[i]}
          speed={0.6 + Math.random() * 0.8}
          radius={0.25 + Math.random() * 0.2}
        />
      ))}

      {/* Particle field */}
      <ParticleField count={100} />
    </>
  );
}

/* ─── Exported Interactive 3D Banner ─── */
export default function Interactive3DBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-gradient-to-b from-[#071F16] via-[#0A2B1E] to-[#081B13] overflow-hidden">
      {/* 3D Canvas */}
      <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[440px]">
        {isVisible && (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        )}

        {/* Overlay Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Farm to Kitchen Experience</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3 drop-shadow-lg">
            Pure. <span className="text-[#D4A373] italic font-serif">Authentic.</span> Delivered.
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-lg leading-relaxed mb-6">
            Single-origin spices, stone-ground flours, and handpicked dry fruits from 450+ Indian farms — now at your UK doorstep.
          </p>

          <div className="flex items-center gap-3 pointer-events-auto">
            <a
              href="/shop"
              className="px-6 py-2.5 bg-[#D4A373] hover:bg-[#c49262] text-gray-950 font-bold text-xs sm:text-sm rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Explore the Store
            </a>
            <a
              href="/story"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-full border border-white/25 backdrop-blur-sm transition-all"
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#081B13] to-transparent z-5 pointer-events-none" />
      </div>
    </section>
  );
}
