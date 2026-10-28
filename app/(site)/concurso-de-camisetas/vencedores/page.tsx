import type { Metadata } from "next";

import { ChampionSection } from "@/components/contest/results/ChampionSection";
import { FinalistsSection } from "@/components/contest/results/FinalistsSection";
import { PodiumSection } from "@/components/contest/results/PodiumSection";
import { ResultsFinalCtaSection } from "@/components/contest/results/ResultsFinalCtaSection";
import { ResultsHeroSection } from "@/components/contest/results/ResultsHeroSection";
import { ResultsVotingSection } from "@/components/contest/results/ResultsVotingSection";
import { contestResults } from "@/content";

export const metadata: Metadata = {
  title: "Vencedores do Concurso de Camisetas",
  /* ≤155 chars: acima disso o Google corta no SERP. */
  description:
    "Resultado do concurso de design da camisa oficial da Meia Maratona Internacional de Curitiba 2027: campeão, pódio e finalistas.",
  alternates: { canonical: "/concurso-de-camisetas/vencedores" },
};

export default function VencedoresPage() {
  const { phase, winners, finalists } = contestResults;

  const champion = winners.find((winner) => winner.placeId === "1st");
  const podium = winners
    .filter((winner) => winner.placeId !== "1st")
    .sort((a, b) => a.placeId.localeCompare(b.placeId));
  /* Depois do resultado, os vencedores já têm seção própria: a grade mostra
     só quem ficou fora do pódio. */
  const winnerIds = new Set(winners.map((winner) => winner.id));
  const otherFinalists = finalists.filter((entry) => !winnerIds.has(entry.id));

  return (
    <>
      <ResultsHeroSection />
      {phase === "resultado" && champion ? <ChampionSection winner={champion} /> : null}
      {phase === "resultado" && podium.length > 0 ? <PodiumSection winners={podium} /> : null}
      {phase !== "curadoria" && otherFinalists.length > 0 ? (
        <FinalistsSection phase={phase} entries={otherFinalists} />
      ) : null}
      {phase !== "resultado" ? <ResultsVotingSection /> : null}
      <ResultsFinalCtaSection />
    </>
  );
}
