import type { Cta, Media } from "./types";
import { event } from "./event";

export const hero = {
  /** Tarja acima da headline. */
  eyebrow: `${event.city} · ${event.year}`,
  headline: "Quando o esporte encontra o rock, Curitiba vira o palco.",
  /**
   * Mesma frase quebrada em linhas para o reveal com máscara do hero.
   * `headline` continua sendo a fonte única para metadata/SEO.
   */
  headlineLines: [
    "Quando o esporte",
    "encontra o rock,",
    "Curitiba vira",
    "o palco.",
  ],
  /**
   * Sem dia/mês: a data ainda não está definida. Só o ano e o "em breve".
   * Sem `event.location` também: o nome do evento já termina em "de
   * Curitiba", e a linha saía "…de Curitiba · Rock Edition — Curitiba — PR",
   * repetindo a cidade e quebrando com "— PR" sozinho. A praça continua no
   * selo acima da headline e no rodapé.
   */
  subheadline: `${event.name} · ${event.edition}`,
  dateNote: event.dateLabel,
  distances: event.distances,
  cta: {
    label: "Quero me inscrever",
    action: "register",
    pendingLabel: "Abrindo…",
  } satisfies Cta,
  secondaryCta: {
    label: "Ver as distâncias",
    action: "link",
    href: "#distancias",
  } satisfies Cta,
  scrollHint: "Role para descobrir",
  /**
   * Camada de imagem com parallax leve. O terço inferior da foto é público em
   * contraluz, quase silhueta, e é sobre ele que a headline se apoia. Uma
   * troca por foto de fundo claro embaixo exigiria overlay próprio.
   */
  background: {
    src: "/images/hero.jpg",
    alt: "Público de mãos erguidas em frente ao palco, no fim da tarde",
    width: 2560,
    height: 1440,
  } satisfies Media,
};
