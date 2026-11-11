import type { Media } from "../types";

/**
 * Copy das demais páginas da repaginação (PDF "MMIC27_site_completo").
 * Um objeto por rota; cada página lê só o seu.
 */

const img = (src: string, width: number, height: number, alt: string): Media => ({
  src,
  alt,
  width,
  height,
});

/* ---------------------------------------------------------------- Inscrição */

export const inscricao = {
  hero: {
    kicker: "Inscrições",
    title: ["O primeiro lote é", "sempre o mais", "barato."],
    slashWord: "barato.",
    description:
      "Contador público, lote atual com as vagas que restam, tabela por distância e o botão direto para o Ticket Sports. Regulamento e transferência logo abaixo, sem esconder.",
    media: img("/images/fotos/pelotao-dia-largo.webp", 2048, 1152, "Pelotão de corredores de camisa preta numa avenida, de dia"),
  },
  /**
   * Link de venda do Ticket Sports. Ainda não recebido: enquanto for `null`,
   * o botão de compra fica desabilitado em vez de apontar para um lugar errado.
   */
  // TODO(confirmar): link de venda do Ticket Sports.
  ticketSportsUrl: null as string | null,
  ticketPendingLabel: "Venda pelo Ticket Sports em breve",
  cards: [
    {
      kicker: "Agora",
      title: "Contador + lote atual",
      text: "Contador e lote atual, com vagas restantes e botão por distância (21 km, 10 km e 5 km).",
    },
    {
      kicker: "Abaixo",
      title: "Tabela de lotes",
      text: "Pré-venda do Grupo VIP e Lotes 1 a 5, com preço por distância e a quantidade em que cada lote fecha. O que fechou aparece riscado: prova de que o preço sobe.",
    },
    {
      kicker: "Rodapé",
      title: "Regulamento e transferência",
      text: "Regulamento oficial, política de transferência até 30 dias antes, parcelamento e reserva de bloco para assessorias.",
    },
  ],
};

/* ---------------------------------------------------------------- Grupo VIP */

export const vip = {
  hero: {
    kicker: "Grupo VIP",
    title: ["Entrar no VIP não é desconto.", "É acesso."],
    slashWord: "acesso.",
    description:
      "Os seis benefícios, o que já valeu para quem entrou antes e o caminho para o grupo do Instagram em um clique.",
    media: img("/images/fotos/pelotao-noite.webp", 2048, 2048, "Pelotão vibrando numa rua de Curitiba à noite"),
  },
  cards: [
    {
      kicker: "Benefícios",
      title: "Seis, três valendo hoje",
      text: "Preço de pré-venda, fila própria no kit e série de número 001 a 500. Os outros três entram com a operação.",
    },
    {
      kicker: "Prova",
      title: "O que o grupo já viu",
      text: "A linha do tempo do que foi revelado primeiro no grupo: camiseta, data e arena.",
    },
    {
      kicker: "CTA",
      title: "Entrar no grupo",
      text: "Link direto para o grupo do Instagram, onde os avisos do evento saem primeiro.",
    },
  ],
  benefits: [
    {
      status: "Vale hoje",
      title: "Preço de pré-venda",
      text: "De 10 a 14/11, 5 e 10 km a R$ 139,90 e 21 km a R$ 199,90: R$ 30 a 40 abaixo do Lote 1 e o menor valor da edição.",
    },
    {
      status: "Vale hoje",
      title: "Fila própria na retirada de kit",
      text: "Balcão VIP na expo, sem fila, com horário estendido no sábado. Chega, pega, vai curtir a praça.",
    },
    {
      status: "Vale hoje",
      title: "Número de peito da série VIP",
      text: "Numeração 001 a 500 reservada ao grupo. Quem vê o número sabe que chegou primeiro.",
    },
    {
      status: "A confirmar com a operação",
      title: "Passagem de som",
      text: "Sorteio de vagas para assistir à passagem de som da banda no sábado, na arena. Custo zero, valor alto.",
    },
    {
      status: "A confirmar com a operação",
      title: "Playlist e bastidores",
      text: "As músicas do grupo tocam no pré-show. O grupo vê o percurso, a camiseta e a arena antes do anúncio público.",
    },
    {
      status: "A confirmar com a operação",
      title: "Troca sem taxa",
      text: "Mudou de ideia? Quem é VIP troca de distância ou transfere a inscrição sem taxa até 30 dias antes. Os outros pagam.",
    },
  ],
  revealed: {
    kicker: "O que o grupo já viu",
    title: "Antes do anúncio público.",
    slashWord: "público.",
    items: [
      { id: "camiseta", time: "3 a 5/11", title: "Votação da camiseta", description: "As finalistas do concurso foram para votação primeiro no grupo." },
      { id: "data", time: "Previsão", title: "Data da prova", description: "20 de junho de 2027, Curitiba, a data prevista para a corrida." },
      { id: "arena", time: "Croqui", title: "Arena e pontos de encontro", description: "O croqui da praça e a localização do palco, da chegada e da expo." },
    ],
  },
  cta: "Entrar no grupo do Instagram",
};

