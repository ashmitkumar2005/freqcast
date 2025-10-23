"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return;

      e.preventDefault();
      setTargetHref(href);
      setShowLoader(true);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (showLoader && targetHref) {
      const timer = setTimeout(() => {
        router.push(targetHref);
        setShowLoader(false);
        setTargetHref(null);
      }, 1000); // loader visible for 1 sec before navigating
      return () => clearTimeout(timer);
    }
  }, [showLoader, targetHref, router]);

  return (
    <>
      {showLoader && <Loader />}
      {children}
    </>
  );
}
