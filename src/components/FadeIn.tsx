"use client";

import { PropsWithChildren } from "react";
import { motion } from "motion/react";

type Props = {
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
};

export default function FadeIn({
  children,
  delay = 0,
  y = 8,
  duration = 0.8,
  className,
}: PropsWithChildren<Props>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration, ease: "easeOut", delay }}
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  );
}
