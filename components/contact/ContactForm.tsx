"use client";

import { useState } from "react";

import { contact } from "@/content";

/**
 * Formulário de contato da página /contato.
 *
 * O envio vai para o route handler same-origin (app/api/opportunities), que
 * adiciona o token e repassa ao backend — nada sensível vive aqui no browser.
 * Estados: enviando, sucesso (201), erro por campo (422), limite (429) e
 * falha geral — cada um com livre tradução para o vizir do site.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setGlobalError(null);
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: Record<string, string | null> = {
      email: (formData.get("email") as string) ?? "",
      name: (formData.get("name") as string) ?? "",
      phone: (formData.get("phone") as string) ?? "",
      age: (formData.get("age") as string) ?? "",
      gender: (formData.get("gender") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
      source: "contato",
      type: (formData.get("type") as string) ?? "",
    };

    setIsPending(true);
    try {
      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        setStatus("success");
        form.reset();
        return;
      }

      const data = (await response.json().catch(() => null)) as
        | { errors?: Record<string, string[]> }
        | null;

      if (response.status === 422 && data?.errors) {
        const flattened: Record<string, string> = {};
        for (const [key, values] of Object.entries(data.errors)) {
          flattened[key] = Array.isArray(values) ? values[0] : String(values);
        }
        setFieldErrors(flattened);
        return;
      }

      if (response.status === 429) {
        setGlobalError(contact.notices.rateLimited);
        return;
      }

      setGlobalError(contact.errors.internal);
    } catch {
      setGlobalError(contact.errors.internal);
    } finally {
      setIsPending(false);
    }
  }

  const fieldClass =
    "w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-text-white placeholder:text-text-gray/60 transition-colors focus:border-accent-red focus:outline-none";

  const inputProps = (name: string) => ({
    name,
    "aria-invalid": Boolean(fieldErrors[name]),
    className: fieldClass,
  });

  if (status === "success") {
    return (
      <div className="grain border border-white/10 bg-[#111] p-8 sm:p-10">
        <p className="headline text-2xl text-text-white sm:text-3xl">
          {contact.form.success.title}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-text-gray sm:text-base">
          {contact.form.success.description}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="label-condensed mb-2 block text-[0.7rem] text-text-gray" htmlFor="email">
          {contact.form.email.label} *
        </label>
        <input id="email" type="email" required {...inputProps("email")} placeholder={contact.form.email.placeholder} />
        {fieldErrors.email ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.email}</p>
        ) : null}
      </div>

      <div>
        <label className="label-condensed mb-2 block text-[0.7rem] text-text-gray" htmlFor="name">
          {contact.form.name.label}
        </label>
        <input id="name" {...inputProps("name")} placeholder={contact.form.name.placeholder} />
        {fieldErrors.name ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.name}</p>
        ) : null}
      </div>

      <div>
        <label className="label-condensed mb-2 block text-[0.7rem] text-text-gray" htmlFor="phone">
          {contact.form.phone.label}
        </label>
        <input id="phone" type="tel" {...inputProps("phone")} placeholder={contact.form.phone.placeholder} />
        {fieldErrors.phone ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.phone}</p>
        ) : null}
      </div>

      <div>
        <label className="label-condensed mb-2 block text-[0.7rem] text-text-gray" htmlFor="age">
          {contact.form.age.label}
        </label>
        <input id="age" {...inputProps("age")} placeholder={contact.form.age.placeholder} />
        {fieldErrors.age ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.age}</p>
        ) : null}
      </div>

      <div>
        <label className="label-condensed mb-2 block text-[0.7rem] text-text-gray" htmlFor="gender">
          {contact.form.gender.label}
        </label>
        <input id="gender" {...inputProps("gender")} placeholder={contact.form.gender.placeholder} />
        {fieldErrors.gender ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.gender}</p>
        ) : null}
      </div>

      <div>
        <label className="label-condensed mb-2 block text-[0.7rem] text-text-gray" htmlFor="type">
          {contact.form.type.label}
        </label>
        <select id="type" {...inputProps("type")} defaultValue="duvida">
          {contact.form.type.options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#111] text-text-white">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="label-condensed mb-2 block text-[0.7rem] text-text-gray" htmlFor="message">
          {contact.form.message.label}
        </label>
        <textarea id="message" rows={6} {...inputProps("message")} placeholder={contact.form.message.placeholder} />
        {fieldErrors.message ? (
          <p className="mt-2 text-xs text-accent-red">{fieldErrors.message}</p>
        ) : null}
      </div>

      {globalError ? (
        <p className="sm:col-span-2 text-sm text-accent-red" role="alert">
          {globalError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending || undefined}
        className="label-condensed sm:col-span-2 mt-2 w-full border border-accent-red bg-accent-red px-8 py-4 text-sm text-text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? contact.form.submit.pendingLabel : contact.form.submit.label}
      </button>
    </form>
  );
}