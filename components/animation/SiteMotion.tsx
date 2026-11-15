"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { countUp } from "@/lib/animations/presets";
import { useGsapScroll } from "@/lib/hooks/useGsapScroll";

/**
 * Movimento das páginas do site. Fica no layout de app/(site) e roda de novo a
 * cada troca de rota. As seções continuam Server Components: este wrapper só
 * procura ganchos `data-*` no HTML que elas já renderizam.
 *
 * Só anima seções marcadas com `data-motion` (o hero da home, <PageHero /> e
 * <Block />). As seções que já têm GSAP próprio (concurso, parte de /marcas)
 * usam <Section /> sem a marca e ficam de fora, sem tween duplicado.
 *
 * - Hero (na carga): fundo/foto saem de um zoom leve, as linhas do título
 *   sobem uma a uma, o "Internacional" da home se abre do centro, a bandeira
 *   vermelha corre da esquerda e o card do contador entra contando.
 * - Demais seções (no scroll): títulos sobem, as bandeiras se desenham, cards
 *   entram em sequência, fotos assentam do zoom, contadores e barras correm.
 *
 * Tudo em transform/opacity/clip-path. Com movimento reduzido nada anima e o
 * conteúdo fica no estado final (os `from` não chegam a ser aplicados).
 */
export function SiteMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const root = useGsapScroll<HTMLDivElement>(
    ({ scope, prefersReducedMotion, gsap, ScrollTrigger }) => {
      if (prefersReducedMotion) return;

      const marked = Array.from(scope.querySelectorAll<HTMLElement>("[data-motion]"));
      if (marked.length === 0) return;

      /* -------------------------------------------------------- Hero */
      const hero = marked.find((s) => s.dataset.motion === "hero");
      if (hero) {
        const q = gsap.utils.selector(hero);
        const letters = q("[data-hero-letter]");
        const fades = q("[data-hero-fade]");

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(q("[data-hero-bg]"), { scale: 1.12, opacity: 0, duration: 1.8, ease: "power2.out" }, 0)
          .from(q("[data-hero-media]"), { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "power4.inOut" }, 0.2)
          .from(q("[data-hero-media] img"), { scale: 1.2, duration: 1.6, ease: "power2.out" }, 0.2)
          .from(fades.slice(0, 1), { opacity: 0, y: 16, duration: 0.6 }, 0.15)
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
          .from(q("[data-slash-bg]"), { clipPath: "inset(0 100% 0 0)", duration: 0.7, ease: "power4.inOut" }, 0.55)
          .from(fades.slice(1), { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 0.8)
          .from(q("[data-hero-card]"), { opacity: 0, x: 40, duration: 0.9 }, 0.8)
          .from(q("[data-bar]"), { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power2.inOut" }, 1.1);

        // O fundo desce mais devagar que o texto ao rolar.
        gsap.to(q("[data-hero-bg]"), {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 },
        });
      }

      /* ---------------------------------------------- Seções (scroll) */
      const blocks = marked.filter((s) => s !== hero);

      for (const section of blocks) {
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

        section.querySelectorAll<HTMLElement>("[data-bar]").forEach((bar) => {
          gsap.from(bar, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: bar, start: "top 90%", once: true },
          });
        });
      }

      // Contadores (home e /inscricao): o número final já vem no HTML.
      for (const section of marked) {
        section.querySelectorAll<HTMLElement>("[data-count]").forEach((count) => {
          countUp(count, {
            value: Number(count.dataset.count),
            duration: 1.8,
            prefersReducedMotion,
            trigger: section === hero ? hero : count,
          });
        });
      }

      // Cards e figuras entram em lotes, na ordem em que aparecem na tela.
      const cards = marked.flatMap((s) =>
        Array.from(s.querySelectorAll<HTMLElement>("article, figure, [data-card]")).filter(
          // Um card dentro de outro (figure num article) anima uma vez só.
          (el) => !el.parentElement?.closest("article, figure, [data-card]"),
        ),
      );
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, overwrite: true }),
        });
      }
    },
    [pathname],
  );

  return <div ref={root}>{children}</div>;
}
