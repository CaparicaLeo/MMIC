"use client";

import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { brands } from "@/content";
import { fadeUp, parallax, revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Abertura da página /marcas.
 *
 * Foto de fundo com a mesma receita da home e do concurso: é a única arte do
 * MMIC com corredores e público no mesmo quadro, que é literalmente o
 * argumento da página. A camada vai em opacidade cheia e quem segura a
 * legibilidade do texto são os degradês — a foto é clara, com céu estourado e
 * piso de palco ao sol.
 *
 * O CTA é `animateIn={false}` de propósito: ele vive dentro de um
 * `data-reveal`, e dois tweens de entrada no mesmo elemento empilhariam o
 * deslocamento (o aviso está nas regras de animação do projeto).
 */
export function BrandHeroSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    parallax(scope.querySelector("[data-hero-media]"), {
      prefersReducedMotion,
      trigger: scope,
      strength: 10,
    });

    revealLines(scope.querySelectorAll("[data-hero-line]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 75%",
    });

    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });
  });

  return (
    <Section className="grain overflow-hidden pt-40 sm:pt-44 lg:pt-48">
      {/* Camada de imagem. O `object-position` e as proporções são os mesmos da
          home: 65% pega os corredores com o público atrás, que é o assunto, e
          a camada é 116% da altura para o parallax ter folga sem revelar
          borda. */}
      <div aria-hidden className="absolute inset-0">
        <div data-hero-media className="absolute inset-x-0 -top-[8%] h-[116%]">
          <Media
            media={brands.hero.image}
            preload
            sizes="100vw"
            className="h-full w-full"
            imageClassName="object-[65%_center]"
          />
        </div>
      </div>

      {/* Escurece o topo (nav), mantém o miolo semisable — é por ali que o
          texto cinza passa por cima do público — e fecha na base para emendar
          com a seção seguinte. No desktop, um lateral cobre a coluna de texto
          e deixa a metade direita mais aberta. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-bg-dark/85 via-bg-dark/60 to-bg-dark"
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-linear-to-r from-bg-dark/80 to-transparent to-65% lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_20%_0%,var(--color-accent-red-dark)_0%,transparent_55%)] opacity-50"
      />

      <div ref={root} className="relative max-w-4xl">
        <Badge className="w-fit" data-reveal>
          {brands.hero.kicker}
        </Badge>

        <h1 className="headline mt-8 text-[clamp(2.5rem,8vw,5.5rem)]">
          {brands.hero.headlineLines.map((line) => (
            <span className="headline-mask" key={line}>
              <span data-hero-line className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-reveal
          className="mt-7 max-w-2xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {brands.hero.description}
        </p>

        <div data-reveal className="mt-10">
          <CTAButton href={brands.hero.cta.href} animateIn={false}>
            {brands.hero.cta.label}
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}
