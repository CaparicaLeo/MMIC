import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { event, hero, siteUrl } from "@/content";

/**
 * OG image gerada em código (1200×630) — substitui o placeholder SVG.
 *
 * Aplica a todas as rotas: o arquivo vive no segmento raiz e file-based
 * metadata tem prioridade sobre o `metadata` object, então o `images` do
 * layout não entra aqui. SVG não é renderizado por WhatsApp/X/LinkedIn; PNG
 * gerado em build sim.
 *
 * Cartaz sobre chapa preta: logo branca no centro, prazo da abertura no topo
 * e local/distâncias/domínio no rodapé. Só texto confirmado em content —
 * nada de data de prova. Não repita ano/edição colado à logo: a arte já traz.
 */

export const alt = event.logo.alt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Fonte e logo lidos uma vez no escopo do módulo (build), não por request.
 * Barlow Condensed SemiBold é a fonte condensada do site — mesmo DNA
 * tipográfico do rodapé e dos badges. Licença OFL em assets/fonts/OFL.txt.
 */
const condensed = await readFile(
  join(process.cwd(), "assets/fonts/BarlowCondensed-SemiBold.ttf"),
);
const logoSrc = `data:image/png;base64,${await readFile(
  join(process.cwd(), `public${event.logo.src}`),
  "base64")}`;

/** `https://www.meiadecuritiba.com.br` → `www.meiadecuritiba.com.br`. */
const domain = siteUrl.replace(/^https?:\/\//, "");

const tracking = 2;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          color: "#f5f5f5",
        }}
      >
        {/* Tarja vermelha no topo — mesma chapa do marquee e do hero. */}
        <div style={{ height: 12, backgroundColor: "#db2027" }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "44px 64px 52px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "baseline",
              fontFamily: '"Barlow Condensed"',
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: tracking,
              textTransform: "uppercase",
            }}
          >
            <div style={{ color: "#a3a3a3" }}>
              {hero.registrationCard.label.toUpperCase()}
            </div>
            <div style={{ color: "#db2027" }}>
              {event.registrationOpensLabel.toUpperCase()}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Logo branca: só funciona sobre fundo escuro — este é preto. */}
            <img src={logoSrc} width={840} height={228} alt="" />
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "baseline",
              fontFamily: '"Barlow Condensed"',
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: tracking,
            }}
          >
            <div style={{ color: "#f5f5f5" }}>
              {`${event.location} · ${event.distances.join(" · ")}`}
            </div>
            <div style={{ color: "#db2027" }}>{domain}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Barlow Condensed",
          data: condensed,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
