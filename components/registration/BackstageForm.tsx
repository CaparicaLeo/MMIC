"use client";

import { useState } from "react";

import { track } from "@/lib/analytics";
import { waitlist } from "@/content";

import { useRegistration } from "./RegistrationProvider";

/** Nome dos campos no backend → nome no formulário (para mapear erros 422). */
const FIELD_KEYS: Record<string, string> = {
  email: "email",
  name: "name",
  phone: "contact",
  message: "contact",
};

/** Só dígitos: o backend normaliza, mas mandamos limpo para não depender disso. */
function digitos(value: string): string {
  return value.replace(/\D/g, "");
}

function ehEmail(valor: string): boolean {
  return valor.includes("@");
}

const fieldClass =
  "w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-text-white placeholder:text-text-gray/60 transition-colors focus:border-accent-red focus:outline-none";

/**
 * Formulário do Backstage: dois campos.
 *
 * Mesmo proxy do formulário de contato: envia para /api/opportunities (que
 * adiciona o token e repassa ao backend). Cada lead leva `type: "waitlist"` e
 * `source: "meia-de-curitiba:<bloco>"` para ser filtrado no painel.
 *
 * O campo de contato aceita e-mail OU WhatsApp — um só campo, como o briefing
 * pede, mas com a mesma função dos dois: decidir se o valor vai para `email` ou
 * para `phone`. O backend aceita qualquer um dos dois e rejeita (422) o lead sem
 * e-mail, então o e-mail segue como campo obrigatório ao lado.
 *
 * A distância vem do provider, não do formulário: quem abriu pelo card de 21 km
 * não deveria ter que marcar de novo, e o lead precisa gravar essa escolha.
 */
export function BackstageForm({ onSuccess }: { onSuccess: () => void }) {
  const { source, distance } = useRegistration();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGlobalError(null);
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    const contact = ((formData.get("contact") as string) ?? "").trim();
    const email = ((formData.get("email") as string) ?? "").trim();

    /*
      Dois campos com formatos diferentes, mas o backend aceita um só lugar para
      o contato: `email` é obrigatório e `phone` é opcional. A regra aqui é
      simples e não descarta o que a pessoa digitou — o campo de e-mail é sempre
      a autoridade do `email`, e o campo de contato só vira `phone` quando tem
      dígitos. Se a pessoa escreveu um e-mail no campo de contato, ele é
      redundante com o campo abaixo, e o canal preferido vai na `message`.
    */
    const contactEhEmail = ehEmail(contact);
    const contatoPreferido = contactEhEmail ? "email" : "whatsapp";

    if (!contact) {
      setFieldErrors({ contact: waitlist.errors.required });
      return;
    }

    if (!contactEhEmail && digitos(contact).length < 10) {
      setFieldErrors({ contact: waitlist.errors.invalidContact });
      return;
    }

    if (!email || !email.includes("@")) {
      setFieldErrors({ email: waitlist.errors.invalidEmail });
      return;
    }

    const payload: Record<string, string | null> = {
      email,
      name: (formData.get("name") as string) ?? "",
      phone: contactEhEmail ? null : digitos(contact),
      /*
        A distância e o canal preferido vão no `message` porque o contrato do
        backend aceita só oito campos e descarta o resto em silêncio — não existe
        coluna para nenhum dos dois. O texto é prefixado para que a coluna
        continue legível para quem lê o CRM.
      */
      message: `distancia: ${distance ?? "nao-informada"} · contato preferido: ${contatoPreferido}`,
      /*
        O `source` é o que o painel usa para dizer de qual bloco veio o lead. A
        distância entra no mesmo campo, com o prefixo `dist:` para o filtro do
        painel não precisar adivinhar o formato; `normalizeSource` do proxy
        preserva `:` e `-`, então a leitura é estável.
      */
      source: `meia-de-curitiba:${source ?? "desconhecido"}:dist:${distance ?? "nenhuma"}`,
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
        track("backstage_lead", {
          canal: "form",
          distancia: distance ?? "nenhuma",
          origem_bloco: source ?? "desconhecido",
        });
        onSuccess();
        return;
      }

      /*
        O 422 local (e-mail vazio) devolve `errors: { email: string }`, e o 422 do
        backend devolve listas por campo. A union cobre os dois, e o
        `Array.isArray` desce para o primeiro item quando é lista.
      */
      const data = (await response.json().catch(() => null)) as
        | { errors?: Record<string, string | string[]> }
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
          htmlFor="backstage-contact"
        >
          {waitlist.form.contact.label} *
        </label>
        <input
          id="backstage-contact"
          autoFocus
          {...inputProps("contact")}
          placeholder={waitlist.form.contact.placeholder}
        />
        <p className="mt-2 text-xs text-text-gray/70">
          {waitlist.form.contact.hint}
        </p>
        {fieldErrors.contact ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.contact}</p>
        ) : null}
      </div>

      <div>
        <label
          className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
          htmlFor="backstage-name"
        >
          {waitlist.form.name.label} *
        </label>
        <input
          id="backstage-name"
          autoComplete="name"
          {...inputProps("name")}
          placeholder={waitlist.form.name.placeholder}
        />
        {fieldErrors.name ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.name}</p>
        ) : null}
      </div>

      {/*
        O e-mail fica separado do campo de contato porque o CRM recusa lead sem
        e-mail (422) — quem só quiser WhatsApp ainda precisa deixar um e-mail,
        e a diferença entre os dois campos é o que permite atender pelo canal
        que a pessoa escolheu.
      */}
      <div>
        <label
          className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
          htmlFor="backstage-email"
        >
          {waitlist.form.email.label} *
        </label>
        <input
          id="backstage-email"
          type="email"
          autoComplete="email"
          {...inputProps("email")}
          placeholder={waitlist.form.email.placeholder}
        />
        {fieldErrors.email ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.email}</p>
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
        {isPending ? waitlist.form.submit.pendingLabel : waitlist.form.submit.label}
      </button>
    </form>
  );
}