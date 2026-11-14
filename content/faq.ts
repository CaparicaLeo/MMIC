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
        "A retirada acontece na Expo da Meia, antes da prova, com documento original com foto, CPF e comprovante de pagamento. Retirada por terceiros só com cópia dos documentos e carta de autorização assinada. Não há entrega de kit no dia do evento. Data, horário e endereço serão anunciados.",
    },
    {
      id: "inscricao",
      question: "Qual é a política de inscrição?",
      answer:
        "A inscrição é pessoal e nominal. O reembolso só vale em até 7 dias corridos da compra, pedido pelo e-mail contato@thomeesantos.com.br. A transferência de titularidade pode ser feita até 11/06/2027, às 23h59, com taxa de R$ 25 via Pix. Pessoas com 60 anos ou mais pagam 50%. Não há cupons de desconto.",
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
          "Sim: domingo, 20 de junho de 2027, em Curitiba. A largada da elite do 21 km é às 6h30, e as ondas de pace saem a partir das 6h32. As inscrições já estão abertas e vão até 11 de junho de 2027 ou até esgotarem as 10.000 vagas.",
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
        "São três: 5 km, 10 km e 21 km. Os 5 km são abertos inclusive para caminhada, o 10 km é a distância mais disputada e os 21 km são a prova principal, com percurso aferido e certificado pela CBAt. Todas terminam na mesma arena, no mesmo show.",
    },
    {
      id: "abertura-inscricoes",
      question: "Até quando vão as inscrições?",
      answer:
        "As inscrições da Meia Maratona Internacional de Curitiba 2027 estão abertas no Ticket Sports e vão até 11 de junho de 2027, ou até esgotarem as 10.000 vagas. Cada lote fecha na data final ou quando acabam as vagas dele.",
    },
    {
      id: "show",
      question: "Tem show na chegada?",
      answer:
        "Tem. A programação musical na arena começa às 7h30, com a linha de chegada de frente para o palco. O acesso à arena e ao show é exclusivo dos inscritos e credenciados. O Kit Plus inclui 2 ingressos para o show. A atração principal será anunciada pelos canais oficiais.",
    },
  ] satisfies FaqItem[],
};
