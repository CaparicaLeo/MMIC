import Image from "next/image";

import type { Backdrop } from "@/content/photos";
import { cn } from "@/lib/cn";

/**
 * Camada de foto no fundo da seção, com preto dissolvendo por cima.
 *
 * Duas variantes:
 *
 *  - `side` (padrão): foto puxada para a direita e preto da esquerda (opaco)
 *    para a direita (foto visível). Para seções com o conteúdo à esquerda.
 *  - `full`: véu preto uniforme. Para seções sem lado "livre" para a foto:
 *    texto centralizado (fechos de página) ou texto nas duas colunas.
 *
 * `portrait`, quando existe, troca a foto abaixo de `lg`: no celular a seção
 * é alta e estreita, e uma foto vertical da mesma cena mostra as pessoas em
 * vez de uma faixa de asfalto. A outra fica em `display: none`, e o
 * navegador não baixa imagem lazy escondida.
 *
 * Dois detalhes que não podem sair:
 *
 *  - `-z-10` só funciona se a seção tiver `isolate`. Sem criar contexto de
 *    empilhamento na seção, o fundo colorido dela é pintado ANTES desta
 *    camada (ordem de pintura do CSS) e a foto some atrás do preto.
 *  - As faixas pretas no topo e na base costuram a foto nas emendas com as
 *    seções vizinhas, senão as bordas aparecem como um retângulo colado.
 *
 * Decoração pura: `aria-hidden`, `alt=""`, `pointer-events-none` e lazy.
 */
export function SectionBackdrop({
  backdrop,
  variant = "side",
}: {
  backdrop: Backdrop;
  variant?: "side" | "full";
}) {
  const { wide, portrait, position = "right" } = backdrop;
  const imageClass = cn(
    "object-cover",
    variant === "side" ? "opacity-80 max-lg:opacity-65" : "opacity-60",
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className={cn("absolute inset-0", portrait && "hidden lg:block")}>
        <Image
          src={wide.src}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className={imageClass}
          style={{ objectPosition: position }}
        />
      </div>

      {portrait ? (
        <div className="absolute inset-0 lg:hidden">
          <Image
            src={portrait.src}
            alt=""
            fill
            loading="lazy"
            sizes="100vw"
            className={imageClass}
            style={{ objectPosition: backdrop.portraitPosition ?? "center" }}
          />
        </div>
      ) : null}

      {variant === "side" ? (
        <div className="absolute inset-0 bg-linear-to-r from-bg-dark/90 from-20% via-bg-dark/45 via-55% to-bg-dark/5 max-lg:from-bg-dark/70 max-lg:from-0% max-lg:via-bg-dark/55 max-lg:to-bg-dark/45" />
      ) : (
        <div className="absolute inset-0 bg-bg-dark/60" />
      )}
      {/* Só as emendas escurecem: o meio da seção fica com a foto aberta. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-bg-dark to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-bg-dark to-transparent" />
    </div>
  );
}
