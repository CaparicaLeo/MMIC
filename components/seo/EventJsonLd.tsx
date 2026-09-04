import { event, hero, seoDescription, siteUrl } from "@/content";

/**
 * Dados estruturados do evento (schema.org/SportsEvent).
 *
 * Renderiza só na home: o JSON-LD descreve O evento, e repetir o mesmo bloco
 * nas rotas de "em breve" criaria várias declarações concorrentes da mesma
 * entidade.
 *
 * `startDate` é condicional de propósito. A data ainda não foi definida
 * (`event.date` é null) e schema.org não aceita data vazia — preencher com um
 * palpite marcaria o evento com uma data errada para o buscador, que é pior do
 * que não ter o campo. Quando `event.date` receber o ISO 8601, o campo passa a
 * sair sozinho e o resultado fica elegível a rich result de evento.
 */
export function EventJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${event.name} ${event.year} · ${event.edition}`,
    description: seoDescription,
    url: siteUrl,
    // Absoluta: o JSON-LD é lido fora do contexto da página, então caminho
    // relativo não resolve.
    image: [`${siteUrl}${hero.background.src}`],
    sport: "Corrida de rua",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(event.date ? { startDate: event.date } : {}),
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
        addressRegion: event.state,
        addressCountry: "BR",
      },
    },
    organizer: {
      "@type": "Organization",
      name: event.name,
      url: siteUrl,
    },
    subEvent: event.distances.map((distance) => ({
      "@type": "SportsEvent",
      name: `${event.name} ${event.year} · ${distance}`,
      sport: "Corrida de rua",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // O conteúdo é nosso, não entrada de usuário, mas escapar "<" impede
        // que um texto futuro com "</script>" encerre a tag antes da hora.
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
