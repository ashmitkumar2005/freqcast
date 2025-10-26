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
  const [isChrome, setIsChrome] = useState(false);
  const [maskPosNum, setMaskPosNum] = useState<{ cx: number; cy: number }>({ cx: 150, cy: 50 });

  useEffect(() => {
    // Detect Chrome on client to tweak visual styles without changing markup
    try {
      const ua = navigator.userAgent;
      const chrome = /Chrome\//.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua);
      if (chrome) setIsChrome(true);
    } catch {}

    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
      // Also compute numeric coordinates in viewBox space (300x100)
      const cxNum = ((cursor.x - svgRect.left) / svgRect.width) * 300;
      const cyNum = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosNum({ cx: cxNum, cy: cyNum });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      colorInterpolationFilters="sRGB"
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

        {/* Softer outer glow */}
        <filter id="outerGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Blur the mask circle to feather the edge */}
        <filter id="maskBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        {/* Feathered mask with moving circle (Chrome-friendly) */}
        <mask id="textMask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
          <rect x="0" y="0" width="300" height="100" fill="black" />
          <motion.circle
            r={26}
            initial={{ cx: 0, cy: 50 }}
            animate={
              hovered
                ? { cx: maskPosNum.cx, cy: maskPosNum.cy }
                : { cx: [0, 300, 0], cy: [50, 50, 50] }
            }
            transition={
              hovered
                ? { type: "spring", stiffness: 80, damping: 100 }
                : { duration: 12, ease: "easeInOut", repeat: Infinity }
            }
            style={{ willChange: "cx, cy" }}
            filter="url(#maskBlur)"
            fill="white"
          />
        </mask>

      </defs>

      {/* Base subtle fill with thin outline for a refined, outlined look */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        paintOrder="stroke"
        className={`text-7xl font-bold ${className ?? ''}`}
        style={{
          WebkitFontSmoothing: "antialiased",
          textRendering: "geometricPrecision",
          fontFamily: "var(--font-axuno), sans-serif",
          fontSynthesis: "none",
          fontWeight: 400,
          fill: "#000000",
          stroke: "#000000",
          strokeWidth: 0.2,
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
        strokeWidth="0.7"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.55}
        vectorEffect="non-scaling-stroke"
        mask="url(#textMask)"
        className={`text-7xl font-bold ${className ?? ''}`}
        style={{
          WebkitFontSmoothing: "antialiased",
          textRendering: "geometricPrecision",
          fontFamily: "var(--font-axuno), sans-serif",
          fontSynthesis: "none",
          fontWeight: 400,
        }}
        filter="url(#outerGlow)"
      >
        {text}
      </text>
    </svg>
  );
};
