import type { Metadata, Viewport } from "next";

import { AnimationProvider } from "@/components/animation/AnimationProvider";
import { RegistrationProvider } from "@/components/registration/RegistrationProvider";
import { event, seoDescription, siteUrl } from "@/content";

import { fontVariables } from "./fonts";
import "./globals.css";

const title = `${event.name} ${event.year} · ${event.edition}`;
/**
 * A anterior abria com a assinatura criativa e só citava as distâncias — não
 * trazia "meia maratona" nem a praça de forma explícita, que é o que a busca
 * casa. A versão canônica vive em content/event.ts e é a mesma do JSON-LD.
 */
const description = seoDescription;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${event.name}`,
  },
  description,
  /**
   * Canonical explícito da home. Cada rota abaixo declara o SEU canonical em
   * page.tsx: no App Router o metadata do layout é herdado, então sem isso
   * /inscricao, /cronograma, /marcas e /imprensa herdariam este valor
   * e se declarariam duplicatas da home — o que as tira do índice.
   */
  alternates: { canonical: siteUrl },
  /**
   * Favicon com chapa, e não com variante por tema.
   *
   * As duas tentativas anteriores falharam pelo mesmo motivo: o Chrome não
   * aplica `prefers-color-scheme` a favicon, nem via atributo `media` no
   * <link> (ele busca /favicon.ico junto e esse vence), nem via media query
   * dentro do SVG. Verificado lendo o bitmap que o Chrome grava no perfil: o
   * ícone rasterizado é byte a byte o mesmo em tema claro e escuro. Com a
   * marca transparente, isso deixava preto sobre preto na barra escura.
   *
   * A chapa #0a0a0a (o fundo do site) com a marca branca resolve sem depender
   * de suporte do navegador: em barra clara lê como quadrado escuro com a
   * marca branca, em barra escura a chapa some e sobra a marca. Os três
   * arquivos usam a mesma arte, então o conjunto fica coerente.
   *
   * O apple-touch-icon é opaco também porque o iOS descarta o alfa e pinta o
   * fundo de preto por conta.
   */
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  applicationName: event.name,
  keywords: [
    "meia maratona",
    "Curitiba",
    "corrida de rua",
    "21k",
    "10k",
    "5k",
    "rock",
    event.year,
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: event.name,
    title,
    description,
    images: [
      {
        url: event.ogImage.src,
        width: event.ogImage.width,
        height: event.ogImage.height,
        alt: event.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [event.ogImage.src],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="min-h-dvh antialiased">
        {/*
          Providers globais: o de animação centraliza a manutenção do
          ScrollTrigger; o de inscrição serve o modal "em breve" para
          qualquer CTA da árvore, em qualquer página.
        */}
        <AnimationProvider>
          <RegistrationProvider>{children}</RegistrationProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
