"use client";

import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { Countdown } from "@/components/ui/Countdown";
import { Marquee } from "@/components/ui/Marquee";
import { Media } from "@/components/ui/Media";
import { RegisterButton } from "@/components/registration/RegisterButton";
import { event, hero } from "@/content";
import { parallax } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

const marqueeItems = [
  "5 KM",
  "10 KM",
  "21 KM",
  "ROCK EDITION",
  "CURITIBA",
  event.year,
  "DATA EM BREVE",
];

export function HeroSection() {
  const root = useGsapScroll<HTMLElement>(({ scope, prefersReducedMotion, gsap }) => {
    // Parallax da imagem de fundo. Só transform — o scroll segue liso no mobile.
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

    // Respiro contínuo da dica de scroll.
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
      id="hero"
      className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-0"
    >
      {/* Camadas de fundo: imagem (parallax) + gradiente escuro → vermelho */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <div data-hero-media className="absolute inset-x-0 -top-[8%] h-[116%]">
          {/*
            `object-position` fora do centro porque num viewport estreito o
            `object-cover` mostra só ~22% da largura: em 50% a janela cai na
            estrutura do palco, e em 78% sobra quase só céu e a tenda. 65%
            pega as mãos erguidas em contraluz, que é o assunto.
            `sizes` declara mais que 100vw porque a camada é 116% da altura e
            o cover amplia a imagem além da largura do viewport.

            A opacidade subiu de 45% para 70% junto com a troca da foto: a
            anterior tinha camisas amarelas em plena luz e sobrevivia ao
            gradiente, esta é contraluz e a 45% sumia por completo. O texto
            continua legível porque se apoia no terço de baixo, que é público
            em silhueta.
          */}
          <Media
            media={hero.background}
            preload
            sizes="(min-width: 1024px) 160vw, 100vw"
            className="h-full w-full"
            imageClassName="opacity-70 object-[65%_center]"
          />
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-bg-dark via-bg-dark/70 to-bg-dark"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_120%,var(--color-accent-red-dark)_0%,transparent_60%)] opacity-70"
      />

      <div className="container-page flex flex-1 flex-col justify-end pb-10">
        <Badge data-hero-eyebrow className="w-fit">
          {hero.eyebrow}
        </Badge>

        <h1 className="headline mt-7 max-w-5xl text-[clamp(2.75rem,10vw,7.5rem)]">
          {hero.headlineLines.map((line) => (
            <span key={line} className="headline-mask">
              <span data-hero-line className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-fade
          className="mt-8 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {hero.subheadline}
        </p>

        {/* Selo das distâncias */}
        <div
          data-hero-fade
          className="mt-8 flex w-fit items-center gap-4 border border-white/20 px-5 py-3"
        >
          {hero.distances.map((distance, index) => (
            <span key={distance} className="flex items-center gap-4">
              {index > 0 ? (
                <span aria-hidden className="text-accent-red">
                  ·
                </span>
              ) : null}
              <span className="label-condensed text-sm text-text-white sm:text-base">
                {distance}
              </span>
            </span>
          ))}
        </div>

        <div
          data-hero-fade
          className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <RegisterButton cta={hero.cta} source="hero" pulse animateIn={false} />

          <CTAButton
            href={hero.secondaryCta.href ?? "#distancias"}
            variant="outline"
            animateIn={false}
          >
            {hero.secondaryCta.label}
          </CTAButton>
        </div>

        {/*
          A data ainda não existe: `event.date` é null e o Countdown não
          renderiza nada. Fica só o aviso textual "Data em breve".
        */}
        <Countdown date={event.date} className="mt-9" />

        <p
          data-hero-fade
          className="label-condensed mt-6 text-[0.7rem] text-text-gray"
        >
          {hero.dateNote}
        </p>

        <div
          data-hero-scroll
          className="mt-14 flex items-center gap-3 text-text-gray"
        >
          <span data-hero-scroll-arrow aria-hidden className="text-lg leading-none">
            ↓
          </span>
          <span className="label-condensed text-[0.65rem]">
            {hero.scrollHint}
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
