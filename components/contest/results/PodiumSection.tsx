"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contest, contestResults } from "@/content";
import type { ContestWinner } from "@/content/contestResults";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

import { EntryArt, EntryCredit } from "./EntryArt";

/**
 * 2º e 3º lugar, lado a lado, no grid de linhas de 1px da <PrizesSection>.
 * O rótulo de cada card é o mesmo da premiação ("arte impressa na camisa
 * para o percurso de 10km…"), então o visitante liga o nome à camisa.
 */
export function PodiumSection({ winners }: { winners: ContestWinner[] }) {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-podium-card]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-podium-grid]"),
      y: 28,
      each: 0.12,
    });
  });

  return (
    <Section id="podio" tone="darker">
      <div ref={root}>
        <SectionHeader intro={contestResults.podium.intro} />

        <div
          data-podium-grid
          className="mt-14 grid gap-px border border-white/10 bg-white/10 lg:mt-20 lg:grid-cols-2"
        >
          {winners.map((winner) => {
            const prize = contest.prizes.items.find((item) => item.id === winner.placeId);

            return (
              <article key={winner.id} data-podium-card className="flex flex-col bg-bg-dark p-8 lg:p-10">
                <EntryArt entry={winner} sizes="(min-width: 1024px) 45vw, 100vw" />

                <div className="mt-8 flex items-baseline justify-between gap-4">
                  <p className="label-condensed text-sm text-text-gray">{prize?.place}</p>
                  <p className="font-display text-3xl leading-none text-text-white">
                    {prize?.value}
                  </p>
                </div>

                <h3 className="headline mt-4 text-3xl">{winner.author}</h3>
                <EntryCredit entry={winner} className="mt-3" />

                <p className="mt-6 border-t border-white/10 pt-6 text-sm leading-relaxed text-text-white/85">
                  <span className="text-text-white">{winner.title}</span>
                  {prize ? `. ${prize.label}` : null}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
