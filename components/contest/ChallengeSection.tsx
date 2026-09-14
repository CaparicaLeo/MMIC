"use client";

import { Badge } from "@/components/ui/Badge";
import { Highlight } from "@/components/ui/Highlight";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { contest } from "@/content";
import { fadeUp, parallax, revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Imagem reutilizada do hero: corredores + palco = corrida + rock + Curitiba.
 * Trocar por arte própria do concurso quando existir.
 */
const heroImage = {
  src: "/images/hero-palco.jpg",
  alt: "Corredores atravessam o palco entre a banda tocando e o público, no fim da tarde",
  width: 2560,
  height: 1429,
} as const;

const PARALLAX_OVERSCAN = 1.08;
const PARALLAX_STRENGTH = 3.5;

/**
 * O desafio do concurso: corrida, rock e Curitiba numa única estampa.
 * Citação do diretor à esquerda, imagem com parallax à direita.
 */
export function ChallengeSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });

    revealLines(scope.querySelectorAll("[data-challenge-line]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 78%",
    });

    parallax(scope.querySelector("[data-challenge-media]"), {
      prefersReducedMotion,
      trigger: scope,
      strength: PARALLAX_STRENGTH,
    });
  });

  return (
    <Section id="desafio" tone="darker" className="overflow-hidden">
      <div
        ref={root}
        className="relative grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-16"
      >
        <div>
          <Badge data-reveal className="w-fit">
            {contest.challenge.intro.kicker}
          </Badge>

          <p className="headline mt-8 text-[clamp(2rem,6vw,4.25rem)] text-text-white">
            <span className="headline-mask">
              <span data-challenge-line className="block will-change-transform">
                Corrida, rock e
              </span>
            </span>
            <span className="headline-mask">
              <span data-challenge-line className="block will-change-transform">
                Curitiba numa <Highlight>única estampa.</Highlight>
              </span>
            </span>
          </p>

          <p
            data-reveal
            className="mt-10 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg"
          >
            {contest.challenge.intro.description}
          </p>

          <blockquote
            data-reveal
            className="mt-12 border-l-2 border-accent-red pl-6 sm:pl-8"
          >
            <p className="headline text-[clamp(1.5rem,4vw,2.75rem)] text-text-white">
              &ldquo;{contest.challenge.quote}&rdquo;
            </p>
            <cite className="label-condensed mt-5 block text-[0.7rem] not-italic text-text-gray">
              {contest.challenge.attribution}
            </cite>
          </blockquote>
        </div>

        <div data-reveal className="relative self-start">
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: `${heroImage.width} / ${heroImage.height / PARALLAX_OVERSCAN}`,
            }}
          >
            <div data-challenge-media className="absolute inset-x-0 -top-[4%] h-[108%]">
              <Media
                media={heroImage}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full"
              />
            </div>

            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-1 w-24 bg-accent-red"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}