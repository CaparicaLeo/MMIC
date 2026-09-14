"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { ContestButton } from "@/components/contest/ContestButton";
import { Section } from "@/components/ui/Section";
import { contest, contestDeadline } from "@/content";
import { revealLines, fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/* Assinatura de fecho reutilizada da home: arte (não tipografia), trouxe o
   realce vermelho em "ROCK" que a fonte não reproduz. */
const closingLockup = {
  src: "/images/curitiba-e-rock.png",
  alt: "Curitiba é rock. Curitiba corre.",
  width: 1177,
  height: 395,
} as const;

/**
 * Fecho da página /concurso-de-camisetas.
 * Centralizado, com gradiente radial e o CTA principal do concurso.
 */
export function ContestFinalCtaSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    revealLines(scope.querySelectorAll("[data-final-line]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 80%",
    });

    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });
  });

  return (
    <Section className="grain overflow-hidden pb-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_100%,var(--color-accent-red-dark)_0%,transparent_60%)] opacity-80"
      />

      <div ref={root} className="relative flex flex-col items-center text-center">
        <Badge data-reveal>{contest.finalCta.kicker}</Badge>

        <h2 className="headline mt-8 max-w-4xl text-[clamp(2.25rem,7vw,5.5rem)]">
          <span className="headline-mask">
            <span data-final-line className="block will-change-transform">
              Prepare a tela.
            </span>
          </span>
          <span className="headline-mask">
            <span data-final-line className="block will-change-transform">
              A sua arte pode vestir a prova.
            </span>
          </span>
        </h2>

        <p
          data-reveal
          className="mt-8 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {contest.finalCta.description}
        </p>

        <div data-reveal className="mt-10">
          <ContestButton />
        </div>

        <p
          data-reveal
          className="label-condensed mt-6 text-[0.7rem] text-text-gray"
        >
          {contestDeadline
            ? `Prazo final: ${contestDeadline}`
            : "Prazo final: em breve"}
        </p>

        <div data-reveal className="mt-16 w-full max-w-2xl">
          <Image
            src={closingLockup.src}
            alt={closingLockup.alt}
            width={closingLockup.width}
            height={closingLockup.height}
            sizes="(min-width: 768px) 42rem, 90vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </Section>
  );
}