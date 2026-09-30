import type { Metadata } from "next";

import { BrandActivationsSection } from "@/components/brands/BrandActivationsSection";
import { BrandAudienceSection } from "@/components/brands/BrandAudienceSection";
import { BrandFinalCtaSection } from "@/components/brands/BrandFinalCtaSection";
import { BrandHeroSection } from "@/components/brands/BrandHeroSection";
import { BrandLeadSection } from "@/components/brands/BrandLeadSection";
import { BrandMethodSection } from "@/components/brands/BrandMethodSection";
import { BrandPillarsSection } from "@/components/brands/BrandPillarsSection";
import { BrandTiersSection } from "@/components/brands/BrandTiersSection";
import { FloatingBrandCta } from "@/components/brands/FloatingBrandCta";

export const metadata: Metadata = {
  title: "Marcas",
  description:
    "Seja uma marca oficial da Meia Maratona Internacional de Curitiba 2027: 5 km, 10 km e 21 km em Curitiba (PR), com show ao vivo na chegada. Cotas, ativações e contato comercial.",
  /* Canonical próprio: sem ele a rota herda o da home (app/layout.tsx)
     e se declara duplicata dela. Relativo, resolvido por metadataBase. */
  alternates: { canonical: "/marcas" },
};

/**
 * Página comercial /marcas.
 *
 * Só composição: cada bloco é uma seção, e todo o texto vem de
 * /content/brands.ts. A ordem segue a da página institucional — proposta
 * (experiência → método → cotas → público), contato e fecho — porque é
 * ela que leva a leitura do "aqui existe lugar para a sua marca" até o
 * formulário.
 */
export default function MarcasPage() {
  return (
    <>
      <BrandHeroSection />
      <BrandActivationsSection />
      <BrandMethodSection />
      <BrandTiersSection />
      <BrandAudienceSection />
      <BrandLeadSection />
      <BrandPillarsSection />
      <BrandFinalCtaSection />
      <FloatingBrandCta />
    </>
  );
}
