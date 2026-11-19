"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cookieBanner as copy } from "@/content/privacidade";
import { type Consent, onOpenCookiePreferences, readConsent, saveConsent, useConsent } from "@/lib/consent";

const buttonBase =
  "label-condensed inline-flex items-center justify-center px-5 py-3 text-[0.7rem] transition-colors";

/**
 * Aviso de cookies. Aparece enquanto não houver escolha e volta pelo link
 * "Preferências de cookies" do rodapé. Não bloqueia a página: quem não
 * escolhe segue navegando sem medição nem pixel, que é o padrão seguro.
 *
 * "Recusar" tem o mesmo peso visual de "Aceitar": a LGPD pede consentimento
 * livre, e um botão escondido não é escolha.
 */
export function CookieBanner() {
  const consent = useConsent();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [draft, setDraft] = useState<Consent>({ analytics: false, marketing: false });

  useEffect(
    () =>
      onOpenCookiePreferences(() => {
        setDraft(readConsent() ?? { analytics: false, marketing: false });
        setDetails(true);
        setOpen(true);
      }),
    [],
  );

  // Sem escolha guardada, o aviso aparece sozinho; com escolha, só pelo link.
  if (!open && consent !== null) return null;

  const choose = (next: Consent) => {
    setOpen(false);
    setDetails(false);
    saveConsent(next);
  };

  return (
    <div
      role="dialog"
      aria-label={copy.title}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/15 bg-[#0a0a0a]/95 text-text-white backdrop-blur"
    >
      <div className="container-page flex flex-col gap-5 py-5 lg:py-6">
        <div className="flex flex-col gap-2">
          <p className="label-condensed text-[0.72rem] text-text-white">{copy.title}</p>
          <p className="max-w-3xl text-sm leading-relaxed text-text-gray">
            {copy.text}{" "}
            <Link
              href="/politica-de-privacidade#cookies"
              className="text-text-white underline underline-offset-4 hover:text-accent-red"
            >
              {copy.linkLabel}
            </Link>
            .
          </p>
        </div>

        {details ? (
          <fieldset className="grid gap-3 md:grid-cols-3">
            <legend className="sr-only">{copy.detailsLegend}</legend>
            <label className="flex items-start gap-3 border border-white/10 p-4 text-sm text-text-gray">
              <input type="checkbox" checked disabled className="mt-1 accent-[var(--color-accent-red)]" />
              <span>
                <span className="block text-text-white">{copy.categories.essential.label}</span>
                {copy.categories.essential.text}
              </span>
            </label>
            {(["analytics", "marketing"] as const).map((key) => (
              <label
                key={key}
                className="flex cursor-pointer items-start gap-3 border border-white/10 p-4 text-sm text-text-gray hover:border-white/30"
              >
                <input
                  type="checkbox"
                  checked={draft[key]}
                  onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.checked }))}
                  className="mt-1 accent-[var(--color-accent-red)]"
                />
                <span>
                  <span className="block text-text-white">{copy.categories[key].label}</span>
                  {copy.categories[key].text}
                </span>
              </label>
            ))}
          </fieldset>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => choose({ analytics: true, marketing: true })}
            className={`${buttonBase} border border-accent-red bg-accent-red text-text-white hover:opacity-90`}
          >
            {copy.acceptAll}
          </button>
          <button
            type="button"
            onClick={() => choose({ analytics: false, marketing: false })}
            className={`${buttonBase} border border-white/25 text-text-white hover:border-white`}
          >
            {copy.rejectAll}
          </button>
          {details ? (
            <button
              type="button"
              onClick={() => choose(draft)}
              className={`${buttonBase} border border-white/25 text-text-white hover:border-white`}
            >
              {copy.save}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setDraft(readConsent() ?? { analytics: false, marketing: false });
                setDetails(true);
              }}
              className={`${buttonBase} text-text-gray underline underline-offset-4 hover:text-text-white`}
            >
              {copy.customize}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
