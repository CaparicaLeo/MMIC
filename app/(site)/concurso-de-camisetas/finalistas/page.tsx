import type { Metadata } from "next";

import { ContestStepsSection } from "@/components/contest/ContestStepsSection";
import { FinalistCard } from "@/components/contest/finalists/FinalistCard";
import { WinnersPodium } from "@/components/contest/finalists/WinnersPodium";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { contestFinalists, contestFinalistsPage } from "@/content";
import { getRankedWinners } from "@/content/contestResults";

export const metadata: Metadata = {
  title: "Vencedores do Concurso de Camisetas",
  /* ≤155 chars: acima disso o Google corta no SERP. */
  description:
    "As três artes vencedoras da camisa oficial da Meia Maratona Internacional de Curitiba 2027 e todas as finalistas do concurso.",
  alternates: { canonical: "/concurso-de-camisetas/finalistas" },
};

export default function FinalistasPage() {
  const page = contestFinalistsPage;

  return (
    <>
      <WinnersPodium winners={getRankedWinners()} />

      <Section id="finalistas" tone="darker">
        <header className="flex max-w-3xl flex-col gap-6">
          <Badge className="w-fit">{page.gridKicker}</Badge>

          <h2 className="headline text-[clamp(2.25rem,6vw,4rem)] text-text-white">
            As {contestFinalists.length} finalistas
          </h2>

          <p className="text-base leading-relaxed text-text-gray sm:text-lg">
            {page.gridDescription}
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-20 lg:grid-cols-5">
          {contestFinalists.map((finalist) => (
            <li key={finalist.slug}>
              <FinalistCard finalist={finalist} />
            </li>
          ))}
        </ul>
      </Section>

      <ContestStepsSection />
    </>
  );
}
