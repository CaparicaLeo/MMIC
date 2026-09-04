import type { SectionIntro, TimelineItem } from "./types";

/**
 * Timeline do dia do evento. Os horários são fixos; a data ainda não.
 * Esta mesma lista alimentará a futura página /cronograma em versão expandida.
 */
export const schedule = {
  intro: {
    kicker: "Como funciona o dia",
    title: "Da largada ao último refrão",
    description:
      "Uma linha do tempo só: você chega no escuro e sai no meio de um festival.",
  } satisfies SectionIntro,
  items: [
    {
      id: "arena",
      time: "05h",
      title: "A arena desperta",
      description:
        "Portões abertos, guarda-volumes funcionando e aquecimento coletivo com a trilha certa. A cidade ainda dorme; a arena não.",
    },
    {
      id: "largadas",
      time: "06h",
      title: "Largadas",
      description:
        "Pelotões saem em ondas por distância, com controle de fluxo para largada segura e ritmo limpo nos primeiros quilômetros.",
    },
    {
      id: "musica",
      time: "08h",
      title: "A corrida encontra a música",
      description:
        "Pontos de som ao longo do percurso: cada trecho tem sua trilha, e a virada de bairro é uma virada de faixa.",
    },
    {
      id: "show",
      time: "08h–10h",
      title: "Show",
      description:
        "A chegada vira palco. Medalha no peito, som ao vivo, e a arena inteira cantando junto.",
    },
  ] satisfies TimelineItem[],
};
