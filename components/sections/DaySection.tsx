"use client";

import { Section } from "@/components/ui/Section";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Timeline } from "@/components/ui/Timeline";
import { backdrops, schedule } from "@/content";
import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

export function DaySection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });
  });

  return (
    <Section id="o-dia" className="isolate">
      <SectionBackdrop backdrop={backdrops.day} variant="full" />
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div ref={root} className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader intro={schedule.intro} />
        </div>

        <Timeline items={schedule.items} />
      </div>
    </Section>
  );
}
