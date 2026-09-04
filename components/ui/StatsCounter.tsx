"use client";

import { countUp, fadeUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { StatItem } from "@/content/types";

/**
 * Grid de números com contagem animada.
 *
 * O valor final é renderizado no HTML — o GSAP zera e conta a partir dali.
 * Assim o número está correto para crawlers, para leitores de tela e para
 * quem está com movimento reduzido.
 *
 * Reutilizável: qualquer página futura passa um `items` diferente.
 */
export function StatsCounter({
  items,
  className,
  columns = 3,
}: {
  items: StatItem[];
  className?: string;
  columns?: 2 | 3 | 4;
}) {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion }) => {
    fadeUp(scope.querySelectorAll("[data-stat]"), {
      prefersReducedMotion,
      trigger: scope,
      stagger: 0.12,
      y: 24,
    });

    scope.querySelectorAll<HTMLElement>("[data-count]").forEach((element) => {
      const value = Number(element.dataset.count);
      const decimals = Number(element.dataset.decimals ?? 0);
      if (Number.isNaN(value)) return;

      countUp(element, { value, decimals, prefersReducedMotion, trigger: scope });
    });
  });

  return (
    <div
      ref={root}
      className={cn(
        "grid gap-px border border-white/10 bg-white/10",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.id} data-stat className="bg-bg-dark p-7 lg:p-9">
          <p className="flex items-baseline font-display text-5xl leading-none tracking-[-0.02em] text-accent-red sm:text-6xl lg:text-7xl">
            {/* `whitespace-pre` preserva o espaço final de prefixos como
                "até " — como flex item, ele era colapsado e saía "até30.000".
                Prefixos sem espaço ("+") continuam colados ao número. */}
            {item.prefix ? (
              <span className="text-2xl whitespace-pre sm:text-3xl">
                {item.prefix}
              </span>
            ) : null}
            <span
              data-count={item.value}
              data-decimals={item.decimals ?? 0}
              // Sem JS, o valor final já está aqui.
              suppressHydrationWarning
            >
              {formatNumber(item.value, item.decimals ?? 0)}
            </span>
            {item.suffix ? <span>{item.suffix}</span> : null}
          </p>

          <p className="label-condensed mt-4 text-sm text-text-white">
            {item.label}
          </p>

          {item.note ? (
            <p className="mt-2 text-sm leading-relaxed text-text-gray">
              {item.note}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
