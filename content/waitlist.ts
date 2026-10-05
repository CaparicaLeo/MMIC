import type { WaitlistContent } from "./types";
import { backstage } from "./backstage";

/**
 * Copy do modal do Backstage 21K.
 *
 * É este formulário que transforma o clique do CTA principal em lead no
 * backend (POST /api/opportunities, com `type` "waitlist" e `source`
 * "meia-de-curitiba:<bloco>"). O link do canal do Instagram só aparece depois do
 * envio, na tela de sucesso — a promessa do CTA continua honesta.
 */
export const waitlist: WaitlistContent = {
  kicker: backstage.name,
  title: "Entre no Backstage antes de todo mundo.",
  description:
    "O Backstage 21K é o grupo de pré-lançamento: é lá que a votação da camiseta, o line-up e a venda do primeiro lote saem primeiro. Preencha ao lado ou entre direto pelo Instagram.",
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
    label: backstage.ctaLabel,
    pendingLabel: "Enviando…",
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
    invalidEmail: "Digite um e-mail válido.",
    invalidPhone: "Digite um número de WhatsApp válido.",
    internal: "Não foi possível enviar neste momento. Tente novamente em alguns instantes.",
  },
};