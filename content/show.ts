import type { Media, SectionIntro } from "./types";

/**
 * Bloco do show.
 *
 * O line-up abriu com o CPM22 confirmado como atração principal — o slot que
 * antes exibia "a ser anunciada" agora renderiza o nome. `lineup` segue vazio
 * e existe para as atrações de apoio, quando houver: preencher o array já é
 * suficiente, o componente não muda.
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

  /** Atração principal confirmada. */
  headliner: "CPM22" as string | null,
  /** Atrações de apoio. Vazio até o resto do line-up fechar. */
  lineup: [] as string[],
  /** Texto de fallback, caso `headliner` volte a ser null. */
  headlinerPlaceholder: "Atração principal a ser anunciada",

  media: {
    /**
     * O arquivo do designer vinha com uma tarja preta chapada ocupando os
     * 480px da esquerda (18% da largura), sobra do export e não parte da
     * cena — ela aparecia como uma barra morta ao lado da banda. A arte
     * versionada já está recortada, daí a proporção 2080x1440.
     */
    src: "/images/cpm22.jpg",
    alt: "CPM22, atração principal da Rock Edition",
    width: 2080,
    height: 1440,
  } satisfies Media,
};
