"use client";

import { useEffect, useState } from "react";

import { ContestButton } from "@/components/contest/ContestButton";
import { cn } from "@/lib/cn";

/**
 * Barra fixa no rodapé da página /concurso-de-camisetas, só no mobile.
 *
 * O CTA do concurso vive no hero e no fecho; no celular, ambos ficam longe
 * para quem já rolou a página. Esta barra entra depois que o hero sai da
 * tela (~80% da altura da viewport) e acompanha o scroll — o mesmo padrão de
 * toggle do header, sem depender de IntersectionObserver.
 */
export function FloatingContestCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-bg-dark/90 backdrop-blur-md transition-transform duration-300 motion-reduce:transition-none md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <ContestButton className="w-full" size="lg" />
      </div>
    </div>
  );
}