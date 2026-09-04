import type { GrowthPoint, SectionIntro, StatItem } from "./types";

export const stats = {
  intro: {
    kicker: "Números",
    title: "O evento cresce mais rápido que o pelotão",
    description:
      "Três edições, uma curva só. 2027 é a maior operação da história da prova.",
  } satisfies SectionIntro,
  items: [
    {
      id: "atletas",
      value: 10000,
      label: "atletas",
      note: "Meta para a edição 2027",
    },
    {
      id: "crescimento",
      value: 43,
      prefix: "+",
      suffix: "%",
      label: "de crescimento",
      note: "Inscritos de 2026 para 2027",
    },
    {
      id: "publico",
      value: 30000,
      prefix: "até ",
      label: "pessoas em circulação",
      note: "Atletas, acompanhantes e público do show",
    },
  ] satisfies StatItem[],

  /** Comparativo histórico exibido como barras. */
  growth: {
    label: "Atletas por edição",
    series: [
      { year: "2025", value: 5000 },
      { year: "2026", value: 7000 },
      { year: "2027", value: 10000, projected: true },
    ] satisfies GrowthPoint[],
  },
};
