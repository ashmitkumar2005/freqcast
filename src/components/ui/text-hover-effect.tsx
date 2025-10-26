"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="50%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none ${className ?? ""}`}
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#d1d5db" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>

        {/* Subtle AA filter for stroke */}
        <filter id="softStroke" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" />
        </filter>

        {/* Stronger outer glow for stroked outline */}
        <filter id="outerGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>


        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="35%"
          initial={{ cx: "0%", cy: "50%" }}
          animate={hovered ? maskPosition : { cx: ["0%", "100%", "0%"], cy: ["50%", "50%", "50%"] }}
          transition={hovered ? { type: "spring", stiffness: 80, damping: 100 } : { duration: 13.2, ease: "easeInOut", repeat: Infinity }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>

      </defs>

      {/* Base subtle fill with thin outline for a refined, outlined look */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        paintOrder="stroke"
        className="text-7xl font-bold"
        style={{
          WebkitFontSmoothing: "antialiased",
          textRendering: "geometricPrecision",
          fontWeight: 1000,
          fill: "#000000",
          stroke: "#000000",
          strokeWidth: 0.35,
        }}
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {text}
      </text>

      

      {/* Moving OUTER glow reveal using stroked outline + blur (outside border), softened */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="transparent"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="1"
        vectorEffect="non-scaling-stroke"
        mask="url(#textMask)"
        className="text-7xl font-bold"
        style={{ WebkitFontSmoothing: "antialiased", textRendering: "geometricPrecision", fontWeight: 800 }}
        filter="url(#outerGlow)"
      >
        {text}
      </text>
    </svg>
  );
};
