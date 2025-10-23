"use client";

import { motion } from "framer-motion";

export default function Loader() {
  // up-down bounce animation for each dot
  const bounceTransition = {
    y: {
      duration: 0.6,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="flex space-x-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-white"
            animate={{ y: [0, -15, 0] }}
            transition={{ ...bounceTransition, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
