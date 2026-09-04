import Image from "next/image";

import { cn } from "@/lib/cn";
import type { Media as MediaType } from "@/content/types";

/**
 * Wrapper de next/image.
 *
 * A proporção sempre vem do conteúdo (`media.width`/`media.height`), nunca do
 * componente: trocar a arte por outra de proporção diferente é editar o
 * arquivo em /content, sem layout shift e sem mexer aqui.
 */
export function Media({
  media,
  className,
  imageClassName,
  sizes = "100vw",
  preload = false,
}: {
  media: MediaType;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  /** Só para o elemento LCP — hoje, a imagem de fundo do hero. */
  preload?: boolean;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-[#141414]", className)}
      style={{ aspectRatio: `${media.width} / ${media.height}` }}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
