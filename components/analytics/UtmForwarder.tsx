"use client";

import { useEffect } from "react";

/**
 * UTMs do anúncio até a Ticket Sports.
 *
 * Os `utm_*` que chegam na URL ficam guardados na sessão e são repassados ao
 * link da Ticket Sports no momento do clique, sem sobrescrever parâmetros que
 * o link já tenha (como `origem=novo-site`).
 *
 * Fica separado do Pixel da Meta de propósito: os UTMs são rótulos da
 * campanha, iguais para todo mundo que clicou no mesmo anúncio, e não
 * identificam ninguém. Por isso rodam sem depender do aviso de cookies, e a
 * política de privacidade descreve esse uso.
 */
export const TICKET_HOST = "ticketsports.com.br";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const UTM_STORAGE = "mmic27-utms";

function readStoredUtms(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE) ?? "{}");
  } catch {
    return {};
  }
}

/** Guarda os UTMs da URL atual, se houver; senão mantém os da sessão. */
function captureUtms() {
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  if (Object.keys(found).length === 0) return;
  try {
    sessionStorage.setItem(UTM_STORAGE, JSON.stringify(found));
  } catch {
    /* sessão bloqueada: segue sem repassar */
  }
}

function withUtms(href: string): string {
  const utms = readStoredUtms();
  if (Object.keys(utms).length === 0) return href;
  try {
    const url = new URL(href);
    for (const [key, value] of Object.entries(utms)) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return href;
  }
}

export function ticketLinkFrom(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  const link = target.closest("a[href]");
  if (!(link instanceof HTMLAnchorElement)) return null;
  return link.hostname.endsWith(TICKET_HOST) ? link : null;
}

export function UtmForwarder() {
  useEffect(() => {
    captureUtms();

    // Repassa os UTMs antes de o navegador seguir o link (clique, botão do
    // meio ou "abrir em nova aba" pelo teclado).
    const prepare = (event: Event) => {
      const link = ticketLinkFrom(event.target);
      if (link) link.href = withUtms(link.href);
    };

    document.addEventListener("pointerdown", prepare, true);
    document.addEventListener("focusin", prepare, true);
    document.addEventListener("click", prepare, true);
    return () => {
      document.removeEventListener("pointerdown", prepare, true);
      document.removeEventListener("focusin", prepare, true);
      document.removeEventListener("click", prepare, true);
    };
  }, []);

  return null;
}
