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
    "As inscrições para a edição 2027 abrem em breve. Garanta o seu lugar na largada, e na primeira fila.",
  dateNote: event.dateLabel,
  cta: {
    label: "Quero me inscrever",
    action: "register",
    pendingLabel: "Abrindo…",
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

/** Copy do modal de placeholder (não há fluxo de inscrição ainda). */
export const registrationModal = {
  kicker: "Inscrições",
  title: "Em breve",
  description:
    "As inscrições para a Meia Maratona Internacional de Curitiba 2027 · Rock Edition ainda não abriram. A data oficial e o primeiro lote serão anunciados juntos.",
  note: "Enquanto isso, acompanhe as redes do evento para ser avisado primeiro.",
  dismissLabel: "Fechar",
};
