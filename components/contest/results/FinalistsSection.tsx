"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RegisterButton } from "@/components/registration/RegisterButton";
import { contestResults, finalCta } from "@/content";
import type { ContestEntry } from "@/content/contestResults";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

import { EntryArt, EntryCredit } from "./EntryArt";

/**
 * Grade das finalistas.
 *
 * Na votação é a seção principal da página (e leva o CTA de voto); depois do
 * resultado vira o registro de quem chegou à final, sem os vencedores — eles
 * já tiveram as seções deles acima.
 */
export function FinalistsSection({
  phase,
  entries,
}: {
  phase: "votacao" | "resultado";
  entries: ContestEntry[];
}) {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-finalist-card]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-finalist-grid]"),
      y: 24,
      each: 0.08,
    });
  });

  return (
    <Section id="finalistas" tone={phase === "votacao" ? "dark" : "darker"}>
      <div ref={root}>
        <SectionHeader intro={contestResults.finalistsSection.intro[phase]}>
          {phase === "votacao" ? (
            <div data-reveal className="mt-4">
              <RegisterButton
                cta={finalCta.cta}
                source="concurso-finalistas"
                variant="outline"
                size="md"
                animateIn={false}
              />
            </div>
          ) : null}
        </SectionHeader>

        <ul
          data-finalist-grid
          className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        >
          {entries.map((entry) => (
            <li key={entry.id} data-finalist-card className="flex flex-col bg-bg-dark p-6">
              <EntryArt entry={entry} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
              <p className="mt-6 text-base text-text-white">{entry.title}</p>
              <p className="mt-1 text-sm text-text-white/85">{entry.author}</p>
              <EntryCredit entry={entry} className="mt-2" />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
