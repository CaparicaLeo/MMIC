"use client";

import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contest, contestDeadline, contestSubmissionUrl } from "@/content";
import { fadeUp, staggerIn } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

function DeadlineNote({ label }: { label: string }) {
  return (
    <span className="label-condensed text-[0.7rem] text-text-gray">
      {label}
      {contestDeadline ? (
        <span className="text-text-white">{contestDeadline}</span>
      ) : (
        <span className="text-text-gray">em breve</span>
      )}
    </span>
  );
}

/**
 * Regras do concurso: requisitos de participação, critérios de avaliação e a
 * nota com regulamento/gabarito. A URL do formulário e o prazo são
 * condicionais — enquanto não existem, a página mostra "em breve".
 */
export function RulesSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    staggerIn(scope.querySelectorAll("[data-rule-card]"), {
      prefersReducedMotion,
      trigger: scope.querySelector("[data-rules-grid]"),
      y: 28,
      each: 0.1,
    });
  });

  return (
    <Section id="regras" tone="darker">
      <div ref={root}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader intro={contest.rules.intro} />
          </div>

          <div>
            <div
              data-rules-grid
              className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3"
            >
              {contest.rules.requirements.map((item) => (
                <article
                  key={item.id}
                  data-rule-card
                  className="bg-bg-dark p-7"
                >
                  <h3 className="mt-1 text-lg font-semibold text-text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-gray">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-12">
              <h3 data-reveal className="label-condensed text-[0.7rem] text-accent-red">
                Critérios de avaliação
              </h3>

              <ul className="mt-6 flex flex-col gap-4">
                {contest.rules.criteria.map((item) => (
                  <li
                    key={item.id}
                    data-reveal
                    className="flex items-start gap-3"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 bg-accent-red"
                    />
                    <div>
                      <p className="text-sm font-semibold text-text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-text-gray">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-reveal
              className="mt-12 flex flex-col gap-3 border border-white/10 p-6"
            >
              <p className="text-sm leading-relaxed text-text-white/85">
                {contest.rules.guideNote}
              </p>
              {contestSubmissionUrl ? (
                <Link
                  href={contestSubmissionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-condensed w-fit border border-white/20 px-5 py-2.5 text-[0.7rem] text-text-white transition-colors hover:border-accent-red hover:bg-accent-red"
                >
                  Acessar o site do concurso
                </Link>
              ) : null}
              <DeadlineNote label="Prazo final para envio:" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}