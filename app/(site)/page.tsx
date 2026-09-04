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
