"use client";

import type { ReactNode } from "react";

import { countUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Movimento da home. As seções continuam Server Components: este wrapper só
 * procura ganchos `data-*` no HTML que elas já renderizam.
 *
 * - Hero (na carga): fundo sai de um zoom leve, as linhas do título sobem uma a
 *   uma, o "Internacional" se abre do centro para as bordas, a bandeira vermelha
 *   corre da esquerda para a direita e o card do contador entra contando.
 * - Resto da página (no scroll): títulos de seção sobem, as bandeiras dos
 *   títulos se desenham, cards entram em sequência e as fotos assentam do zoom.
 *
 * Tudo em transform/opacity/clip-path. Com movimento reduzido nada anima e o
 * conteúdo fica no estado final (os `from` não chegam a ser aplicados).
 */
export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion, gsap, ScrollTrigger }) => {
    if (prefersReducedMotion) return;

    /* ---------------------------------------------------------- Hero */
    const hero = scope.querySelector<HTMLElement>("[data-hero]");
    if (hero) {
      const q = gsap.utils.selector(hero);
      const letters = q("[data-hero-letter]");
      const slash = q("[data-slash-bg]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(q("[data-hero-bg]"), { scale: 1.12, opacity: 0, duration: 1.8, ease: "power2.out" }, 0)
        .from(q("[data-hero-fade]")[0] ?? [], { opacity: 0, y: 16, duration: 0.6 }, 0.15)
        .from(q("[data-hero-line]"), { yPercent: 70, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.25)
        .from(
          letters,
          {
            opacity: 0,
            // Cada letra parte do centro da palavra: o "Internacional" se abre.
            x: (i: number) => (letters.length / 2 - 0.5 - i) * 14,
            duration: 0.9,
            stagger: { each: 0.03, from: "center" },
          },
          0.5,
        )
        .from(slash, { clipPath: "inset(0 100% 0 0)", duration: 0.7, ease: "power4.inOut" }, 0.55)
        .from(q("[data-hero-fade]").slice(1), { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 0.9)
        .from(q("[data-hero-card]"), { opacity: 0, x: 40, duration: 0.9 }, 0.8)
        .from(q("[data-bar]"), { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power2.inOut" }, 1.1);

      const count = hero.querySelector<HTMLElement>("[data-count]");
      if (count) {
        countUp(count, { value: Number(count.dataset.count), duration: 1.8, prefersReducedMotion, trigger: hero });
      }

      // O fundo desce mais devagar que o texto ao rolar.
      gsap.to(q("[data-hero-bg]"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 },
      });
    }

    /* ---------------------------------------------------- Seções (scroll) */
    const sections = Array.from(scope.querySelectorAll<HTMLElement>("section")).filter((s) => s !== hero);

    for (const section of sections) {
      const header = section.querySelector("header");
      if (header) {
        gsap.from(header.children, {
          opacity: 0,
          y: 36,
          duration: 0.9,
          stagger: 0.1,
          scrollTrigger: { trigger: header, start: "top 85%", once: true },
        });
      }

      section.querySelectorAll("[data-slash-bg]").forEach((slash) => {
        gsap.from(slash, {
          clipPath: "inset(0 100% 0 0)",
          duration: 0.8,
          delay: 0.25,
          ease: "power4.inOut",
          scrollTrigger: { trigger: slash, start: "top 85%", once: true },
        });
      });

      section.querySelectorAll("[data-photo] img").forEach((img) => {
        gsap.from(img, {
          scale: 1.15,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: img, start: "top 90%", once: true },
        });
      });
    }

    // Cards e figuras entram em lotes, na ordem em que aparecem na tela.
    const cards = sections.flatMap((s) => Array.from(s.querySelectorAll<HTMLElement>("article, figure")));
    if (cards.length > 0) {
      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, overwrite: true }),
      });
    }
  });

  return <div ref={root}>{children}</div>;
}
