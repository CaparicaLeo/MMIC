import type { Metadata } from "next";

import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Cronograma",
  description:
    "Programação da Meia Maratona Internacional de Curitiba 2027: largadas de 5 km, 10 km e 21 km, retirada de kit e o show ao vivo na arena.",
  /* Canonical próprio: sem ele a rota herda o da home (app/layout.tsx)
     e se declara duplicata dela. Relativo, resolvido por metadataBase. */
  alternates: { canonical: "/cronograma" },
};

/** Placeholder. Vai reaproveitar o <Timeline /> com a programação completa. */
export default function CronogramaPage() {
  return (
    <ComingSoonPage
      kicker="Cronograma"
      title="A programação completa vem aí."
      description="A linha do tempo do dia da prova já está na home, em versão resumida. Esta página vai trazer a programação completa, incluindo os dias de retirada de kit."
      whatsNext={[
        "Programação hora a hora do dia da prova",
        "Datas e horários de retirada de kit",
        "Mapa do percurso por distância",
        "Guia de acessos e transporte até a arena",
      ]}
    />
  );
}
