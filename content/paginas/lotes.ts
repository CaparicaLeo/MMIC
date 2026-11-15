/**
 * Lotes de inscrição. Fonte única: a home (bloco de lotes) e /inscricao leem
 * daqui, para o preço não existir em dois lugares.
 *
 * Períodos, valores e kits seguem o regulamento oficial (item 6.8, ver
 * /regulamento): cada lote fecha na data final ou quando as vagas dele
 * acabam, o que vier primeiro (item 6.9). O regulamento só traz valores para
 * 5 km e 10 km; o 21 km é vendido no Ticket Sports.
 *
 * O contador de inscritos ainda é fixo; quando a venda for integrada ao
 * Ticket Sports, `registrations` passa a vir da API.
 */

export type LotStatus = "encerrado" | "aberto" | "proximo" | "ultimo" | null;

export type KitId = "basico" | "plus" | "camarote";

export type Lot = {
  id: string;
  name: string;
  /** Período do regulamento, por extenso curto. */
  period: string;
  /** Último dia do lote, para o texto "até …". */
  endsLabel: string;
  /** Valores por kit, para 5 km e 10 km, sem as taxas. */
  prices: Record<KitId, number>;
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

  /** Pré-venda e os quatro lotes, em ordem (regulamento, item 6.8). */
  table: [
    {
      id: "pre-venda",
      name: "Pré-venda",
      period: "10/11 a 13/11/2026",
      endsLabel: "13/11/2026",
      prices: { basico: 139.9, plus: 179.9, camarote: 319.9 },
      status: "encerrado",
    },
    {
      id: "lote-1",
      name: "1º Lote",
      period: "14/11 a 13/12/2026",
      endsLabel: "13/12/2026",
      prices: { basico: 179.9, plus: 199.9, camarote: 349.9 },
      status: "aberto",
    },
    {
      id: "lote-2",
      name: "2º Lote",
      period: "14/12/2026 a 31/01/2027",
      endsLabel: "31/01/2027",
      prices: { basico: 199.9, plus: 219.9, camarote: 369.9 },
      status: "proximo",
    },
    {
      id: "lote-3",
      name: "3º Lote",
      period: "01/02 a 28/03/2027",
      endsLabel: "28/03/2027",
      prices: { basico: 219.9, plus: 249.9, camarote: 399.9 },
      status: null,
    },
    {
      id: "lote-4",
      name: "4º Lote",
      period: "29/03 a 11/06/2027",
      endsLabel: "11/06/2027",
      prices: { basico: 239.9, plus: 269.9, camarote: 419.9 },
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
    "Valores para 5 km e 10 km, mais taxas. O valor do 21 km aparece no Ticket Sports. 60+ pagam 50% (item 6.7); assessorias com 10 ou mais inscritos pagam sempre o 1º Lote (item 15).",

  /** Preço em reais, no formato da tabela. */
  format: (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value),

  /** Os três cartões da seção de lotes da home. */
  notes: [
    {
      kicker: "Regra do lote",
      title: "Fecha na data ou quando esgota",
      text: "Cada lote tem período e quantidade própria de vagas. O que vier primeiro encerra o lote, e o seguinte entra automaticamente, com o novo valor.",
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
