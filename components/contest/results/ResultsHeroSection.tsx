"use client";

import { Badge } from "@/components/ui/Badge";
import { Media } from "@/components/ui/Media";
import { RegisterButton } from "@/components/registration/RegisterButton";
import { contest, contestResults, finalCta } from "@/content";
import type { ContestPhase } from "@/content/contestResults";
import { parallax } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { cn } from "@/lib/cn";

/**
 * Em que passo de `contest.timeline.items` cada fase está. É a mesma linha do
 * tempo da página do concurso, para o visitante reconhecer os quatro passos
 * que leu lá — só que agora com o passo atual marcado.
 */
const currentStep: Record<ContestPhase, string> = {
  curadoria: "curadoria",
  votacao: "votacao",
  resultado: "anuncio",
};

/**
 * Abertura de /concurso-de-camisetas/vencedores.
 *
 * Mesma receita do hero do concurso (foto com parallax + degradês), mas sem
 * ocupar a tela inteira: quando o resultado sai, a arte do campeão logo
 * abaixo é a imagem principal, e o hero entrega a vez a ela.
 */
export function ResultsHeroSection() {
  const { phase, announcedAt } = contestResults;
  const steps = contest.timeline.items;
  const currentIndex = steps.findIndex((step) => step.id === currentStep[phase]);

  const root = useGsapScroll<HTMLElement>(({ scope, prefersReducedMotion, gsap }) => {
    parallax(scope.querySelector("[data-hero-media]"), {
      prefersReducedMotion,
      trigger: scope,
      strength: 14,
    });

    if (prefersReducedMotion) return;

    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .from("[data-hero-eyebrow]", { opacity: 0, y: 12, duration: 0.6 })
      .from("[data-hero-line]", { yPercent: 115, duration: 1.1, stagger: 0.08 }, "-=0.3")
      .from("[data-hero-fade]", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, "-=0.65");
  });

  return (
    <section
      ref={root}
      id="resultado"
      className="grain relative isolate overflow-hidden pt-40 pb-20 text-text-white sm:pb-28"
    >
      <div aria-hidden className="absolute inset-0 -z-20">
        <div data-hero-media className="absolute inset-x-0 -top-[8%] h-[116%]">
          <Media
            media={contestResults.hero.background}
            preload
            sizes="(min-width: 1024px) 160vw, 100vw"
            className="h-full w-full"
            imageClassName="object-[65%_center]"
          />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-bg-dark/85 via-bg-dark/60 to-bg-dark"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-linear-to-r from-bg-dark/80 to-transparent to-65% lg:block"
      />

      <div className="container-page relative">
        <Badge data-hero-eyebrow className="w-fit">
          {contestResults.hero.kicker}
        </Badge>

        <h1 className="headline mt-7 max-w-4xl text-[clamp(2.5rem,8vw,5.5rem)]">
          {contestResults.hero.title[phase].map((line) => (
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
          {contestResults.hero.description[phase]}
        </p>

        {announcedAt ? (
          <p data-hero-fade className="label-condensed mt-6 text-[0.7rem] text-text-gray">
            Resultado anunciado em {announcedAt}
          </p>
        ) : null}

        {/* Antes do resultado, a ação é votar — e o aviso de quando votar
            chega pelo grupo VIP, então o CTA abre o grupo. */}
        {phase !== "resultado" ? (
          <div data-hero-fade className="mt-9">
            <RegisterButton
              cta={finalCta.cta}
              source="concurso-resultado-hero"
              pulse={phase === "votacao"}
              animateIn={false}
            />
            <p className="label-condensed mt-5 text-[0.7rem] text-text-gray">
              Qualquer pessoa vota pelo Instagram oficial {contest.voting.handle}
            </p>
          </div>
        ) : null}

        <ol
          data-hero-fade
          aria-label="Etapas do concurso"
          className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-4"
        >
          {steps.map((step, index) => {
            const done = index < currentIndex;
            const current = index === currentIndex;

            return (
              <li
                key={step.id}
                aria-current={current ? "step" : undefined}
                className={cn("flex flex-col gap-2 bg-bg-dark/90 p-5", current && "bg-[#120406]/90")}
              >
                <span
                  className={cn(
                    "label-condensed text-[0.65rem]",
                    current ? "text-text-white" : "text-text-gray",
                  )}
                >
                  {done ? "Concluído" : current ? "Agora" : "A seguir"}
                </span>
                <span
                  className={cn(
                    "text-sm leading-snug",
                    done || current ? "text-text-white" : "text-text-gray",
                  )}
                >
                  {step.title}
                </span>
                {/* Barra de progresso de 2px: o vermelho marca até onde o
                    concurso já chegou, sem depender de cor no texto. */}
                <span
                  aria-hidden
                  className={cn(
                    "mt-2 h-0.5 w-full",
                    done || current ? "bg-accent-red" : "bg-white/10",
                  )}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
