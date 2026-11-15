/**
 * Lotes de inscrição. Fonte única: a home (bloco de lotes) e /inscricao leem
 * daqui, para o preço não existir em dois lugares.
 *
 * Cada lote tem um número de vagas e fecha quando o total de inscritos chega
 * ao seu limite (`closesAt`); aí o seguinte entra com o novo valor. Não há
 * data de encerramento por lote. Cada lote tem dois valores.
 *
 * O contador de inscritos ainda é fixo; quando a venda for integrada ao
 * Ticket Sports, `registrations` passa a vir da API.
 */

export type LotStatus = "encerrado" | "aberto" | "proximo" | "ultimo" | null;

export type KitId = "basico" | "plus" | "camarote";

export type Lot = {
  id: string;
  name: string;
  /** Vagas do lote. */
  spots: number;
  /** Total de inscritos em que o lote fecha. */
  closesAt: number;
  /** Os dois valores do lote, sem as taxas. */
  prices: [number, number];
  status: LotStatus;
};

export const lotes = {
  /** Inscritos até agora, do contador público. */
  // TODO(confirmar): vem do Ticket Sports quando a integração existir.
  registrations: 1284,
  /** Inscritos adicionados no dia, do contador público. */
  registrationsToday: 212,
  /** Origem do contador, exibida ao lado dele. */
  registrationsSource: "atualizado às 14:10 · fonte Ticket Sports",
  /** Vagas totais da edição (regulamento, item 6.1). */
  totalSpots: 10000,
  /** Fim das inscrições (regulamento, item 6.1). */
  closesLabel: "11 de junho de 2027",

  /** Os três kits (regulamento, item 4). */
  kits: [
    {
      id: "basico",
      name: "Kit Básico",
      items: "Número de peito e chip eletrônico.",
    },
    {
      id: "plus",
      name: "Kit Plus",
      items: "Número de peito, chip eletrônico, camiseta oficial e 2 ingressos para o show.",
    },
    {
      id: "camarote",
      name: "Kit Camarote",
      items:
        "Número de peito, chip eletrônico, camiseta oficial, camarote, 2 ingressos para o camarote, ALOHA Recovery, retirada de kit, guarda-volume, banheiro e lounge bar exclusivos. Limitado a 100 vagas.",
    },
  ] satisfies { id: KitId; name: string; items: string }[],

  /** Os cinco lotes, em ordem. */
  table: [
    {
      id: "lote-1",
      name: "Lote 1",
      spots: 1_500,
      closesAt: 2_000,
      prices: [169.9, 239.9],
      status: "aberto",
    },
    {
      id: "lote-2",
      name: "Lote 2",
      spots: 2_000,
      closesAt: 4_000,
      prices: [179.9, 259.9],
      status: "proximo",
    },
    {
      id: "lote-3",
      name: "Lote 3",
      spots: 3_000,
      closesAt: 7_000,
      prices: [189.9, 279.9],
      status: null,
    },
    {
      id: "lote-4",
      name: "Lote 4",
      spots: 2_000,
      closesAt: 9_000,
      prices: [209.9, 299.9],
      status: null,
    },
    {
      id: "lote-5",
      name: "Lote 5",
      spots: 1_000,
      closesAt: 10_000,
      prices: [229.9, 319.9],
      status: "ultimo",
    },
  ] satisfies Lot[],

  /** Rótulo de cada status, na coluna "Status" da tabela. */
  statusLabel: {
    encerrado: "Encerrado",
    aberto: "Aberto",
    proximo: "Próximo",
    ultimo: "Último",
  } satisfies Record<Exclude<LotStatus, null>, string>,

  /** Rodapé da tabela. */
  priceNote:
    "Valores mais taxas. 60+ pagam 50% (item 6.7); assessorias com 10 ou mais inscritos pagam sempre o Lote 1 (item 15).",

  /** Inscrito em que o lote fecha, para o texto "até …". */
  endsLabel: (lot: Lot) => `o inscrito ${lot.closesAt.toLocaleString("pt-BR")}`,

  /** Preço em reais, no formato da tabela. */
  format: (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value),

  /** Os três cartões da seção de lotes da home. */
  notes: [
    {
      kicker: "Regra do lote",
      title: "Fecha quando as vagas acabam",
      text: "Cada lote tem um número de vagas. Quando elas acabam, o lote fecha e o seguinte entra automaticamente, com o novo valor.",
    },
    {
      kicker: "Kits",
      title: "Básico, Plus ou Camarote",
      text: "Básico: número de peito e chip eletrônico. Plus: soma a camiseta oficial e 2 ingressos para o show. Camarote: soma camarote, 2 ingressos para o camarote, ALOHA Recovery, retirada, guarda-volume, banheiro e lounge bar exclusivos (100 vagas).",
    },
    {
      kicker: "Depois da compra",
      title: "Transferência de inscrição",
      text: "Transferência de titularidade até 20/05/2027, com taxa de R$ 50,00 via Pix.",
    },
  ],
};

/** O lote aberto: o que o visitante vê no topo da home e da inscrição. */
export const currentLot = lotes.table.find((lot) => lot.status === "aberto") ?? lotes.table[0];
