import type { Metadata } from "next";

import { LotCounter, LotTable, TicketButton } from "@/components/editorial/lots";
import { Block, InfoCard, PageHero, SectionTitle } from "@/components/editorial/primitives";
import { inscricao } from "@/content/paginas/paginas";
import { lotes } from "@/content/paginas/lotes";

export const metadata: Metadata = {
  title: "Inscrições",
  description:
    "Inscrições da Meia Maratona Internacional de Curitiba 2027: 5 km, 10 km e 21 km. Lotes, valores por distância e regulamento.",
  alternates: { canonical: "/inscricao" },
};

/** Página de venda: contador, lote atual, tabela de lotes e regulamento. */
export default function InscricaoPage() {
  const { hero } = inscricao;
  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        slashWord={hero.slashWord}
        description={hero.description}
        media={hero.media}
        actions={
          <TicketButton
            href={inscricao.ticketSportsUrl}
            label="Garantir minha vaga"
            pendingLabel={inscricao.ticketPendingLabel}
          />
        }
      />

      <Block id="lotes" tone="darker">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:items-start">
          <LotCounter />
          <div className="flex flex-col gap-8">
            <SectionTitle
              title={`Faltam ${lotes.current.remaining} vagas no ${lotes.current.name}.`}
              description="Preço por distância, lote a lote. O que já fechou fica riscado na tabela."
            />
            <LotTable />
          </div>
        </div>
      </Block>

      <Block>
        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {inscricao.cards.map((card, index) => (
            <InfoCard
              key={card.title}
              kicker={card.kicker}
              title={card.title}
              text={card.text}
              accent={index === 0}
              className="bg-bg-dark"
            />
          ))}
        </div>
      </Block>

    </>
  );
}
