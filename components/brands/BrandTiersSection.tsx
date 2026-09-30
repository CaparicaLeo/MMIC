"use client";

import { CTAButton } from "@/components/ui/CTAButton";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { brands } from "@/content";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { cn } from "@/lib/cn";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Cotas comerciais.
 *
 * A cota completa (Lead Generation) ganha fundo próprio e um marcador — é ela
 * que a página quer vender, então a distinção precisa existir antes do texto.
 */
export function BrandTiersSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-tier-card]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-tier-grid]"),
      each: 0.12,
      y: 28,
    });
  });

  const { tiers } = brands.tiers;

  return (
    <Section id="cotas" tone="darker">
      <div ref={root}>
        <SectionHeader intro={brands.tiers.intro} align="center" />

        <ul
          data-tier-grid
          className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3"
        >
          {tiers.map((tier, index) => (
            <li
              key={tier.id}
              data-tier-card
              className={cn(
                "flex flex-col border p-8 transition-colors duration-300 lg:p-10",
                tier.featured
                  ? "border-accent-red-dark bg-[#120406]"
                  : "border-white/10 bg-bg-dark hover:border-white/25",
              )}
            >
              {tier.featured ? (
                <span className="label-condensed mb-6 w-fit bg-accent-red px-3 py-1.5 text-[0.7rem] leading-none text-text-white">
                  Mais completo
                </span>
              ) : null}

              <span className="label-condensed text-[0.7rem] text-text-gray">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="headline mt-4 text-2xl">{tier.title}</h3>

              <p className="mt-3 text-sm text-text-white/85">{tier.tagline}</p>

              <p className="mt-4 text-sm leading-relaxed text-text-gray">
                {tier.description}
              </p>

              <h4 className="label-condensed mt-8 text-[0.7rem] text-text-white/70">
                O que está incluso
              </h4>

              <ul className="mt-4 flex flex-1 flex-col gap-3">
                {tier.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-text-gray"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 bg-accent-red"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-white/10 pt-6 text-sm text-text-white/85">
                <span className="label-condensed text-[0.7rem] text-text-gray">
                  Objetivo ideal:
                </span>{" "}
                {tier.goal}
              </p>

              <div className="mt-6">
                <CTAButton
                  href={brands.hero.cta.href}
                  variant={tier.featured ? "primary" : "outline"}
                  size="md"
                  animateIn={false}
                  className="w-full"
                >
                  {brands.tiers.ctaLabel}
                </CTAButton>
              </div>
            </li>
          ))}
        </ul>

        <p data-reveal className="mt-6 text-xs text-text-gray">
          {brands.tiers.note}
        </p>

        {/* Progressão das cotas: a soma das três é o que a página vende, e
            numa lista ela se perde. */}
        <div data-reveal className="mt-16 flex flex-wrap items-center gap-4">
          {brands.tiers.evolution.map((step, index) => (
            <span key={step} className="flex items-center gap-4">
              {index > 0 ? (
                <span aria-hidden className="text-text-gray">
                  →
                </span>
              ) : null}
              <span className="label-condensed text-sm text-text-white">
                {step}
              </span>
            </span>
          ))}
        </div>

        <p
          data-reveal
          className="headline mt-6 max-w-3xl text-[clamp(1.5rem,4vw,2.75rem)]"
        >
          {brands.tiers.closingLine}
        </p>
      </div>
    </Section>
  );
}
