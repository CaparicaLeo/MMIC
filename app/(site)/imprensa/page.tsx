import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Imprensa",
  description:
    "Área de imprensa da Meia Maratona Internacional de Curitiba 2027: releases, kit de mídia e credenciamento para a corrida de 5, 10 e 21 km.",
  /* Canonical próprio: sem ele a rota herda o da home (app/layout.tsx)
     e se declara duplicata dela. Relativo, resolvido por metadataBase. */
  alternates: { canonical: "/imprensa" },
};

/** Placeholder. Vai concentrar releases, kit de mídia e credenciamento. */
export default function ImprensaPage() {
  return (
    <ComingSoonPage
      kicker="Imprensa"
      title="Material para quem vai contar essa história."
      description="Esta página vai concentrar releases, kit de mídia, imagens em alta resolução e o credenciamento para cobertura do evento."
      whatsNext={[
        "Releases oficiais da edição 2027",
        "Kit de mídia e logos em alta resolução",
        "Credenciamento de imprensa",
        "Contato de assessoria",
      ]}
    />
  );
}
