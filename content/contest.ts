import type { Cta, Media, PlaceholderModal, PrizeItem, RuleItem, SectionIntro, TimelineItem } from "./types";

/**
 * Concurso de camisetas da Rock Edition 2027.
 *
 * URLs e datas que ainda não existem ficam como null e são preenchidas aqui,
 * quando definidas — a página já trata os dois estados ("em breve" vs. dado
 * real) sem mudança de código.
 */

/** Formulário de envio / regulamento completo / gabarito e logo do concurso. */
export const contestSubmissionUrl: string | null =
  "https://forms.gle/EtR7dAHiHS1g5GSM9";

/** Prazo final para envio das propostas. Ex.: "15 de dezembro de 2026". */
export const contestDeadline: string | null = "25 de outubro de 2026";

const instagramHandle = "@meiainternacionalcuritiba";
const instagramUrl = "https://instagram.com/meiainternacionalcuritiba";

export const contest = {
  hero: {
    kicker: "Concurso de Camisetas",
    title: "A sua arte pode ser a camiseta oficial.",
    description:
      "A Meia Maratona Internacional de Curitiba · Rock Edition 2027 abre, pela primeira vez, um concurso nacional de design para definir a estampa da camisa oficial da prova. A arte vencedora será a imagem oficial da camisa dos atletas da MMIC27, com o nome do autor assinando a criação. ",
  },

  challenge: {
    intro: {
      kicker: "O desafio",
      title: "Corrida, rock e Curitiba numa única estampa.",
      description:
        "O desafio proposto aos participantes é traduzir, em uma única estampa, o encontro entre três matérias-primas: a corrida, o rock e Curitiba.",
    } satisfies SectionIntro,
    quote:
      "Não queremos uma camiseta de banda nem uma camiseta de corrida genérica. Queremos a capa de disco de um domingo que só acontece uma vez por ano.",
    attribution: "Filippe Thome — diretor",
    media: {
      src: "/images/camisa-template.png",
      alt: "Proposta de estampa na camiseta técnica preta do concurso",
      width: 1536,
      height: 768,
      caption: "Imagem meramente ilustrativa.",
    } satisfies Media,
  },

  prizes: {
    intro: {
      kicker: "Premiação",
      title: "O vencedor assina a camisa da edição.",
      description:
        "Primeiro, segundo e terceiro lugar levam prêmio em dinheiro! E a arte do campeão será a camisa oficial entregue aos corredores.",
    } satisfies SectionIntro,
    items: [
      {
        id: "1st",
        place: "1º lugar",
        value: "R$ 3.000",
        label: "Arte impressa na camisa para o percurso de 21km, com o nome do autor",
        featured: true,
      },
      {
        id: "2nd",
        place: "2º lugar",
        value: "R$ 1.500",
        label: "Arte impressa na camisa para o percurso de 10km, com o nome do autor",
      },
      {
        id: "3rd",
        place: "3º lugar",
        value: "R$ 500",
        label: "Arte impressa na camisa para o percurso de 5km, com o nome do autor",
      },
    ] satisfies PrizeItem[],
  },

  rules: {
    intro: {
      kicker: "Como participar",
      title: "Regras e critérios.",
      description: "O concurso é aberto a designers e criativos de todo o país.",
    } satisfies SectionIntro,
    requirements: [
      {
        id: "aberto",
        title: "Aberto a todo o Brasil",
        description:
          "Designers de qualquer estado podem enviar propostas, sem taxa de participação.",
      },
      {
        id: "camisa-preta",
        title: "Camisa técnica preta",
        description:
          "As artes devem ser desenvolvidas sobre a camisa técnica preta, respeitando o gabarito oficial e as diretrizes técnicas de impressão.",
      },
      {
        id: "votacao",
        title: "Curadoria + voto do público",
        description:
          "A curadoria pré-seleciona as finalistas e a escolha final passa pela votação aberta no Instagram oficial da prova.",
      },
    ] satisfies RuleItem[],
    criteria: [
      {
        id: "clareza",
        title: "Clareza de conceito",
        description: "A estampa comunica a ideia sem depender de legenda.",
      },
      {
        id: "originalidade",
        title: "Originalidade da solução gráfica",
        description: "Um olhar autoral sobre o encontro entre corrida, rock e Curitiba.",
      },
      {
        id: "viabilidade",
        title: "Viabilidade de produção",
        description: "A arte funciona na impressão sobre a camisa técnica preta.",
      },
    ] satisfies RuleItem[],
    /** Linhas exibidas quando a URL/prazo reais ainda não foram publicados. */
    guideNote:
      "Regulamento completo, gabarito oficial e logo do evento disponíveis no site do concurso.",
  },

  timeline: {
    intro: {
      kicker: "Prazos",
      title: "Quatro passos até a camiseta oficial.",
      description:
        "Do envio da proposta ao anúncio, o caminho até a camisa da edição 2027.",
    } satisfies SectionIntro,
    items: [
      {
        id: "envio",
        time: "Inscrições",
        title: "Envio das propostas",
        description: "Propostas entregues pelo formulário do concurso, dentro do prazo final.",
      },
      {
        id: "curadoria",
        time: "Curadoria",
        title: "Seleção das finalistas",
        description:
          "A curadoria avalia clareza de conceito, originalidade da solução gráfica e viabilidade de produção.",
      },
      {
        id: "votacao",
        time: "Votação",
        title: "Voto do público",
        description: "As finalistas vão para votação aberta no canal exclusivo da prova no Instagram.",
      },
      {
        id: "anuncio",
        time: "2027",
        title: "Anúncio e impressão",
        description:
          "A arte vencedora é impressa na camisa entregue aos corredores, assinada pelo autor.",
      },
    ] satisfies TimelineItem[],
  },

  voting: {
    intro: {
      kicker: "Votação",
      title: "A escolha passa pelo público.",
      description:
        "Além da curadoria, a arte vencedora é definida em votação aberta no canal exclusivo da prova no Instagram.",
    } satisfies SectionIntro,
    handle: instagramHandle,
    instagramUrl,
    note: "Acompanhe o perfil para saber quando a votação abrir.",
  },

  race: {
    intro: {
      kicker: "Sobre a prova",
      title: "Uma corrida que termina em palco.",
      description:
        "A edição 2027 leva a assinatura Rock Edition e o mote “Curitiba no volume máximo”: a prova começa correndo e termina em festival, com show aberto ao público.",
    } satisfies SectionIntro,
    items: [
      {
        id: "distancias",
        title: "5 km · 10 km · 21 km",
        description: "Três percursos, uma chegada na arena.",
      },
      {
        id: "largada",
        title: "Local ainda a definir",
        description: "",
      },
      {
        id: "publico",
        title: "10 mil corredores",
        description: "Projeção da organização para a edição 2027.",
      },
      {
        id: "inscricoes",
        title: "Inscrições gerais",
        description: "Abertas a partir de 2026, com vagas limitadas.",
      },
    ] satisfies RuleItem[],
  },

  finalCta: {
    kicker: "Concurso de Camisetas",
    title: "Prepare a tela. A sua arte pode vestir a prova.",
    description:
      "Regulamento completo, gabarito oficial e logo do evento disponíveis no site do concurso. Envie a sua proposta antes do prazo final.",
  },
};

/**
 * CTA da página /concurso-de-camisetas.
 *
 * `action: "link"`: quando `contestSubmissionUrl` for preenchido, vira link
 * direto para o formulário. Enquanto a URL não existe, o `ContestButton`
 * cai no modal de "em breve" — a troca é só de conteúdo.
 */
export const contestCta = {
  label: "Quero participar do concurso",
  action: "link",
  href: contestSubmissionUrl ?? undefined,
  pendingLabel: "Abrindo…",
} satisfies Cta;

/** Copy do modal aberto pelo CTA do concurso enquanto não há formulário. */
export const contestModal = {
  kicker: "Concurso de Camisetas",
  title: "Em breve",
  description:
    "As inscrições do concurso de camisetas da Meia Maratona Internacional de Curitiba 2027 · Rock Edition ainda não abriram. O regulamento, o prazo de submissão e a abertura da votação serão divulgados juntos.",
  note: "Enquanto isso, acompanhe as redes do evento — o anúncio sai por lá primeiro.",
  dismissLabel: "Fechar",
} satisfies PlaceholderModal;