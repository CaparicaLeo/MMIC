"use client";

import { useCallback, useState } from "react";

import { CTAButton } from "@/components/ui/CTAButton";
import { ComingSoonModal } from "@/components/ui/ComingSoonModal";
import { contestCta, contestModal } from "@/content";
import type { Cta } from "@/content/types";

/**
 * CTA da página /concurso-de-camisetas.
 *
 * O estado é local, e não um provider: existe um único CTA de concurso no
 * site, e nenhum outro componente precisa abrir este modal.
 *
 * Quando o concurso tiver um formulário de verdade, `contestCta` vira
 * `action: "link"` e o ramo de baixo passa a navegar sem tocar nesta casca.
 */
export function ContestButton() {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  /* O `satisfies` em content/contest.ts mantém `action` como literal, e com
     ele o TypeScript trata o ramo do link como código morto. Alargar para
     `Cta` aqui deixa os dois ramos vivos, que é o que torna a virada para
     link uma edição só de conteúdo. */
  const cta: Cta = contestCta;

  if (cta.action === "link" && cta.href) {
    return <CTAButton href={cta.href}>{cta.label}</CTAButton>;
  }

  return (
    <>
      <CTAButton
        onClick={() => setIsOpen(true)}
        pendingLabel={cta.pendingLabel}
        pulse
      >
        {cta.label}
      </CTAButton>

      <ComingSoonModal isOpen={isOpen} onClose={close} content={contestModal} />
    </>
  );
}