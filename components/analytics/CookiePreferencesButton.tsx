"use client";

import { openCookiePreferences } from "@/lib/consent";

/** Reabre o aviso de cookies com as opções abertas. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Preferências de cookies
    </button>
  );
}
