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
      /**
       * O número é objetivo da edição, não resultado. A tarja "Meta" e o "+"
       * dizem isso no próprio número, e a nota fecha explicitando que não é
       * histórico realizado — a mesma ressalva que a barra de 2027 já traz
       * no comparativo abaixo.
       */
      kicker: "Meta",
      suffix: "+",
      label: "atletas",
      note: "Objetivo da edição 2027, não número realizado.",
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
      /**
       * O espaço final fica: como o prefixo é flex item, ele é colapsado na
       * tela (o respiro visual vem da margem no StatsCounter), mas continua
       * no textContent — é ele que separa as palavras para leitor de tela e
       * para quem copia o número.
       */
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
