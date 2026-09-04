import type { DistanceItem, SectionIntro } from "./types";

export const distances = {
  intro: {
    kicker: "As distâncias",
    title: "Escolha o seu palco",
    description:
      "Três percursos, uma chegada. Todos terminam na mesma arena, no mesmo som.",
  } satisfies SectionIntro,
  items: [
    {
      id: "5km",
      distance: "5",
      unit: "KM",
      name: "A estreia",
      description:
        "Para quem está começando ou vem pela experiência. Percurso plano, clima de abertura e a mesma chegada de todo mundo.",
      highlights: ["Percurso plano", "Ideal para iniciantes", "Aberto a caminhada"],
      cta: {
        label: "Quero correr os 5 km",
        action: "register",
        pendingLabel: "Abrindo…",
      },
    },
    {
      id: "10km",
      distance: "10",
      unit: "KM",
      name: "O ritmo",
      description:
        "A distância mais disputada do evento. Ritmo forte, ruas fechadas e os principais pontos de som do percurso.",
      highlights: ["Percurso urbano", "Pontos de som no trajeto", "Pelotão por ritmo"],
      cta: {
        label: "Quero correr os 10 km",
        action: "register",
        pendingLabel: "Abrindo…",
      },
    },
    {
      id: "21km",
      distance: "21",
      unit: "KM",
      name: "A meia",
      description:
        "A prova principal. Percurso internacional homologado, cronometragem oficial e a chegada mais barulhenta do ano.",
      highlights: [
        "Percurso homologado",
        "Cronometragem oficial",
        "Premiação por categoria",
      ],
      cta: {
        label: "Quero correr os 21 km",
        action: "register",
        pendingLabel: "Abrindo…",
      },
      featured: true,
    },
  ] satisfies DistanceItem[],
};
