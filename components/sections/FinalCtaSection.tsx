"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/Badge";
import { Countdown } from "@/components/ui/Countdown";
import { Highlight } from "@/components/ui/Highlight";
import { Marquee } from "@/components/ui/Marquee";
import { Section } from "@/components/ui/Section";
import { RegisterButton } from "@/components/registration/RegisterButton";
import { event, finalCta } from "@/content";
import { fadeUp, revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

export function FinalCtaSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    revealLines(scope.querySelectorAll("[data-final-line]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 80%",
    });

    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });
  });

  return (
    <Section id="inscricao" className="grain overflow-hidden pb-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_100%,var(--color-accent-red-dark)_0%,transparent_60%)] opacity-80"
      />

      <div ref={root} className="relative flex flex-col items-center text-center">
        <Badge data-reveal>{finalCta.kicker}</Badge>

        <h2 className="headline mt-8 max-w-4xl text-[clamp(2.25rem,7vw,5.5rem)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-final-line className="block will-change-transform">
              Quando o esporte encontra o rock,
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-final-line className="block will-change-transform">
              <Highlight>Curitiba</Highlight> vira o palco.
            </span>
          </span>
        </h2>

        <p
          data-reveal
          className="mt-8 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {finalCta.description}
        </p>

        {/* Sem data definida: o Countdown não renderiza nada por enquanto. */}
        <Countdown date={event.date} className="mt-10 justify-center" />

        <div data-reveal className="mt-10">
          <RegisterButton
            cta={finalCta.cta}
            source="cta-final"
            pulse
            animateIn={false}
          />
        </div>

        <p
          data-reveal
          className="label-condensed mt-6 text-[0.7rem] text-text-gray"
        >
          {finalCta.dateNote}
        </p>

        {/*
          A assinatura de fecho é arte, não tipografia: o lockup traz o realce
          vermelho em "ROCK" que não dá para reproduzir com a fonte. O texto
          continua acessível pelo alt e segue idêntico ao do rodapé.
        */}
        <div data-reveal className="mt-20 w-full max-w-2xl">
          <Image
            src={finalCta.closingLockup.src}
            alt={finalCta.closingLockup.alt}
            width={finalCta.closingLockup.width}
            height={finalCta.closingLockup.height}
            sizes="(min-width: 768px) 42rem, 90vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="relative mt-20 -mx-5 md:-mx-10">
        <Marquee
          items={[...event.distances, "ROCK EDITION", event.city.toUpperCase(), event.year]}
          className="border-y border-white/10 bg-accent-red text-text-white"
          reverse
        />
      </div>
    </Section>
  );
}
