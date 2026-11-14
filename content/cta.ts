import type { Cta, Media } from "./types";
import { backstage } from "./backstage";
import { event } from "./event";
import { inscricao } from "./paginas/paginas";

/**
 * Assinatura do evento. Fonte única: entra como texto no rodapé e como `alt`
 * do lockup na seção final — a frase não é duplicada em lugar nenhum.
 */
const closing = "Curitiba é rock. Curitiba corre.";

export const finalCta = {
  kicker: `${event.edition} · ${event.year}`,
  title: "Quando o esporte encontra o rock, Curitiba vira o palco.",
  description:
    "Inscrições abertas no Ticket Sports: o primeiro lote é sempre o mais barato.",
  dateNote: event.dateLabel,
  /** Vai direto para a venda no Ticket Sports (sem link, cai em /inscricao). */
  cta: {
    label: "Garantir minha vaga",
    action: "link",
    href: inscricao.ticketSportsUrl ?? "/inscricao",
  } satisfies Cta,
  benefitsTitle: backstage.benefitsTitle,
  benefits: backstage.benefits,
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