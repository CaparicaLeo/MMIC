import type { Media } from "../types";

/**
 * Copy das demais páginas da repaginação (PDF "MMIC27_site_completo").
 * Um objeto por rota; cada página lê só o seu.
 */

const img = (
  src: string,
  width: number,
  height: number,
  alt: string,
): Media => ({
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
      "Contador público, lote atual, valores de cada lote e o botão direto para o Ticket Sports. Regulamento e transferência logo abaixo, sem esconder.",
    media: img(
      "/images/fotos/pelotao-dia-largo.webp",
      2048,
      1152,
      "Pelotão de corredores de camisa preta numa avenida, de dia",
    ),
  },
  /**
   * Link de venda do Ticket Sports (evento 88966). `origem=novo-site` marca no
   * Ticket Sports as inscrições vindas daqui. Se voltar a `null`, o botão de
   * compra fica desabilitado em vez de apontar para um lugar errado.
   */
  ticketSportsUrl:
    "https://site.ticketsports.com.br/Inscricao/categoria.aspx?__idEvento=88966&origem=novo-site&lang=pt-BR" as
      string | null,
  ticketPendingLabel: "Venda pelo Ticket Sports em breve",
  cards: [
    {
      kicker: "Agora",
      title: "Contador + lote atual",
      text: "Contador de inscritos, lote atual e o botão direto para o Ticket Sports.",
    },
    {
      kicker: "Abaixo",
      title: "Tabela de lotes",
      text: "Lotes 1 a 5, com as vagas e os valores de cada um. O que encerrou aparece riscado: prova de que o preço sobe.",
    },
    {
      kicker: "Rodapé",
      title: "Regulamento e transferência",
      href: "/regulamento",
      text: "Regulamento oficial completo: transferência até 20/05/2027, com taxa de R$ 50,00, e condições para assessorias.",
    },
  ],
};

/* ---------------------------------------------------------------- Percurso */

