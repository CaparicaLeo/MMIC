import { event, seoDescription, siteUrl } from "@/content";

/**
 * Dados estruturados da entidade (schema.org/WebSite + Organization).
 *
 * Renderiza só na home, junto com o SportsEvent: é a declaração de "quem é
 * este site" para o buscador — nome, logo e perfis (`sameAs`) são o que
 * conecta o domínio ao evento nas respostas de busca e de IA. Perfis vazios
 * ficam de fora: `sameAs` genérico aponta para a entidade errada.
 *
 * `logo` é URL absoluta porque o JSON-LD é lido fora do contexto da página.
 */
export function WebsiteJsonLd() {
  const sameAs = [
    event.social.instagram,
    event.social.youtube,
    event.social.tiktok,
  ].filter((url): url is string => Boolean(url));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: event.name,
        alternateName: `${event.name} ${event.year}`,
        url: siteUrl,
        description: seoDescription,
        inLanguage: "pt-BR",
      },
      {
        "@type": "Organization",
        name: event.name,
        alternateName: `${event.name} ${event.year} · ${event.edition}`,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}${event.logo.src}`,
          width: event.logo.width,
          height: event.logo.height,
        },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
