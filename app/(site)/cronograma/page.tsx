import type { Metadata } from "next";

import { TimeList } from "@/components/editorial/altimetria";
import { Block, InfoCard, PageHero, SectionTitle } from "@/components/editorial/primitives";
import { domingo } from "@/content/paginas/paginas";

export const metadata: Metadata = {
  title: "O domingo",
  description:
    "Programação da Meia Maratona Internacional de Curitiba 2027: expo e retirada de kit no sábado, largadas de 5, 10 e 21 km e o show na arena.",
  alternates: { canonical: "/cronograma" },
};

/** Cronograma completo: sábado da expo, domingo da prova e como chegar. */
export default function CronogramaPage() {
  const { hero, saturday, sunday, access } = domingo;
  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        slashWord={hero.slashWord}
        description={hero.description}
        media={hero.media}
      />

      <Block id="sabado" tone="darker">
        <SectionTitle kicker={saturday.kicker} title={saturday.title} slashWord={saturday.slashWord} />
        <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
          {saturday.items.map((item) => (
            <InfoCard key={item.id} kicker={item.time} title={item.title} text={item.description} className="bg-[#060606]" />
          ))}
        </div>
      </Block>

      <Block id="domingo-hora-a-hora">
        <SectionTitle kicker={sunday.kicker} title={sunday.title} slashWord={sunday.slashWord} />
        <div className="mt-14">
          <TimeList items={sunday.items} />
        </div>
      </Block>

      <Block id="como-chegar" tone="darker">
        <SectionTitle kicker={access.kicker} title={access.title} slashWord={access.slashWord} />
        <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-2">
          {access.items.map((item) => (
            <InfoCard key={item.id} title={item.title} text={item.description} className="bg-[#060606]" />
          ))}
        </div>
      </Block>
    </>
  );
}
