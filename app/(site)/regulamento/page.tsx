import type { Metadata } from "next";

import { Block, PageHero } from "@/components/editorial/primitives";
import { regulamento } from "@/content/regulamento";
import { getRegulamento, type RegulamentoBlock } from "@/lib/regulamento";

/**
 * O regulamento vem do Google Doc da organização (ver content/regulamento.ts).
 * A página é estática e se refaz no máximo a cada 5 minutos (ISR): quem
 * edita o doc vê a mudança no site sem deploy. Precisa ser literal — o Next lê
 * este valor na compilação. Mantenha igual a `regulamento.revalidateSeconds`.
 */
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Regulamento",
  description:
    "Regulamento oficial da Meia Maratona Internacional de Curitiba – Rock Edition 2027: prova, kits, inscrições, premiação, percurso e categorias.",
  alternates: { canonical: "/regulamento" },
};

const hora = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

function Blocks({ blocks }: { blocks: RegulamentoBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === "clause") {
      return (
        <p
          key={index}
          className="grid gap-1 leading-relaxed text-text-white/85 sm:grid-cols-[4.5rem_1fr] sm:gap-4"
        >
          <span className="label-condensed pt-0.5 text-[0.8rem] text-accent-red">
            {block.number}
          </span>
          <span>{block.text}</span>
        </p>
      );
    }
    if (block.type === "bullets") {
      return (
        <ul key={index} className="flex flex-col gap-2 sm:pl-[5.5rem]">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 leading-relaxed text-text-white/85"
            >
              <span
                aria-hidden
                className="mt-2.5 size-1.5 shrink-0 bg-accent-red"
              />
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="leading-relaxed text-text-gray sm:pl-[5.5rem]">
        {block.text}
      </p>
    );
  });
}

export default async function RegulamentoPage() {
  const { hero } = regulamento;
  const doc = await getRegulamento();

  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        slashWord={hero.slashWord}
        description={hero.description}
        actions={
          <a
            href={regulamento.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label-condensed inline-flex items-center gap-3 border border-white/25 px-6 py-3.5 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red"
          >
            Baixar em PDF
            <span className="sr-only"> (abre em nova aba)</span>
            <span aria-hidden>↓</span>
          </a>
        }
      />

      <Block tone="darker">
        {doc ? (
          <div className="grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
            <nav
              aria-label="Seções do regulamento"
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <p className="label-condensed mb-4 text-[0.68rem] text-text-gray">
                Seções
              </p>
              <ol className="flex flex-col gap-2 border-l border-white/10 pl-4">
                {doc.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="label-condensed flex gap-2 text-[0.72rem] text-text-white/80 transition-colors hover:text-accent-red"
                    >
                      <span className="text-accent-red">{section.number}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="flex min-w-0 flex-col gap-14">
              <header className="flex flex-col gap-3">
                <h2 className="headline text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight">
                  {doc.title}
                </h2>
                <p className="label-condensed text-[0.66rem] text-text-gray">
                  Lido do documento oficial em {hora.format(doc.fetchedAt)} ·
                  atualiza sozinho a cada 5 minutos
                </p>
              </header>

              {doc.intro.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <Blocks blocks={doc.intro} />
                </div>
              ) : null}

              {doc.sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="flex scroll-mt-28 flex-col gap-4"
                >
                  <h3 className="headline flex items-baseline gap-3 border-b border-white/10 pb-3 text-[clamp(1.4rem,2.6vw,1.9rem)]">
                    <span className="text-accent-red">{section.number}.</span>
                    {section.title}
                  </h3>
                  <Blocks blocks={section.blocks} />
                </div>
              ))}

              {doc.closing ? (
                <p className="label-condensed text-xs text-text-gray">
                  {doc.closing}
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex max-w-2xl flex-col gap-5">
            <h2 className="headline text-[clamp(1.8rem,4vw,2.6rem)]">
              Não conseguimos carregar o regulamento agora.
            </h2>
            <p className="leading-relaxed text-text-gray">
              O texto vem direto do documento oficial da organização. Enquanto
              ele não responde, você pode ler o regulamento no próprio documento
              ou baixar o PDF.
            </p>
            <a
              href={regulamento.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-condensed inline-flex w-fit items-center gap-3 border border-white/25 px-6 py-3.5 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red"
            >
              Abrir o documento oficial <span aria-hidden>↗</span>
            </a>
          </div>
        )}
      </Block>
    </>
  );
}
