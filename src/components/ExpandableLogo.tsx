"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ExpandableLogo({ size = 40 }: { size?: number }) {
  // Increase the visible logo by 20% compared to the provided `size` prop
  const effectiveSize = Math.round(size * 1.2);
  const [hovered, setHovered] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const labelMeasureRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const spring = { type: "spring" as const, stiffness: 120, damping: 20 };

  useEffect(() => {
    // Measure the label width using a visually-hidden offscreen element
    if (labelMeasureRef.current) {
      const w = Math.ceil(labelMeasureRef.current.getBoundingClientRect().width);
      setLabelWidth(w);
    }
  }, []);

  // collapsed inner padding for the logo slot
  const collapsedInnerPadding = 6; // px (used previously when pill was sized)
  const pillExtraHeight = 1; // decreased by 2px per user request
  const logoSlotWidth = effectiveSize + collapsedInnerPadding * 2; // keep pill width unchanged
  const logoSlotHeight = effectiveSize + collapsedInnerPadding * 2 + pillExtraHeight; // height including the extra 3px

  // Display image 50% larger than the provided `size` prop, but keep the pill width the same.
  const displayedImageSize = Math.round(size * 1.5);
  // Compute adjusted inner padding so the larger image fits inside the same logoSlotWidth
  let adjustedInnerPadding = Math.floor((logoSlotWidth - displayedImageSize) / 2);
  if (adjustedInnerPadding < 2) adjustedInnerPadding = 2;

  // width needed for the text area when expanded (including spacing)
  const spacingBetween = 8; // px between logo and text
  const textRightPadding = 12; // px right-side padding when expanded
  const expandedTextWidth = spacingBetween + labelWidth + textRightPadding;

  return (
    <motion.div
      ref={containerRef}
      aria-label="FreqCast"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="inline-flex items-center rounded-full"
      tabIndex={0}
      style={{
        borderRadius: 9999,
        background: "transparent",
  border: "1px solid rgba(255,255,255,0.95)",
        boxShadow: "none",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* Left: fixed logo slot so the image never moves */}
      <div style={{ width: logoSlotWidth, height: logoSlotHeight, flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", padding: `${adjustedInnerPadding}px` }}>
        <Image src="/logo.png" alt="FreqCast" width={displayedImageSize} height={displayedImageSize} />
      </div>

      {/* Right: animate only this text container's width from 0 -> expandedTextWidth */}
      <motion.div
        initial={false}
        animate={{ width: hovered ? expandedTextWidth : 0, backgroundColor: hovered ? 'rgba(255,255,255,0.02)' : 'transparent' }}
        transition={spring}
        style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      >
        <div style={{ paddingLeft: spacingBetween, paddingRight: textRightPadding }}>
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

      {/* Hidden measuring span (does not affect layout) */}
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
