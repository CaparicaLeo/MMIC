import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export default function NotFound() {
  return (
    <ComingSoonPage
      kicker="Erro 404"
      title="Essa rota não está no percurso."
      description="A página que você procurou não existe (ou ainda não existe). Volte para a home para ver tudo sobre a edição 2027."
      whatsNext={[
        "A largada, o percurso e o show estão na home",
        "Inscrição, cronograma, patrocinadores e imprensa chegam em breve",
      ]}
    />
  );
}
