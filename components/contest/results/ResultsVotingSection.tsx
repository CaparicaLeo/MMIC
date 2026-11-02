"use client";

import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RegisterButton } from "@/components/registration/RegisterButton";
import { contest, contestResults, finalCta } from "@/content";
import { fadeUp, parallax } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Como votar, enquanto não há resultado.
 *
 * Texto de um lado, a camisa preta do outro (escrita · imagem), como a
 * citação do diretor em <ChallengeSection>. O voto é no Instagram, mas o CTA
 * é o grupo VIP: é ele que avisa quando a votação abre.
 */
export function ResultsVotingSection() {
  const { intro, media } = contestResults.voting;

  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });

    parallax(scope.querySelector("[data-voting-media]"), {
      prefersReducedMotion,
      trigger: scope,
      strength: 3.5,
    });
  });

  return (
    <Section id="votacao" tone="darker" className="overflow-hidden">
      <div ref={root} className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <SectionHeader intro={intro}>
          <div data-reveal className="mt-4 flex flex-col gap-4">
            <RegisterButton cta={finalCta.cta} source="concurso-votacao" animateIn={false} />
            <a
              href={contest.voting.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-condensed text-[0.7rem] text-text-gray underline-offset-4 hover:text-text-white hover:underline"
            >
              Instagram oficial: {contest.voting.handle}
            </a>
          </div>
        </SectionHeader>

        <figure data-reveal>
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: `${media.width} / ${media.height}` }}
          >
            <div data-voting-media className="absolute inset-x-0 -top-[4%] h-[108%]">
              <Media media={media} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full" />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-b from-transparent to-bg-dark/55"
            />
          </div>
          {media.caption ? (
            <figcaption className="label-condensed mt-3 text-[0.7rem] text-text-gray">
              {media.caption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </Section>
  );
}
