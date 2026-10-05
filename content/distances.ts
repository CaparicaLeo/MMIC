import type { DistanceItem, SectionIntro } from "./types";
import { backstage } from "./backstage";

export const distances = {
  intro: {
    kicker: "As distâncias",
    title: "Escolha o seu palco",
    description:
      "Três percursos, uma chegada. Todos terminam na mesma arena, no mesmo som.",
  } satisfies SectionIntro,

  /**
   * Os três cards apontam para o mesmo formulário do Backstage, com a distância
   * pré-marcada. O rótulo do botão é o mesmo dos outros CTAs do site de
   * propósito — trocar por "Entrar no Backstage (21 km)" faria a pessoa duvidar
   * de que estão falando da mesma coisa. A distância aparece na tarja do modal,
   * que é onde ela precisa ser confirmada.
   */
  items: [
    {
      id: "5km",
      distance: "5",
      unit: "KM",
      name: "A estreia",
      audience: "Para quem está começando, vem pela experiência ou vem com a família.",
      description:
        "Percurso plano, clima de abertura e a mesma chegada de todo mundo.",
      highlights: ["Percurso plano", "Ideal para iniciantes", "Aberto a caminhada"],
      cta: {
        label: backstage.ctaLabel,
        action: "register",
      },
    },
    {
      id: "10km",
      distance: "10",
      unit: "KM",
      name: "O ritmo",
      audience: "Para quem já corre 10 km com folga e quer um dia com som no trajeto.",
      description:
        "A distância mais disputada do evento, com ritmo forte e ruas fechadas.",
      highlights: ["Percurso urbano", "Pontos de som no trajeto", "Pelotão por ritmo"],
      cta: {
        label: backstage.ctaLabel,
        action: "register",
      },
    },
    {
      id: "21km",
      distance: "21",
      unit: "KM",
      name: "A meia",
      audience: "Para quem corre meia maratona e quer a chegada mais barulhenta do ano.",
      description:
        "A prova principal, com percurso internacional homologado e cronometragem oficial.",
      highlights: [
        "Percurso homologado",
        "Cronometragem oficial",
        "Premiação por categoria",
      ],
      cta: {
        label: backstage.ctaLabel,
        action: "register",
      },
      featured: true,
    },
  ] satisfies DistanceItem[],
};