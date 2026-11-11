import type { Metadata } from "next";

import { Block, InfoCard, PageHero, SectionTitle } from "@/components/editorial/primitives";
import { RoteiroList } from "@/components/editorial/roteiro";
import { Photo } from "@/components/editorial/primitives";
import { curitiba } from "@/content/paginas/paginas";

export const metadata: Metadata = {
  title: "Curitiba",
  description:
    "Roteiro para quem vem de fora: hotéis oficiais com café às 3h30, transfer, programação do Inverno Curitiba e parceiros que aceitam o número de peito.",
  alternates: { canonical: "/curitiba" },
};

/** Hospitalidade: hotel, transfer, roteiro de sexta a segunda e passaporte. */
export default function CuritibaPage() {
  const { hero } = curitiba;
  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        slashWord={hero.slashWord}
        description={hero.description}
        media={hero.media}
        cards={curitiba.cards.map((card) => ({ kicker: card.kicker, title: card.title, text: card.text }))}
      />

      <Block>
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <SectionTitle kicker="Roteiro" title="De sexta a segunda." slashWord="segunda." description={curitiba.sourceNote} />
            <div className="mt-12">
              <RoteiroList items={curitiba.itinerary} />
            </div>
          </div>
          <div className="flex flex-col gap-6 self-start">
            <div className="flex flex-col gap-3">
              {curitiba.pills.map((pill) => (
                <span key={pill} className="label-condensed border border-white/15 px-4 py-3 text-[0.66rem] text-text-white/85">
                  {pill}
                </span>
              ))}
            </div>
            <div className="grid gap-4">
              {curitiba.media.map((media, index) => (
                <Photo key={index} media={media} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 30vw, 100vw" />
              ))}
            </div>
          </div>
        </div>
      </Block>

      <Block tone="darker">
        <InfoCard kicker="Passaporte" title="Número de peito vira desconto." text="Desconto no comércio parceiro mostrando o número. QR rastreado em cada ponto." accent className="bg-[#060606]" />
      </Block>
    </>
  );
}
