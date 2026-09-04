import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

/**
 * Layout do site público.
 *
 * Todas as páginas dentro de app/(site) herdam header e footer. O route group
 * existe para que, mais pra frente, um fluxo sem cabeçalho (checkout de
 * inscrição, por exemplo) possa viver em outro grupo sem duplicar o layout
 * raiz.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#conteudo"
        className="label-condensed sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-accent-red focus:px-5 focus:py-3 focus:text-xs focus:text-text-white"
      >
        Pular para o conteúdo
      </a>

      <SiteHeader />
      <main id="conteudo">{children}</main>
      <SiteFooter />
    </>
  );
}
