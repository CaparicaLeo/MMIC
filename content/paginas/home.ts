import type { Media } from "../types";

/**
 * Copy da home, na ordem do briefing da edição 2027 (PDF "MMIC27_site_completo").
 * Cada bloco da home lê uma chave daqui. Os lotes e o contador estão em lotes.ts.
 */

const img = (src: string, width: number, height: number, alt: string): Media => ({
  src,
  alt,
  width,
  height,
});

export const home = {
  hero: {
    kicker: "Rock Edition · 20 de junho de 2027 (data prevista) · Curitiba",
    /** Última palavra recebe a faixa vermelha inclinada. */
    title: ["A Meia", "Maratona", "de Curitiba."],
    slashWord: "Curitiba.",
    lines: [
      "21,097 km pela cidade modelo.",
      "Show na linha de chegada.",
    ],
    brand: "Um evento Thomé & Santos.",
    background: img("/images/fotos/pelotao-noite-largo.webp", 2400, 1340, "Pelotão vibrando numa rua de Curitiba à noite"),
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
        title: "21 km. Ruas fechadas. Zero grau. Sem desculpa.",
        text: "Largada às 6h com a cidade ainda no escuro e o bafo saindo pela boca. A rua é sua: Centro Cívico, avenidas fechadas, os cartões-postais passando do lado. Cada quilômetro é um verso. O último é o refrão, e ele toca na frente do palco.",
        media: img("/images/fotos/corredor-porta-de-aco-vertical.webp", 1228, 2200, "Corredor em velocidade diante de uma porta de aço, no fim da tarde"),
      },
      {
        tag: "Show na linha de chegada",
        title: "Você cruza o pórtico e cai na frente do palco.",
        text: "Medalha no peito, poncho nas costas e a banda já está no palco. Das 8h às 10h a arena é festival, e quem acabou de correr fica na grade. Palco coberto: chuva não cancela, chuva vira cenário. Atração principal: anúncio em breve.",
        media: img("/images/fotos/palco-show.webp", 1856, 1285, "Corredores atravessam o palco entre a banda e o público, no fim da tarde"),
      },
    ],
    smallCards: [
      {
        title: "Curitiba no inverno, com o amplificador ligado",
        text: "A capital fria do país no fim de semana em que ela liga o som: Feiras do Largo da Ordem, Domingo no Centro, Restaurant Week, bar com lareira depois da prova. Quem vem de fora compra o fim de semana. Quem é daqui redescobre a cidade com número no peito.",
        media: img("/images/fotos/pelotao-noite-pb-vertical.webp", 1228, 2200, "Pelotão à noite, em preto e branco"),
      },
      {
        title: "Sábado já é dia de show: a expo",
        text: "Retirada de kit na praça, um dia antes, com a expo das marcas, a playlist da Meia tocando, shakeout run às 16h e a camiseta na mão. Você dorme sabendo que amanhã é o dia.",
        media: img("/images/fotos/megafone-grupo-vertical.webp", 896, 1200, "Turma com megafone num tubo de ônibus"),
      },
    ],
    statement: {
      first: "Curitiba vai respirar a Meia. Outdoor na avenida, bar parceiro, hotel com a bandeira, vitrine do comércio.",
      red: "Um fim de semana em que a cidade inteira sabe que você vai correr.",
    },
  },

  lots: {
    kicker: "Inscrições · lotes por quantidade",
    title: "Ingresso de show: o primeiro lote é sempre o mais barato.",
    slashWord: "barato.",
    description:
      "Aqui é igual show: o lote fecha quando enche, não quando o calendário manda. Quem decide cedo paga menos. O contador lá em cima mostra quantas vagas faltam no lote de agora.",
    cta: "Garantir minha vaga",
  },

  vip: {
    kicker: "Grupo VIP · quem está dentro passa na frente",
    title: "Entrar no VIP não é desconto. É acesso.",
    slashWord: "acesso.",
    description:
      "Seis coisas que só quem está no Grupo VIP tem. Três já valem hoje, três entram com a operação.",
    cta: "Ver o Grupo VIP",
  },

  kit: {
    kicker: "Kit do atleta",
    title: "O uniforme da banda.",
    slashWord: "banda.",
    caption: "Camiseta 2026 · a camisa 2027 sai do concurso",
    media: img("/images/camisa-template.png", 1536, 768, "Camisa técnica preta oficial da prova"),
    items: [
      {
        title: "Camiseta oficial",
        text: "Técnica, preta, estampa escolhida por concurso nacional (votação de 3 a 5/11, vencedora anunciada em 10/11). Feita pela Zarina, fábrica da Thomé & Santos. Detalhes de tecnologia e modelo ainda em confirmação.",
      },
      {
        title: "Medalha 21 · 10 · 5 km",
        text: "Design da Rock Edition.",
      },
      {
        title: "Poncho de chegada",
        text: "Para a chegada a zero grau. Preto para todos. Vermelho só para quem correu os 21 km.",
      },
      {
        title: "Número de peito com chip, sacola e hidratação",
        text: "Retirada na expo, sábado, na praça.",
      },
    ],
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
      "Cada distância com mapa, altimetria, água, onde sobe e onde desce. O percurso de 2027 está em homologação; o de 2026 segue como referência.",
  },

  domingo: {
    kicker: "O domingo",
    title: "Setlist do domingo.",
    slashWord: "domingo.",
    photos: [
      { time: "05h", label: "A arena acorda", media: img("/images/fotos/pelotao-dia.webp", 1536, 1536, "Pelotão de corredores de camisa preta numa avenida, de dia") },
      { time: "07h30", label: "As primeiras chegadas", media: img("/images/fotos/corredora-dia-vertical.webp", 1228, 2200, "Corredora sorrindo à frente do pelotão") },
      { time: "08h", label: "O show começa", media: img("/images/fotos/palco-show.webp", 1856, 1285, "Corredores atravessam o palco entre a banda e o público, no fim da tarde") },
    ],
  },

  curitiba: {
    kicker: "Curitiba · roteiro Rockrunner",
    title: "Chegou em Curitiba? A cidade abre o show.",
    slashWord: "show.",
    description:
      "O fim de semana da Meia cai dentro do Inverno Curitiba, o programa de atrações da cidade. Calendário de 2026 como referência; 2027 a confirmar com a Prefeitura.",
    media: [
      img("/images/fotos/parque-rua-vertical.webp", 896, 1200, "Trio correndo numa rua arborizada"),
      img("/images/fotos/roda-vertical.webp", 1228, 2200, "Corredores em roda vistos de baixo, contra o céu"),
      img("/images/fotos/dupla-centro-pb-vertical.webp", 1476, 2200, "Dupla correndo entre prédios do centro, em preto e branco"),
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
    { value: "5.000", label: "Atletas em 2026 · realizado" },
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
      text: "Reescrito a partir das perguntas reais do Grupo VIP.",
      href: "/contato#faq",
    },
  ],
};
