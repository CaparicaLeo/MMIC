import type { Media } from "../types";

/**
 * Copy da home, na ordem do briefing da edição 2027 (PDF "MMIC27_site_completo").
 * Cada bloco da home lê uma chave daqui. Os lotes e o contador estão em lotes.ts.
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

export const home = {
  hero: {
    kicker: "Rock Edition · 20 de junho de 2027 · Curitiba",
    /** Última palavra recebe a faixa vermelha inclinada. */
    title: ["A Meia", "Maratona", "de Curitiba."],
    slashWord: "Curitiba.",
    /** Linha fina e espaçada entre "Maratona" e "de Curitiba." (índice da linha de cima). */
    tagline: { text: "Internacional", after: 1 },
    lines: ["21,097 km pela cidade modelo.", "Show na linha de chegada."],
    brand: "Um evento Thomé & Santos.",
    background: img(
      "/images/fotos/pelotao-noite-largo.webp",
      2400,
      1340,
      "Pelotão vibrando numa rua de Curitiba à noite",
    ),
  },

  band: {
    first: "Curitiba no volume máximo.",
    second: "Curitiba para. Você corre. E o rock começa.",
  },

  about: {
    kicker: "O que você vai viver",
    title: "Isso não é uma corrida. É um show de 21 km.",
    slashWord: "21 km.",
    description:
      "Você não compra uma inscrição. Compra um fim de semana inteiro em que a cidade toca só pra você.",
    cards: [
      {
        tag: "21 km pela cidade",
        title: "21 km. Ruas fechadas. Manhã fria. Sem desculpa.",
        text: "Largada às 6h30 com a cidade ainda acordando e o bafo saindo pela boca. A rua é sua: Centro Cívico, avenidas fechadas, os cartões-postais passando do lado. Cada quilômetro é um verso. O último é o refrão, e ele toca na frente do palco.",
        media: img(
          "/images/fotos/corredor-porta-de-aco-vertical.webp",
          1228,
          2200,
          "Corredor em velocidade diante de uma porta de aço, no fim da tarde",
        ),
      },
      {
        tag: "Show na linha de chegada",
        title: "Você cruza o pórtico e cai na frente do palco.",
        text: "Medalha no peito, banda no palco e o melhor lugar do show é de quem correu. A partir das 7h30 a arena vira festival. Atração principal: em breve, pelos canais oficiais.",
        media: img(
          "/images/fotos/palco-show.webp",
          1856,
          1285,
          "Corredores atravessam o palco entre a banda e o público, no fim da tarde",
        ),
      },
    ],
    smallCards: [
      {
        title: "Curitiba no inverno, com o amplificador ligado",
        text: "A capital fria do país no fim de semana em que ela liga o som: Feiras do Largo da Ordem, Domingo no Centro, Restaurant Week, bar com lareira depois da prova. Quem vem de fora compra o fim de semana. Quem é daqui redescobre a cidade com número no peito.",
        media: img(
          "/images/fotos/pelotao-noite-pb-vertical.webp",
          1228,
          2200,
          "Pelotão à noite, em preto e branco",
        ),
      },
      {
        title: "Antes da prova, a expo",
        text: "A festa começa antes da largada. Na semana da prova, a Expo da Meia reúne marcas, playlist e a retirada do seu kit. Data, horário e endereço serão divulgados nos canais oficiais. No domingo, só corre.",
        media: img(
          "/images/fotos/megafone-grupo-vertical.webp",
          896,
          1200,
          "Turma com megafone num tubo de ônibus",
        ),
      },
    ],
    statement: {
      first:
        "Curitiba vai respirar a Meia. Outdoor na avenida, bar parceiro, hotel com a bandeira, vitrine do comércio.",
      red: "Um fim de semana em que a cidade inteira sabe que você vai correr.",
    },
  },

  lots: {
    kicker: "Inscrições · lotes por data e por vagas",
    title: "Foi dada a largada. Quem chega primeiro, paga menos.",
    slashWord: "menos.",
    description:
      "Aqui é igual show: cada lote tem um número de vagas, e quando acaba, o preço sobe. Não tem data, tem fila. Quem garante agora corre pelo menor preço que a Meia vai ter.",
    cta: "Garantir minha vaga",
  },

  kit: {
    kicker: "Kit do atleta",
    title: "O uniforme da Meia.",
    slashWord: "Meia.",
    caption: "Camisetas 2027 · 21 km, 10 km e 5 km",
    media: img(
      "/images/camisas-2027.webp",
      1350,
      998,
      "As três camisetas pretas da edição 2027, uma para cada distância: 21 km, 10 km e 5 km",
    ),
    items: [
      {
        title: "Três kits",
        text: "Básico: número de peito e chip eletrônico. Plus: soma a camiseta oficial e 2 ingressos para o show. Camarote: soma camarote, 2 ingressos para o camarote, ALOHA Recovery e retirada, guarda-volume, banheiro e lounge bar exclusivos (100 vagas).",
      },
      {
        title: "Camiseta oficial",
        text: "Nos kits Plus e Camarote. Técnica, preta, com tecnologia AERUN da Zarina e estampa definida por concurso público de design. Feminina baby look P/M/G; masculina P/M/G/GG/XG. O tamanho é escolhido na compra, sem troca na entrega.",
      },
      {
        title: "Medalha de participação",
        text: "Para todos que cruzarem a linha de chegada, nos 21, 10 e 5 km. Design da Rock Edition.",
      },
      {
        title: "Retirada do kit",
        text: "Na Expo da Meia, com documento original com foto, CPF e comprovante de pagamento. Data, horário e endereço a definir. Não há entrega no dia da prova.",
      },
    ],
  },

  /** Coleção Zarina com a tecnologia AERUN, que veste as camisetas oficiais 2027. */
  zarina: {
    kicker: "Nova coleção Zarina",
    product: "AERUN Performance Technology",
    title: "Desenvolvida para o movimento. Projetada para a performance.",
    slashWord: "performance.",
    lead: "Seu corpo foi feito para superar limites. Sua roupa precisa acompanhar.",
    paragraphs: [
      "A Zarina apresenta sua nova coleção de moda esportiva com AERUN PERFORMANCE TECHNOLOGY, uma inovação têxtil desenvolvida a partir das pesquisas de Nora Márcia dos Santos, que une tecnologia, conforto e liberdade de movimentos.",
      "Presente nas camisetas oficiais da Meia Maratona Internacional de Curitiba – Rock Edition 2027, a tecnologia AERUN foi projetada para favorecer a regulação térmica, a respirabilidade e a rápida evaporação do suor, além de incorporar recursos de proteção UV e controle de odores.",
      "Uma nova geração de vestuário esportivo que trabalha a favor do seu corpo, do primeiro ao último quilômetro.",
    ],
    manifesto: ["Menos distrações.", "Mais conforto.", "Máxima performance."],
    signature: "AERUN — Engineered for Motion. Designed for Performance.",
    signatureBy: "Uma tecnologia Zarina.",
    cta: "Em breve no site",
    /** Sem imagem (`null`), a seção mostra um quadro reservado no lugar da foto. */
    media: img(
      "/images/zarina-aerun-2.webp",
      1350,
      998,
      "Atleta de costas com a camiseta preta da MMIC 2027 ao lado do tecido AERUN em close, com as marcas AERUN Performance Technology e Zarina",
    ) as Media | null,
  },

  arena: {
    kicker: "A arena · praça Nossa Senhora de Salete",
    title: "Onde tudo acontece, antes de acontecer.",
    slashWord: "acontecer.",
    description:
      "Croqui sobre a planta real da praça (Centro Cívico, em frente ao Palácio Iguaçu). Largada e chegada na Av. Cândido de Abreu, palco de frente para a avenida, tudo o mais a pé. Sujeito a mudanças.",
  },

  percurso: {
    kicker: "Percurso · setlist",
    title: "Três faixas. Um refrão.",
    slashWord: "refrão.",
    description:
      "Cada distância com mapa, altimetria real, água, onde sobe e onde desce. Percursos definitivos da edição 2027.",
  },

  domingo: {
    kicker: "O domingo",
    title: "Setlist do domingo.",
    slashWord: "domingo.",
    photos: [
      {
        time: "05h",
        label: "A arena acorda",
        media: img(
          "/images/fotos/pelotao-dia.webp",
          1536,
          1536,
          "Pelotão de corredores de camisa preta numa avenida, de dia",
        ),
      },
      {
        time: "06h30",
        label: "A largada",
        media: img(
          "/images/fotos/corredora-dia-vertical.webp",
          1228,
          2200,
          "Corredora sorrindo à frente do pelotão",
        ),
      },
      {
        time: "07h30",
        label: "O show começa",
        media: img(
          "/images/fotos/palco-show.webp",
          1856,
          1285,
          "Corredores atravessam o palco entre a banda e o público, no fim da tarde",
        ),
      },
    ],
  },

  curitiba: {
    kicker: "Curitiba · roteiro Rockrunner",
    title: "Chegou em Curitiba? A cidade abre o show.",
    slashWord: "show.",
    description:
      "O fim de semana da Meia cai dentro do Inverno Curitiba, o programa de atrações da cidade. Calendário de 2026 como referência; 2027 a confirmar com a Prefeitura.",
    media: [
      img(
        "/images/fotos/parque-rua-vertical.webp",
        896,
        1200,
        "Trio correndo numa rua arborizada",
      ),
      img(
        "/images/fotos/roda-vertical.webp",
        1228,
        2200,
        "Corredores em roda vistos de baixo, contra o céu",
      ),
      img(
        "/images/fotos/dupla-centro-pb-vertical.webp",
        1476,
        2200,
        "Dupla correndo entre prédios do centro, em preto e branco",
      ),
    ] satisfies Media[],
  },

  concurso: {
    kicker: "Concurso da camiseta 2027",
    title: "A capa do disco é de quem corre.",
    slashWord: "corre.",
    description:
      "Concurso nacional encerrado. A campeã assina a camiseta dos 21 km, e as finalistas seguem em exibição na página do concurso.",
    cta: "Ver a campeã e as finalistas",
    media: img(
      "/images/finalistas/vitor-ferreira-martins/resultado.webp",
      1080,
      1350,
      "Arte vencedora do concurso de camisetas da Meia Maratona de Curitiba 2027",
    ),
  },

  stats: [
    { value: "7.500", label: "Atletas em 2026 · realizado" },
    { value: "10 mil", label: "Meta 2027 · não realizado" },
    { value: "3", label: "Distâncias, um refrão" },
    { value: "2016", label: "Desde quando a T&S faz a prova da cidade" },
  ],

  trio: [
    {
      kicker: "Marcas",
      title: "Sua marca no palco",
      text: "Plataforma de relacionamento, não mídia. 15 posições em 6 níveis.",
      href: "/marcas",
    },
    {
      kicker: "Imprensa & revista",
      title: "Newsletter da Meia",
      text: "Releases, dados, bastidores e a revista da Thomé & Santos.",
      href: "/imprensa",
    },
    {
      kicker: "Dúvidas",
      title: "FAQ do corredor",
      text: "Reescrito a partir das perguntas reais dos corredores.",
      href: "/contato#faq",
    },
  ],
};
