import type { Cta, Media } from "./types";
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
    "As inscrições para a edição 2027 abrem em breve. Entre na lista de avisos e receba a data oficial e o primeiro lote antes de todo mundo.",
  dateNote: event.dateLabel,
  cta: {
    label: "Entrar na lista de avisos",
    action: "register",
  } satisfies Cta,
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
