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
  name: "Backstage 21K",

  /** Rótulo do CTA principal. Idêntico em todo o site, sem exceção. */
  ctaLabel: "Quero entrar no Backstage",

  /**
   * Promessa exibida imediatamente abaixo de cada CTA principal. É a troca que
   * o CTA faz: não é "lista de avisos", são três vantagens com data.
   */
  promise:
    "Vote na camiseta, veja o line-up antes e compre 24h antes de todo mundo.",

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
      hint: "Dois campos. Você escolhe como quer ser chamado.",
    },
  ],
} as const;