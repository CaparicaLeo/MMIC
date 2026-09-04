import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type HighlightVariant = "text" | "mark" | "underline";

const variantClasses: Record<HighlightVariant, string> = {
  /** Palavra/número em vermelho. Para destaques pontuais, nunca frases inteiras. */
  text: "text-accent-red",
  /** Tarja vermelha atrás do texto. */
  mark: "bg-accent-red text-text-white px-2 py-0.5 -mx-1",
  /** Sublinhado grosso vermelho, estilo marcação de cartaz. */
  underline:
    "bg-gradient-to-t from-accent-red from-[0.12em] to-[0.12em] to-transparent",
};

/**
 * Destaque vermelho pontual dentro de um texto.
 *
 * A regra da identidade é que o vermelho não seja cor de texto corrido — ele
 * marca CTA, número e tarja. Este componente existe para tornar essa regra
 * explícita no código: quem lê o JSX vê que o vermelho é uma exceção
 * deliberada, não um default.
 */
export function Highlight({
  children,
  variant = "text",
  className,
}: {
  children: ReactNode;
  variant?: HighlightVariant;
  className?: string;
}) {
  return (
    <span className={cn(variantClasses[variant], className)}>{children}</span>
  );
}
