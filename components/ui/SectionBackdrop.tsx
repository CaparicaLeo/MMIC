import Image from "next/image";

import type { Media } from "@/content/types";

/**
 * Camada de foto no fundo da seção: imagem puxada para a direita e preto
 * dissolvendo por cima dela, da esquerda (opaco) para a direita (foto
 * visível). Usada em uma seção sim, uma não, para o fundo não virar papel
 * de parede.
 *
 * Dois detalhes que não podem sair:
 *
 *  - `-z-10` só funciona se a seção tiver `isolate`. Sem criar contexto de
 *    empilhamento na seção, o fundo colorido dela é pintado ANTES desta
 *    camada (ordem de pintura do CSS) e a foto some atrás do preto.
 *  - Os gradientes têm papéis diferentes: o horizontal garante texto sempre
 *    sobre preto sólido (o conteúdo fica à esquerda); o vertical costura a
 *    foto nas emendas com as seções vizinhas, senão a borda superior e a
 *    inferior aparecem como um retângulo de foto colado.
 *
 * Decoração pura: `aria-hidden`, `pointer-events-none` e `loading="lazy"`.
 * Trocar a arte daqui é passar outro `media` na chamada.
 */
export function SectionBackdrop({ media }: { media: Media }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <Image
        src={media.src}
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-right opacity-40"
      />
      <div className="absolute inset-0 bg-linear-to-r from-bg-dark from-35% via-bg-dark/80 to-bg-dark/55" />
      <div className="absolute inset-0 bg-linear-to-b from-bg-dark via-transparent to-bg-dark" />
    </div>
  );
}
