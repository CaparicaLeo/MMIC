import { contestFinalists, type ContestFinalist } from "./contestFinalists";
import type { Media, SectionIntro } from "./types";

/**
 * Resultado do concurso de camisetas (/concurso-de-camisetas/vencedores).
 *
 * A página acompanha o concurso por fases, e cada fase é só um campo a mais
 * preenchido aqui:
 *
 *  - `curadoria`: prazo encerrado, ninguém escolhido. A página mostra em que
 *    passo o concurso está e aponta o Instagram.
 *  - `votacao`: a grade das finalistas (de content/contestFinalists.ts)
 *    aparece com o CTA de voto.
 *  - `resultado`: `winners` preenchido. Campeão, pódio e finalistas.
 *
 * Nenhum nome entra aqui antes do anúncio oficial no Instagram: a página é
 * pública e indexável, e um nome publicado antes da hora não volta atrás.
 */
export type ContestPhase = "curadoria" | "votacao" | "resultado";

export type ContestPlaceId = "1st" | "2nd" | "3rd";

/**
 * Colocação de uma finalista. Só aponta para ela pelo `slug`: nome, cidade e
 * imagens vêm de content/contestFinalists.ts, para não existirem em dois
 * lugares.
 */
export type ContestWinner = {
  /** `slug` de uma das finalistas. */
  slug: string;
  /** Mesmo `id` de `contest.prizes.items` — valor e percurso vêm de lá. */
  placeId: ContestPlaceId;
  /**
   * Post do anúncio (1080×1350, 4:5): a camisa com a medalha e o crédito já
   * na arte. Caminho a partir de `public`.
   */
  post: string;
};

/** Finalista com a colocação: o que as seções do resultado recebem. */
export type RankedFinalist = ContestFinalist & { placeId: ContestPlaceId; post: string };

export const contestResults = {
  /** Concurso encerrado: votação fechada e vencedoras anunciadas. */
  phase: "resultado" as ContestPhase,

  /** Data do anúncio por extenso. Ex.: "12 de dezembro de 2026". */
  announcedAt: null as string | null,

  winners: [
    {
      slug: "vitor-ferreira-martins",
      placeId: "1st",
      post: "/images/finalistas/vitor-ferreira-martins/resultado.webp",
    },
    { slug: "alan-barg", placeId: "2nd", post: "/images/finalistas/alan-barg/resultado.webp" },
    {
      slug: "melanie-kozlowski",
      placeId: "3rd",
      post: "/images/finalistas/melanie-kozlowski/resultado.webp",
    },
  ] as ContestWinner[],

  /**
   * Botão em /concurso-de-camisetas. Até a votação terminar ele leva às
   * finalistas (onde está o passo a passo); com o resultado, a esta página.
   * O rótulo segue a fase para prometer só o que o destino já tem.
   */
  link: {
    href: {
      curadoria: "/concurso-de-camisetas/finalistas",
      votacao: "/concurso-de-camisetas/finalistas",
      resultado: "/concurso-de-camisetas/vencedores",
    } satisfies Record<ContestPhase, string>,
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

/**
 * Vencedores com os dados da finalista, do 1º ao 3º. `winners` só guarda slug
 * e colocação; um slug que não existe derruba o build, em vez de sumir um
 * vencedor da página.
 */
export function getRankedWinners(): RankedFinalist[] {
  return contestResults.winners
    .map((winner) => {
      const finalist = contestFinalists.find((entry) => entry.slug === winner.slug);
      if (!finalist) {
        throw new Error(`contestResults.winners: nenhuma finalista com o slug "${winner.slug}".`);
      }
      return { ...finalist, ...winner };
    })
    .sort((a, b) => a.placeId.localeCompare(b.placeId));
}
