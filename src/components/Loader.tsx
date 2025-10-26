"use client";

import { motion } from "framer-motion";

export default function Loader() {
  // frequency-like oscillation for each dot with staggered phase
  const duration = 1.2;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex items-end gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-white"
            animate={{
              y: [0, -14, 0],
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: i * (duration / 10) }}
          />
        ))}
      </div>
    </div>
  );
}
