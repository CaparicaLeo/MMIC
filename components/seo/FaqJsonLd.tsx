import { faq } from "@/content";

/**
 * Dados estruturados do FAQ (schema.org/FAQPage).
 *
 * Lê `content/faq.ts` — a mesma lista que renderiza a seção da home —, então
 * schema e página nunca saem de sincronia: pergunta nova no conteúdo entra
 * no JSON-LD sozinha.
 *
 * Renderiza só na home, onde o FAQ está visível. Resposta é texto puro, sem
 * HTML: a API aceita texto e é o que os assistentes de busca citam.
 */
export function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
