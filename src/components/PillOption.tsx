"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PillOption({ size = 100 }: { size?: number }) {
  const effectiveSize = Math.round(size * 0.5);
  const [hovered, setHovered] = useState(false);
  const [labelHeight, setLabelHeight] = useState(0);
  const labelMeasureRef = useRef<HTMLSpanElement | null>(null);

  const spring = { type: "spring" as const, stiffness: 120, damping: 20 };

  useEffect(() => {
    if (labelMeasureRef.current) {
      const h = Math.ceil(labelMeasureRef.current.getBoundingClientRect().height);
      setLabelHeight(h);
    }
  }, []);

  const collapsedInnerPadding = 5;
  const pillExtraHeight = 1;
  const logoSlotWidth = effectiveSize + collapsedInnerPadding * 2;
  const logoSlotHeight = effectiveSize + collapsedInnerPadding * 2 + pillExtraHeight;
  const displayedImageSize = Math.round(size * 1.5);

  let adjustedInnerPadding = Math.floor((logoSlotWidth - displayedImageSize) / 2);
  if (adjustedInnerPadding < 2) adjustedInnerPadding = 2;

  const spacingBetween = 4;
  const expandedHeight = spacingBetween + labelHeight + 200;

  // Glows
  const baseGlow =
    "0 0 0 1px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.2)";
  const hoverGlow =
    "0 0 0 0.5px rgba(255,255,255,0.6), 0 0 14px rgba(255,255,255,0.5), 0 0 28px rgba(255,255,255,0.35)";

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="inline-flex flex-col items-center"
      tabIndex={0}
      initial={false}
      animate={{
        boxShadow: hovered ? hoverGlow : baseGlow,
        borderColor: hovered ? "rgba(255,255,255,0.5)" : "rgba(82,82,82,1)",
      }}
      transition={spring}
      style={{
        borderRadius: 9999,
        backgroundColor: "transparent", // fully transparent
        border: "1px solid",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: logoSlotWidth,
          height: logoSlotHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${adjustedInnerPadding}px`,
        }}
      >
        <Image
          src="/logo.png"
          alt="FreqCast"
          width={displayedImageSize}
          height={displayedImageSize}
          style={{ backgroundColor: "transparent" }} // remove blue bg
        />
      </div>

      {/* Text expanding downward */}
      <motion.div
        initial={false}
        animate={{ height: hovered ? expandedHeight : 0 }}
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

      {/* Hidden label measuring */}
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
