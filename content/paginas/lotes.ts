/**
 * Lotes de inscrição. Fonte única: a home (bloco de lotes) e /inscricao leem
 * daqui, para o preço não existir em dois lugares.
 *
 * Os números são os do briefing da edição 2027 (PDF "MMIC27_site_completo").
 * O contador e as vagas são valores fixos por enquanto; quando a venda for
 * integrada ao Ticket Sports, `registrations` passa a vir da API.
 */

export type LotStatus = "esgotado" | "aberto" | "proximo" | "ultimo" | null;

export type Lot = {
  id: string;
  name: string;
  /** Quantidade de inscritos em que o lote fecha. */
  closesAt: number;
  price5and10: number;
  price21: number;
  status: LotStatus;
};

export const lotes = {
  /** Inscritos até agora, do contador público. */
  registrations: 1284,
  /** Inscritos adicionados no dia, do contador público. */
  registrationsToday: 212,
  /** Origem do contador, exibida ao lado dele. */
  registrationsSource: "atualizado às 14:10 · fonte Ticket Sports",

  /** Lote aberto: o que o visitante vê no topo da home. */
  current: {
    name: "Lote 1",
    closesAt: 2000,
    /** Vagas que ainda faltam no lote aberto. */
    remaining: 716,
    price5and10: 169.9,
    price21: 239.9,
  },

  /** Pré-venda do Grupo VIP mais os cinco lotes, em ordem. */
  table: [
    {
      id: "pre-venda-vip",
      name: "Pré-venda Grupo VIP",
      closesAt: 500,
      price5and10: 139.9,
      price21: 199.9,
      status: "esgotado",
    },
    {
      id: "lote-1",
      name: "Lote 1",
      closesAt: 2000,
      price5and10: 169.9,
      price21: 239.9,
      status: "aberto",
    },
    { id: "lote-2", name: "Lote 2", closesAt: 4000, price5and10: 179.9, price21: 259.9, status: "proximo" },
    { id: "lote-3", name: "Lote 3", closesAt: 7000, price5and10: 189.9, price21: 279.9, status: null },
    { id: "lote-4", name: "Lote 4", closesAt: 9000, price5and10: 209.9, price21: 299.9, status: null },
    { id: "lote-5", name: "Lote 5", closesAt: 10000, price5and10: 229.9, price21: 319.9, status: "ultimo" },
  ] satisfies Lot[],

  /** Rótulo de cada status, na coluna "Status" da tabela. */
  statusLabel: {
    esgotado: "Esgotado",
    aberto: "Aberto",
    proximo: "Próximo",
    ultimo: "Último",
  } satisfies Record<Exclude<LotStatus, null>, string>,

  /** Preço em reais, no formato da tabela. */
  format: (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value),

  /** Os três cartões da seção de lotes da home. */
  notes: [
    {
      kicker: "Regra do lote",
      title: "Lote fecha quando enche",
      text: "Não tem data. Quando o inscrito número 2.000 entrar, o Lote 1 fecha e o preço sobe. O contador no topo mostra quantas vagas faltam.",
    },
    {
      kicker: "Distâncias",
      title: "21 km custa mais, e é de propósito",
      text: "É a prova. Percurso homologado, pacers, poncho vermelho, 3 h de rua fechada. O 5 km e o 10 km são a porta de entrada e custam o mesmo.",
    },
    {
      kicker: "Preço",
      title: "O preço de hoje é o menor que vai existir",
      text: "Nenhum lote volta. O que fechou fica riscado na tabela, para você ver o que deixou passar. Kit completo em todos os lotes, parcelamento e transferência até 30 dias antes.",
    },
  ],
};
