"use client";

import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { cn } from "@/lib/cn";

/**
 * Faixa de texto em rolagem contínua — a "tarja de cartaz" da identidade.
 *
 * Duas cópias do conteúdo lado a lado deslocadas em `xPercent`: quando a
 * primeira sai, a segunda já está no lugar, então o loop é imperceptível e
 * custa uma única propriedade de transform.
 *
 * Com movimento reduzido, a faixa fica parada (e legível) em vez de sumir.
 */
export function Marquee({
  items,
  className,
  speed = 26,
  reverse = false,
}: {
  items: string[];
  className?: string;
  /** Segundos para uma volta completa. Maior = mais lento. */
  speed?: number;
  reverse?: boolean;
}) {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion, gsap: g }) => {
    if (prefersReducedMotion) return;

    const tracks = scope.querySelectorAll("[data-marquee-track]");

    g.fromTo(
      tracks,
      { xPercent: reverse ? -100 : 0 },
      { xPercent: reverse ? 0 : -100, duration: speed, ease: "none", repeat: -1 },
    );
  }, [speed, reverse]);

  const content = (
    <div
      data-marquee-track
      className="flex shrink-0 items-center gap-8 pr-8 will-change-transform"
      aria-hidden
    >
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-8">
          <span className="label-condensed text-sm whitespace-nowrap sm:text-base">
            {item}
          </span>
          <span className="size-1.5 shrink-0 rounded-full bg-current opacity-60" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      className={cn("flex w-full overflow-hidden py-3", className)}
      role="presentation"
    >
      {content}
      {content}
    </div>
  );
}
