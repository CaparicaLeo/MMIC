"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

import { Media } from "@/components/ui/Media";
import type { Media as MediaType } from "@/content/types";
import { cn } from "@/lib/cn";

/** Ampliação aplicada ao clicar/tocar na imagem aberta. */
const ZOOM = 2.5;

/**
 * <Media> que abre em tela cheia ao clicar, com zoom na imagem aberta.
 *
 * Na tela cheia, clicar/tocar aproxima no ponto clicado; com zoom, mover o
 * mouse (ou arrastar o dedo) passeia pela imagem, e um novo clique afasta.
 * Mesmo comportamento de <ComingSoonModal>: Escape fecha, o scroll da página
 * trava e o foco volta para a imagem que abriu.
 */
export function ZoomableMedia({
  media,
  className,
  imageClassName,
  sizes,
  preload,
}: {
  media: MediaType;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  preload?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setZoomed(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const trigger = triggerRef.current;
    closeButtonRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [isOpen, close]);

  /** Ponto sob o ponteiro, em % da área da imagem — vira o centro do zoom. */
  const originFrom = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    return `${x}% ${y}%`;
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Ampliar imagem: ${media.alt}`}
        className={cn("group relative block w-full cursor-zoom-in text-left", className)}
      >
        <Media media={media} sizes={sizes} preload={preload} imageClassName={imageClassName} />
        <span
          aria-hidden
          className="label-condensed absolute right-3 bottom-3 bg-bg-dark/80 px-2.5 py-1.5 text-[0.65rem] text-text-white opacity-80 transition-opacity group-hover:opacity-100"
        >
          ⤢ Ampliar
        </span>
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={media.alt}
          className="fixed inset-0 z-100 flex flex-col bg-bg-dark/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="label-condensed text-[0.65rem] text-text-gray">
              {zoomed ? "Toque ou clique para afastar" : "Toque ou clique na imagem para aproximar"}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="label-condensed border border-white/25 px-4 py-2 text-xs text-text-white transition-colors hover:border-accent-red"
            >
              Fechar ✕
            </button>
          </div>

          {/* Clique fora da imagem (nas bordas) também fecha. */}
          <div
            className="relative min-h-0 flex-1 p-4 pt-0 sm:p-6 sm:pt-0"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <button
              type="button"
              aria-label={zoomed ? "Afastar" : "Aproximar"}
              aria-pressed={zoomed}
              onClick={(event) => {
                if (!zoomed) setOrigin(originFrom(event));
                setZoomed((value) => !value);
              }}
              onPointerMove={(event) => {
                if (zoomed) setOrigin(originFrom(event));
              }}
              className={cn(
                "relative h-full w-full overflow-hidden",
                zoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in",
              )}
            >
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="100vw"
                className="object-contain transition-transform duration-300 ease-out-expo"
                style={{ transform: `scale(${zoomed ? ZOOM : 1})`, transformOrigin: origin }}
              />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
