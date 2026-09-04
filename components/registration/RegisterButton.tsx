"use client";

import { CTAButton, type CTAButtonProps } from "@/components/ui/CTAButton";
import type { Cta } from "@/content/types";

import { useRegistration } from "./RegistrationProvider";

/**
 * Ponte entre o CTA visual e o fluxo de inscrição.
 *
 * Todo CTA de inscrição da página passa por aqui, então trocar o placeholder
 * pelo checkout real depois é uma mudança em um arquivo só.
 */
export function RegisterButton({
  cta,
  source,
  ...props
}: {
  cta: Cta;
  /** Identifica o CTA para analytics quando o fluxo real existir. */
  source: string;
} & Omit<CTAButtonProps, "children" | "onClick" | "href" | "pendingLabel">) {
  const { open } = useRegistration();

  if (cta.action === "link" && cta.href) {
    return (
      <CTAButton href={cta.href} {...props}>
        {cta.label}
      </CTAButton>
    );
  }

  return (
    <CTAButton
      onClick={() => open(source)}
      pendingLabel={cta.pendingLabel}
      {...props}
    >
      {cta.label}
    </CTAButton>
  );
}
