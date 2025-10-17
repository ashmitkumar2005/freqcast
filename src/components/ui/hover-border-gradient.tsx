"use client";
import React from "react";

type ElementTag = React.ElementType;

type PolymorphicProps<C extends ElementTag> = {
  as?: C;
  containerClassName?: string;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "className" | "children">;

type PolymorphicRef<C extends ElementTag> = React.ComponentPropsWithRef<C>["ref"];

const HoverBorderGradientInner = <C extends ElementTag = "div">(
  {
    as,
    containerClassName = "",
    className = "",
    children,
    ...rest
  }: PolymorphicProps<C>,
  ref: PolymorphicRef<C>
) => {
  const Comp = (as || "div") as ElementTag;

  return (
    <div className={`group relative inline-flex items-center overflow-hidden p-[2px] ${containerClassName}`}>
      {/* Gradient border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-500 group-hover:scale-110"
      />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
<Comp
  ref={ref}
  className={`relative z-10 rounded-[inherit] px-3 py-1.5 ${className}`}
  {...rest as React.ComponentPropsWithoutRef<C>}
>
  {children}
</Comp>
    </div>
  );
};

export const HoverBorderGradient = React.forwardRef(HoverBorderGradientInner) as <
  C extends ElementTag = "div"
>(
  props: PolymorphicProps<C> & { ref?: PolymorphicRef<C> }
) => React.ReactElement | null;