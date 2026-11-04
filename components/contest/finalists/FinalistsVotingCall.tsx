"use client";

import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { Highlight } from "@/components/ui/Highlight";
import { Marquee } from "@/components/ui/Marquee";
import { contestFinalistsPage, contestVotingUrl } from "@/content";
import { fadeUp, revealLines } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Chamada para a votação, logo abaixo da grade de finalistas. Abre com a
 * tarja vermelha em rolagem (a mesma do hero do concurso) e fecha com o
 * slogan em headline, no tom de cartaz da página.
 */
export function FinalistsVotingCall() {
  const call = contestFinalistsPage.votingCall;

  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    revealLines(scope.querySelectorAll("[data-call-line]"), {
      prefersReducedMotion,
      trigger: scope,
      start: "top 80%",
    });

    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
    });

    revealLines(scope.querySelectorAll("[data-slogan-line]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-slogan]"),
      start: "top 85%",
    });
  });

  return (
    <section className="grain relative overflow-hidden bg-bg-dark text-text-white">
      <Marquee
        items={call.slogan.map((part) => part.toUpperCase())}
        className="border-y border-white/10 bg-accent-red text-text-white"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_100%,var(--color-accent-red-dark)_0%,transparent_65%)] opacity-70"
      />

      <div
        ref={root}
        className="container-page relative flex flex-col items-center py-20 text-center sm:py-28 lg:py-36"
      >
        <Badge data-reveal>{call.kicker}</Badge>

        <h2 className="headline mt-8 max-w-4xl text-[clamp(2.5rem,8vw,6rem)]">
          {call.title.map((line, i) => (
            <span key={line} className="headline-mask">
              <span data-call-line className="block will-change-transform">
                {i === call.title.length - 1 ? <Highlight>{line}</Highlight> : line}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-10 flex max-w-2xl flex-col gap-5 text-base leading-relaxed text-text-gray sm:text-lg">
          {call.paragraphs.map((paragraph, i) => (
            <p
              key={paragraph}
              data-reveal
              className={i === call.paragraphs.length - 1 ? "text-text-white" : undefined}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div data-reveal className="mt-10">
          <CTAButton href={contestVotingUrl} size="lg" pulse animateIn={false}>
            {call.ctaLabel}
          </CTAButton>
        </div>

        <p
          data-slogan
          aria-label={call.slogan.join(" ")}
          className="headline mt-20 text-[clamp(2rem,6.5vw,5rem)] lg:mt-28"
        >
          {call.slogan.map((part, i) => (
            <span key={part} aria-hidden className="headline-mask">
              <span data-slogan-line className="block will-change-transform">
                {i === call.slogan.length - 1 ? (
                  <Highlight variant="mark">{part}</Highlight>
                ) : (
                  part
                )}
              </span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
