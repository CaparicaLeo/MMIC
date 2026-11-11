import type { Metadata } from "next";

import { Altimetria } from "@/components/editorial/altimetria";
import { Block, PageHero, SectionTitle } from "@/components/editorial/primitives";
import { percurso } from "@/content/paginas/paginas";

export const metadata: Metadata = {
  title: "Percurso",
  description:
    "Percurso da Meia Maratona Internacional de Curitiba 2027: 21 km, 10 km e 5 km, com altimetria, pontos de água e pontos de corte.",
  alternates: { canonical: "/percurso" },
};

/** Percurso por distância: largada, altimetria ilustrativa e o que importa em cada faixa. */
export default function PercursoPage() {
  const { hero } = percurso;
  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        slashWord={hero.slashWord}
        description={hero.description}
        media={hero.media}
      />

      {percurso.distances.map((distance, index) => (
        <Block key={distance.id} id={distance.id} tone={index % 2 === 0 ? "darker" : "dark"}>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div className="flex flex-col gap-6">
              <div className="flex items-baseline gap-3">
                <p className="headline text-[clamp(5rem,12vw,9rem)] leading-none text-accent-red">{distance.distance}</p>
                <p className="label-condensed text-base">{distance.unit}</p>
              </div>
              <h2 className="headline text-[clamp(2rem,4vw,3rem)]">{distance.name}</h2>
              <dl className="grid grid-cols-2 gap-6 border-y border-white/10 py-6">
                <div>
                  <dt className="label-condensed text-[0.66rem] text-text-gray">Largada</dt>
                  <dd className="headline mt-2 text-3xl">{distance.start}</dd>
                </div>
                {distance.limit ? (
                  <div>
                    <dt className="label-condensed text-[0.66rem] text-text-gray">Tempo limite</dt>
                    <dd className="headline mt-2 text-3xl">{distance.limit}</dd>
                  </div>
                ) : null}
              </dl>
              <ul className="flex flex-col gap-3">
                {distance.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-white/85">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6 bg-[#141414] p-6 sm:p-8">
              <Altimetria
                profile={distance.profile}
                highlight={distance.id === "21k" ? [14, 17] : undefined}
                label={`Altimetria ilustrativa do percurso de ${distance.distance} km`}
              />
              <p className="text-sm leading-relaxed text-text-gray">{distance.note}</p>
            </div>
          </div>
        </Block>
      ))}

      <Block tone="darker">
        <SectionTitle title="Percurso 2027 em homologação." description={percurso.note} />
      </Block>
    </>
  );
}
