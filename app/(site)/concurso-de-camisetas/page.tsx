import type { Metadata } from "next";

import { ChallengeSection } from "@/components/contest/ChallengeSection";
import { ContestFinalCtaSection } from "@/components/contest/ContestFinalCtaSection";
import { ContestHeroSection } from "@/components/contest/ContestHeroSection";
import { ContestTimelineSection } from "@/components/contest/ContestTimelineSection";
import { FloatingContestCta } from "@/components/contest/FloatingContestCta";
import { PrizesSection } from "@/components/contest/PrizesSection";
import { RaceSection } from "@/components/contest/RaceSection";
import { RulesSection } from "@/components/contest/RulesSection";
import { VotingSection } from "@/components/contest/VotingSection";

export const metadata: Metadata = {
  title: "Concurso de Camisetas",
  description:
    "Concurso nacional de design para a camisa oficial da Meia Maratona Internacional de Curitiba 2027 · Rock Edition. A arte vencedora é impressa na peça entregue aos corredores, assinada pelo autor.",
  /* Canonical próprio: sem ele a rota herda o da home (app/layout.tsx)
     e se declara duplicata dela. Relativo, resolvido por metadataBase. */
  alternates: { canonical: "/concurso-de-camisetas" },
};

export default function ConcursoDeCamisetasPage() {
  return (
    <>
      <ContestHeroSection />
      <ChallengeSection />
      <PrizesSection />
      <RulesSection />
      <ContestTimelineSection />
      <VotingSection />
      <RaceSection />
      <ContestFinalCtaSection />
      <FloatingContestCta />
    </>
  );
}