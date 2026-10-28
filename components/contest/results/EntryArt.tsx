import { Media } from "@/components/ui/Media";
import type { ContestEntry } from "@/content/contestResults";
import { cn } from "@/lib/cn";

/**
 * Arte de uma proposta. Mostra a camisa (mockup) quando existe, porque é o
 * que o corredor vai receber; a arte chapada é o fallback.
 */
export function EntryArt({
  entry,
  sizes,
  className,
}: {
  entry: ContestEntry;
  sizes: string;
  className?: string;
}) {
  return (
    <Media
      media={entry.mockup ?? entry.art}
      sizes={sizes}
      className={cn("w-full", className)}
      imageClassName="object-contain"
    />
  );
}

/** "Fulano · Curitiba (PR)" com o Instagram do autor, quando houver. */
export function EntryCredit({ entry, className }: { entry: ContestEntry; className?: string }) {
  return (
    <p className={cn("label-condensed text-[0.7rem] text-text-gray", className)}>
      {entry.location}
      {entry.instagram ? (
        <>
          {" · "}
          <a
            href={`https://instagram.com/${entry.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-white underline-offset-4 hover:underline"
          >
            @{entry.instagram}
          </a>
        </>
      ) : null}
    </p>
  );
}
