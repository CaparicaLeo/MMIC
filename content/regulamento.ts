/**
 * Regulamento oficial. A fonte é o Google Doc da organização: a página
 * /regulamento lê o texto dele (exportação pública, o doc está compartilhado
 * por link) e se atualiza sozinha. Editar o doc é editar o site, em até
 * `revalidateSeconds`.
 */
const docId = "1A3FEfrXNzMr8F_18-2fjN-kxL2x5mV1_BQnu3_HS51E";

export const regulamento = {
  docId,
  /** Texto puro do doc: estrutura por numeração, sem HTML de terceiros. */
  textUrl: `https://docs.google.com/document/d/${docId}/export?format=txt`,
  /** PDF gerado pelo próprio Google, sempre igual à versão atual do doc. */
  pdfUrl: `https://docs.google.com/document/d/${docId}/export?format=pdf`,
  /** Leitura pública do doc, para o aviso de erro. */
  viewUrl: `https://docs.google.com/document/d/${docId}/view`,
  /** De quanto em quanto tempo, no máximo, o site relê o doc. */
  revalidateSeconds: 300,
  hero: {
    kicker: "Regulamento",
    title: ["Regulamento", "oficial 2027."],
    slashWord: "2027.",
    description:
      "As regras da Meia Maratona Internacional de Curitiba – Rock Edition 2027: prova, kits, inscrições, premiação, percurso e categorias. Esta página acompanha o documento oficial da organização.",
  },
};
