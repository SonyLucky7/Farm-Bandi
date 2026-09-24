"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
  scaleOnHover?: number;
}

/**
 * A 3D tilt card that responds to mouse movement with perspective transforms.
 * Wrap any content inside for a premium interactive hover effect.
 */
export default function Tilt3DCard({
  children,
  className = "",
  tiltAmount = 10,
  glareEnabled = true,
  scaleOnHover = 1.02,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);

  // Glare position
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? scaleOnHover : 1,
        }}
        transition={{ duration: 0.2 }}
        className="relative w-full h-full"
      >
        {children}

        {/* Glare overlay */}
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 overflow-hidden"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
            }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
