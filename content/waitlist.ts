import type { WaitlistContent } from "./types";

/**
 * Copy do modal de lista de avisos.
 *
 * É este formulário que transforma o clique do "Entrar na lista de avisos"
 * em lead no backend (POST /api/opportunities, com type "waitlist" e source
 * "meia-de-curitiba:<cta>"). O link do canal do Instagram só aparece depois
 * do envio, na tela de sucesso — a promessa do CTA continua honesta.
 */
export const waitlist: WaitlistContent = {
  kicker: "Lista de avisos",
  title: "Receba a data oficial antes de todo mundo.",
  description:
    "Preencha os dados abaixo para entrar na lista de avisos. Quando a data oficial e o primeiro lote de inscrições forem anunciados, você fica sabendo primeiro.",
  form: {
    email: {
      label: "E-mail",
      placeholder: "voce@email.com",
    },
    name: {
      label: "Nome",
      placeholder: "Seu nome completo",
    },
    whatsapp: {
      label: "WhatsApp",
      placeholder: "(41) 99999-9999",
    },
    instagram: {
      label: "Instagram",
      placeholder: "@seu.usuario",
    },
  },
  submit: {
    label: "Entrar na lista",
    pendingLabel: "Enviando…",
  },
  success: {
    title: "Você está na lista.",
    description:
      "Seus dados foram recebidos. Quando a data oficial e o primeiro lote saírem, o aviso chega primeiro para quem está na lista.",
    note: "Para não perder nada, acesse também o canal de avisos no Instagram — os anúncios saem por lá primeiro.",
    ctaLabel: "Acessar o canal de avisos",
    dismissLabel: "Fechar",
  },
  notices: {
    rateLimited: "Muitos envios em pouco tempo. Aguarde um instante e tente novamente.",
  },
  errors: {
    required: "Preencha este campo.",
    invalidEmail: "Digite um e-mail válido.",
    invalidPhone: "Digite um número de WhatsApp válido.",
    internal: "Não foi possível enviar neste momento. Tente novamente em alguns instantes.",
  },
};