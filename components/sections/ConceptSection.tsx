"use client";

import { Badge } from "@/components/ui/Badge";
import { Highlight } from "@/components/ui/Highlight";
import { Section } from "@/components/ui/Section";
import { concept } from "@/content";
import { fadeUp, revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

export function ConceptSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });

    revealLines(scope.querySelectorAll("[data-concept-line]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 78%",
    });
  });

  return (
    <Section id="conceito" tone="darker">
      <div ref={root} className="max-w-4xl">
        <Badge data-reveal className="w-fit">
          {concept.intro.kicker}
        </Badge>

        <p className="headline mt-8 text-[clamp(2rem,6vw,4.25rem)] text-text-white">
          <span className="headline-mask">
            <span data-concept-line className="block will-change-transform">
              {concept.intro.title}
            </span>
          </span>
          <span className="headline-mask">
            <span data-concept-line className="block will-change-transform">
              É uma <Highlight>experiência urbana</Highlight> que começa
            </span>
          </span>
          <span className="headline-mask">
            <span data-concept-line className="block will-change-transform">
              correndo e termina em festival.
            </span>
          </span>
        </p>

        <p
          data-reveal
          className="mt-10 max-w-2xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {concept.support}
        </p>
      </div>
    </Section>
  );
}
