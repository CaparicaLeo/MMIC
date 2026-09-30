"use client";

import type { AudienceProfile, BrandPillar } from "@/content/types";

/**
 * Grade numerada de marcadores — públicos na seção de audiência, capacidades
 * do evento na de pilares.
 *
 * As duas seções são o mesmo bloco com palavras diferentes, e é por isso que
 * ele existe separado: quando o grid mudar (colunas, respiro, animação) ele
 * muda uma vez, e as duas seções continuam sendo só composição.
 *
 * Os marcadores de animação (`data-grid` / `data-grid-item`) não levam o nome
 * da seção de propósito. Cada seção tem exatamente uma grade, e o
 * `useGsapScroll` já escopa as queries no seu próprio bloco — o prefixo seria
 * uma distinção que nada usa, e um prefixo que a seção esquece de casar é
 * animação que dispara no carregamento em vez de na rolagem.
 */
export function NumberedGrid({
  items,
}: {
  items: (AudienceProfile | BrandPillar)[];
}) {
  return (
    <ul
      data-grid
      className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          data-grid-item
          className="bg-[#060606] p-8 transition-colors duration-300 hover:bg-[#0b0b0b] lg:p-10"
        >
          <span className="headline text-3xl text-accent-red">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="mt-5 text-lg font-semibold text-text-white">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-text-gray">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
