"use client";

import { CTAButton, type CTAButtonProps } from "@/components/ui/CTAButton";
import type { BackstageDistance } from "@/components/registration/RegistrationProvider";
import type { Cta } from "@/content/types";
import { track } from "@/lib/analytics";

import { useRegistration } from "./RegistrationProvider";

/**
 * Ponte entre o CTA visual e o fluxo do Backstage.
 *
 * Todo CTA principal da página passa por aqui, então trocar o modal pelo
 * checkout real depois é uma mudança em um arquivo só.
 *
 * `distance` existe para os cards de distância: o card do 21 km abre o mesmo
 * modal com 21 km já marcado, e essa marcação chega ao lead gravado. Sem a
 * prop, o provider guardaria `null` e o card pareceria igual ao CTA do hero.
 */
export function RegisterButton({
  cta,
  source,
  distance,
  ...props
}: {
  cta: Cta;
  /** Identifica o CTA para analytics. Vira `origem_bloco` e `source` do lead. */
  source: string;
  /** Distância pré-marcada. Só nos cards de distância da home. */
  distance?: BackstageDistance;
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
      onClick={() => {
        /*
          O evento dispara no clique, e não na abertura do modal: o modal pode
          ser fechado sem conversion, e contar a abertura inflaria o funil. O
          nome do bloco e a distância vêm junto porque são eles que respondem
          "qual bloco traz a entrada".
        */
        track("backstage_cta_click", {
          origem_bloco: source,
          distancia: distance ?? "nenhuma",
        });

        open(source, distance ?? null);
      }}
      pendingLabel={cta.pendingLabel}
      {...props}
    >
      {cta.label}
    </CTAButton>
  );
}