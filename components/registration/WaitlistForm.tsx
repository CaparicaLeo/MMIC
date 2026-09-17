"use client";

import { useState } from "react";

import { waitlist } from "@/content";

import { useRegistration } from "./RegistrationProvider";

/** Nome dos campos no backend → nome no formulário (para mapear erros 422). */
const FIELD_KEYS: Record<string, string> = {
  email: "email",
  name: "name",
  phone: "whatsapp",
  message: "instagram",
};

const fieldClass =
  "w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-text-white placeholder:text-text-gray/60 transition-colors focus:border-accent-red focus:outline-none";

/**
 * Formulário da lista de avisos, aberto pelos CTAs de inscrição.
 *
 * Mesmo proxy do formulário de contato: envia para /api/opportunities (que
 * adiciona o token e repassa ao backend). Cada lead leva `type: "waitlist"` e
 * `source: "meia-de-curitiba:<cta>"` para ser filtrado no painel.
 */
export function WaitlistForm({ onSuccess }: { onSuccess: () => void }) {
  const { source } = useRegistration();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGlobalError(null);
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    /* Instagram não é campo aceito pelo backend — vai no `message` com
       prefixo rastreável, para num campo dedicado quando o contrato mudar. */
    const payload: Record<string, string | null> = {
      email: (formData.get("email") as string) ?? "",
      name: (formData.get("name") as string) ?? "",
      phone: (formData.get("whatsapp") as string) ?? "",
      message: (formData.get("instagram") as string) ?? "",
      source: `meia-de-curitiba:${source ?? "desconhecido"}`,
      type: "waitlist",
    };

    setIsPending(true);
    try {
      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        form.reset();
        onSuccess();
        return;
      }

      const data = (await response.json().catch(() => null)) as
        | { errors?: Record<string, string[]> }
        | null;

      if (response.status === 422 && data?.errors) {
        const flattened: Record<string, string> = {};
        for (const [key, values] of Object.entries(data.errors)) {
          const fieldKey = FIELD_KEYS[key] ?? key;
          flattened[fieldKey] = Array.isArray(values) ? values[0] : String(values);
        }
        setFieldErrors(flattened);
        return;
      }

      if (response.status === 429) {
        setGlobalError(waitlist.notices.rateLimited);
        return;
      }

      setGlobalError(waitlist.errors.internal);
    } catch {
      setGlobalError(waitlist.errors.internal);
    } finally {
      setIsPending(false);
    }
  }

  const inputProps = (name: string) => ({
    name,
    required: true,
    "aria-invalid": Boolean(fieldErrors[name]),
    className: fieldClass,
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-5">
      <div>
        <label
          className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
          htmlFor="waitlist-email"
        >
          {waitlist.form.email.label} *
        </label>
        <input
          id="waitlist-email"
          type="email"
          autoFocus
          {...inputProps("email")}
          placeholder={waitlist.form.email.placeholder}
        />
        {fieldErrors.email ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.email}</p>
        ) : null}
      </div>

      <div>
        <label
          className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
          htmlFor="waitlist-name"
        >
          {waitlist.form.name.label} *
        </label>
        <input
          id="waitlist-name"
          {...inputProps("name")}
          placeholder={waitlist.form.name.placeholder}
        />
        {fieldErrors.name ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.name}</p>
        ) : null}
      </div>

      <div>
        <label
          className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
          htmlFor="waitlist-whatsapp"
        >
          {waitlist.form.whatsapp.label} *
        </label>
        <input
          id="waitlist-whatsapp"
          type="tel"
          {...inputProps("whatsapp")}
          placeholder={waitlist.form.whatsapp.placeholder}
        />
        {fieldErrors.whatsapp ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.whatsapp}</p>
        ) : null}
      </div>

      <div>
        <label
          className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
          htmlFor="waitlist-instagram"
        >
          {waitlist.form.instagram.label} *
        </label>
        <input
          id="waitlist-instagram"
          {...inputProps("instagram")}
          placeholder={waitlist.form.instagram.placeholder}
        />
        {fieldErrors.instagram ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.instagram}</p>
        ) : null}
      </div>

      {globalError ? (
        <p className="text-sm text-accent-red" role="alert">
          {globalError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending || undefined}
        className="label-condensed w-full border border-accent-red bg-accent-red px-8 py-4 text-sm text-text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? waitlist.submit.pendingLabel : waitlist.submit.label}
      </button>
    </form>
  );
}