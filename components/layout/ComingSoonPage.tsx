import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { event, raceDateFollow } from "@/content";

/**
 * Casca das páginas que ainda não têm conteúdo.
 *
 * As rotas já existem no App Router para que links, sitemap e navegação
 * funcionem desde o lançamento. Conforme o evento se aproxima, cada
 * `page.tsx` troca este componente pelas seções reais — reaproveitando
 * <Section>, <SectionHeader>, <Timeline>, <Accordion> e <CTAButton>.
 */
export function ComingSoonPage({
  kicker,
  title,
  description,
  whatsNext,
  cta,
  raceDatePending = false,
}: {
  kicker: string;
  title: string;
  description: string;
  whatsNext: string[];
  /**
   * CTA opcional da página. Vem por prop, e não por um campo de dados, porque
   * cada página tem uma ação diferente (e client-side) — a casca só reserva
   * o lugar dele acima do link de volta.
   */
  cta?: ReactNode;
  /**
   * Liga o bloco "data/horários ainda não anunciados" com o grupo do
   * Instagram (content/event.ts `raceDateFollow`). Usado pelas páginas cujo
   * "em breve" existe porque a data da prova não fechou — largada, retirada
   * de kit, horários. Sem a data, o site não inventa: aponta o grupo.
   */
  raceDatePending?: boolean;
}) {
  return (
    <Section className="grain min-h-[80vh] pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_20%_0%,var(--color-accent-red-dark)_0%,transparent_55%)] opacity-50"
      />

      <div className="relative max-w-3xl">
        <Badge>{kicker}</Badge>

        <h1 className="headline mt-8 text-[clamp(2.5rem,8vw,5.5rem)]">
          {title}
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-text-gray sm:text-lg">
          {description}
        </p>

        <ul className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8">
          {whatsNext.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-text-white/85"
            >
              <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-accent-red" />
              {item}
            </li>
          ))}
        </ul>

        <p className="label-condensed mt-10 text-[0.7rem] text-text-gray">
          {event.dateLabel}
        </p>

        {raceDatePending ? (
          <div className="mt-8">
            <p className="max-w-md text-sm leading-relaxed text-text-gray">
              {raceDateFollow.note}
            </p>
            <Link
              href={raceDateFollow.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label-condensed mt-4 inline-flex items-center gap-2 border border-accent-red px-6 py-3 text-xs text-accent-red transition-colors hover:bg-accent-red hover:text-black"
            >
              {raceDateFollow.label}
              <span aria-hidden className="size-1.5 bg-accent-red" />
            </Link>
          </div>
        ) : null}

        {cta ? <div className="mt-8">{cta}</div> : null}

        {/* O link de volta é secundário: quando há CTA, ele fica logo abaixo
            e sem peso visual, para não disputar o clique. */}
        <Link
          href="/"
          className="label-condensed mt-8 inline-flex border border-white/20 px-6 py-3 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red"
        >
          Voltar para a home
        </Link>
      </div>
    </Section>
  );
}
