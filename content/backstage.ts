/**
 * Backstage 21K — o grupo VIP de pré-lançamento.
 *
 * Fonte única do CTA principal do site. O rótulo e a promessa vivem aqui e
 * são importados por todo lugar que offers o Backstage (hero, blocos da home,
 * /inscricao, /concurso-de-camisetas e a barra fixa do mobile). Nenhum
 * componente escreve "Quero entrar no Backstage" por conta própria: se o
 * texto mudar, muda aqui uma vez.
 */
export const backstage = {
  /** Nome do grupo. É o que aparece na tarja do modal. */
  name: "Grupo VIP",

  /** Rótulo do CTA principal. Idêntico em todo o site, sem exceção. */
  ctaLabel: "Quero entrar no grupo VIP",

  /**
   * O que o Grupo VIP entrega a quem entra. É a troca do CTA — não é uma
   * "lista de avisos", são vantagens concretas. Fonte única: alimenta a lista
   * da seção final de CTA e, se preciso, o modal.
   */
  benefitsTitle: "Só no grupo VIP tem",

  benefits: [
    "Detalhes da construção do evento em primeira mão",
    "Participação na votação da camiseta oficial do evento",
    "Desafios interativos com premiações exclusivas",
  ],

  /**
   * Canais de entrada no Backstage, na ordem em que aparecem no modal. O
   * primeiro é o atalho de menor fricção; o segundo captura o lead.
   */
  channels: [
    {
      id: "instagram" as const,
      label: "Entrar pelo Instagram",
      /** Entrega a tela de sucesso do formulário, que leva ao mesmo destino. */
      hint: "Acesso em um clique. Sem formulário.",
    },
    {
      id: "form" as const,
      label: "Quero entrar pelo formulário",
      hint: "Nome, contato e e-mail. Você escolhe se quer aviso por WhatsApp ou por e-mail.",
    },
  ],
} as const;