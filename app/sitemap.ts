import type { MetadataRoute } from "next";

import { siteUrl } from "@/content";

/**
 * Sitemap. Já inclui as rotas futuras — elas existem como páginas de
 * "em breve" e devem ser indexáveis desde o lançamento.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/inscricao", "/cronograma", "/patrocinadores", "/imprensa"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.6,
  }));
}
