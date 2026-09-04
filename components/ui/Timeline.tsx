"use client";

import { drawLine, fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { cn } from "@/lib/cn";
import type { TimelineItem } from "@/content/types";

/**
 * Timeline vertical com linha de progresso que se desenha conforme o scroll.
 *
 * A linha usa `scaleY` (transform) em vez de `height` — animar altura
 * dispararia layout a cada frame e é o jeito mais rápido de travar o scroll
 * num celular intermediário.
 *
 * Reutilizável para a futura página /cronograma, com uma lista maior.
 */
export function Timeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  const root = useGsapScroll<HTMLOListElement>(
    ({ scope, prefersReducedMotion, gsap: g, ScrollTrigger: st }) => {
      const progress = scope.querySelector("[data-timeline-progress]");
      const entries = scope.querySelectorAll<HTMLElement>("[data-timeline-item]");

      if (progress) {
        drawLine(progress, {
          prefersReducedMotion,
          trigger: scope,
          start: "top 65%",
          end: "bottom 75%",
        });
      }

      fadeUp(entries, {
        prefersReducedMotion,
        trigger: scope,
        stagger: 0.1,
        y: 24,
      });

      if (prefersReducedMotion) return;

      // Cada marcador "acende" quando a linha de progresso passa por ele.
      entries.forEach((entry) => {
        const marker = entry.querySelector("[data-timeline-marker]");
        if (!marker) return;

        g.set(marker, { scale: 0.75, backgroundColor: "#0A0A0A" });

        st.create({
          trigger: entry,
          start: "top 65%",
          onEnter: () =>
            g.to(marker, {
              scale: 1,
              backgroundColor: "#EC7316",
              duration: 0.4,
              ease: "back.out(2)",
            }),
          onLeaveBack: () =>
            g.to(marker, {
              scale: 0.75,
              backgroundColor: "#0A0A0A",
              duration: 0.3,
            }),
        });
      });
    },
  );

  return (
    <ol ref={root} className={cn("relative pl-10 sm:pl-14", className)}>
      {/* Trilho estático */}
      <span
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px bg-white/12 sm:left-[11px]"
      />
      {/* Progresso vermelho, desenhado no scroll */}
      <span
        aria-hidden
        data-timeline-progress
        className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent-red sm:left-[11px]"
      />

      {items.map((item) => (
        <li
          key={item.id}
          data-timeline-item
          className="relative pb-12 last:pb-0 sm:pb-16"
        >
          <span
            aria-hidden
            data-timeline-marker
            className="absolute top-1.5 -left-10 size-[15px] rounded-full border-2 border-accent-red sm:-left-14 sm:size-[23px]"
          />

          <p className="label-condensed font-display text-3xl text-text-white sm:text-4xl">
            {item.time}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-text-white sm:text-2xl">
            {item.title}
          </h3>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-text-gray">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
