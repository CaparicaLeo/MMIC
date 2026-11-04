import Link from "next/link";

import { Media } from "@/components/ui/Media";
import type { ContestFinalist } from "@/content/contestFinalists";

import { finalistMedia } from "./finalistMedia";

/**
 * Card da grade de finalistas. O card inteiro é o link para a página da
 * finalista; a capa é o mockup vertical, que já mostra a arte na camisa.
 */
export function FinalistCard({ finalist }: { finalist: ContestFinalist }) {
  const media = finalistMedia(finalist);

  return (
    <Link
      href={`/concurso-de-camisetas/finalistas/${finalist.slug}`}
      className="group flex flex-col focus-visible:outline-offset-4"
    >
      <div className="relative">
        <Media
          media={media.aplicacao}
          sizes="(min-width: 1024px) 20vw, 50vw"
          className="w-full"
          imageClassName="transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border border-white/10 transition-colors group-hover:border-accent-red"
        />
        <span className="label-condensed absolute top-3 left-3 bg-bg-dark/80 px-2 py-1 text-[0.65rem] text-text-white">
          {String(finalist.ordem).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-text-white sm:text-base">{finalist.nome}</p>
    </Link>
  );
}
