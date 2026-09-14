"use client";

import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { Section } from "@/components/ui/Section";
import { contest } from "@/content";
import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Votação do público no Instagram oficial da prova.
 * O voto aberto decide a arte vencedora junto da curadoria.
 */
export function VotingSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });
  });

  return (
    <Section id="votacao" tone="darker">
      <div ref={root} className="max-w-4xl">
        <Badge data-reveal className="w-fit">
          {contest.voting.intro.kicker}
        </Badge>

        <h2
          data-reveal
          className="headline mt-8 text-[clamp(2rem,6vw,4.25rem)] text-text-white"
        >
          {contest.voting.intro.title}
        </h2>

        <p
          data-reveal
          className="mt-7 max-w-2xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {contest.voting.intro.description}
        </p>

        <div
          data-reveal
          className="mt-10 inline-flex flex-col gap-5 border border-white/10 p-6 sm:p-8"
        >
          <p className="label-condensed text-lg text-text-white">
            {contest.voting.handle}
          </p>
          <p className="text-sm leading-relaxed text-text-gray">
            {contest.voting.note}
          </p>
          <CTAButton href={contest.voting.instagramUrl} variant="outline" size="md">
            Acompanhar no Instagram
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}