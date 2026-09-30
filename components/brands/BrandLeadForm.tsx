"use client";

import { useState } from "react";

import { brands } from "@/content";
import type { Option } from "@/content/types";
import { cn } from "@/lib/cn";

/** Nome dos campos no backend → nome no formulário (para mapear erros 422). */
const FIELD_KEYS: Record<string, string> = {
  email: "email",
  name: "name",
  phone: "whatsapp",
  message: "message",
};

const fieldClass =
  "w-full border border-white/15 bg-transparent px-4 py-3 text-sm text-text-white placeholder:text-text-gray/60 transition-colors focus:border-accent-red focus:outline-none";

/* O <option> não segue a cor do campo no Chrome: sem fundo explícito ele
   some no dropdown. Vale para os três selects do formulário. */
const optionClass = "bg-[#111] text-text-white";

type Estado = {
  objectives: string[];
  company: string;
  audience: string;
  region: string;
  investment: string;
  name: string;
  email: string;
  whatsapp: string;
};

const VAZIO: Estado = {
  objectives: [],
  company: "",
  audience: "",
  region: "",
  investment: "",
  name: "",
  email: "",
  whatsapp: "",
};

/** Rótulo de um slug, para o resumo ficar legível. */
function labelOf(options: Option[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? "";
}

/**
 * O backend aceita oito campos e descarta o resto em silêncio — empresa,
 * objetivos, público, região e investimento não existem no contrato. Todos
 * entram aqui como linhas rotuladas dentro de `message`.
 *
 * O rótulo vai, e não o slug, porque `message` é o texto que alguém lê no CRM.
 * Os slugs seguem guardados no estado porque são eles que a seção de audiência
 * e a triagem usam para agrupar.
 */
function montarResumo(dados: Estado): string {
  const { form } = brands.lead;

  return [
    `Empresa: ${dados.company || "-"}`,
    `Objetivos: ${dados.objectives.map((value) => labelOf(form.objectives.options, value)).join(", ") || "-"}`,
    `Público-alvo: ${labelOf(form.audience.options, dados.audience) || "-"}`,
    `Região de interesse: ${labelOf(form.region.options, dados.region) || "-"}`,
    `Faixa de investimento: ${labelOf(form.investment.options, dados.investment) || "-"}`,
  ].join("\n");
}

function digitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

/**
 * Máscara progressiva do WhatsApp: formata enquanto digita, em vez de
 * espelhar o que o backend recebe. O envio vai só com os dígitos.
 */
function mascaraWhatsApp(valor: string): string {
  const d = digitos(valor).slice(0, 11);

  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/**
 * Formulário comercial da página /marcas.
 *
 * Mesmo proxy do formulário de contato: `POST /api/opportunities`, que
 * adiciona o token e repassa ao backend. Cada lead entra com
 * `type: "patrocinio"` e `source: "meia-de-curitiba:marcas"` para ser filtrado
 * na triagem, separado do tráfego de corredores.
 */
export function BrandLeadForm() {
  const [dados, setDados] = useState<Estado>(VAZIO);
  const [erroObjetivos, setErroObjetivos] = useState<string | null>(null);
  const [erroGlobal, setErroGlobal] = useState<string | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { form, notices, errors, success } = brands.lead;

  const alterar =
    (campo: "company" | "audience" | "region" | "investment" | "name" | "email" | "whatsapp") =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const valor =
        campo === "whatsapp" ? mascaraWhatsApp(event.target.value) : event.target.value;
      setDados((atual) => ({ ...atual, [campo]: valor }));
    };

  /**
   * Caixa de marcar liga e desliga com uma regra a mais: marcar a opção
   * exclusiva limpa as outras, e desmarcar ela esvazia a lista. A comparação é
   * pelo slug, que é o que fica guardado no estado.
   */
  function alternarObjetivo(value: string) {
    setDados((atual) => {
      const marcado = atual.objectives.includes(value);

      if (value === form.objectives.exclusiveValue) {
        return { ...atual, objectives: marcado ? [] : [value] };
      }

      return {
        ...atual,
        objectives: marcado
          ? atual.objectives.filter((item) => item !== value)
          : [...atual.objectives, value],
      };
    });

    // O erro é de "escolha ao menos um": qualquer marcação já resolve.
    if (erroObjetivos) setErroObjetivos(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErroGlobal(null);
    setErros({});

    /* A caixa de objetivos é um grupo, e `noValidate` não pega-required de
       grupo. Conferir aqui evita gastar uma ida ao CRM com um envio que volta
       inteiro inválido — e, no caso dela, o backend nem veria a resposta: os
       objetivos vão dentro de `message`, que é texto livre. */
    if (dados.objectives.length === 0) {
      setErroObjetivos(errors.objectives);
      return;
    }

    setIsPending(true);
    try {
      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: dados.email,
          name: dados.name,
          phone: digitos(dados.whatsapp),
          message: montarResumo(dados),
          source: "meia-de-curitiba:marcas",
          type: "patrocinio",
        }),
      });

      if (response.status === 201) {
        setDados(VAZIO);
        setIsSent(true);
        return;
      }

      const data = (await response.json().catch(() => null)) as {
        errors?: Record<string, string[]>;
      } | null;

      if (response.status === 422 && data?.errors) {
        const flattened: Record<string, string> = {};
        for (const [key, values] of Object.entries(data.errors)) {
          const fieldKey = FIELD_KEYS[key] ?? key;
          flattened[fieldKey] = Array.isArray(values) ? values[0] : String(values);
        }
        setErros(flattened);
        return;
      }

      setErroGlobal(
        response.status === 429 ? notices.rateLimited : errors.internal,
      );
    } catch {
      setErroGlobal(errors.internal);
    } finally {
      setIsPending(false);
    }
  }

  if (isSent) {
    return (
      <div data-reveal className="border border-white/15 p-8 lg:p-10">
        <h3 className="headline text-2xl">{success.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-text-gray">
          {success.description}
        </p>
      </div>
    );
  }

  const erroDe = (campo: string) => erros[campo];

  return (
    <form onSubmit={handleSubmit} noValidate data-reveal className="grid gap-6">
      <fieldset>
        <legend className="label-condensed text-[0.7rem] text-text-white">
          {form.objectives.label} *
        </legend>
        <p className="mt-1 text-xs text-text-gray">{form.objectives.hint}</p>

        {/* `group`, e não `radiogroup`: são caixas de marcar, não opções
            exclusivas. */}
        <div className="mt-4 flex flex-wrap gap-2">
          {form.objectives.options.map((option) => {
            const marcado = dados.objectives.includes(option.value);

            return (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer border px-3 py-2 text-xs transition-colors",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-red",
                  marcado
                    ? "border-accent-red bg-accent-red text-text-white"
                    : "border-white/15 text-text-gray hover:border-white/35",
                )}
              >
                <input
                  type="checkbox"
                  name="objectives"
                  value={option.value}
                  checked={marcado}
                  onChange={() => alternarObjetivo(option.value)}
                  disabled={isPending}
                  className="peer sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>

        {erroObjetivos ? (
          <p className="mt-3 text-xs text-accent-red" role="alert">
            {erroObjetivos}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
            htmlFor="brand-company"
          >
            {form.company.label}
          </label>
          <input
            id="brand-company"
            type="text"
            autoComplete="organization"
            value={dados.company}
            onChange={alterar("company")}
            disabled={isPending}
            className={fieldClass}
            placeholder={form.company.placeholder}
          />
        </div>

        <div>
          <label
            className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
            htmlFor="brand-audience"
          >
            {form.audience.label}
          </label>
          <select
            id="brand-audience"
            value={dados.audience}
            onChange={alterar("audience")}
            disabled={isPending}
            className={fieldClass}
          >
            <option value="" className={optionClass}>
              Selecione
            </option>
            {form.audience.options.map((option) => (
              <option key={option.value} value={option.value} className={optionClass}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
            htmlFor="brand-region"
          >
            {form.region.label}
          </label>
          <select
            id="brand-region"
            value={dados.region}
            onChange={alterar("region")}
            disabled={isPending}
            className={fieldClass}
          >
            <option value="" className={optionClass}>
              Selecione
            </option>
            {form.region.options.map((option) => (
              <option key={option.value} value={option.value} className={optionClass}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
            htmlFor="brand-investment"
          >
            {form.investment.label}
          </label>
          <select
            id="brand-investment"
            value={dados.investment}
            onChange={alterar("investment")}
            disabled={isPending}
            className={fieldClass}
          >
            <option value="" className={optionClass}>
              Selecione
            </option>
            {form.investment.options.map((option) => (
              <option key={option.value} value={option.value} className={optionClass}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
            htmlFor="brand-name"
          >
            {form.name.label} *
          </label>
          <input
            id="brand-name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(erroDe("name"))}
            value={dados.name}
            onChange={alterar("name")}
            disabled={isPending}
            className={fieldClass}
            placeholder={form.name.placeholder}
          />
          {erroDe("name") ? (
            <p className="mt-2 text-xs text-accent-red">{erroDe("name")}</p>
          ) : null}
        </div>

        <div>
          <label
            className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
            htmlFor="brand-email"
          >
            {form.email.label} *
          </label>
          <input
            id="brand-email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(erroDe("email"))}
            value={dados.email}
            onChange={alterar("email")}
            disabled={isPending}
            className={fieldClass}
            placeholder={form.email.placeholder}
          />
          {erroDe("email") ? (
            <p className="mt-2 text-xs text-accent-red">{erroDe("email")}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          className="label-condensed mb-2 block text-[0.7rem] text-text-gray"
          htmlFor="brand-whatsapp"
        >
          {form.whatsapp.label} *
        </label>
        <input
          id="brand-whatsapp"
          type="tel"
          required
          inputMode="numeric"
          autoComplete="tel"
          aria-invalid={Boolean(erroDe("whatsapp"))}
          value={dados.whatsapp}
          onChange={alterar("whatsapp")}
          disabled={isPending}
          className={fieldClass}
          placeholder={form.whatsapp.placeholder}
        />
        {erroDe("whatsapp") ? (
          <p className="mt-2 text-xs text-accent-red">{erroDe("whatsapp")}</p>
        ) : null}
      </div>

      {erroGlobal ? (
        <p className="text-sm text-accent-red" role="alert">
          {erroGlobal}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending || undefined}
        className="label-condensed w-full border border-accent-red bg-accent-red px-8 py-4 text-sm text-text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? form.submit.pendingLabel : form.submit.label}
      </button>
    </form>
  );
}
