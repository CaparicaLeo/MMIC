import { EventJsonLd } from "@/components/seo/EventJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { WebsiteJsonLd } from "@/components/seo/WebsiteJsonLd";
import { ConceptSection } from "@/components/sections/ConceptSection";
import { DaySection } from "@/components/sections/DaySection";
import { DistancesSection } from "@/components/sections/DistancesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ShowSection } from "@/components/sections/ShowSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { StructureSection } from "@/components/sections/StructureSection";

/**
 * Landing page de lançamento.
 *
 * A ordem das seções é a do briefing. Cada uma é autocontida e lê o próprio
 * conteúdo de /content — reordenar ou reaproveitar em outra página é mover
 * uma linha.
 */
export default function HomePage() {
  return (
    <>
      {/*
        Dados estruturados só aqui: descrevem o evento (SportsEvent), o site
        (WebSite + Organization) e o FAQ da página — repetir esses blocos nas
        rotas de "em breve" criaria declarações concorrentes da mesma
        entidade.
      */}
      <EventJsonLd />
      <WebsiteJsonLd />
      <FaqJsonLd />

      <HeroSection />
      <ConceptSection />
      <DaySection />
      <DistancesSection />
      <StructureSection />
      <ShowSection />
      <StatsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
