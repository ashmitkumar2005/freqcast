"use client";
import React, { JSX } from "react";

type ElementTag<P = {}> = keyof JSX.IntrinsicElements | React.ComponentType<P>;

type HoverBorderGradientProps = {
  as?: ElementTag; // "div" | "button" | "a" ...
  containerClassName?: string;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function HoverBorderGradient({
  as: Tag = "div",
  containerClassName = "",
  className = "",
  children,
  ...props
}: HoverBorderGradientProps) {
  const Comp = Tag as React.ElementType;
  return (
    <div
      className={`group relative inline-flex items-center overflow-hidden p-[2px] ${containerClassName}`}
      // rounded-... comes from containerClassName so borders match inner element
    >
      {/* Gradient border */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-500 group-hover:scale-110"
      />
      {/* Inner surface */}
      <Comp
        className={`relative z-10 rounded-[inherit] px-3 py-1.5 ${className}`}
        {...(props as any)}
      >
        {children}
      </Comp>
    </div>
  );
}