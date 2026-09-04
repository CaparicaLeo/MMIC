"use client";

import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { structure } from "@/content";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

export function StructureSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-feature-card]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-feature-grid]"),
      start: "top 85%",
      y: 28,
      each: 0.08,
    });
  });

  return (
    <Section id="estrutura">
      <div ref={root}>
        <SectionHeader intro={structure.intro} />

        <ul
          data-feature-grid
          className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        >
          {structure.items.map((item) => (
            <li
              key={item.id}
              data-feature-card
              className="group bg-bg-dark p-8 transition-colors duration-300 hover:bg-[#111]"
            >
              <span className="grid size-12 place-items-center border border-white/15 text-text-white transition-colors duration-300 group-hover:border-accent-red group-hover:text-accent-red">
                <Icon name={item.icon} className="size-6" />
              </span>

              <h3 className="mt-6 text-lg font-semibold text-text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-text-gray">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