/* ---------------------------------------------------------------- Percurso */

export const percurso = {
  hero: {
    kicker: "Percurso",
    title: ["Três faixas.", "Um refrão."],
    slashWord: "refrão.",
    description:
      "Mapa, altimetria com km marcado, água, isotônico, som, torcida, banheiros e pontos de corte. O que o corredor estuda na semana da prova.",
    media: img("/images/fotos/faixa-de-pedestre.webp", 1800, 1800, "Corredor atravessando a faixa de pedestres, visto de cima"),
  },
  note: "Percurso 2027 em homologação. Abaixo, o perfil de referência; o mapa oficial sai com a homologação.",
  distances: [
    {
      id: "21k",
      distance: "21",
      unit: "km",
      name: "A faixa-título",
      start: "06h",
      limit: "3h",
      highlights: [
        "Água e isotônico a cada 3 km",
        "Aferição CBAt",
        "A subida longa do km 14 ao 17",
        "Pacers e tempo limite de 3h",
      ],
      note: "A subida longa do km 14 ao 17 é o solo de guitarra: é ali que a prova se decide.",
      /** Altitude relativa por km (0 a 1), só para o perfil ilustrativo. */
      profile: [0.1, 0.2, 0.25, 0.3, 0.35, 0.3, 0.45, 0.55, 0.6, 0.5, 0.4, 0.5, 0.7, 0.85, 0.95, 0.9, 0.7, 0.55, 0.45, 0.4, 0.35, 0.3, 0.2],
    },
    {
      id: "10k",
      distance: "10",
      unit: "km",
      name: "O lado B",
      start: "06h20",
      limit: null,
      highlights: [
        "Ondulado, com a subida mais forte perto do km 7",
        "Pelotões por ritmo",
        "Mapa real em homologação",
      ],
      note: "Pelotões por ritmo para correr em grupo, do início à chegada.",
      profile: [0.2, 0.3, 0.35, 0.45, 0.5, 0.6, 0.85, 0.95, 0.8, 0.6, 0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.3, 0.35, 0.3, 0.25],
    },
    {
      id: "5k",
      distance: "5",
      unit: "km",
      name: "A abertura",
      start: "06h40",
      limit: null,
      highlights: [
        "Plano, aberto a caminhada",
        "Para quem está começando ou vem com a família",
        "Mesma chegada, mesmo palco",
      ],
      note: "Mesma chegada, mesmo palco. Para quem está começando ou vem com a família.",
      profile: [0.3, 0.32, 0.3, 0.33, 0.31, 0.3, 0.32, 0.31, 0.3, 0.3],
    },
  ],
};

/* -------------------------------------------------------------- Domingo */

export const domingo = {
  hero: {
    kicker: "O domingo · cronograma",
    title: ["Setlist do", "domingo."],
    slashWord: "domingo.",
    description:
      "A programação completa: a expo de sábado, o dia da prova hora a hora e os acessos à arena. É a página para imprimir.",
    media: img("/images/fotos/pelotao-dia-largo.webp", 2048, 1152, "Pelotão de corredores de camisa preta numa avenida, de dia"),
  },
  saturday: {
    kicker: "Sábado · expo e retirada",
    title: "Retirada de kit na praça.",
    slashWord: "praça.",
    items: [
      {
        id: "manha",
        time: "9h · 11h · 15h",
        title: "Ônibus do hotel para a expo",
        description: "Saídas em horários fora do pico. Retirada de kit, expo das marcas e playlist da Meia.",
      },
      {
        id: "shakeout",
        time: "16h",
        title: "Shakeout run",
        description: "Corrida curta de aquecimento para quem quer sentir o percurso antes do domingo.",
      },
      {
        id: "vip",
        time: "Horário estendido",
        title: "Balcão VIP",
        description: "Fila própria para o Grupo VIP, com horário estendido no sábado.",
      },
    ],
  },
  sunday: {
    kicker: "Domingo · hora a hora",
    title: "O dia da prova.",
    slashWord: "prova.",
    items: [
      { id: "05h", time: "05h", title: "Portões", description: "Guarda-volumes, aquecimento coletivo com a playlist da Meia. A cidade dorme, a arena não." },
      { id: "06h", time: "06h", title: "Largadas", description: "21 km às 6h, 10 km às 6h20 e 5 km às 6h40. Perto de zero grau." },
      { id: "07h", time: "07h", title: "A cidade", description: "Pontos de som e de torcida no percurso. Cada bairro, uma faixa." },
      { id: "08h", time: "08h", title: "Chegada + show", description: "Medalha, poncho e o palco liga. Quem chega depois, pega o meio do show." },
      { id: "10h", time: "10h", title: "Bis", description: "Praça do palco, foto oficial, comércio do entorno aberto. O domingo continua." },
    ],
  },
  access: {
    kicker: "Como chegar",
    title: "Acesso à arena.",
    slashWord: "arena.",
    items: [
      { id: "publico", title: "Transporte público, app e estacionamento", description: "Acessos sinalizados, pontos de embarque e desembarque demarcados e estacionamento no entorno." },
      { id: "pcd", title: "PCD e desembarque", description: "Desembarque de app e PCD pela Rua Ernani Santiago." },
    ],
  },
};

