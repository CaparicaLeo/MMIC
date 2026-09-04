import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Patrocinadores",
  description:
    "Marcas parceiras da Meia Maratona Internacional de Curitiba 2027 — Rock Edition.",
};

/** Placeholder. Vai listar cotas e marcas parceiras. */
export default function PatrocinadoresPage() {
  return (
    <ComingSoonPage
      kicker="Patrocinadores"
      title="As marcas que sobem no palco com a gente."
      description="Esta página vai apresentar os parceiros da edição 2027 e as oportunidades de patrocínio para marcas que queiram estar na arena."
      whatsNext={[
        "Marcas parceiras por cota",
        "Números de audiência e alcance do evento",
        "Materiais e contato comercial",
      ]}
    />
  );
}
