import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Inscrição",
  description:
    "Inscrições da Meia Maratona Internacional de Curitiba 2027: 5 km, 10 km e 21 km. Lotes, valores e regulamento saem junto com a data oficial.",
  /* Canonical próprio: sem ele a rota herda o da home (app/layout.tsx)
     e se declara duplicata dela. Relativo, resolvido por metadataBase. */
  alternates: { canonical: "/inscricao" },
};

/** Placeholder. Aqui entram lotes, valores, regulamento e checkout. */
export default function InscricaoPage() {
  return (
    <ComingSoonPage
      kicker="Inscrição"
      title="As inscrições abrem em breve."
      description="A data oficial da prova e o primeiro lote de inscrições serão anunciados juntos. Esta página vai receber lotes, valores, regulamento e o fluxo de compra."
      whatsNext={[
        "Lotes e valores por distância (5 km, 10 km e 21 km)",
        "Regulamento oficial e política de transferência",
        "Fluxo de compra e emissão de comprovante",
        "Informações de retirada de kit",
      ]}
    />
  );
}
