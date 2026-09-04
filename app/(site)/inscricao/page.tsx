import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Inscrição",
  description:
    "As inscrições para a Meia Maratona Internacional de Curitiba 2027 — Rock Edition abrem em breve.",
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
