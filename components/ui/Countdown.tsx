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
 * Contador regressivo — DESLIGADO nesta versão.
 *
 * A data do evento ainda não foi definida, então `content/event.ts` mantém
 * `date: null` e este componente não renderiza nada (nem contador, nem data,
 * nem placeholder). No dia em que a data for anunciada, basta preencher
 * `event.date` com um ISO 8601: o contador aparece sozinho, sem nenhuma
 * mudança de componente ou de página.
 */
export function Countdown({
  date,
  className,
  labels = { days: "dias", hours: "horas", minutes: "min", seconds: "seg" },
}: {
  date: string | null;
  className?: string;
  labels?: Record<keyof Remaining, string>;
}) {
  const nowSeconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const target = date ? new Date(date).getTime() : null;
  if (target === null || Number.isNaN(target) || nowSeconds === 0) return null;

  const remaining = getRemaining(target, nowSeconds * 1000);
  if (remaining === null) return null;

  const units: (keyof Remaining)[] = ["days", "hours", "minutes", "seconds"];

  return (
    <div className={cn("flex gap-5", className)}>
      {units.map((unit) => (
        <div key={unit} className="text-center">
          <p className="font-display text-4xl leading-none text-accent-red sm:text-5xl">
            {String(remaining[unit]).padStart(2, "0")}
          </p>
          <p className="label-condensed mt-2 text-[0.65rem] text-text-gray">
            {labels[unit]}
          </p>
        </div>
      ))}
    </div>
  );
}
