"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

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
 * 3. UTMs do anúncio: os `utm_*` que chegam na URL ficam guardados na sessão
 *    e são repassados ao link da Ticket Sports no momento do clique, sem
 *    sobrescrever parâmetros que o link já tenha (como `origem=novo-site`).
 */
export const META_PIXEL_ID = "1427951651768151";

const TICKET_HOST = "ticketsports.com.br";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const UTM_STORAGE = "mmic27-utms";

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

function readStoredUtms(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE) ?? "{}");
  } catch {
    return {};
  }
}

/** Guarda os UTMs da URL atual, se houver; senão mantém os da sessão. */
function captureUtms() {
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  if (Object.keys(found).length === 0) return;
  try {
    sessionStorage.setItem(UTM_STORAGE, JSON.stringify(found));
  } catch {
    /* sessão bloqueada: segue sem repassar */
  }
}

function withUtms(href: string): string {
  const utms = readStoredUtms();
  if (Object.keys(utms).length === 0) return href;
  try {
    const url = new URL(href);
    for (const [key, value] of Object.entries(utms)) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return href;
  }
}

function ticketLinkFrom(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  const link = target.closest("a[href]");
  if (!(link instanceof HTMLAnchorElement)) return null;
  return link.hostname.endsWith(TICKET_HOST) ? link : null;
}

export function MetaPixel() {
  const pathname = usePathname();
  useEffect(() => {
    captureUtms();
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
    // Repassa os UTMs antes de o navegador seguir o link (clique, botão do
    // meio ou "abrir em nova aba" pelo teclado).
    const prepare = (event: Event) => {
      const link = ticketLinkFrom(event.target);
      if (link) link.href = withUtms(link.href);
    };
    const onClick = (event: MouseEvent) => {
      const link = ticketLinkFrom(event.target);
      if (!link) return;
      link.href = withUtms(link.href);
      fbq("track", "InitiateCheckout", { content_name: "MMIC2027" });
    };
    const onAuxClick = (event: MouseEvent) => {
      if (event.button !== 1 || !ticketLinkFrom(event.target)) return;
      fbq("track", "InitiateCheckout", { content_name: "MMIC2027" });
    };

    document.addEventListener("pointerdown", prepare, true);
    document.addEventListener("focusin", prepare, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onAuxClick, true);
    return () => {
      document.removeEventListener("pointerdown", prepare, true);
      document.removeEventListener("focusin", prepare, true);
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
