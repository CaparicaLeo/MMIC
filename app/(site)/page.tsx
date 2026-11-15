import { EventJsonLd } from "@/components/seo/EventJsonLd";
import { WebsiteJsonLd } from "@/components/seo/WebsiteJsonLd";
import {
  HomeAbout,
  HomeArena,
  HomeBand,
  HomeConcurso,
  HomeCuritiba,
  HomeDomingo,
  HomeHero,
  HomeKit,
  HomeLots,
  HomePercurso,
  HomeStats,
  HomeTrio,
  HomeZarina,
} from "@/components/home/HomeSections";

/**
 * Home da edição 2027, na ordem do briefing (PDF "MMIC27_site_completo"):
 * hero, faixa, o que você vai viver, lotes, kit, coleção Zarina, arena, percurso,
 * domingo, Curitiba, concurso, números e os três atalhos do rodapé.
 */
export default function HomePage() {
  return (
    <>
      {/* Dados estruturados só na home: as demais rotas não repetem as entidades. */}
      <EventJsonLd />
      <WebsiteJsonLd />

      <HomeHero />
      <HomeBand />
      <HomeAbout />
      <HomeLots />
      <HomeKit />
      <HomeZarina />
      <HomeArena />
      <HomePercurso />
      <HomeDomingo />
      <HomeCuritiba />
      <HomeConcurso />
      <HomeStats />
      <HomeTrio />
    </>
  );
}
