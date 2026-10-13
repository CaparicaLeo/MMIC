import type { MetadataRoute } from "next";

import { siteUrl } from "@/content";

/**
 * Bots de IA com allow explícito.
 *
 * O curinga `*` já permitiria a leitura — a lista existe para documentar a
 * intenção: o site QUER ser lido por motores generativos (GEO), que é onde
 * acontecem as respostas do tipo "meia maratona em Curitiba". Se um dia a
 * política mudar para bloquear, é tirando o bot daqui que se faz.
 */
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Bytespider",
  "Applebot-Extended",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // `/api/` é só POST de formulário — não tem nada para indexar, e
      // deixá-la acessível a crawler convida a varredura do endpoint.
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/api/",
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
