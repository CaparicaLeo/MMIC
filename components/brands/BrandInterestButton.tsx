"use client";

import { useCallback, useState } from "react";

import { CTAButton } from "@/components/ui/CTAButton";
import { ComingSoonModal } from "@/components/ui/ComingSoonModal";
import { brandCta, brandModal } from "@/content";
import type { Cta } from "@/content/types";

/**
 * CTA comercial da página /marcas.
 *
 * O estado é local, e não um provider como o da inscrição: existe um único
 * CTA de marca no site, e nenhum outro componente precisa abrir este modal.
 * Se um dia houver CTAs de marca espalhados pela LP, o caminho é o mesmo do
 * fluxo de inscrição — subir este estado para um provider.
 *
 * Quando as cotas tiverem contato de verdade, `brandCta` vira
 * `action: "link"` e o ramo de baixo passa a navegar sem tocar nesta casca.
 */
export function BrandInterestButton() {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  /* O `satisfies` em content/cta.ts mantém `action` como literal, e com ele
     o TypeScript trata o ramo do link como código morto. Alargar para `Cta`
     aqui é o mesmo que <RegisterButton> ganha de graça ao receber o CTA por
     prop — deixa os dois ramos vivos, que é o que torna a virada para link
     uma edição só de conteúdo. */
  const cta: Cta = brandCta;

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

      <ComingSoonModal isOpen={isOpen} onClose={close} content={brandModal} />
    </>
  );
}
