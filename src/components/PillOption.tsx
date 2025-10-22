"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PillOptionProps {
  text?: string;          // pill text
  size?: number;          // text base size
  length?: number;        // pill width
  logoSrc?: string;       // logo path from /public
  logoSize?: number;      // logo size
  glowColor?: string;     // glow color
}

export default function PillOption({
  text = "CREATOR",
  size = 60,
  length = 300,
  logoSrc = "/creator.png",
  logoSize,
  glowColor = "255,0,0",
}: PillOptionProps) {
  const breadth = length / 5; // 5:1 ratio
  const [hovered, setHovered] = useState(false);
  const [labelHeight, setLabelHeight] = useState(0);
  const labelMeasureRef = useRef<HTMLSpanElement | null>(null);

  const spring = { type: "spring" as const, stiffness: 80, damping: 25 };

  useEffect(() => {
    if (labelMeasureRef.current) {
      setLabelHeight(Math.ceil(labelMeasureRef.current.getBoundingClientRect().height));
    }
  }, []);

  const spacingBetween = 8;
  const expandedHeight = breadth + 200 + labelHeight;

  // Constant glow
  const glow = `0 0 0 0.5px rgba(${glowColor},0.6), 0 0 14px rgba(${glowColor},0.5), 0 0 28px rgba(${glowColor},0.35)`;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={false}
      animate={{
        height: hovered ? expandedHeight : breadth,
        boxShadow: glow,
      }}
      transition={spring}
      style={{
        width: length,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(82,82,82,1)",
        borderRadius: breadth / 2,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Logo + Text container */}
      <div
        style={{
          width: "100%",
          height: breadth,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Text perfectly centered */}
        <span
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: size / 2,
            textAlign: "center",
            zIndex: 1,
            position: "relative",
            top: "0px",   // adjust vertical position
            left: "0px",  // adjust horizontal position
          }}
        >
          {text}
        </span>

        {/* Logo positioned before text but not affecting centering */}
        <Image
          src={logoSrc}
          alt="logo"
          width={logoSize || size / 2.2}
          height={logoSize || size / 2.2}
          style={{
            position: "absolute",
            left: `calc(50% - ${size * 1.2}px)`, // shift left relative to center
            objectFit: "contain",
          }}
        />
      </div>

      {/* Expanding text below */}
      <motion.div
        initial={false}
        animate={{ height: hovered ? 50 : 0 }}
        transition={spring}
        style={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ paddingTop: spacingBetween }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ...spring, duration: 0.25 }}
            className="text-white font-semibold whitespace-nowrap"
            style={{ pointerEvents: "none" }}
          >
            FreqCast
          </motion.span>
        </div>
      </motion.div>

      {/* Hidden label for measuring */}
      <span
        ref={labelMeasureRef}
        aria-hidden
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          left: -9999,
          top: -9999,
        }}
      >
        FreqCast
      </span>
    </motion.div>
  );
}
