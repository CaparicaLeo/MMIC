import type { Metadata } from "next";

import { ChampionSection } from "@/components/contest/results/ChampionSection";
import { FinalistsSection } from "@/components/contest/results/FinalistsSection";
import { PodiumSection } from "@/components/contest/results/PodiumSection";
import { ResultsFinalCtaSection } from "@/components/contest/results/ResultsFinalCtaSection";
import { ResultsHeroSection } from "@/components/contest/results/ResultsHeroSection";
import { contestFinalists } from "@/content";
import { getRankedWinners } from "@/content/contestResults";

export const metadata: Metadata = {
  title: "Concurso de Camisetas",
  /* ≤155 chars: acima disso o Google corta no SERP. */
  description:
    "Resultado do concurso de design da camisa oficial da Meia Maratona Internacional de Curitiba 2027: campeã, pódio e finalistas.",
  alternates: { canonical: "/concurso-de-camisetas" },
};

/**
 * Concurso encerrado: a página é o resultado (campeã, pódio e finalistas).
 * Antes era a landing de envio; /vencedores redireciona para cá.
 */
export default function ConcursoDeCamisetasPage() {
  const winners = getRankedWinners();

  const champion = winners.find((winner) => winner.placeId === "1st");
  const podium = winners.filter((winner) => winner.placeId !== "1st");
  const winnerSlugs = new Set(winners.map((winner) => winner.slug));
  const otherFinalists = contestFinalists.filter((entry) => !winnerSlugs.has(entry.slug));

  return (
    <>
      <ResultsHeroSection />
      {champion ? <ChampionSection winner={champion} /> : null}
      {podium.length > 0 ? <PodiumSection winners={podium} /> : null}
      {otherFinalists.length > 0 ? <FinalistsSection phase="resultado" entries={otherFinalists} /> : null}
      <ResultsFinalCtaSection />
    </>
  );
}
