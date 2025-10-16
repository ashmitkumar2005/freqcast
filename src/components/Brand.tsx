"use client";
import React from "react";
import Image from "next/image";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function Brand() {
  return (
    <HoverBorderGradient
      containerClassName="rounded-full"
      as="div"
      // more gap + padding + a min width so the logo has room
      className="bg-black text-white flex items-center gap-0 pl-3 pr-7 py-0 shrink-0" 
    >
    <Image
    src="/logo.png"
    alt="FreqCast logo"
    width={4096}          // use your logo’s real pixel width
    height={1956}          // and real pixel height (keeps aspect ratio)
    priority
    className="h-7 w-auto object-contain shrink-0"
    />
      <span className="font-medium">FreqCast</span>
    </HoverBorderGradient>
  );
}