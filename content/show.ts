import type { Media, SectionIntro } from "./types";

/**
 * Bloco do show.
 *
 * O line-up voltou a ser teaser: o nome da atração principal saiu e o slot
 * anuncia "Banda surpresa". `headliner` continua sendo o campo do nome — é só
 * escrever a banda ali quando ela puder ser revelada, e trocar a arte de
 * `media` pela foto oficial. `lineup` segue vazio e existe para as atrações
 * de apoio, quando houver: preencher o array já é suficiente, o componente
 * não muda.
 */
export const show = {
  intro: {
    kicker: "O show",
    title: "A linha de chegada é a frente do palco.",
  } satisfies SectionIntro,
  statement:
    "Quando o último pelotão cruza a chegada, a arena troca de função. O que era ponto de hidratação vira pista, o que era pórtico vira palco, e o cansaço da prova encontra a primeira batida do show ao vivo.",
  support:
    "É o momento em que o atleta, a família que veio torcer e quem só passou para assistir estão exatamente no mesmo lugar, e nenhum deles quer ir embora.",

  /**
   * Atração principal. O teaser ocupa o slot do nome de propósito: ele é o
   * anúncio da seção, então entra pelo ramo do nome (destaque cheio), não
   * pelo `headlinerPlaceholder`, que é o estado apagado de "nada a dizer".
   */
  headliner: "Banda surpresa" as string | null,
  /** Atrações de apoio. Vazio até o resto do line-up fechar. */
  lineup: [] as string[],
  /** Texto de fallback, caso `headliner` volte a ser null. */
  headlinerPlaceholder: "Atração principal a ser anunciada",

  media: {
    /**
     * Placeholder até a arte da banda chegar. A proporção 2080x1440 é a
     * mesma da foto anterior de propósito: mantém o quadro e o parallax
     * calibrados, então trocar pela arte definitiva é mexer só no `src`.
     */
    src: "/images/placeholders/show.png",
    alt: "Atração principal da Rock Edition ainda não anunciada",
    width: 2080,
    height: 1440,
  } satisfies Media,
};
