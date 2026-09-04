import type { Metadata, Viewport } from "next";

import { AnimationProvider } from "@/components/animation/AnimationProvider";
import { RegistrationProvider } from "@/components/registration/RegistrationProvider";
import { event, siteUrl } from "@/content";

import { fontVariables } from "./fonts";
import "./globals.css";

const title = `${event.name} ${event.year} — ${event.edition}`;
const description =
  "Quando o esporte encontra o rock, Curitiba vira o palco. 5 km, 10 km e 21 km que começam correndo e terminam em festival.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${event.name}`,
  },
  description,
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
