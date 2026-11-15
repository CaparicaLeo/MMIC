import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { Media as MediaType } from "@/content/types";

/**
 * Blocos da linguagem de cartaz da repaginação (PDF da edição 2027).
 *
 * Regra de cor: o vermelho aparece só em tarja, número de destaque, CTA e na
 * faixa inclinada atrás da última palavra do título (<Slash />).
 */

/**
 * Foto de um slot com proporção definida pela classe (`aspect-*`), não pelas
 * dimensões do arquivo. O corte acontece por `object-cover`, então a mesma
 * foto serve em grades de proporções diferentes sem deixar blocos vazios.
 */
export function Photo({
  media,
  className,
  position = "center",
  sizes = "100vw",
  preload = false,
}: {
  media: MediaType;
  className?: string;
  position?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return (
    <div
      data-photo
      className={cn("relative overflow-hidden bg-[#141414]", className)}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={preload}
        loading={preload ? undefined : "eager"}
        fetchPriority={preload ? "high" : "low"}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}

/** Rótulo de seção: quadradinho vermelho + caixa-alta espaçada. */
export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "label-condensed flex items-center gap-2.5 text-[0.72rem] text-text-white",
        className,
      )}
    >
      <span aria-hidden className="size-2 shrink-0 bg-accent-red" />
      {children}
    </p>
  );
}

/**
 * Palavra final do título sobre a bandeira vermelha da identidade 2027
 * (entalhe e risco de velocidade à esquerda, corte inclinado à direita).
 *
 * As pontas são SVGs com `h-full w-auto`: a largura sai da proporção, então o
 * desenho não deforma com o comprimento da palavra — só o miolo estica.
 *
 * O rastro (entalhe + risco) avança para a esquerda (`-left-[1em]`) e passa
 * POR TRÁS das palavras anteriores, sem abrir espaço antes da palavra. Para
 * isso a faixa não cria contexto próprio: o `-z-10` cai no contexto do título,
 * que precisa ter `isolate` (todos os h1/h2 que usam `withSlash` têm).
 */
export function Slash({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap pr-[0.3em] pl-[0.25em]">
      <span
        aria-hidden
        data-slash-bg
        className="absolute inset-y-0 right-0 -left-[1em] -z-10 flex text-accent-red"
      >
        <svg
          viewBox="0 0 388 358"
          className="h-full w-auto shrink-0"
          fill="currentColor"
        >
          <polygon points="148,0 389,0 389,358 148,358 364,331 388,99" />
          <polygon points="0,126 345,126 340,179" />
        </svg>
        <span className="-mx-px flex-1 bg-current" />
        <svg
          viewBox="0 0 69 358"
          className="h-full w-auto shrink-0"
          fill="currentColor"
        >
          <polygon points="-1,0 69,0 0,358 -1,358" />
        </svg>
      </span>
      {children}
    </span>
  );
}

/**
 * Divide o texto para destacar `slash` quando ele fecha a frase. Se o trecho
 * não aparece no final, o texto sai inteiro, sem faixa.
 */
export function withSlash(text: string, slash?: string) {
  if (!slash || !text.endsWith(slash)) return text;
  const head = text.slice(0, text.length - slash.length);
  return (
    <>
      {head}
      <Slash>{slash}</Slash>
    </>
  );
}

/** Título de seção (h2) com a faixa vermelha opcional. */
export function SectionTitle({
  kicker,
  title,
  slashWord,
  description,
  children,
  align = "left",
  className,
}: {
  kicker?: string;
  title: string;
  slashWord?: string;
  description?: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex max-w-3xl flex-col gap-6",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h2 className="headline isolate text-[clamp(2.4rem,6vw,4.5rem)]">
        {withSlash(title, slashWord)}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-text-gray sm:text-lg">
          {description}
        </p>
      ) : null}
      {children}
    </header>
  );
}

