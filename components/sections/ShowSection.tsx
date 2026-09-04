"use client";

import { Badge } from "@/components/ui/Badge";
import { Highlight } from "@/components/ui/Highlight";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { show } from "@/content";
import { fadeUp, parallax, revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Folga que a camada de parallax tem além do quadro visível (7% acima e 7%
 * abaixo). Fica numa constante porque a proporção do quadro é derivada dela:
 * se as duas saírem de sincronia, o `object-cover` volta a cortar a foto na
 * horizontal — foi o que decepava os integrantes das pontas da banda.
 */
const PARALLAX_OVERSCAN = 1.14;

export function ShowSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    revealLines(scope.querySelectorAll("[data-show-line]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 75%",
    });

    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });

    parallax(scope.querySelector("[data-show-media]"), {
      prefersReducedMotion,
      trigger: scope,
      strength: 10,
    });
  });

  return (
    <Section id="show" tone="darker" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_80%_0%,var(--color-accent-red-dark)_0%,transparent_55%)] opacity-60"
      />

      <div ref={root} className="relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Badge data-reveal className="w-fit">
            {show.intro.kicker}
          </Badge>

          <h2 className="headline mt-8 text-[clamp(2.25rem,6vw,4.5rem)]">
            <span className="headline-mask">
              <span data-show-line className="block will-change-transform">
                A linha de chegada
              </span>
            </span>
            <span className="headline-mask">
              <span data-show-line className="block will-change-transform">
                é a <Highlight>frente do palco.</Highlight>
              </span>
            </span>
          </h2>

          <p
            data-reveal
            className="mt-9 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg"
          >
            {show.statement}
          </p>

          <p
            data-reveal
            className="mt-5 max-w-xl text-base leading-relaxed text-text-gray"
          >
            {show.support}
          </p>

          {/*
            Slot do line-up. O nome vem de content/show.ts; o ramo do
            placeholder segue aqui para o caso de `headliner` voltar a ser
            null, e para as atrações de apoio ainda não anunciadas.
          */}
          <div
            data-reveal
            className="mt-10 border border-white/12 bg-bg-dark/60 p-6"
          >
            <p className="label-condensed text-[0.65rem] text-text-gray">
              Line-up
            </p>

            {show.headliner ? (
              <>
                <p className="headline mt-3 text-3xl text-text-white sm:text-4xl">
                  {show.headliner}
                </p>
                {show.lineup.length > 0 ? (
                  <p className="mt-3 text-sm text-text-gray">
                    {show.lineup.join(" · ")}
                  </p>
                ) : null}
              </>
            ) : (
              <p className="headline mt-3 text-2xl text-text-white/40 sm:text-3xl">
                {show.headlinerPlaceholder}
              </p>
            )}
          </div>
        </div>

        {/* `self-start`: sem isso a célula do grid estica até a altura da
            coluna de texto e a faixa vermelha, ancorada nela, flutuava ~250px
            abaixo da foto. */}
        <div data-reveal className="relative self-start">
          {/*
            A proporção vem do conteúdo, mas descontando o overscan do
            parallax: a camada interna é PARALLAX_OVERSCAN mais alta que o
            quadro, então o quadro precisa ser proporcionalmente mais baixo
            para que a camada volte à proporção da arte. Sem isso o
            `object-cover` compensa cortando a largura.
            Trocar a arte é mexer só em content/show.ts.
          */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: `${show.media.width} / ${show.media.height / PARALLAX_OVERSCAN}`,
            }}
          >
            <div data-show-media className="absolute inset-x-0 -top-[7%] h-[114%]">
              <Media
                media={show.media}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full"
                imageClassName="opacity-70"
              />
            </div>

            {/* Dentro do quadro: a faixa marca a base da foto, não a da célula. */}
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-1 w-24 bg-accent-red"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
