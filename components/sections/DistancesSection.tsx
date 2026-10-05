"use client";

import { RegisterButton } from "@/components/registration/RegisterButton";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { distances } from "@/content";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { cn } from "@/lib/cn";

export function DistancesSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-distance-card]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-distance-grid]"),
      start: "top 82%",
      y: 36,
      each: 0.14,
    });
  });

  return (
    <Section id="distancias" tone="darker">
      <div ref={root}>
        <SectionHeader intro={distances.intro} />

        <div
          data-distance-grid
          className="mt-14 grid gap-px border border-white/10 bg-white/10 lg:mt-20 lg:grid-cols-3"
        >
          {distances.items.map((item) => (
            <article
              key={item.id}
              data-distance-card
              className={cn(
                "flex flex-col bg-bg-dark p-8 lg:p-10",
                item.featured && "bg-[#120406]",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "font-display text-6xl leading-none tracking-[-0.02em] lg:text-7xl",
                      item.featured ? "text-accent-red" : "text-text-white",
                    )}
                  >
                    {item.distance}
                  </span>
                  <span className="label-condensed text-lg text-text-gray">
                    {item.unit}
                  </span>
                </p>

                {item.featured ? <Badge>Prova principal</Badge> : null}
              </div>

              <h3 className="label-condensed mt-6 text-sm text-text-white">
                {item.name}
              </h3>

              {/*
                "Para quem é" vem antes da descrição: é a informação que decide
                a escolha entre 5 e 21 km, e ela responde mais rápido que
                percurso e bullets.
              */}
              <p className="mt-3 text-base leading-relaxed text-text-white/85">
                {item.audience}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-text-gray">
                {item.description}
              </p>

              <ul className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-7">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-text-white/85"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 bg-accent-red"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* `mt-auto` cola o CTA na base: as descrições têm alturas
                  diferentes e o botão do 5km ficava 26px abaixo dos outros. */}
              <div className="mt-auto pt-10">
                {/*
                  `distance` abre o mesmo modal do Backstage com a distância já
                  marcada. A chave `distance` do payload acompanha o id do card,
                  então o lead gravado diz de onde veio sem depender de texto.
                */}
                <RegisterButton
                  cta={item.cta}
                  source={`distancia-${item.id}`}
                  distance={item.id as "5km" | "10km" | "21km"}
                  variant={item.featured ? "primary" : "outline"}
                  size="md"
                  animateIn={false}
                  className="w-full"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
