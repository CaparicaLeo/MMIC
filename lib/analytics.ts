"use client";

import { track as vercelTrack } from "@vercel/analytics/react";

/**
 * Eventos de conversão do site.
 *
 * Vocabulário fechado e escrito aqui, e não espalhado pelos componentes: o
 * nome do evento e as propriedades precisam ser os mesmos em toda ocorrência,
 * senão o funil não fecha. As variantes do teste A/B entram pelo campo
 * `variante`, que o <VariantProvider> preenche — assim a variante é lida em
 * qualquer ponto sem prop drilling.
 */
export type AnalyticsEvent =
  | "backstage_cta_click"
  | "backstage_lead"
  | "marcas_lead_passo1"
  | "marcas_lead_passo2"
  | "marcas_download_relatorio";

export type AnalyticsProps = Record<string, string | number | boolean>;

/**
 * Dispara um evento de conversão.
 *
 * Envelopa o `track` do Vercel Analytics por dois motivos: o primeiro é o
 * `variant` — todo evento de conversão carrega a variante que a pessoa viu,
 * porque sem isso não há como comparar os braços do teste. O segundo é o
 * guard de `typeof window`: `track` só existe no cliente, e alguns componentes
 * que disparam evento renderizam no servidor.
 */
export function track(event: AnalyticsEvent, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;

  const variant = readVariant();

  vercelTrack(event, variant ? { ...props, variante: variant } : props);
}

function readVariant(): string | null {
  if (typeof document === "undefined") return null;

  try {
    return document.documentElement.dataset.abVariant ?? null;
  } catch {
    return null;
  }
}