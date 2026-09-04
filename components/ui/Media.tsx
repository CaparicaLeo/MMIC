import Image from "next/image";

import { cn } from "@/lib/cn";
import type { Media as MediaType } from "@/content/types";

/**
 * Wrapper de next/image.
 *
 * As imagens definitivas ainda não existem — os `src` apontam para SVGs de
 * placeholder em /public/images/placeholders com a MESMA proporção da arte
 * final. Como a proporção vem do conteúdo, trocar o arquivo depois não causa
 * layout shift nem exige mexer em componente.
 */
export function Media({
  media,
  className,
  imageClassName,
  sizes = "100vw",
  priority = false,
}: {
  media: MediaType;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
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
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
