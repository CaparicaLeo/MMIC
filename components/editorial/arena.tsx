import Image from "next/image";

import { arena } from "@/content/paginas/paginas";
import { cn } from "@/lib/cn";

/**
 * Croqui oficial da arena (imagem) com a legenda em texto. O número de cada
 * item é o do desenho. `highlight` acende na legenda os pontos de uma marca
 * (página /marcas); o palco (01) fica sempre aceso.
 */
export function ArenaMap({
  highlight = [],
  className,
}: {
  highlight?: number[];
  className?: string;
}) {
  return (
    <figure className={cn("flex flex-col gap-8", className)}>
      <a
        href={arena.image.src}
        target="_blank"
        rel="noopener"
        className="block border border-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-red"
      >
        <Image
          src={arena.image.src}
          alt={arena.image.alt}
          width={arena.image.width}
          height={arena.image.height}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="h-auto w-full"
        />
      </a>

      <ol className="grid gap-x-10 gap-y-3 text-sm text-text-white/85 sm:grid-cols-2 lg:grid-cols-3">
        {arena.legend.map((item) => (
          <li key={item.n} className="flex items-center gap-3">
            <span
              className={cn(
                "label-condensed flex h-6 w-8 shrink-0 items-center justify-center text-[0.72rem] font-semibold tabular-nums",
                item.n === 1 || highlight.includes(item.n)
                  ? "bg-accent-red text-text-white"
                  : "bg-white text-text-dark",
              )}
            >
              {String(item.n).padStart(2, "0")}
            </span>
            <span className="leading-snug">{item.text}</span>
          </li>
        ))}
      </ol>

      <figcaption className="label-condensed text-[0.62rem] text-text-gray">{arena.note}</figcaption>
    </figure>
  );
}
