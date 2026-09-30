"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { brands } from "@/content";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Onde a marca aparece: branding, presença física e ativações.
 *
 * Grade de hairline (gap-px sobre fundo claro) como no resto do site — cards
 * separados por uma linha de 1px, nunca por borda arredondada.
 */
export function BrandActivationsSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-activation-card]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-activation-grid]"),
      each: 0.1,
      y: 28,
    });
  });

  return (
    <Section id="experiencia" tone="darker">
      <div ref={root}>
        <SectionHeader intro={brands.activations.intro} />

        <ul
          data-activation-grid
          className="mt-14 grid gap-px border border-white/10 bg-white/10 lg:mt-20 lg:grid-cols-3"
        >
          {brands.activations.categories.map((category, index) => (
            <li
              key={category.id}
              data-activation-card
              className="group bg-[#060606] p-8 transition-colors duration-300 hover:bg-[#0b0b0b] lg:p-10"
            >
              <span className="label-condensed text-[0.7rem] text-text-gray">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="headline mt-5 text-2xl">{category.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-text-white/85">
                {category.lead}
              </p>

              <ul className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6">
                {category.items.map((item) => (
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
            </li>
          ))}
        </ul>

        {/* A frase de fecho fica fora do stagger dos cards: é a conclusão da
            seção, e entrar junto deles a faria ler como mais um card. */}
        <p
          data-reveal
          className="headline mt-14 max-w-3xl text-[clamp(1.5rem,4vw,2.75rem)]"
        >
          {brands.activations.closingLine}
        </p>
      </div>
    </Section>
  );
}
