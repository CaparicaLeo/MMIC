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
   */
  subheadline: `${event.name} · ${event.edition} — ${event.location}`,
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
  /** Camada de imagem com parallax leve. Trocar pelo asset final. */
  background: {
    src: "/images/placeholders/hero.svg",
    alt: "Atletas correndo pelas ruas de Curitiba ao amanhecer",
    width: 1920,
    height: 1080,
  } satisfies Media,
};
