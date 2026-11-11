import { ArenaMap } from "@/components/editorial/arena";
import { Block, SectionTitle, StatNumber } from "@/components/editorial/primitives";

/**
 * Duas seções novas da página /marcas, pedidas no briefing: a prova social
 * (números de 2026) e o croqui com os pontos onde cada cota aparece. As cotas
 * e os valores da página existente não mudam.
 *
 * Os números de 2026 são estimativas de circulação: o rótulo diz isso, para
 * que um número de público não seja lido como medição.
 */
export function BrandProofSection() {
  return (
    <Block id="prova" tone="darker">
      <SectionTitle
        kicker="Prova · 2026"
        title="Quem corre a Meia, em números."
        slashWord="números."
        description="Números da edição de 2026. O público é estimativa de circulação, não medição."
      />
      <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <StatNumber value="5.000" label="Atletas em circulação · estimativa" />
        <StatNumber value="40+" label="Perfil predominante de idade" />
        <StatNumber value="A e B" label="Classes sociais predominantes" />
        <StatNumber value="52%" label="Público feminino" />
      </div>
    </Block>
  );
}

/** Croqui com os pontos de exposição das marcas, destacados. */
export function BrandArenaSection() {
  return (
    <Block id="onde-aparece">
      <SectionTitle
        kicker="Onde a marca aparece"
        title="Cada cota tem um lugar na arena."
        slashWord="arena."
        description="Os pontos destacados são os que cabem a uma marca: palco, pórtico de chegada, expo, funil de medalha e espaço kids. Croqui sujeito a mudanças."
      />
      <div className="mt-14">
        <ArenaMap highlight={[1, 3, 4, 10, 11]} />
      </div>
    </Block>
  );
}