/* -------------------------------------------------------------- Curitiba */

export const curitiba = {
  hero: {
    kicker: "Curitiba · hospitalidade",
    title: ["A cidade abre", "o show."],
    slashWord: "show.",
    description:
      "Roteiro de sexta a segunda, hotéis oficiais, transfer, o calendário do Inverno Curitiba e os parceiros que aceitam o número de peito.",
    media: img("/images/fotos/faixa-de-pedestre.webp", 1800, 1800, "Corredor atravessando a faixa de pedestres, visto de cima"),
  },
  cards: [
    {
      kicker: "Hotéis",
      title: "Oficiais, com café às 3h30",
      text: "Pacotes com late checkout, ônibus do aeroporto ao hotel, do hotel à expo (fora do pico) e à largada.",
    },
    {
      kicker: "Roteiro",
      title: "Sexta a segunda",
      text: "Expo, Jardim Botânico, Feiras de Inverno, Largo da Ordem, Serra Verde Express.",
    },
    {
      kicker: "Passaporte",
      title: "Número de peito",
      text: "Desconto no comércio parceiro mostrando o número. QR rastreado em cada ponto.",
    },
  ],
  itinerary: [
    {
      id: "sexta",
      number: "01",
      day: "Sexta · chegada",
      text: "Recepção no aeroporto Afonso Pena e ônibus de translado até o hotel oficial correspondente. Jantar: Restaurant Week (em 2026: 28/5 a 28/6).",
      tag: "Hotel",
    },
    {
      id: "sabado-manha",
      number: "02",
      day: "Sábado de manhã · expo",
      text: "Ônibus do hotel para a expo em horários fora do pico (9h, 11h e 15h). Retirada de kit, expo das marcas e shakeout run às 16h.",
      tag: "Arena",
    },
    {
      id: "sabado-tarde",
      number: "03",
      day: "Sábado à tarde · a cidade",
      text: "Jardim Botânico, Ópera de Arame, Museu Oscar Niemeyer, Feiras de Inverno nas praças Osório e Santos Andrade (em 2026: 11/6 a 18/7).",
      tag: "Turismo",
    },
    {
      id: "sabado-noite",
      number: "04",
      day: "Sábado à noite · carbo",
      text: "Massa em Santa Felicidade ou Rua da Música, cedo. Festival Bom Gourmet (em 2026: 18/6 a 4/8). Cama às 21h: amanhã é dia de show.",
      tag: "Gastronomia",
    },
    {
      id: "domingo",
      number: "05",
      day: "Domingo · a Meia",
      text: "Ônibus do hotel para a largada, saindo às 4h30. Largada às 6h, chegada na frente do palco, show às 10h. Depois: Feira do Largo da Ordem ou Domingo no Centro (edição de inverno em 2026: 21/6).",
      tag: "O dia",
    },
    {
      id: "segunda",
      number: "06",
      day: "Segunda · bis",
      text: "Late checkout, trem Serra Verde Express até Morretes, barreado e volta. Ou Mercado Municipal e voo à tarde.",
      tag: "Extra",
    },
  ],
  pills: [
    "Hotéis oficiais com café às 3h30 (a fechar)",
    "Ônibus aeroporto → hotel → expo → largada",
    "Bares e restaurantes parceiros com o número de peito",
    "Guia do turista Rockrunner em PDF",
  ],
  sourceNote:
    "Fonte: programa Inverno Curitiba 2026 (Prefeitura). O número de peito funciona como passaporte de desconto no comércio parceiro, com QR rastreado em cada ponto.",
  media: [
    img("/images/fotos/parque-vertical.webp", 1228, 2200, "Corredoras sorrindo num parque"),
    img("/images/fotos/roda-vertical-2.webp", 1228, 2200, "Corredores em roda vistos de baixo, contra o céu"),
    img("/images/fotos/megafone-vertical.webp", 896, 1200, "Corredor sorrindo com um megafone"),
  ] satisfies Media[],
};

