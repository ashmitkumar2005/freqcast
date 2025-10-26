"use client";
import { useEffect } from "react";

// Globally reveal common elements with a subtle fade + rise when they enter the viewport.
export default function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document;

    const selector = [
      "h1, h2, h3, h4, h5, h6",
      "p, li",
      "a, button",
      "section, article, aside",
      "[data-card], .card, .group",
      "[data-reveal]",
    ].join(",");

    const candidates = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.closest("header") && !el.closest("footer")
    );

    // Initialize state and optional stagger based on DOM order
    candidates.forEach((el, idx) => {
      if (el.dataset.revealed === "1") return;
      el.dataset.revealed = "0";
      el.classList.add("reveal");
      // Small stagger for siblings to avoid all popping at once
      el.style.setProperty("--reveal-delay", `${Math.min((idx % 20) * 25, 200)}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // reveal and unobserve to keep it one-time
            el.classList.add("is-visible");
            el.dataset.revealed = "1";
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "-6% 0px -6% 0px", threshold: 0.08 }
    );

    candidates.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
