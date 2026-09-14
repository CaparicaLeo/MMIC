"use client";

import { Badge } from "@/components/ui/Badge";
import { ContestButton } from "@/components/contest/ContestButton";
import { Marquee } from "@/components/ui/Marquee";
import { Media } from "@/components/ui/Media";
import { contest, event } from "@/content";
import { parallax } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Imagem reutilizada do hero da home: corredores + palco = corrida + rock +
 * Curitiba. Trocar por arte própria do concurso quando existir.
 */
const background = {
  src: "/images/hero-palco.jpg",
  alt: "Corredores atravessam o palco entre a banda tocando e o público, no fim da tarde",
  width: 2560,
  height: 1429,
} as const;

const marqueeItems = [
  "CONCURSO DE CAMISETAS",
  "CONCURSO NACIONAL",
  "CORRIDA + ROCK + CURITIBA",
  "ROCK EDITION",
  event.year,
];

/**
 * Abertura da página /concurso-de-camisetas.
 *
 * Mesma estrutura do hero da home: tela cheia, imagem de fundo com parallax
 * e gradientes segurando a legibilidade, conteúdo ancorado na base e marquee
 * em faixa vermelha na borda.
 */
export function ContestHeroSection() {
  const root = useGsapScroll<HTMLElement>(({ scope, prefersReducedMotion, gsap }) => {
    parallax(scope.querySelector("[data-hero-media]"), {
      prefersReducedMotion,
      trigger: scope,
      strength: 14,
    });

    if (prefersReducedMotion) return;

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .from("[data-hero-eyebrow]", { opacity: 0, y: 12, duration: 0.6 })
      .from(
        "[data-hero-line]",
        { yPercent: 115, duration: 1.1, stagger: 0.08 },
        "-=0.3",
      )
      .from(
        "[data-hero-fade]",
        { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 },
        "-=0.65",
      )
      .from("[data-hero-scroll]", { opacity: 0, duration: 0.6 }, "-=0.4");

    gsap.to("[data-hero-scroll-arrow]", {
      y: 8,
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  return (
    <section
      ref={root}
      id="concurso"
      className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-0"
    >
      {/* Camadas de fundo: imagem (parallax) + gradiente escuro → vermelho */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <div data-hero-media className="absolute inset-x-0 -top-[8%] h-[116%]">
          <Media
            media={background}
            preload
            sizes="(min-width: 1024px) 160vw, 100vw"
            className="h-full w-full"
            imageClassName="object-[65%_center]"
          />
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-bg-dark/85 via-bg-dark/50 to-bg-dark"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-linear-to-r from-bg-dark/75 to-transparent to-65% lg:block"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_120%,var(--color-accent-red-dark)_0%,transparent_60%)] opacity-70"
      />

      <div className="container-page flex flex-1 flex-col justify-end pb-10">
        <Badge data-hero-eyebrow className="w-fit">
          {contest.hero.kicker}
        </Badge>

        <p className="headline mt-7 max-w-4xl text-[clamp(2.5rem,8vw,5.5rem)]">
          {["A sua arte pode", "ser a camiseta oficial."].map((line) => (
            <span key={line} className="headline-mask">
              <span data-hero-line className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </p>

        <p
          data-hero-fade
          className="mt-8 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {contest.hero.description}
        </p>

        <div data-hero-fade className="mt-9">
          <ContestButton />
        </div>

        <p
          data-hero-fade
          className="label-condensed mt-6 text-[0.7rem] text-text-gray"
        >
          Concurso aberto a designers de todo o Brasil
        </p>

        <div
          data-hero-scroll
          className="mt-14 flex items-center gap-3 text-text-gray"
        >
          <span data-hero-scroll-arrow aria-hidden className="text-lg leading-none">
            ↓
          </span>
          <span className="label-condensed text-[0.65rem]">
            Conheça as regras
          </span>
        </div>
      </div>

      <Marquee
        items={marqueeItems}
        className="border-y border-white/10 bg-accent-red text-text-white"
      />
    </section>
  );
}