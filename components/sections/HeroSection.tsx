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
  event.registrationLabel,
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
            fumaça e na bateria, 65% pega os corredores com o público atrás,
            que é o assunto.
            `sizes` declara mais que 100vw porque a camada é 116% da altura e
            o cover amplia a imagem além da largura do viewport.

            A foto vai em opacidade cheia e quem segura a legibilidade são os
            gradientes abaixo. Ela é clara (céu estourado, piso do palco ao
            sol), então o vertical não abre no meio: escurece o topo (nav), mantém
            metade no miolo, onde o texto cinza passa por cima do público, e
            fecha na base (emenda com o marquee). No desktop, um lateral cobre a
            coluna de texto e deixa a metade direita mais aberta.
          */}
          <Media
            media={hero.background}
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
          {hero.eyebrow}
        </Badge>

        {/*
          A assinatura criativa é <p>, não <h1>: ela é a frase de campanha e
          não diz o que a página é. As mesmas classes de antes, então nada
          muda na tela — a troca é só de tag.

          O mínimo do clamp é 2rem (e não 2.75rem) para que a linha mais longa,
          "Curitiba vira o palco.", não quebre no celular. Ela mede ~8,2× o
          tamanho da fonte; a 10vw isso cabe na caixa (viewport − 40px) em
          qualquer tela acima de 220px. Com mínimo de 2.75rem (44px) a fonte
          travava em 44px e a frase estourava em 360–390px.
        */}
        <p className="headline mt-7 max-w-5xl text-[clamp(2rem,10vw,7.5rem)]">
          {hero.headlineLines.map((line) => (
            <span key={line} className="headline-mask">
              <span data-hero-line className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </p>

        {/*
          O <h1> da home é o nome do evento. Fica visível e com o mesmo peso
          de antes (as classes são as mesmas do <p> que ocupava este lugar);
          o reset do Tailwind zera fonte, peso e margem padrão de h1, então a
          tag não altera a renderização.
        */}
        <h1
          data-hero-fade
          className="mt-8 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {hero.subheadline}
        </h1>

        {/*
          Card de abertura das inscrições — o único bloco de prazo do hero.
          Data, contador, CTA e a linha de benefício moram juntos: era isso
          que a pessoa precisava ler antes de clicar, e o selo de distâncias
          que ocupava este lugar só repetia o que a seção "Escolha o seu
          palco" já dizia melhor.

          O alvo do contador é `registrationOpensAt`, não a data da prova —
          `event.date` continua null e o hero não anuncia um dia que não
          existe. Sem segundos (o prazo está meses distante) e com os dígitos
          em branco: no card preto o vermelho fica só no rótulo.
        */}
        <div
          data-hero-fade
          className="mt-8 w-fit max-w-xl border border-white/15 bg-black p-6 sm:p-8"
        >
          <p className="label-condensed text-[0.65rem] text-accent-red">
            {hero.registrationCard.label}
          </p>

          <p className="font-display mt-3 text-3xl leading-none text-text-white sm:text-4xl">
            {hero.registrationCard.date}
          </p>

          <Countdown
            date={event.registrationOpensAt}
            caption={hero.registrationCard.countdownCaption}
            showSeconds={false}
            tone="white"
            className="mt-7"
          />

          <RegisterButton
            cta={hero.cta}
            source="hero"
            pulse
            animateIn={false}
            className="mt-8 w-full"
          />

          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-gray">
            {hero.registrationCard.note}
          </p>
        </div>

        {/* Link texto para as distâncias — elas continuam na seção dela. */}
        <div data-hero-fade className="mt-5">
          <CTAButton
            href={hero.secondaryCta.href ?? "#distancias"}
            variant="ghost"
            animateIn={false}
          >
            {hero.secondaryCta.label}
          </CTAButton>
        </div>

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
