"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import localFont from "next/font/local";

const viola = localFont({ src: "../app/fonts/VIOLA.ttf", weight: "400", style: "normal" });

export default function ExpandableLogo({ size = 100 }: { size?: number }) {
  // Increase the visible logo by 20% compared to the provided `size` prop
  const effectiveSize = Math.round(size * 0.8);
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
  const collapsedInnerPadding = 3; // px (used previously when pill was sized)
  const pillExtraHeight = 0; // increased by 1px per user request
  const logoSlotWidth = effectiveSize + collapsedInnerPadding * 12; // keep pill width unchanged
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

  // White outer glow (subtle by default, brighter on hover)
  // lighter, subtler ring
const baseGlow =
  "0 0 0 1px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.2)";
const hoverGlow =
    "0 0 0 0.5px rgba(255,255,255,0.6), 0 0 14px rgba(255,255,255,0.5), 0 0 28px rgba(255,255,255,0.35)";

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
      initial={false}
      animate={{
        boxShadow: hovered ? hoverGlow : baseGlow,
        borderColor: hovered ? "rgba(255,255,255,0.5)" : "rgba(82,82,82,1)",
      }}
      transition={spring}
      style={{
        borderRadius: 9999,
        background: "transparent",
        border: "1px solid",
        overflow: "hidden",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* Left: fixed logo slot so the image never moves */}
      <div
        style={{
          width: logoSlotWidth,
          height: logoSlotHeight,
          flex: "0 0 auto",
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
        />
      </div>

      {/* Right: animate only this text container's width from 0 -> expandedTextWidth */}
      <motion.div
        initial={false}
        animate={{
          width: hovered ? expandedTextWidth : 0,
          backgroundColor: hovered ? "rgba(255,255,255,0.02)" : "transparent",
        }}
        transition={spring}
        style={{ overflow: "hidden", display: "flex", alignItems: "center" }}
      >
        <div style={{ paddingLeft: spacingBetween, paddingRight: textRightPadding }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ...spring, duration: 0.25 }}
            className={`${viola.className} text-white font-normal whitespace-nowrap`}
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
        className={viola.className}
      >
        FreqCast
      </span>
    </motion.div>
  );
}