"use client";

import { useEffect, useState } from "react";

import { CTAButton } from "@/components/ui/CTAButton";
import { brands } from "@/content";
import { cn } from "@/lib/cn";

/**
 * CTA fixo da página /marcas, para quem já rolou a página.
 *
 * Mesmo desenho do CTA flutuante do concurso: no mobile vira barra inferior,
 * em telas md+ vira botão no canto inferior direito, e os dois entram depois
 * que o hero sai da tela (~80% da viewport). Acompanha o scroll em vez de
 * IntersectionObserver, pelo mesmo motivo do header.
 *
 * Some na seção do formulário: ali o CTA grande da página já está à vista, e
 * dois botões com o mesmo destino competindo no mesmo viewport é atrito.
 */
export function FloatingBrandCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    /* O botão some quando a seção do formulário encosta na viewport: ali o CTA
       grande da página já está à vista, e dois botões com o mesmo destino
       competindo no mesmo viewport é atrito, não conveniência. O elemento é
       procurado uma vez, aqui fora — `getElementById` a cada quadro de scroll
       seria trabalho jogado fora a 60 Hz. */
    const form = document.getElementById("lead");

    const onScroll = () => {
      const isPast = window.scrollY > window.innerHeight * 0.8;
      const isAtForm = form
        ? form.getBoundingClientRect().top < window.innerHeight
        : false;
      setIsVisible(isPast && !isAtForm);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        aria-hidden={!isVisible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-bg-dark/90 backdrop-blur-md transition-transform duration-300 motion-reduce:transition-none md:hidden",
          isVisible ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <CTAButton
            href={brands.finalCta.cta.href}
            className="w-full"
            animateIn={false}
          >
            {brands.finalCta.cta.label}
          </CTAButton>
        </div>
      </div>

      <div
        aria-hidden={!isVisible}
        className={cn(
          "fixed right-6 bottom-6 z-50 hidden transition-all duration-300 motion-reduce:transition-none md:block",
          isVisible
            ? "translate-y-0 opacity-100 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <CTAButton href={brands.finalCta.cta.href} animateIn={false}>
          {brands.finalCta.cta.label}
        </CTAButton>
      </div>
    </>
  );
}
