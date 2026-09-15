"use client";

import { Badge } from "@/components/ui/Badge";
import { Highlight } from "@/components/ui/Highlight";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { contest } from "@/content";
import { fadeUp, parallax, revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

const PARALLAX_STRENGTH = 3.5;

/**
 * Duas seções separadas:
 *
 * 1. <desafio> — a intro, só texto (badge, título, descrição).
 * 2. <criacao> — a citação do diretor com a frase e, ao lado, a imagem da
 *    camisa-template em degrade (escrita · degrade · imagem), como no hero.
 */
export function ChallengeSection() {
  const challengeMedia = contest.challenge.media;

  const introRoot = useGsapScroll<HTMLDivElement>(
    ({ scope, prefersReducedMotion }) => {
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
    },
  );

  const quoteRoot = useGsapScroll<HTMLDivElement>(
    ({ scope, prefersReducedMotion }) => {
      fadeUp(scope.querySelectorAll("[data-reveal]"), {
        prefersReducedMotion,
        trigger: scope,
        stagger: 0.12,
      });

      parallax(scope.querySelector("[data-challenge-media]"), {
        prefersReducedMotion,
        trigger: scope,
        strength: PARALLAX_STRENGTH,
      });
    },
  );

  return (
    <>
      {/* Seção 1 — O desafio, só texto. */}
      <Section id="desafio" tone="darker">
        <div ref={introRoot} className="container-page">
          <Badge data-reveal className="w-fit">
            {contest.challenge.intro.kicker}
          </Badge>

          <h2 className="headline-mask headline mt-8 text-[clamp(2rem,6vw,4.25rem)] text-text-white">
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
          </h2>

          <p
            data-reveal
            className="mt-10 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg"
          >
            {contest.challenge.intro.description}
          </p>
        </div>
      </Section>

      {/* Seção 2 — a citação do diretor com a arte ao lado. */}
      <Section id="criacao" tone="darker" bleed className="isolate overflow-hidden">
        <div ref={quoteRoot} className="container-page">
          <div className="grid items-start gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <blockquote
              data-reveal
              className="border-l-2 border-accent-red pl-6 sm:pl-8"
            >
              <p className="headline text-[clamp(1.5rem,4vw,2.75rem)] text-text-white">
                &ldquo;{contest.challenge.quote}&rdquo;
              </p>
              <cite className="label-condensed mt-5 block text-[0.7rem] not-italic text-text-gray">
                {contest.challenge.attribution}
              </cite>
            </blockquote>

            <figure data-reveal className="relative self-start">
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: `${challengeMedia.width} / ${challengeMedia.height}`,
                }}
              >
                {/* Degradê preto → transparente: funde a base com o fundo escuro
                    e deixa a arte aparecer (escrita · degrade · imagem). */}
                <div aria-hidden className="absolute inset-0 -z-10">
                  <div data-challenge-media className="absolute inset-x-0 -top-[4%] h-[108%]">
                    <Media
                      media={challengeMedia}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="h-full w-full"
                    />
                  </div>
                </div>

                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-b from-transparent to-bg-dark/55"
                />
              </div>

              {challengeMedia.caption ? (
                <figcaption className="label-condensed mt-3 block text-[0.7rem] text-text-gray">
                  {challengeMedia.caption}
                </figcaption>
              ) : null}
            </figure>
          </div>
        </div>
      </Section>
    </>
  );
}
