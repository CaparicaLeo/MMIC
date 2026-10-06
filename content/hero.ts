import type { Cta, Media } from "./types";
import { backstage } from "./backstage";
import { event } from "./event";

export const hero = {
  /** Tarja acima da headline. */
  eyebrow: `${event.city} · ${event.year}`,
  headline: "Quando o esporte encontra o rock, Curitiba vira o palco.",
  /**
   * Mesma frase quebrada em linhas para o reveal com máscara do hero.
   * `headline` continua sendo a fonte única para metadata/SEO.
   *
   * "Curitiba vira o palco." fica inteira numa linha: partida ao meio, a
   * frase de efeito perdia a força. É a linha mais longa, e o tamanho mínimo
   * da fonte no HeroSection foi calibrado para ela caber a partir de 220px.
   */
  headlineLines: [
    "Quando o esporte",
    "encontra o rock,",
    "Curitiba vira o palco.",
  ],
  /**
   * Sem dia/mês: a data ainda não está definida. Só o ano e o "em breve".
   * Sem `event.location` também: o nome do evento já termina em "de
   * Curitiba", e a linha saía "…de Curitiba · Rock Edition — Curitiba — PR",
   * repetindo a cidade e quebrando com "— PR" sozinho. A praça continua no
   * selo acima da headline e no rodapé.
   *
   * O ano entra no h1 (antes ficava só no badge): "meia maratona curitiba
   * 2027" é uma das buscas alvo e o h1 é o título que o buscador lê.
   */
  subheadline: `${event.name} ${event.year} · ${event.edition}`,
  /**
   * Card de abertura das inscrições — o bloco de prazo do hero.
   *
   * Ele substituiu o selo de distâncias: em vez de listar 5/10/21 km (que
   * continuam na seção "Escolha o seu palco"), o hero responde a única
   * pergunta com data de hoje — quando abrem as inscrições — e entrega o CTA
   * do Backstage junto. Tudo que é texto mora aqui; o componente só formata.
   */
  registrationCard: {
    label: "Abertura das inscrições",
    date: event.registrationOpensLabel,
    countdownCaption: "Inscrições abrem em",
    /** Benefício colado no CTA: o que quem entra agora leva a mais. */
    note: "Quem está no Backstage compra 24h antes de todo mundo.",
  },
  cta: {
    label: backstage.ctaLabel,
    action: "register",
  } satisfies Cta,
  secondaryCta: {
    label: "Ver as distâncias",
    action: "link",
    href: "#distancias",
  } satisfies Cta,
  scrollHint: "Role para descobrir",
  /**
   * Camada de imagem com parallax leve. Foto clara, de fim de tarde: a
   * legibilidade da headline vem dos gradientes do HeroSection, não da foto.
   */
  background: {
    src: "/images/hero-palco.jpg",
    alt: "Corredores atravessam o palco entre a banda tocando e o público, no fim da tarde",
    width: 2560,
    height: 1429,
  } satisfies Media,
};
