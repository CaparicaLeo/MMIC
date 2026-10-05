import type { Cta, Media } from "./types";
import { backstage } from "./backstage";
import { event } from "./event";

/**
 * Assinatura do evento. Fonte única: entra como texto no rodapé e como `alt`
 * do lockup na seção final — a frase não é duplicada em lugar nenhum.
 */
const closing = "Curitiba é rock. Curitiba corre.";

export const finalCta = {
  kicker: `${event.edition} · ${event.year}`,
  title: "Quando o esporte encontra o rock, Curitiba vira o palco.",
  description:
    "O Backstage 21K é o grupo que entra antes: no concurso de camisetas, no line-up e na venda do primeiro lote.",
  dateNote: event.dateLabel,
  cta: {
    label: backstage.ctaLabel,
    action: "register",
  } satisfies Cta,
  /** Mesma promessa do hero — é o mesmo CTA, então é a mesma frase. */
  promise: backstage.promise,
  closing,
  /**
   * Versão em arte da assinatura, exibida no fecho da LP. Mesma restrição da
   * logo: PNG transparente com lettering branco, só sobre fundo escuro.
   */
  closingLockup: {
    src: "/images/curitiba-e-rock.png",
    alt: closing,
    width: 1177,
    height: 395,
  } satisfies Media,
};