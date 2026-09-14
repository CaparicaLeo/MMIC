"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contest } from "@/content";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Contexto da prova que a camiseta vai vestir: distâncias, largada,
 * projeção de público e inscrições. Cards no padrão da home.
 */
export function RaceSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-race-card]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-race-grid]"),
      y: 28,
      each: 0.1,
    });
  });

  return (
    <Section id="prova">
      <div ref={root}>
        <SectionHeader intro={contest.race.intro} />

        <div
          data-race-grid
          className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20"
        >
          {contest.race.items.map((item) => (
            <article key={item.id} data-race-card className="bg-bg-dark p-8 lg:p-10">
              <h3 className="text-xl font-semibold text-text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-text-gray">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}