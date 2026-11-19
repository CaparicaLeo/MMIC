"use client";

import { useSyncExternalStore } from "react";

/**
 * Consentimento de cookies (LGPD).
 *
 * A política de privacidade promete que medição (GA4 e Clarity) e publicidade
 * (Pixel da Meta) só carregam depois do aceite. Este módulo guarda a escolha e
 * avisa quem precisa saber: o <TrackingScripts> monta os scripts conforme ela
 * e o <CookieBanner> aparece enquanto não houver escolha.
 *
 * A escolha fica no localStorage do próprio site, e não em cookie: ela não sai
 * do navegador e é o tipo de armazenamento essencial que dispensa aceite.
 * `version` existe para pedir o aceite de novo se a lista de ferramentas mudar
 * de forma relevante — basta subir o número.
 */
export type Consent = {
  /** Google Analytics 4 e Microsoft Clarity. */
  analytics: boolean;
  /** Pixel da Meta. */
  marketing: boolean;
};

const STORAGE_KEY = "mmic-consent";
const VERSION = 1;

const CHANGE_EVENT = "mmic:consent-change";
const OPEN_EVENT = "mmic:cookie-preferences";

/**
 * Cookies que as ferramentas gravam no domínio do site. Ao retirar o aceite,
 * eles são apagados e a página recarrega, porque um script já carregado não
 * tem como ser descarregado.
 */
const TRACKING_COOKIE_PREFIXES: Record<keyof Consent, string[]> = {
  analytics: ["_ga", "_gid", "_gat", "_clck", "_clsk", "CLID", "MUID"],
  marketing: ["_fbp", "_fbc"],
};

/** Cópia em memória para quando o localStorage estiver bloqueado. */
let memoryRaw: string | null = null;
let cachedRaw: string | null = null;
let cachedValue: Consent | null = null;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? memoryRaw;
  } catch {
    return memoryRaw;
  }
}

function parse(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Consent> & { version?: number };
    if (parsed.version !== VERSION) return null;
    return { analytics: parsed.analytics === true, marketing: parsed.marketing === true };
  } catch {
    return null;
  }
}

/** Mesma referência enquanto o valor guardado não mudar (useSyncExternalStore exige). */
export function readConsent(): Consent | null {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
  }
  return cachedValue;
}

function deleteCookiesWithPrefix(prefixes: string[]) {
  const host = window.location.hostname;
  // O GA grava no domínio de topo (.meiadecuritiba.com.br); tenta os dois.
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0]?.trim();
    if (!name || !prefixes.some((prefix) => name.startsWith(prefix))) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

/**
 * Apaga os cookies das categorias recusadas. Roda também na carga seguinte à
 * revogação, porque o GA regrava o `_ga_*` enquanto a página descarrega.
 * Cookies de domínio de terceiros (clarity.ms, bing.com) ficam fora do
 * alcance do site; a política manda para as configurações do navegador.
 */
export function clearRefusedCookies(consent: Consent) {
  const prefixes = (Object.keys(consent) as (keyof Consent)[])
    .filter((key) => !consent[key])
    .flatMap((key) => TRACKING_COOKIE_PREFIXES[key]);
  if (prefixes.length > 0) deleteCookiesWithPrefix(prefixes);
}

export function saveConsent(next: Consent) {
  const previous = readConsent();
  memoryRaw = JSON.stringify({ ...next, version: VERSION, savedAt: new Date().toISOString() });
  try {
    window.localStorage.setItem(STORAGE_KEY, memoryRaw);
  } catch {
    /* armazenamento bloqueado: a escolha vale até a página recarregar */
  }

  const revoked = (Object.keys(next) as (keyof Consent)[]).filter(
    (key) => previous?.[key] && !next[key],
  );
  if (revoked.length > 0) {
    deleteCookiesWithPrefix(revoked.flatMap((key) => TRACKING_COOKIE_PREFIXES[key]));
    window.location.reload();
    return;
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Abre o aviso de cookies de novo (link "Preferências de cookies"). */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenCookiePreferences(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  // Escolha feita em outra aba do site.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Escolha atual. `undefined` no servidor e na hidratação, `null` quando a
 * pessoa ainda não escolheu.
 */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore<Consent | null | undefined>(subscribe, readConsent, () => undefined);
}
