import type { Metadata } from "next";

import { Block, InfoCard, PageHero, SectionTitle, StatNumber } from "@/components/editorial/primitives";
import { CTAButton } from "@/components/ui/CTAButton";
import { imprensa } from "@/content/paginas/paginas";

export const metadata: Metadata = {
  title: "Imprensa",
  description:
    "Área de imprensa da Meia Maratona Internacional de Curitiba 2027: releases, dados da prova, kit de mídia e credenciamento para cobertura.",
  alternates: { canonical: "/imprensa" },
};

/** Imprensa: releases, dados, revista e o caminho de credenciamento. */
export default function ImprensaPage() {
  const { hero } = imprensa;
  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        slashWord={hero.slashWord}
        description={hero.description}
        media={hero.media}
        actions={
          <CTAButton href="/contato" size="lg">
            {imprensa.cta}
          </CTAButton>
        }
        cards={imprensa.cards.map((card) => ({ kicker: card.kicker, title: card.title, text: card.text }))}
      />

      <Block tone="darker">
        <SectionTitle kicker="A Meia em números" title="Dado público vira fonte." slashWord="fonte." />
        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {imprensa.stats.map((stat) => (
            <StatNumber key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Block>

      <Block>
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          <InfoCard
            kicker="Credenciamento"
            title="Cobertura da prova"
            text="O credenciamento de imprensa é feito pelo formulário da página de contato, com resposta da assessoria."
            accent
            className="bg-bg-dark"
          />
          <InfoCard
            kicker="Kit de mídia"
            title="Logos e imagens"
            text="Logos e imagens em alta resolução entram aqui junto com as releases da edição 2027."
            className="bg-bg-dark"
          />
        </div>
      </Block>
    </>
  );
}
