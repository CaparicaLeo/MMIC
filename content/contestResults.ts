import type { Media, SectionIntro } from "./types";

/**
 * Resultado do concurso de camisetas (/concurso-de-camisetas/vencedores).
 *
 * A página acompanha o concurso por fases, e cada fase é só um campo a mais
 * preenchido aqui:
 *
 *  - `curadoria`: prazo encerrado, ninguém escolhido. A página mostra em que
 *    passo o concurso está e aponta o Instagram.
 *  - `votacao`: `finalists` preenchido. A grade das finalistas aparece com o
 *    CTA de voto.
 *  - `resultado`: `winners` preenchido. Campeão, pódio e finalistas.
 *
 * Nenhum nome entra aqui antes do anúncio oficial no Instagram: a página é
 * pública e indexável, e um nome publicado antes da hora não volta atrás.
 */
export type ContestPhase = "curadoria" | "votacao" | "resultado";

/** Proposta finalista. Os vencedores são finalistas com colocação. */
export type ContestEntry = {
  id: string;
  /** Nome como o autor quer ser creditado — é o que vai impresso na camisa. */
  author: string;
  /** Ex.: "Curitiba (PR)" */
  location: string;
  /** Nome que o autor deu à arte. */
  title: string;
  /** Uma ou duas frases do autor sobre a ideia. Vira citação no destaque. */
  statement?: string;
  /** Perfil do autor, sem @ (ex.: "fulano.design"). */
  instagram?: string;
  /** A arte chapada, sobre fundo preto. */
  art: Media;
  /** A arte aplicada na camisa técnica preta. Sem ela, só a arte aparece. */
  mockup?: Media;
};

export type ContestWinner = ContestEntry & {
  /** Mesmo `id` de `contest.prizes.items` — valor e percurso vêm de lá. */
  placeId: "1st" | "2nd" | "3rd";
};

export const contestResults = {
  // TODO(confirmar): avançar a fase conforme a produção anunciar.
  phase: "curadoria" as ContestPhase,

  /** Data do anúncio por extenso. Ex.: "12 de dezembro de 2026". */
  announcedAt: null as string | null,

  finalists: [] as ContestEntry[],
  winners: [] as ContestWinner[],

  /**
   * Botão em /concurso-de-camisetas que leva a esta página. O rótulo segue a
   * fase para prometer só o que a página já tem.
   */
  link: {
    href: "/concurso-de-camisetas/vencedores",
    label: {
      curadoria: "Acompanhar o resultado",
      votacao: "Ver as finalistas",
      resultado: "Ver os vencedores",
    } satisfies Record<ContestPhase, string>,
  },

  hero: {
    kicker: "Concurso de Camisetas · Resultado",
    /** Mesma foto do hero da home e do concurso: corredores de camisa preta no palco. */
    background: {
      src: "/images/hero-palco.jpg",
      alt: "Corredores atravessam o palco entre a banda tocando e o público, no fim da tarde",
      width: 2560,
      height: 1429,
    } satisfies Media,
    title: {
      curadoria: ["As propostas chegaram.", "Agora é a curadoria."],
      votacao: ["As finalistas estão", "na mão do público."],
      resultado: ["Essas são as camisas", "da Rock Edition."],
    } satisfies Record<ContestPhase, [string, string]>,
    description: {
      curadoria:
        "O prazo de envio terminou. A curadoria está avaliando cada proposta por clareza de conceito, originalidade e viabilidade de produção. Depois, as finalistas vão para votação no nosso Instagram oficial, e qualquer pessoa pode votar.",
      votacao:
        "A curadoria escolheu as finalistas. Agora a palavra é do público: qualquer pessoa vota pelo nosso Instagram oficial.",
      resultado:
        "Curadoria e voto do público escolheram as três artes que vão para o peito dos corredores da Meia Maratona Internacional de Curitiba 2027.",
    } satisfies Record<ContestPhase, string>,
  },

  /**
   * Como votar. Aparece enquanto não há resultado: qualquer pessoa vota pelo
   * Instagram oficial, e o caminho para não perder a abertura da votação é o
   * grupo VIP — por isso o CTA abre o grupo, não o perfil.
   */
  voting: {
    intro: {
      kicker: "Votação aberta a todos",
      title: "Qualquer pessoa vota.",
      description:
        "Não precisa estar inscrito na prova nem ter enviado arte: qualquer um participa da votação das finalistas pelo nosso Instagram oficial. Entre no grupo VIP e receba o aviso assim que a votação abrir.",
    } satisfies SectionIntro,
    /** Ilustra o que está em jogo: a camisa técnica preta da prova. */
    media: {
      src: "/images/camisa-template.png",
      alt: "Camisa técnica preta oficial que vai receber a arte vencedora",
      width: 1536,
      height: 768,
      caption: "Imagem meramente ilustrativa.",
    } satisfies Media,
  },

  champion: {
    kicker: "Campeão",
    /** Rótulo da camisa que a arte do 1º lugar estampa. */
    shirtLabel: "Camisa oficial dos 21 km",
  },

  podium: {
    intro: {
      kicker: "Pódio",
      title: "Uma arte para cada distância.",
      description:
        "O 2º e o 3º lugar também vestem a prova: as artes vão para as camisas dos 10 km e dos 5 km, assinadas pelos autores.",
    } satisfies SectionIntro,
  },

  finalistsSection: {
    intro: {
      votacao: {
        kicker: "Finalistas",
        title: "Escolha a sua.",
        description:
          "Estas são as artes que passaram pela curadoria. Qualquer pessoa pode votar pelo nosso Instagram oficial. Entre no grupo VIP para não perder o prazo.",
      },
      resultado: {
        kicker: "Finalistas",
        title: "Quem chegou até a final.",
        description:
          "As artes que passaram pela curadoria e foram para o voto do público.",
      },
    } satisfies Record<Exclude<ContestPhase, "curadoria">, SectionIntro>,
  },

  finalCta: {
    kicker: "Rock Edition 2027",
    title: ["A arte está pronta.", "Falta você vestir."],
    description:
      "A camisa do concurso faz parte do kit dos atletas inscritos. Entre no grupo VIP para saber antes de todo mundo quando as inscrições abrirem.",
  },
};
