import type { GrowthPoint, SectionIntro, StatItem } from "./types";

/**
 * Números públicos do evento.
 *
 * Regra editorial deste arquivo: todo número declara de onde veio (`source`) e
 * se ainda falta aprovação (`pending`). A distinção que importa é esta:
 * número realizado tem fonte externa, meta tem a organização como origem e
 * nunca aparece ao lado de um realizado sem tarja.
 *
 * O "+43% de inscritos de 2026 para 2027" que existia aqui foi removido: ele
 * comparava uma meta com um número do ano anterior, não crescimento. Crescimento
 * se mede entre duas edições realizadas.
 */
export const stats = {
  intro: {
    kicker: "Números",
    title: "O que já foi feito e o que está vindo",
    description:
      "Distinção explícita entre o que a prova já realizou e o que a organização pretende para 2027.",
  } satisfies SectionIntro,

  items: [
    {
      id: "atletas-2026",
      value: 5000,
      label: "atletas em 2026",
      note: "Resultado da edição 2026.",
      source: "Edição 2026",
      // TODO(confirmar): o número oficial de 2026 precisa ser confirmado com a
      // Ticket Sports antes de publicar. Enquanto isso o marcador aparece em dev.
      pending: "confirmar número oficial 2026 com a Ticket Sports",
    },
    {
      id: "atletas",
      value: 10000,
      /**
       * A tarja "Meta" e o "+" dizem isso no próprio número, e a nota fecha
       * explicitando que não é histórico realizado — a mesma ressalva que a
       * barra de 2027 já traz no comparativo abaixo.
       */
      kicker: "Meta",
      suffix: "+",
      label: "atletas em 2027",
      note: "Objetivo da edição 2027, não número realizado.",
      source: "Meta da organização",
    },
    {
      id: "publico",
      value: 30000,
      /**
       * O espaço final fica: como o prefixo é flex item, ele é colapsado na
       * tela (o respiro visual vem da margem no StatsCounter), mas continua
       * no textContent — é ele que separa as palavras para leitor de tela e
       * para quem copia o número.
       *
       * "projeção" em vez de "até": não é teto, é estimativa. A palavra é o
       * que separa 30.000 projetados de 30.000 pessoas.
       */
      prefix: "projeção de ",
      label: "pessoas em circulação",
      note: "Atletas, acompanhantes e público do show.",
      source: "Projeção da organização",
    },
  ] satisfies StatItem[],

  /** Comparativo histórico exibido como barras. */
  growth: {
    label: "Atletas por edição",
    /*
      2025 e 2026 estão sem fonte confirmada: o valor de 2025 veio do histórico
      do site e o de 2026 foi informado como pendente de verificação com a
      Ticket Sports. Atribuir a fonte "Ticket Sports" aos dois seria inventar
      procedência justamente nos anos que a barra usa para mostrar trajetória,
      então as duas linhas carregam marcador de pendência até haver documento.
    */
    series: [
      {
        year: "2025",
        value: 5000,
        source: "Edição 2025",
        // TODO(confirmar): número de inscritos da edição 2025 e a fonte oficial
        // do número. Hoje o valor vem do histórico do site, sem comprovação.
        pending: "confirmar número e fonte da edição 2025",
      },
      {
        year: "2026",
        value: 5000,
        source: "Edição 2026",
        // TODO(confirmar): confirmar com a Ticket Sports o número oficial de
        // 2026 e a fonte que o publica.
        pending: "confirmar número oficial de 2026 com a Ticket Sports",
      },
      {
        year: "2027",
        value: 10000,
        projected: true,
        source: "Meta da organização",
      },
    ] satisfies GrowthPoint[],
  },
};