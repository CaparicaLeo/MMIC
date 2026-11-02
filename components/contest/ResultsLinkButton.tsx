"use client";

import { CTAButton, type CTAButtonProps } from "@/components/ui/CTAButton";
import { contestResults } from "@/content";

/**
 * Atalho de /concurso-de-camisetas para as finalistas (e, com o resultado,
 * para os vencedores).
 * Contorno, e não sólido: o vermelho segue sendo do CTA de participação.
 */
export function ResultsLinkButton({
  className,
  size,
}: Pick<CTAButtonProps, "className" | "size">) {
  const { link, phase } = contestResults;

  return (
    <CTAButton href={link.href[phase]} variant="outline" size={size} className={className}>
      {link.label[phase]}
    </CTAButton>
  );
}
