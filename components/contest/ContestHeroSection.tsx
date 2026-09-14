"use client";

import { Badge } from "@/components/ui/Badge";
import { ContestButton } from "@/components/contest/ContestButton";
import { Section } from "@/components/ui/Section";
import { revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { contest } from "@/content";

/**
 * Abertura da página /concurso-de-camisetas.
 *
 * Mesma linguagem visual das páginas "em breve" (badge + headline + apoio
 * sobre gradiente radial), agora com o CTA real do concurso.
 */
export function ContestHeroSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    revealLines(scope.querySelectorAll("[data-hero-line]"), {
      prefersReducedMotion,
      trigger: scope,
    });
  });

  return (
    <Section className="grain min-h-[80vh] pt-40">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 bg-[radial-gradient(90%_60%_at_20%_0%,var(--color-accent-red-dark)_0%,transparent_55%)] opacity-50"
        />
        <div ref={root} className="relative max-w-3xl">
          <Badge>{contest.hero.kicker}</Badge>

          <h1 className="headline mt-8 text-[clamp(2.5rem,8vw,5.5rem)]">
            {["A sua arte pode", "ser a camiseta oficial."].map((line) => (
              <span key={line} className="headline-mask">
                <span data-hero-line className="block will-change-transform">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg">
            {contest.hero.description}
          </p>

          <div className="mt-8">
            <ContestButton />
          </div>
        </div>
      </div>
    </Section>
  );
}