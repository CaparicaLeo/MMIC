"use client";

import { NumberedGrid } from "@/components/brands/NumberedGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { brands } from "@/content";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * O ativo do evento, do ponto de vista da marca.
 *
 * A versão da página institucional tratava este bloco como as capacidades da
 * produtora. Aqui é o contrário — a MMIC é o evento, não uma agência — então a
 * lista responde "o que existe aqui que eu não encontro em outro lugar", e
 * cada item se sustenta num dado que já está em /content.
 */
export function BrandPillarsSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-grid-item]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-grid]"),
      each: 0.08,
      y: 24,
    });
  });

  return (
    <Section id="porque" tone="darker">
      <div ref={root}>
        <SectionHeader intro={brands.pillars.intro} />

        <NumberedGrid items={brands.pillars.pillars} />

        <p
          data-reveal
          className="headline mt-14 max-w-3xl text-[clamp(1.5rem,4vw,2.75rem)]"
        >
          {brands.pillars.closingLine}
        </p>
      </div>
    </Section>
  );
}
