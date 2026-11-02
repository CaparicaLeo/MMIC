import { finalistMedia } from "@/components/contest/finalists/finalistMedia";
import { Media } from "@/components/ui/Media";
import type { ContestFinalist } from "@/content/contestFinalists";
import { cn } from "@/lib/cn";

/**
 * Arte de uma finalista. Mostra a camisa (mockup), porque é o que o corredor
 * vai receber — a mesma capa do card em /concurso-de-camisetas/finalistas.
 */
export function EntryArt({
  entry,
  sizes,
  className,
}: {
  entry: ContestFinalist;
  sizes: string;
  className?: string;
}) {
  return (
    <Media
      media={finalistMedia(entry).aplicacao}
      sizes={sizes}
      className={cn("w-full", className)}
      imageClassName="object-contain"
    />
  );
}

/** "Curitiba (PR) · @fulano" — cada parte só aparece quando existe. */
export function EntryCredit({ entry, className }: { entry: ContestFinalist; className?: string }) {
  if (!entry.cidade && !entry.instagram) return null;

  return (
    <p className={cn("label-condensed text-[0.7rem] text-text-gray", className)}>
      {entry.cidade}
      {entry.cidade && entry.instagram ? " · " : null}
      {entry.instagram ? (
        <a
          href={`https://instagram.com/${entry.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-white underline-offset-4 hover:underline"
        >
          @{entry.instagram}
        </a>
      ) : null}
    </p>
  );
}
