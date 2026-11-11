import type { MetadataRoute } from "next";

import { contestFinalists, siteUrl } from "@/content";

/** Sitemap das rotas públicas da edição 2027. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/inscricao",
    "/grupo-vip",
    "/percurso",
    "/cronograma",
    "/curitiba",
    "/concurso-de-camisetas",
    "/concurso-de-camisetas/finalistas",
    ...contestFinalists.map((finalist) => `/concurso-de-camisetas/finalistas/${finalist.slug}`),
    "/marcas",
    "/imprensa",
    "/contato",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.6,
  }));
}
