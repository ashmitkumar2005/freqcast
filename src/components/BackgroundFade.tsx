"use client";

import { motion } from "motion/react";

export default function BackgroundFade({
  src,
  duration = 0.8,
  style,
  className,
}: {
  src?: string;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      className={(className ? className + " " : "") + "absolute inset-0 z-0 bg-fixed"}
      style={
        src
          ? {
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              ...(style || {}),
            }
          : style
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, ease: "easeOut" }}
    />
  );
}
