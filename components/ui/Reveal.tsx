"use client";

import type { ElementType, ReactNode } from "react";

import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { cn } from "@/lib/cn";

/**
 * Reveal genérico por scroll (fade + slide up).
 *
 * - sem `stagger`: anima o próprio wrapper;
 * - com `stagger`: anima os elementos marcados com `data-reveal` dentro dele
 *   (ou os filhos diretos, se nenhum estiver marcado).
 *
 * Reutilizável em qualquer página futura.
 */
export function Reveal({
  children,
  as: Component = "div",
  className,
  stagger,
  delay = 0,
  y = 28,
  start = "top 85%",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  start?: string;
}) {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    if (stagger === undefined) {
      fadeUp(scope, { prefersReducedMotion, trigger: scope, start, delay, y });
      return;
    }

    const marked = scope.querySelectorAll("[data-reveal]");
    const targets = marked.length > 0 ? marked : scope.children;

    fadeUp(targets, {
      prefersReducedMotion,
      trigger: scope,
      start,
      delay,
      y,
      stagger,
    });
  });

  return (
    <Component ref={root} className={cn("will-animate", className)}>
      {children}
    </Component>
  );
}
