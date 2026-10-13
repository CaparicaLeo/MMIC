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
        // Resposta trocada em §1: "será anunciada em breve" era a quinta
        // ocorrência do mesmo aviso sem data no site. A pergunta segue de pé —
        // a data da prova ainda não está fechada — mas a resposta passa a
        // dizer o que está confirmado (a abertura das inscrições) em vez de
        // repetir que nada está.
        answer:
          "A data da prova ainda não foi anunciada. O que já está confirmado é a abertura das inscrições, em 15 de novembro de 2026. Quem entra no grupo VIP recebe o primeiro lote antes da venda aberta. Para saber a data e os horários assim que saírem, entre no grupo do Instagram (@meiainternacionalcuritiba).",
      },
    {
      id: "iniciante",
      question: "Nunca corri uma prova de rua. Dá para participar?",
      answer:
        "Dá. Os 5 km são abertos inclusive para caminhada, e a estrutura da arena, com guarda-volumes, hidratação, Recovery Zone e Espaço Kids, foi pensada para quem está estreando e vem com a família.",
    },
    /*
      Três perguntas novas para as buscas por "meia maratona" + "Curitiba":
      distâncias, abertura da venda e show — os três assuntos que a pessoa
      pesquisa antes de decidir. Só fato confirmado em cada resposta; o que
      não está fechado fica de fora ou com TODO.
    */
    {
      id: "distancias",
      question: "Quais distâncias tem na Meia Maratona de Curitiba?",
      answer:
        "São três: 5 km, 10 km e 21 km. Os 5 km são abertos inclusive para caminhada, o 10 km é a distância mais disputada e os 21 km são a prova principal, com percurso homologado. Todas terminam na mesma arena, no mesmo show.",
    },
    {
      id: "abertura-inscricoes",
      question: "Quando abrem as inscrições?",
      answer:
        "As inscrições da Meia Maratona Internacional de Curitiba 2027 abrem em 15 de novembro de 2026. Quem está no grupo VIP compra 24 horas antes de todo mundo.",
    },
    {
      id: "show",
      question: "Tem show na chegada?",
      answer:
        "Tem. Quando o último pelotão cruza a chegada, a arena troca de função e a linha de chegada vira a frente do palco, com show ao vivo para corredores e público. A atração principal ainda é uma surpresa.",
    },
  ] satisfies FaqItem[],
};
