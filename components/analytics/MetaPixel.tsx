"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

import { ticketLinkFrom } from "./UtmForwarder";

/**
 * Pixel da Meta (conta de anúncios Thomeesantos-cartão), conforme o PDF
 * "MMIC27_Pixel_Meta_instrucoes_site" de 14/11/2026.
 *
 * 1. Código base em todas as páginas: o <Script> abaixo, montado uma vez no
 *    layout raiz. Ele já dispara o PageView da primeira carga; as navegações
 *    internas do Next não recarregam a página, então o efeito de `pathname`
 *    dispara um PageView a cada troca de rota.
 * 2. InitiateCheckout em todo link para a Ticket Sports: em vez de um
 *    `onclick` em cada botão, um único ouvinte de clique no documento pega
 *    qualquer <a> que aponte para ticketsports.com.br, inclusive links que
 *    entrarem depois.
 * 3. Só monta depois do aceite no aviso de cookies (ver <TrackingScripts>).
 *    O repasse dos UTMs para a Ticket Sports saiu daqui para o
 *    <UtmForwarder>, que não depende do aceite.
 */
export const META_PIXEL_ID = "1427951651768151";

type Fbq = (...args: unknown[]) => void;

/**
 * Última rota contada. Fica fora do componente para o PageView não duplicar
 * quando o React roda o efeito duas vezes (Strict Mode em dev) ou remonta.
 */
let lastTrackedPath: string | null = null;

function fbq(...args: unknown[]) {
  const fn = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fn === "function") fn(...args);
}

export function MetaPixel() {
  const pathname = usePathname();
  useEffect(() => {
    // O PageView da primeira carga sai do próprio código base.
    if (lastTrackedPath === null) {
      lastTrackedPath = pathname;
      return;
    }
    if (lastTrackedPath === pathname) return;
    lastTrackedPath = pathname;
    fbq("track", "PageView");
  }, [pathname]);

  useEffect(() => {
    // Os UTMs vão para o link pelo <UtmForwarder>; aqui só o evento.
    const onClick = (event: MouseEvent) => {
      if (!ticketLinkFrom(event.target)) return;
      fbq("track", "InitiateCheckout", { content_name: "MMIC2027" });
    };
    const onAuxClick = (event: MouseEvent) => {
      if (event.button !== 1 || !ticketLinkFrom(event.target)) return;
      fbq("track", "InitiateCheckout", { content_name: "MMIC2027" });
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onAuxClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onAuxClick, true);
    };
  }, []);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
