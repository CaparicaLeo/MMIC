import type { WaitlistContent } from "./types";
import { backstage } from "./backstage";

/**
 * Copy do modal do Backstage 21K.
 *
 * É este formulário que transforma o clique do CTA principal em lead no
 * backend (POST /api/opportunities, com `type` "waitlist" e `source`
 * "meia-de-curitiba:<bloco>"). O link do canal do Instagram fica disponível
 * antes e depois do envio — é uma entrada, não um prêmio.
 */
export const waitlist: WaitlistContent = {
  kicker: backstage.name,
  title: "Entre no Backstage antes de todo mundo.",
  description:
    "O Backstage 21K é o grupo de pré-lançamento: é lá que a votação da camiseta, o line-up e a venda do primeiro lote aparecem primeiro. Entre pelo Instagram ou deixe dois campos e a gente chama você.",

  channels: backstage.channels,

  form: {
    contact: {
      label: "WhatsApp ou e-mail",
      placeholder: "(41) 99999-9999 ou voce@email.com",
      hint: "Serve qualquer um dos dois. É por aqui que o aviso chega.",
    },
    name: {
      label: "Nome",
      placeholder: "Seu nome completo",
    },
    email: {
      label: "E-mail",
      placeholder: "voce@email.com",
    },
    submit: {
      label: backstage.ctaLabel,
      pendingLabel: "Enviando…",
    },
  },

  success: {
    title: "Você está no Backstage.",
    description:
      "Seus dados foram recebidos. A votação da camiseta, o line-up e o primeiro lote chegam primeiro aqui.",
    note: "Para não perder nada, entre também no canal do Instagram — os anúncios saem por lá primeiro.",
    ctaLabel: "Entrar pelo Instagram",
    dismissLabel: "Fechar",
  },

  notices: {
    rateLimited: "Muitos envios em pouco tempo. Aguarde um instante e tente novamente.",
  },

  errors: {
    required: "Preencha este campo.",
    invalidContact: "Digite um e-mail válido ou um número de WhatsApp com DDD.",
    invalidEmail: "Digite um e-mail válido.",
    internal: "Não foi possível enviar neste momento. Tente novamente em alguns instantes.",
  },
};