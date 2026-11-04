import type { Metadata } from "next";
import Link from "next/link";

import { ContestStepsSection } from "@/components/contest/ContestStepsSection";
import { FinalistCard } from "@/components/contest/finalists/FinalistCard";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { contestFinalists, contestFinalistsPage } from "@/content";

export const metadata: Metadata = {
  title: "Finalistas do Concurso de Camisetas",
  /* ≤155 chars: acima disso o Google corta no SERP. */
  description:
    "Conheça as artes finalistas da camisa oficial da Meia Maratona Internacional de Curitiba 2027 e vote na sua favorita pelo Instagram.",
  alternates: { canonical: "/concurso-de-camisetas/finalistas" },
};

export default function FinalistasPage() {
  const page = contestFinalistsPage;

  return (
    <>
      <Section id="finalistas" tone="darker">
        <Link
          href="/concurso-de-camisetas"
          className="label-condensed text-[0.7rem] text-text-gray transition-colors hover:text-text-white"
        >
          ← Concurso de Camisetas
        </Link>

        <header className="mt-8 flex max-w-3xl flex-col gap-6">
          <Badge className="w-fit">{page.kicker}</Badge>

          <h1 className="headline text-[clamp(2.75rem,9vw,6rem)] text-text-white">
            As {contestFinalists.length} finalistas
          </h1>

          <p className="text-base leading-relaxed text-text-gray sm:text-lg">
            {page.votingPeriod ?? page.votingFallback}
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

      {/* O CTA de voto mora nesta seção, ao lado do passo a passo. */}
      <ContestStepsSection />
    </>
  );
}
