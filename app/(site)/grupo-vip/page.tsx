import type { Metadata } from "next";

import { Block, InfoCard, PageHero, SectionTitle } from "@/components/editorial/primitives";
import { CTAButton } from "@/components/ui/CTAButton";
import { waitlistUrl } from "@/content";
import { vip } from "@/content/paginas/paginas";

export const metadata: Metadata = {
  title: "Grupo VIP",
  description:
    "Grupo VIP da Meia Maratona Internacional de Curitiba 2027: pré-venda, fila própria no kit, número de peito da série VIP e troca sem taxa.",
  alternates: { canonical: "/grupo-vip" },
};

/** Explica os seis benefícios e leva ao grupo do Instagram. */
export default function GrupoVipPage() {
  const { hero, revealed } = vip;
  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        slashWord={hero.slashWord}
        description={hero.description}
        media={hero.media}
        actions={
          <CTAButton href={waitlistUrl} size="lg">
            {vip.cta}
          </CTAButton>
        }
        cards={vip.cards.map((card) => ({ kicker: card.kicker, title: card.title, text: card.text }))}
      />

      <Block>
        <SectionTitle kicker="Seis benefícios" title="Três já valem hoje. Três entram com a operação." />
        <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {vip.benefits.map((benefit) => (
            <InfoCard
              key={benefit.title}
              kicker={benefit.status}
              title={benefit.title}
              text={benefit.text}
              accent={benefit.status === "Vale hoje"}
              className="bg-bg-dark"
            />
          ))}
        </div>
      </Block>

      <Block id="revelado" tone="darker">
        <SectionTitle kicker={revealed.kicker} title={revealed.title} slashWord={revealed.slashWord} />
        <ol className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
          {revealed.items.map((item) => (
            <li key={item.id} className="flex flex-col gap-3 bg-[#060606] p-7">
              <p className="label-condensed text-[0.68rem] text-accent-red">{item.time}</p>
              <h3 className="headline text-3xl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-text-gray">{item.description}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block>
        <div className="flex flex-col items-start gap-8">
          <p className="headline max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.05]">
            O grupo é onde os avisos do evento saem primeiro.
          </p>
          <CTAButton href={waitlistUrl} size="lg">
            {vip.cta}
          </CTAButton>
        </div>
      </Block>
    </>
  );
}
