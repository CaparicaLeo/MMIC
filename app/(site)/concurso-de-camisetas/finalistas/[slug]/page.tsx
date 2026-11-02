import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { finalistMedia } from "@/components/contest/finalists/finalistMedia";
import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { contestFinalists, contestFinalistsPage, contestVotingUrl } from "@/content";
import type { ContestFinalist } from "@/content/contestFinalists";

type Props = { params: Promise<{ slug: string }> };

const listHref = "/concurso-de-camisetas/finalistas";
const finalistHref = (finalist: ContestFinalist) => `${listHref}/${finalist.slug}`;

/** Uma página estática por finalista; slug fora da lista vira 404. */
export function generateStaticParams() {
  return contestFinalists.map((finalist) => ({ slug: finalist.slug }));
}

export const dynamicParams = false;

function findFinalist(slug: string) {
  const index = contestFinalists.findIndex((finalist) => finalist.slug === slug);
  if (index === -1) return null;

  return {
    finalist: contestFinalists[index],
    position: index + 1,
    previous: contestFinalists[index - 1] ?? null,
    next: contestFinalists[index + 1] ?? null,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = findFinalist((await params).slug);
  if (!found) return {};

  const { finalist } = found;
  const title = `“${finalist.titulo}”, de ${finalist.nome} · Finalista`;
  const from = finalist.cidade ? `, de ${finalist.cidade},` : "";
  const description = `Arte finalista de ${finalist.nome}${from} para a camisa oficial da Meia Maratona Internacional de Curitiba 2027. Vote pelo Instagram.`;
  const camisa = finalistMedia(finalist).camisa;

  return {
    title,
    description,
    alternates: { canonical: finalistHref(finalist) },
    /* `openGraph` é substituído inteiro (merge raso), então o tipo e o locale
       do layout precisam vir de novo aqui. */
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url: finalistHref(finalist),
      title,
      description,
      images: [{ url: camisa.src, alt: camisa.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [camisa.src],
    },
  };
}

export default async function FinalistaPage({ params }: Props) {
  const found = findFinalist((await params).slug);
  if (!found) notFound();

  const { finalist, position, previous, next } = found;
  const media = finalistMedia(finalist);
  const page = contestFinalistsPage;
  const paragraphs = finalist.textoConceito.split(/\n\s*\n/);

  return (
    <Section id="finalista" tone="darker">
      <Link
        href={listHref}
        className="label-condensed text-[0.7rem] text-text-gray transition-colors hover:text-text-white"
      >
        ← {page.backLabel}
      </Link>

      {/* Topo: autor à esquerda, arte da camisa na largura restante. No
          mobile empilha na mesma ordem. */}
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12">
        <header className="flex flex-col gap-6">
          <Badge className="w-fit">
            Finalista {String(position).padStart(2, "0")}/
            {String(contestFinalists.length).padStart(2, "0")}
          </Badge>

          <h1 className="headline text-[clamp(2.25rem,6vw,3.75rem)] text-text-white">
            {finalist.titulo}
          </h1>

          <div className="flex items-center gap-4">
            <Media media={media.avatar} sizes="80px" className="w-16 shrink-0 sm:w-20" />
            <div>
              <p className="font-semibold text-text-white">{finalist.nome}</p>
              {finalist.cidade ? (
                <p className="label-condensed mt-1 text-[0.7rem] text-text-gray">{finalist.cidade}</p>
              ) : null}
            </div>
          </div>
        </header>

        <Media
          media={media.camisa}
          preload
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="w-full"
          imageClassName="object-contain"
        />
      </div>

      <div className="mt-16 grid items-start gap-12 lg:mt-24 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <Media
            media={media.conceito}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full"
          />

          <div className="mt-10 max-w-2xl">
            <p className="label-condensed text-[0.7rem] text-text-gray">{page.conceptKicker}</p>
            <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-text-white/85 sm:text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <figure>
          <Media
            media={media.aplicacao}
            sizes="(min-width: 1024px) 35vw, 100vw"
            className="w-full"
          />
          <figcaption className="label-condensed mt-3 text-[0.65rem] text-text-gray">
            {page.applicationCaption}
          </figcaption>
        </figure>
      </div>

      <div className="mt-16 flex flex-col items-start gap-5 border-t border-white/10 pt-10 lg:mt-24">
        <CTAButton href={contestVotingUrl} pulse ariaLabel={`${page.voteLabel} em “${finalist.titulo}”`}>
          {page.voteLabel}
        </CTAButton>
        <p className="max-w-xl text-sm leading-relaxed text-text-gray">{page.voteNote}</p>
      </div>

      <nav
        aria-label="Outras finalistas"
        className="mt-16 grid grid-cols-2 gap-px border border-white/10 bg-white/10"
      >
        {previous ? (
          <Link
            href={finalistHref(previous)}
            className="flex flex-col gap-2 bg-bg-dark p-5 transition-colors hover:bg-[#120406] sm:p-6"
          >
            <span className="label-condensed text-[0.65rem] text-text-gray">← Anterior</span>
            <span className="text-sm text-text-white sm:text-base">{previous.titulo}</span>
          </Link>
        ) : (
          <span className="bg-bg-dark" />
        )}
        {next ? (
          <Link
            href={finalistHref(next)}
            className="flex flex-col gap-2 bg-bg-dark p-5 transition-colors hover:bg-[#120406] sm:p-6"
          >
            <span className="label-condensed text-[0.65rem] text-text-gray">Próxima →</span>
            <span className="text-sm text-text-white sm:text-base">{next.titulo}</span>
          </Link>
        ) : (
          <span className="bg-bg-dark" />
        )}
      </nav>
    </Section>
  );
}
