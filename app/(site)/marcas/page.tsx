import type { Metadata } from "next";

import { BrandInterestButton } from "@/components/brands/BrandInterestButton";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Marcas",
  description:
    "Seja uma marca oficial da Meia Maratona Internacional de Curitiba 2027: 5 km, 10 km e 21 km em Curitiba (PR), com show ao vivo na chegada. Cotas e contato.",
  /* Canonical próprio: sem ele a rota herda o da home (app/layout.tsx)
     e se declara duplicata dela. Relativo, resolvido por metadataBase. */
  alternates: { canonical: "/marcas" },
};

/** Placeholder. Vai listar cotas e marcas parceiras. */
export default function MarcasPage() {
  return (
    <ComingSoonPage
      kicker="Marcas"
      title="As marcas que sobem no palco com a gente."
      description="Esta página vai apresentar as marcas oficiais da edição 2027 e as oportunidades para quem quer estar na arena — do percurso ao show."
      whatsNext={[
        "Marcas oficiais por cota",
        "Números de audiência e alcance do evento",
        "Materiais e contato comercial",
      ]}
      cta={<BrandInterestButton />}
    />
  );
}
