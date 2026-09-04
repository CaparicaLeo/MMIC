"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatsCounter } from "@/components/ui/StatsCounter";
import { stats } from "@/content";
import { countUp, drawLine, fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";

const maxValue = Math.max(...stats.growth.series.map((point) => point.value));

export function StatsSection() {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-reveal]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.1,
    });

    const chart = scope.querySelector("[data-growth-chart]");

    scope.querySelectorAll<HTMLElement>("[data-growth-bar]").forEach((bar) => {
      drawLine(bar, {
        prefersReducedMotion,
        trigger: chart,
        start: "top 80%",
        end: "bottom 80%",
        axis: "x",
      });
    });

    scope.querySelectorAll<HTMLElement>("[data-growth-value]").forEach((element) => {
      const value = Number(element.dataset.growthValue);
      if (Number.isNaN(value)) return;

      countUp(element, {
        value,
        prefersReducedMotion,
        trigger: chart,
        duration: 1.6,
      });
    });
  });

  return (
    <Section id="numeros" tone="darker">
      <div ref={root}>
        <SectionHeader intro={stats.intro} />

        <StatsCounter items={stats.items} className="mt-14 lg:mt-20" />

        {/* Comparativo histórico 2025 → 2026 → 2027 */}
        <div
          data-growth-chart
          className="mt-16 border border-white/10 p-8 lg:p-10"
        >
          <p className="label-condensed text-[0.7rem] text-text-gray">
            {stats.growth.label}
          </p>

          <ul className="mt-8 flex flex-col gap-7">
            {stats.growth.series.map((point) => (
              <li key={point.year} className="flex items-center gap-5">
                <span className="label-condensed w-14 shrink-0 text-sm text-text-white">
                  {point.year}
                </span>

                <span className="relative h-2 flex-1 bg-white/8">
                  <span
                    data-growth-bar
                    className={cn(
                      "absolute inset-y-0 left-0 origin-left",
                      point.projected ? "bg-accent-red" : "bg-white/45",
                    )}
                    style={{ width: `${(point.value / maxValue) * 100}%` }}
                  />
                </span>

                <span
                  className={cn(
                    "w-20 shrink-0 text-right font-display text-xl tabular-nums",
                    point.projected ? "text-accent-red" : "text-text-white",
                  )}
                >
                  <span
                    data-growth-value={point.value}
                    suppressHydrationWarning
                  >
                    {formatNumber(point.value)}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm leading-relaxed text-text-gray">
            2027 é meta de inscritos, não histórico realizado.
          </p>
        </div>
      </div>
    </Section>
  );
}
