import type { FaqItem, SectionIntro } from "./types";

export const faq = {
  intro: {
    kicker: "Dúvidas",
    title: "Antes de você se inscrever",
  } satisfies SectionIntro,
  items: [
    {
      id: "local",
      question: "Onde acontece a prova?",
      answer:
        "A largada e a chegada ficam na mesma arena, em Curitiba (PR), com o percurso passando pelos principais eixos da cidade. O endereço exato da arena e o mapa oficial do percurso serão divulgados junto com a abertura das inscrições.",
    },
    {
      id: "como-chegar",
      question: "Como chegar no dia?",
      answer:
        "A arena fica em região atendida por transporte público e com acessos sinalizados para quem vai de carro ou aplicativo. Haverá pontos de embarque e desembarque demarcados e orientação de estacionamento no entorno. O guia completo de acessos entra na página de cronograma.",
    },
    {
      id: "kit",
      question: "Como funciona a retirada de kit?",
      answer:
        "A retirada acontece em dias específicos antes da prova, em ponto único na cidade, mediante documento com foto e comprovante de inscrição. Não há entrega de kit no dia do evento. Datas, endereço e horários serão anunciados com antecedência.",
    },
    {
      id: "inscricao",
      question: "Qual é a política de inscrição?",
      answer:
        "A inscrição é individual e nominal, com lotes por ordem de compra. Transferência de titularidade e troca de distância seguem prazos definidos em regulamento, publicado na abertura das vendas. Cancelamentos seguem a política vigente informada no ato da compra.",
    },
    {
      id: "data",
      question: "Já existe data confirmada?",
      answer:
        "Ainda não. A edição 2027 está confirmada, e a data oficial será anunciada em breve, junto com a abertura das inscrições. Acompanhe as redes do evento para não perder o primeiro lote.",
    },
    {
      id: "iniciante",
      question: "Nunca corri uma prova de rua. Dá para participar?",
      answer:
        "Dá. Os 5 km são abertos inclusive para caminhada, e a estrutura da arena, com guarda-volumes, hidratação, Recovery Zone e Espaço Kids, foi pensada para quem está estreando e vem com a família.",
    },
  ] satisfies FaqItem[],
};
