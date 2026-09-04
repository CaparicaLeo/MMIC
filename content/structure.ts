import type { FeatureItem, SectionIntro } from "./types";

/**
 * Estrutura para o atleta — o bloco existe para reduzir fricção de quem
 * nunca correu o evento. Cada item vira um card no grid.
 */
export const structure = {
  intro: {
    kicker: "Estrutura para o atleta",
    title: "Você só precisa correr. O resto está montado.",
    description:
      "Nunca correu uma prova de rua? A arena foi desenhada para que a primeira vez seja simples.",
  } satisfies SectionIntro,
  items: [
    {
      id: "recovery",
      icon: "recovery",
      title: "Recovery Zone",
      description:
        "Alongamento assistido, massagem e hidratação logo depois da chegada, com equipe orientando quem termina.",
    },
    {
      id: "alimentacao",
      icon: "food",
      title: "Praça de alimentação",
      description:
        "Operação completa de food trucks e bebidas dentro da arena, com opções leves e vegetarianas.",
    },
    {
      id: "kids",
      icon: "kids",
      title: "Espaço Kids",
      description:
        "Área monitorada para as crianças enquanto a família corre — e para todo mundo curtir o show depois.",
    },
    {
      id: "guarda-volumes",
      icon: "bag",
      title: "Guarda-volumes",
      description:
        "Retirada e devolução por etiqueta numerada, com filas separadas por distância para não travar a saída.",
    },
    {
      id: "atletas",
      icon: "athlete",
      title: "Área de atletas",
      description:
        "Espaço reservado para aquecimento, banheiros exclusivos e apoio da equipe técnica antes da largada.",
    },
  ] satisfies FeatureItem[],
};
