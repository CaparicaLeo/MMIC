"use client";

import { Section } from "@/components/ui/Section";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Timeline } from "@/components/ui/Timeline";
import { backdrops, contestSteps } from "@/content";
import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Passo a passo do concurso a partir das finalistas. A mesma seção vive em
 * /concurso-de-camisetas e em /concurso-de-camisetas/finalistas, com o mesmo
 * layout de <ContestTimelineSection> para os dois lerem como uma coisa só.
 */
export function ContestStepsSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });
  });

  return (
    <Section id="proximos-passos" className="isolate">
      <SectionBackdrop backdrop={backdrops.steps} variant="full" />
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div ref={root} className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader intro={contestSteps.intro} />
        </div>

        <Timeline items={contestSteps.items} />
      </div>
    </Section>
  );
}
