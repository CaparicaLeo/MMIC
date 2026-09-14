"use client";

import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contest } from "@/content";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { cn } from "@/lib/cn";

/**
 * Premiação do concurso: 1º, 2º e 3º lugar.
 * Grid com linhas de 1px no padrão da home; o 1º lugar ganha o vermelho.
 */
export function PrizesSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-prize-card]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-prize-grid]"),
      y: 28,
      each: 0.12,
    });
  });

  return (
    <Section id="premiacao">
      <div ref={root}>
        <SectionHeader intro={contest.prizes.intro} />

        <div
          data-prize-grid
          className="mt-14 grid gap-px border border-white/10 bg-white/10 lg:mt-20 lg:grid-cols-3"
        >
          {contest.prizes.items.map((item) => (
            <article
              key={item.id}
              data-prize-card
              className={cn(
                "flex flex-col bg-bg-dark p-8 lg:p-10",
                item.featured && "bg-[#120406]",
              )}
            >
              {item.featured ? <Badge className="w-fit">Destaque</Badge> : null}

              <p
                className={cn(
                  "label-condensed mt-6 text-sm text-text-gray",
                  item.featured && "mt-4",
                )}
              >
                {item.place}
              </p>

              <p
                className={cn(
                  "font-display text-6xl leading-none tracking-[-0.02em] lg:text-7xl",
                  item.featured ? "text-accent-red" : "text-text-white",
                )}
              >
                {item.value}
              </p>

              <p className="mt-6 border-t border-white/10 pt-6 text-sm leading-relaxed text-text-white/85">
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}