/* ---------------------------------------------------------------- Imprensa */

export const imprensa = {
  hero: {
    kicker: "Imprensa & revista",
    title: ["A newsletter da", "Meia."],
    slashWord: "Meia.",
    description:
      "Releases, dados próprios da prova, bastidores da produção, kit de mídia e a revista da Thomé & Santos. Credenciamento pela página de contato, com a assessoria.",
    media: img("/images/fotos/pelotao-noite.webp", 2048, 2048, "Pelotão vibrando numa rua de Curitiba à noite"),
  },
  cards: [
    {
      kicker: "Releases",
      title: "Edição 2027",
      text: "Um por marco: abertura, banda, percurso, camiseta, D-30 e pós-prova.",
    },
    {
      kicker: "Dados",
      title: "A Meia em números",
      text: "O setor tem pouco dado público. Quem publica dado vira fonte.",
    },
    {
      kicker: "Revista",
      title: "Thomé & Santos",
      text: "A revista da Thomé & Santos entra aqui, em PDF e em página.",
    },
  ],
  stats: [
    { value: "5.000", label: "Atletas em 2026 · realizado" },
    { value: "10 mil", label: "Meta 2027 · não realizado" },
    { value: "3", label: "Distâncias, um refrão" },
    { value: "2016", label: "Desde quando a T&S faz a prova da cidade" },
  ],
  cta: "Falar com a assessoria",
};

/* ------------------------------------------------------------------- Arena */

/**
 * Pontos do croqui da arena. `x` e `y` são posições em % do croqui. Os
 * números são os do briefing; a posição é aproximada e vale só para o croqui.
 */
export const arena = {
  points: [
    { n: 9, label: "Praça de alimentação", x: 22, y: 12 },
    { n: 11, label: "Expo · kit (sáb.)", x: 40, y: 12 },
    { n: 4, label: "Funil · medalha, poncho", x: 60, y: 14 },
    { n: 10, label: "Espaço Kids", x: 36, y: 30 },
    { n: 8, label: "WC", x: 48, y: 30 },
    { n: 1, label: "Palco · show", x: 66, y: 40, highlight: true },
    { n: 2, label: "Área VIP", x: 66, y: 54 },
    { n: 3, label: "Linha de chegada", x: 80, y: 60 },
    { n: 12, label: "Arena livre · torcida", x: 52, y: 66 },
    { n: 7, label: "Guarda-volumes", x: 14, y: 74 },
    { n: 6, label: "Recovery", x: 30, y: 74 },
    { n: 5, label: "Área atletas", x: 42, y: 74 },
    { n: 13, label: "Assessorias", x: 56, y: 80 },
    { n: 14, label: "Acesso · app · PCD", x: 34, y: 93 },
  ],
  legend: [
    { n: 1, text: "Palco coberto, de frente para a avenida. Show das 8h às 10h." },
    { n: 2, text: "Área VIP entre o palco e a chegada." },
    { n: 3, text: "Linha de chegada na Av. Cândido de Abreu, em frente ao palco." },
    { n: 4, text: "Funil de chegada: medalha, poncho e água." },
    { n: 5, text: "Área dos atletas: aquecimento e banheiros exclusivos." },
    { n: 6, text: "Recovery e massagem (faculdade parceira, a fechar)." },
    { n: 7, text: "Guarda-volumes por etiqueta, filas por distância." },
    { n: 8, text: "Banheiros e água." },
    { n: 9, text: "Praça de alimentação no gramado norte." },
    { n: 10, text: "Espaço Kids monitorado." },
    { n: 11, text: "Expo das marcas e retirada de kit (sábado)." },
    { n: 12, text: "Arena livre para torcida e público." },
    { n: 13, text: "Ponto de encontro de assessorias." },
    { n: 14, text: "Acesso, desembarque de app e PCD pela Rua Ernani Santiago." },
  ],
  note: "Croqui ilustrativo · sujeito a mudanças · norte para cima.",
};
