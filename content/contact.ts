import type { ContactPage } from "./types";

/**
 * Conteúdo da página de contato e do formulário que envia para
 * `POST /api/opportunities`. Os textos vivem aqui, longe do JSX — mesma
 * convenção de /content usada nas outras rotas.
 */
export const contact: ContactPage = {
  intro: {
    kicker: "Contato",
    title: "Fale com a equipe da Meia Maratona de Curitiba.",
    description:
      "Dúvidas sobre a prova, negócios e parcerias ou propostas de imprensa: escolha o assunto e deixe sua mensagem. A equipe responde pelo e-mail informado.",
  },

  form: {
    email: {
      label: "E-mail",
      placeholder: "voce@email.com",
    },
    name: {
      label: "Nome",
      placeholder: "Seu nome",
    },
    phone: {
      label: "Telefone",
      placeholder: "(41) 99999-9999",
    },
    age: {
      label: "Idade",
      placeholder: "Ex.: 25-34",
    },
    gender: {
      label: "Gênero",
      placeholder: "Como você se identifica",
    },
    message: {
      label: "Mensagem",
      placeholder: "Sua mensagem para a equipe…",
    },
    type: {
      label: "Assunto",
      options: [
        { value: "duvida", label: "Dúvida" },
        { value: "negocios", label: "Negócios" },
        { value: "inscricao", label: "Inscrição" },
        { value: "newsletter", label: "Newsletter" },
      ],
    },
    submit: {
      label: "Enviar mensagem",
      pendingLabel: "Enviando…",
    },
    success: {
      title: "Mensagem recebida.",
      description: "A equipe da Meia Maratona de Curitiba vai responder pelo seu e-mail.",
    },
  },

  notices: {
    received: "Recebemos sua mensagem. Em breve você recebe a resposta no e-mail informado.",
    rateLimited: "Muitas mensagens em pouco tempo. Aguarde um instante e tente novamente.",
  },

  errors: {
    required: "Preencha este campo.",
    invalidEmail: "Digite um e-mail válido.",
    invalidPhone: "Telefone inválido — use apenas números, espaços, parênteses e hífen.",
    internal: "Não foi possível enviar neste momento. Tente novamente em alguns instantes.",
    auth: "Não foi possível enviar neste momento. Tente mais tarde.",
    tooLarge: "Este campo excede o tamanho máximo permitido.",
  },
};