/** Seção padrão: fundo, ritmo vertical e container. */
export function Block({
  id,
  tone = "dark",
  className,
  children,
}: {
  id?: string;
  tone?: "dark" | "red" | "darker";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-motion="block"
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-24 lg:py-28",
        tone === "dark" && "bg-bg-dark text-text-white",
        tone === "darker" && "bg-[#060606] text-text-white",
        tone === "red" && "bg-accent-red text-text-white",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Cartão escuro com linha de topo (vermelha em destaque, cinza no resto). */
export function InfoCard({
  kicker,
  title,
  text,
  accent = false,
  href,
  media,
  className,
  children,
}: {
  kicker?: string;
  title: string;
  text?: string;
  accent?: boolean;
  href?: string;
  media?: MediaType;
  className?: string;
  children?: ReactNode;
}) {
  const body = (
    <>
      {media ? (
        <Photo
          media={media}
          className="mb-6 aspect-[4/3]"
          sizes="(min-width: 1024px) 30vw, 100vw"
        />
      ) : null}
      {kicker ? (
        <p className="label-condensed text-[0.68rem] text-text-gray">
          {kicker}
        </p>
      ) : null}
      <h3 className="headline mt-3 text-[1.9rem] leading-[1.02] sm:text-[2.1rem]">
        {title}
      </h3>
      {text ? (
        <p className="mt-4 text-sm leading-relaxed text-text-gray sm:text-[0.95rem]">
          {text}
        </p>
      ) : null}
      {children}
    </>
  );

  const classes = cn(
    "flex flex-col border-t-2 bg-[#141414] p-6 sm:p-7",
    accent ? "border-accent-red" : "border-white/15",
    href && "transition-colors hover:bg-[#1b1b1b]",
    className,
  );

  if (href) {
    return (
      <Link href={href} data-card className={classes}>
        {body}
      </Link>
    );
  }
  return (
    <div data-card className={classes}>
      {body}
    </div>
  );
}

/**
 * Cabeçalho de página: texto à esquerda, foto à direita, e uma fileira
 * opcional de cartões embaixo. Título em linhas: a última pode levar a faixa.
 */
export function PageHero({
  kicker,
  title,
  slashWord,
  description,
  media,
  actions,
  cards,
  tone = "dark",
  id,
}: {
  kicker: string;
  title: string[];
  slashWord?: string;
  description: string;
  media?: MediaType;
  actions?: ReactNode;
  cards?: { kicker?: string; title: string; text?: string; href?: string }[];
  tone?: "dark" | "darker";
  id?: string;
}) {
  return (
    <section
      id={id}
      data-motion="hero"
      className={cn(
        "relative scroll-mt-24 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-44",
        tone === "dark" ? "bg-bg-dark" : "bg-[#060606]",
        "text-text-white",
      )}
    >
      <div className="container-page">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col gap-7">
            <div data-hero-fade>
              <Kicker>{kicker}</Kicker>
            </div>
            <h1 className="headline isolate text-[clamp(2.75rem,7vw,5.6rem)]">
              {title.map((line, index) => (
                <span key={`${line}-${index}`} data-hero-line className="block">
                  {withSlash(line, slashWord)}
                </span>
              ))}
            </h1>
            <p
              data-hero-fade
              className="max-w-xl text-base leading-relaxed text-text-white/85 sm:text-lg"
            >
              {description}
            </p>
            {actions ? (
              <div
                data-hero-fade
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                {actions}
              </div>
            ) : null}
          </div>

          {media ? (
            <div data-hero-media>
              <Photo
                media={media}
                className="aspect-[4/3] w-full lg:aspect-[5/4]"
                sizes="(min-width: 1024px) 45vw, 100vw"
                preload
              />
            </div>
          ) : null}
        </div>

        {cards && cards.length > 0 ? (
          <div className="mt-16 grid gap-px bg-white/10 sm:grid-cols-3">
            {cards.map((card, index) => (
              <InfoCard
                key={card.title}
                kicker={card.kicker}
                title={card.title}
                text={card.text}
                href={card.href}
                accent={index === 0}
                className="bg-bg-dark"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** Número de destaque, com a fonte condensada e a origem embaixo. */
export function StatNumber({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="headline text-[clamp(3rem,7vw,5rem)] text-accent-red">
        {value}
      </p>
      <p className="label-condensed text-[0.68rem] leading-relaxed text-text-gray">
        {label}
      </p>
    </div>
  );
}
