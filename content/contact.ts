import type { ContactPage } from "./types";

/**
 * Conteúdo da página de contato e do formulário que envia para
 * `POST /api/opportunities`. Os textos vivem aqui, longe do JSX — mesma
 * convenção de /content usada nas outras rotas.
 */
export const contact: ContactPage = {
  intro: {
    kicker: "Contato",
    title: "Fala com a produção.",
    description:
      "Escolha o assunto e vá direto ao caminho certo. Dúvida de corredor passa pelo FAQ antes do formulário; negócios vão para Marcas; imprensa e assessorias têm caminho próprio. Resposta em 48 h, pelo e-mail informado.",
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
        { value: "duvida", label: "Dúvida de corredor" },
        { value: "negocios", label: "Marcas e negócios" },
        { value: "inscricao", label: "Inscrição" },
        { value: "reserva-bloco", label: "Reserva de bloco (assessoria)" },
        { value: "imprensa", label: "Imprensa" },
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