export const percurso = {
  hero: {
    kicker: "Percurso",
    title: ["Três faixas.", "Um refrão."],
    slashWord: "refrão.",
    description:
      "Mapa, altimetria com km marcado, água, banheiros e pontos de corte. O que o corredor estuda na semana da prova.",
    media: img(
      "/images/fotos/faixa-de-pedestre.webp",
      1800,
      1800,
      "Corredor atravessando a faixa de pedestres, visto de cima",
    ),
  },
  distances: [
    {
      id: "21k" as const,
      distance: "21",
      unit: "km",
      /** Rotas no Strava e no MapMyRun (mapa navegável, exporta GPX). */
      stravaUrl: "https://www.strava.com/routes/3556342497964110110",
      mapMyRunUrl: "https://www.mapmyrun.com/routes/view/6799928532",
      name: "A faixa-título",
      start: "06h",
      limit: "3h",
      highlights: [
        "Elite às 6h; ondas de pace a partir das 6h02",
        "Água na arena, a cada 3 km (do 3 ao 18) e na chegada",
        "Percurso aferido e certificado pela CBAt",
        "A subida do km 17 ao 20, já no fim",
        "Pontos de corte: km 5 às 7h15, km 10 às 8h06, km 15 às 8h50",
        "A partir de 18 anos",
      ],
      note: "A subida do km 17 ao 20 é o solo de guitarra: vem no fim, quando as pernas já pesam. É ali que a prova se decide.",
      /** Trecho em vermelho na altimetria (sem ele, vale a maior subida do GPX). */
      highlightKm: [17, 20] as [number, number],
    },
    {
      id: "10k" as const,
      distance: "10",
      unit: "km",
      /** Rotas no Strava e no MapMyRun (mapa navegável, exporta GPX). */
      stravaUrl: "https://www.strava.com/routes/3556346442066786650",
      mapMyRunUrl: "https://www.mapmyrun.com/routes/view/6800162596",
      name: "O lado B",
      start: "06h02",
      limit: "2h",
      highlights: [
        "Ondulado, com a subida mais forte perto do km 8",
        "Largada em ondas de pace",
        "Mapa oficial no Strava e no MapMyRun",
        "A partir de 16 anos",
      ],
      note: "Largada em ondas de pace, para correr no seu ritmo do início à chegada.",
      highlightKm: undefined as [number, number] | undefined,
    },
    {
      id: "5k" as const,
      distance: "5",
      unit: "km",
      /** Rotas no Strava e no MapMyRun (mapa navegável, exporta GPX). */
      stravaUrl: "https://www.strava.com/routes/3556333941235583870",
      mapMyRunUrl: "https://www.mapmyrun.com/routes/view/6800155027",
      name: "A abertura",
      start: "06h02",
      limit: "2h",
      highlights: [
        "Aberto a caminhada, com uma subida curta perto do km 3,5",
        "Para quem está começando ou vem com a família",
        "Mesma chegada, mesmo palco",
        "A partir de 14 anos",
      ],
      note: "Mesma chegada, mesmo palco. Para quem está começando ou vem com a família.",
      highlightKm: [3.2, 3.9] as [number, number],
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
      "A programação completa: a expo, o dia da prova hora a hora e os acessos à arena. É a página para imprimir.",
    media: img(
      "/images/fotos/pelotao-dia-largo.webp",
      2048,
      1152,
      "Pelotão de corredores de camisa preta numa avenida, de dia",
    ),
  },
  saturday: {
    kicker: "Antes da prova · expo e retirada",
    title: "Expo e retirada de kit.",
    slashWord: "kit.",
    items: [
      {
        id: "entrega",
        time: "Data a definir",
        title: "Entrega na Expo da Meia",
        description:
          "Data, horário e endereço serão anunciados pelos canais oficiais. Não há entrega de kit no dia da prova nem depois dela.",
      },
      {
        id: "documentos",
        time: "O que levar",
        title: "Documentos",
        description:
          "Documento original com foto, CPF e comprovante de pagamento. A retirada é individual.",
      },
      {
        id: "terceiros",
        time: "Por outra pessoa",
        title: "Retirada por terceiros",
        description:
          "Só com cópia impressa da identificação do inscrito, documento com foto, comprovante de pagamento e carta de autorização assinada. Para 60+ com desconto, a retirada é pessoal.",
      },
    ],
  },
  sunday: {
    kicker: "Domingo · hora a hora",
    title: "O dia da prova.",
    slashWord: "prova.",
    items: [
      {
        id: "05h",
        time: "05h",
        title: "Portões",
        description:
          "Abertura do camarote, guarda-volumes gratuito e aquecimento coletivo com a playlist da Meia. A cidade dorme, a arena não.",
      },
      {
        id: "06h",
        time: "06h",
        title: "Largadas",
        description:
          "21 km elite às 6h, pessoas com deficiência às 6h01 e ondas de pace (21, 10 e 5 km) a partir das 6h02.",
      },
      {
        id: "07h",
        time: "07h",
        title: "A cidade",
        description:
          "Pontos de som e de torcida no percurso. Cada bairro, uma faixa.",
      },
      {
        id: "07h30",
        time: "07h30",
        title: "Chegada + show",
        description:
          "Medalha de participação e o palco liga: a programação musical começa às 7h30.",
      },
      {
        id: "09h",
        time: "09h",
        title: "Fim do tempo dos 21 km",
        description:
          "Encerramento do 21 km (tempo máximo de 3h). Os 10 e 5 km têm até 2h.",
      },
      {
        id: "09h30",
        time: "09h30",
        title: "Show principal",
        description:
          "Começa o show principal no palco da arena. Atração: em breve, pelos canais oficiais.",
      },
    ],
  },
  access: {
    kicker: "Como chegar",
    title: "Acesso à arena.",
    slashWord: "arena.",
    items: [
      {
        id: "publico",
        title: "Transporte público, app e estacionamento",
        description:
          "Acessos sinalizados, pontos de embarque e desembarque demarcados e estacionamento no entorno.",
      },
      {
        id: "pcd",
        title: "PCD e desembarque",
        description: "Desembarque de app e PCD pela Rua Ernani Santiago.",
      },
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
    media: img(
      "/images/fotos/faixa-de-pedestre.webp",
      1800,
      1800,
      "Corredor atravessando a faixa de pedestres, visto de cima",
    ),
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
      text: "Chegue, faça o check-in no hotel parceiro e sinta a cidade. À noite, Curitiba é gastronomia. Hotéis parceiros e condições especiais serão divulgados em breve.",
      tag: "Hotel",
    },
    {
      id: "sabado-manha",
      number: "02",
      day: "Sábado · expo",
      text: "Dia de Expo: retirada do kit, marcas parceiras e o clima de véspera que só quem está lá sente. Horário e endereço serão divulgados nos canais oficiais.",
      tag: "Arena",
    },
    {
      id: "sabado-tarde",
      number: "03",
      day: "Sábado à tarde · a cidade",
      text: "Jardim Botânico, Ópera de Arame, Museu Oscar Niemeyer, Feiras de Inverno nas praças Osório e Santos Andrade.",
      tag: "Turismo",
    },
    {
      id: "sabado-noite",
      number: "04",
      day: "Sábado à noite · carbo",
      text: "Massa em Santa Felicidade ou na Rua da Música, ou a Pizza T&S na sua porta. Cama às 21h: amanhã é dia de show.",
      tag: "Gastronomia",
    },
    {
      id: "domingo",
      number: "05",
      day: "Domingo · a Meia",
      text: "O dia. Largada às 6h na Praça Nossa Senhora da Salete, chegada na frente do palco, arena aberta desde as 7h30 e show principal a partir das 9h30. Depois, a cidade é sua. Você conquistou.",
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
    img(
      "/images/fotos/parque-vertical.webp",
      1228,
      2200,
      "Corredoras sorrindo num parque",
    ),
    img(
      "/images/fotos/roda-vertical-2.webp",
      1228,
      2200,
      "Corredores em roda vistos de baixo, contra o céu",
    ),
    img(
      "/images/fotos/megafone-vertical.webp",
      896,
      1200,
      "Corredor sorrindo com um megafone",
    ),
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
    media: img(
      "/images/fotos/pelotao-noite.webp",
      2048,
      2048,
      "Pelotão vibrando numa rua de Curitiba à noite",
    ),
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
    { value: "7.500", label: "Atletas em 2026 · realizado" },
    { value: "10 mil", label: "Meta · 2027" },
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
    { n: 4, label: "Funil · medalha e água", x: 60, y: 14 },
    { n: 10, label: "Espaço Kids", x: 36, y: 30 },
    { n: 8, label: "WC", x: 48, y: 30 },
    { n: 1, label: "Palco · show", x: 66, y: 40, highlight: true },
    { n: 2, label: "Camarote", x: 66, y: 54 },
    { n: 3, label: "Linha de chegada", x: 80, y: 60 },
    { n: 11, label: "Arena livre · torcida", x: 52, y: 66 },
    { n: 7, label: "Guarda-volumes", x: 14, y: 74 },
    { n: 6, label: "Recovery", x: 30, y: 74 },
    { n: 5, label: "Área atletas", x: 42, y: 74 },
    { n: 12, label: "Assessorias", x: 56, y: 80 },
    { n: 13, label: "Acesso · app · PCD", x: 34, y: 93 },
  ],
  legend: [
    {
      n: 1,
      text: "Palco coberto, de frente para a avenida. Programação musical a partir das 7h30.",
    },
    { n: 2, text: "Camarote do Kit Camarote, entre o palco e a chegada. Acesso a partir das 5h." },
    {
      n: 3,
      text: "Linha de chegada na Av. Cândido de Abreu, em frente ao palco.",
    },
    { n: 4, text: "Funil de chegada: medalha de participação e água." },
    { n: 5, text: "Área dos atletas: aquecimento e banheiros exclusivos." },
    { n: 6, text: "Recovery e massagem (faculdade parceira, a fechar)." },
    { n: 7, text: "Guarda-volumes gratuito, em saco identificado com o número de peito." },
    { n: 8, text: "Banheiros e água." },
    { n: 9, text: "Praça de alimentação no gramado norte." },
    { n: 10, text: "Espaço Kids monitorado." },
    { n: 11, text: "Arena livre para torcida e público." },
    { n: 12, text: "Ponto de encontro de assessorias." },
    {
      n: 13,
      text: "Acesso, desembarque de app e PCD pela Rua Ernani Santiago.",
    },
  ],
  note: "Croqui ilustrativo · sujeito a mudanças · norte para cima.",
};
