"use client";

import { CTAButton } from "@/components/ui/CTAButton";
import { Section } from "@/components/ui/Section";
import { brands } from "@/content";
import { fadeUp, revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Fecho da página /marcas.
 *
 * Centralizado, com o mesmo degradê radial e o reveal em máscara do fecho do
 * concurso. Sem a arte "Curitiba é rock": ela já fecha a home e a página do
 * concurso, e repetir o lockup aqui seria a terceira vez na mesma sessão.
 */
export function BrandFinalCtaSection() {
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
        <h2 className="headline max-w-4xl text-[clamp(2.25rem,7vw,5.5rem)]">
          <span className="headline-mask">
            <span data-final-line className="block will-change-transform">
              {brands.finalCta.intro.title}
            </span>
          </span>
        </h2>

        <p
          data-reveal
          className="mt-8 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {brands.finalCta.intro.description}
        </p>

        <div data-reveal className="mt-10">
          <CTAButton href={brands.finalCta.cta.href} animateIn={false}>
            {brands.finalCta.cta.label}
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}
