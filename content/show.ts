import type { Media, SectionIntro } from "./types";

/**
 * Bloco do show.
 *
 * IMPORTANTE: nenhuma atração está confirmada nesta versão — o texto é
 * deliberadamente genérico e NÃO cita nome próprio de banda ou artista.
 * Quando o line-up fechar, preencha `headliner` (e opcionalmente `lineup`) e
 * o slot já reservado no componente passa a renderizar. Nada mais muda.
 */
export const show = {
  intro: {
    kicker: "O show",
    title: "A linha de chegada é a frente do palco.",
  } satisfies SectionIntro,
  statement:
    "Quando o último pelotão cruza a chegada, a arena troca de função. O que era ponto de hidratação vira pista, o que era pórtico vira palco, e o cansaço da prova encontra a primeira batida do show ao vivo.",
  support:
    "É o momento em que o atleta, a família que veio torcer e quem só passou para assistir estão exatamente no mesmo lugar — e nenhum deles quer ir embora.",

  /** Slot do line-up. `null` até a atração ser anunciada oficialmente. */
  headliner: null as string | null,
  lineup: [] as string[],
  /** Texto exibido enquanto o line-up não é anunciado. */
  headlinerPlaceholder: "Atração principal a ser anunciada",

  media: {
    src: "/images/placeholders/show.svg",
    alt: "Arena lotada durante o show ao vivo após a corrida",
    width: 1280,
    height: 960,
  } satisfies Media,
};
