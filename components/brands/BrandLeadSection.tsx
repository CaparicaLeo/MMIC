"use client";

import { BrandLeadForm } from "@/components/brands/BrandLeadForm";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { brands } from "@/content";
import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Formulário comercial.
 *
 * Duas colunas com cabeçalho fixo: o formulário é longo e a coluna da
 * esquerda repete, no ponto de rolagem em que a pessoa precisa dela, o que a
 * seção promete e para onde a conversa vai. O `id="lead"` é o destino de
 * todos os CTAs da página.
 */
export function BrandLeadSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });
  });

  return (
    <Section id="lead" className="grain overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_100%,var(--color-accent-red-dark)_0%,transparent_60%)] opacity-40"
      />

      <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div ref={root} className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader intro={brands.lead.intro} />
        </div>

        <BrandLeadForm />
      </div>
    </Section>
  );
}
