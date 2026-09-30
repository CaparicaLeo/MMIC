"use client";

import { CTAButton } from "@/components/ui/CTAButton";
import { NumberedGrid } from "@/components/brands/NumberedGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { brands } from "@/content";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/** Perfil do público que a marca quer atingir. */
export function BrandAudienceSection() {
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
    <Section id="publico" tone="darker">
      <div ref={root}>
        <SectionHeader intro={brands.audience.intro} />

        <NumberedGrid items={brands.audience.profiles} />

        <div data-reveal className="mt-14">
          <CTAButton href={brands.audience.cta.href} animateIn={false}>
            {brands.audience.cta.label}
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}
