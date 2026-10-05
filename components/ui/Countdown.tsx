"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/cn";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

/**
 * Relógio compartilhado com resolução de 1 segundo.
 *
 * O snapshot é o segundo corrente (não o milissegundo): ele só muda uma vez
 * por segundo, então o React não entra em loop de render. No servidor o
 * snapshot é 0, o que faz o componente não renderizar nada durante o SSR e
 * evita divergência de hidratação.
 */
function subscribe(onTick: () => void) {
  const interval = setInterval(onTick, 1000);
  return () => clearInterval(interval);
}

function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerSnapshot() {
  return 0;
}

function getRemaining(target: number, now: number): Remaining | null {
  const diff = target - now;
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * Contador regressivo para um prazo que existe.
 *
 * Reutilizável: as duas instâncias do site (abertura das inscrições e votação
 * da camiseta) passam `date` e `caption` diferentes a partir do conteúdo, sem
 * duplicar componente.
 *
 * Quando a data ainda não existe, `date` é `null` e o componente não renderiza
 * nada — nem contador, nem data, nem placeholder. É o estado vazio que o
 * projeto já usava como padrão (`event.date`).
 */
export function Countdown({
  date,
  className,
  caption,
  compact = false,
  labels = { days: "dias", hours: "horas", minutes: "min", seconds: "seg" },
}: {
  date: string | null;
  className?: string;
  /** Texto acima dos dígitos. Ex.: "Inscrições abrem em". */
  caption?: string;
  /**
   * Versão de uma linha, para caber em barra ou faixa estreita. Mantém os
   * quatro dígitos, porque esconder segundos é o truque que faz o contador
   * parecer travado no primeiro segundo de render.
   */
  compact?: boolean;
  labels?: Record<keyof Remaining, string>;
}) {
  const nowSeconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const target = date ? new Date(date).getTime() : null;
  if (target === null || Number.isNaN(target) || nowSeconds === 0) return null;

  const remaining = getRemaining(target, nowSeconds * 1000);
  if (remaining === null) return null;

  const units: (keyof Remaining)[] = ["days", "hours", "minutes", "seconds"];

  return (
    <div className={cn(compact ? "flex flex-col gap-3" : "flex flex-col gap-4", className)}>
      {caption ? (
        <p className="label-condensed text-[0.7rem] text-text-gray">{caption}</p>
      ) : null}

      <div
        className={cn(
          "flex gap-5",
          // Na versão compacta os dígitos ficam menores e o espaço entre eles
          // encolhe, senão a barra de prova social não cabe em 320px.
          compact && "gap-3 sm:gap-4",
        )}
      >
        {units.map((unit) => (
          <div key={unit} className="text-center">
            <p
              className={cn(
                "font-display leading-none tabular-nums text-accent-red",
                compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl",
              )}
            >
              {String(remaining[unit]).padStart(2, "0")}
            </p>
            <p className="label-condensed mt-2 text-[0.65rem] text-text-gray">
              {labels[unit]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
