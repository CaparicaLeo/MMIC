"use client";

import Script from "next/script";
import { useEffect } from "react";

import { clearRefusedCookies, useConsent } from "@/lib/consent";

import { MetaPixel } from "./MetaPixel";

const CLARITY_ID = "ze310rakrw";
const GA4_ID = "G-HDKSRPNQD5";

/**
 * Scripts de terceiros que dependem de consentimento (ver lib/consent.ts e a
 * política em /politica-de-privacidade). Nada aqui carrega antes do aceite:
 * sem escolha, ou com recusa, a página não fala com Google, Microsoft nem Meta.
 *
 * O Vercel Analytics fica fora daqui, no layout: ele não usa cookie nem
 * identifica o visitante, e a política diz isso.
 */
export function TrackingScripts() {
  const consent = useConsent();

  useEffect(() => {
    if (consent) clearRefusedCookies(consent);
  }, [consent]);

  if (!consent) return null;

  return (
    <>
      {consent.analytics ? (
        <>
          <Script id="ms-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}</Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`}</Script>
        </>
      ) : null}
      {/* Pixel da Meta: PageView em todas as páginas e InitiateCheckout nos links da Ticket Sports. */}
      {consent.marketing ? <MetaPixel /> : null}
    </>
  );
}
