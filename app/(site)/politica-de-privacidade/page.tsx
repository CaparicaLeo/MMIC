import type { Metadata } from "next";
import { Fragment } from "react";

import { CookiePreferencesButton } from "@/components/analytics/CookiePreferencesButton";
import { Block, PageHero } from "@/components/editorial/primitives";
import { type PolicyBlock, privacyPolicy } from "@/content/privacidade";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Thomé & Santos coleta, usa, guarda e protege os dados pessoais de quem visita o site da Meia Maratona Internacional de Curitiba, de acordo com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

const EMAIL = /([\w.+-]+@[\w-]+\.[\w.]+)/g;

/** Texto corrido com os e-mails viram link `mailto:`. */
function WithEmailLinks({ text }: { text: string }) {
  return text.split(EMAIL).map((part, index) =>
    index % 2 === 1 ? (
      <a
        key={index}
        href={`mailto:${part}`}
        className="text-text-white underline underline-offset-4 transition-colors hover:text-accent-red"
      >
        {part}
      </a>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

function Blocks({ blocks }: { blocks: PolicyBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === "h") {
      return (
        <h4 key={index} className="label-condensed pt-2 text-[0.78rem] text-text-white">
          {block.text}
        </h4>
      );
    }
    if (block.type === "list") {
      return (
        <ul key={index} className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 leading-relaxed text-text-white/85">
              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-accent-red" />
              <span>
                <WithEmailLinks text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    }
    if (block.type === "address") {
      return (
        <address key={index} className="flex flex-col gap-1 not-italic leading-relaxed text-text-white/85">
          {block.lines.map((line, i) => (
            <span key={i}>
              <WithEmailLinks text={line} />
            </span>
          ))}
        </address>
      );
    }
    return (
      <p key={index} className="leading-relaxed text-text-white/85">
        <WithEmailLinks text={block.text} />
      </p>
    );
  });
}

/**
 * Política de privacidade. O texto vive em content/privacidade.ts; aqui só a
 * diagramação, no mesmo desenho do /regulamento (índice fixo à esquerda,
 * seções numeradas à direita).
 */
export default function PoliticaDePrivacidadePage() {
  const { hero, sections } = privacyPolicy;

  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        slashWord={hero.slashWord}
        description={hero.description}
      />

      <Block tone="darker">
        <div className="grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <nav aria-label="Seções da política" className="lg:sticky lg:top-28 lg:self-start">
            <p className="label-condensed mb-4 text-[0.68rem] text-text-gray">Seções</p>
            <ol className="flex flex-col gap-2 border-l border-white/10 pl-4">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="label-condensed flex gap-2 text-[0.72rem] text-text-white/80 transition-colors hover:text-accent-red"
                  >
                    <span className="text-accent-red">{index + 1}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex min-w-0 max-w-3xl flex-col gap-14">
            <header className="flex flex-col gap-4">
              <p className="label-condensed text-[0.66rem] text-text-gray">
                Última atualização: {privacyPolicy.lastUpdated}
              </p>
              <p className="leading-relaxed text-text-white/85">{privacyPolicy.intro}</p>
            </header>

            {sections.map((section, index) => (
              <div key={section.id} id={section.id} className="flex scroll-mt-28 flex-col gap-4">
                <h2 className="headline flex items-baseline gap-3 border-b border-white/10 pb-3 text-[clamp(1.4rem,2.6vw,1.9rem)]">
                  <span className="text-accent-red">{index + 1}.</span>
                  {section.title}
                </h2>
                <Blocks blocks={section.blocks} />
                {section.id === "cookies" ? (
                  <CookiePreferencesButton className="label-condensed mt-2 inline-flex w-fit items-center gap-3 border border-white/25 px-6 py-3.5 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Block>
    </>
  );
}
