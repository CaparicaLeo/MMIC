"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { RegisterButton } from "@/components/registration/RegisterButton";
import { contestResults, finalCta } from "@/content";
import { fadeUp, revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Fecho da página de resultado.
 *
 * Quem chegou até aqui viu a camisa: o próximo passo é correr com ela. O CTA
 * é o mesmo do fecho da home (grupo VIP), via <RegisterButton>, para trocar
 * junto quando o checkout real entrar.
 */
export function ResultsFinalCtaSection() {
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
        <Badge data-reveal>{contestResults.finalCta.kicker}</Badge>

        <h2 className="headline mt-8 max-w-4xl text-[clamp(2.25rem,7vw,5.5rem)]">
          {contestResults.finalCta.title.map((line) => (
            <span key={line} className="headline-mask">
              <span data-final-line className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-reveal
          className="mt-8 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {contestResults.finalCta.description}
        </p>

        <div data-reveal className="mt-10">
          <RegisterButton cta={finalCta.cta} source="concurso-resultado" pulse animateIn={false} />
        </div>

        {/* Mesma assinatura em arte que fecha a home e o concurso. */}
        <div data-reveal className="mt-16 w-full max-w-2xl">
          <Image
            src={finalCta.closingLockup.src}
            alt={finalCta.closingLockup.alt}
            width={finalCta.closingLockup.width}
            height={finalCta.closingLockup.height}
            sizes="(min-width: 768px) 42rem, 90vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </Section>
  );
}
