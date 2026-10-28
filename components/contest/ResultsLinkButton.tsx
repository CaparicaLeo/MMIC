"use client";

import { CTAButton, type CTAButtonProps } from "@/components/ui/CTAButton";
import { contestResults } from "@/content";

/**
 * Atalho de /concurso-de-camisetas para a página de resultado.
 * Contorno, e não sólido: o vermelho segue sendo do CTA de participação.
 */
export function ResultsLinkButton({
  className,
  size,
}: Pick<CTAButtonProps, "className" | "size">) {
  const { link, phase } = contestResults;

  return (
    <CTAButton href={link.href} variant="outline" size={size} className={className}>
      {link.label[phase]}
    </CTAButton>
  );
}
