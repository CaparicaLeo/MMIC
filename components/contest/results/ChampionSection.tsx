"use client";

import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { contest, contestResults } from "@/content";
import type { ContestWinner } from "@/content/contestResults";
import { fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

import { EntryArt, EntryCredit } from "./EntryArt";

/**
 * O 1º lugar, sozinho na seção.
 *
 * A arte ocupa a maior coluna e o texto fica ao lado, não por cima: é uma
 * estampa, e qualquer degradê sobre ela altera a obra que está sendo
 * premiada. O fundo vinho é o mesmo do card destacado em <PrizesSection>.
 */
export function ChampionSection({ winner }: { winner: ContestWinner }) {
  const prize = contest.prizes.items.find((item) => item.id === winner.placeId);

  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });
  });

  return (
    <Section id="campeao" className="bg-[#120406]">
      <div ref={root} className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <figure data-reveal>
          <EntryArt entry={winner} sizes="(min-width: 1024px) 55vw, 100vw" />
          <figcaption className="label-condensed mt-3 text-[0.7rem] text-text-gray">
            {winner.title} · {contestResults.champion.shirtLabel}
          </figcaption>
        </figure>

        <div className="flex flex-col">
          <Badge data-reveal className="w-fit">
            {contestResults.champion.kicker}
          </Badge>

          <h2 data-reveal className="headline mt-7 text-[clamp(2.25rem,6vw,4.5rem)]">
            {winner.author}
          </h2>

          <EntryCredit entry={winner} className="mt-4" />

          {winner.statement ? (
            <blockquote data-reveal className="mt-10 border-l-2 border-accent-red pl-6">
              <p className="text-lg leading-relaxed text-text-white/90">
                &ldquo;{winner.statement}&rdquo;
              </p>
            </blockquote>
          ) : null}

          {prize ? (
            <div data-reveal className="mt-10 border-t border-white/10 pt-6">
              <p className="label-condensed text-sm text-text-gray">{prize.place}</p>
              <p className="font-display text-5xl leading-none tracking-[-0.02em] text-accent-red">
                {prize.value}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
