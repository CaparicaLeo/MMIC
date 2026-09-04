"use client";

import { RegisterButton } from "@/components/registration/RegisterButton";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { distances } from "@/content";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { cn } from "@/lib/cn";

export function DistancesSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-distance-card]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-distance-grid]"),
      start: "top 82%",
      y: 36,
      each: 0.14,
    });
  });

  return (
    <Section id="distancias" tone="darker">
      <div ref={root}>
        <SectionHeader intro={distances.intro} />

        <div
          data-distance-grid
          className="mt-14 grid gap-px border border-white/10 bg-white/10 lg:mt-20 lg:grid-cols-3"
        >
          {distances.items.map((item) => (
            <article
              key={item.id}
              data-distance-card
              className={cn(
                "flex flex-col bg-bg-dark p-8 lg:p-10",
                item.featured && "bg-[#120406]",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "font-display text-6xl leading-none tracking-[-0.02em] lg:text-7xl",
                      item.featured ? "text-accent-red" : "text-text-white",
                    )}
                  >
                    {item.distance}
                  </span>
                  <span className="label-condensed text-lg text-text-gray">
                    {item.unit}
                  </span>
                </p>

                {item.featured ? <Badge>Prova principal</Badge> : null}
              </div>

              <h3 className="label-condensed mt-6 text-sm text-text-white">
                {item.name}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-text-gray">
                {item.description}
              </p>

              <ul className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-7">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-text-white/85"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 bg-accent-red"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-9 pt-1">
                <RegisterButton
                  cta={item.cta}
                  source={`distancia-${item.id}`}
                  variant={item.featured ? "primary" : "outline"}
                  size="md"
                  animateIn={false}
                  className="w-full"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
