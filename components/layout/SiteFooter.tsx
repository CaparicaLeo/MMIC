import Image from "next/image";
import Link from "next/link";

import { event, footerNav } from "@/content";

/**
 * Rodapé: a marca do evento e o lockup "Curitiba é Rock" na faixa de cima;
 * abaixo, local, data prevista, Instagram e os links de contato.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#060606]">
      <div className="container-page flex flex-col gap-10 py-12 sm:flex-row sm:items-end sm:justify-between lg:py-14">
        <div className="flex flex-col gap-4">
          <Image
            src={event.logo.src}
            alt={event.logo.alt}
            width={event.logo.width}
            height={event.logo.height}
            sizes="(min-width: 640px) 207px, 177px"
            loading="eager"
            fetchPriority="low"
            className="h-12 w-auto sm:h-14"
          />
          <p className="label-condensed text-[0.66rem] text-text-gray">
            Um evento Thomé &amp; Santos · Curitiba corre aqui.
          </p>
        </div>

        <Image
          src="/images/curitiba-e-rock.png"
          alt="Curitiba é Rock · Curitiba corre"
          width={1177}
          height={395}
          sizes="(min-width: 640px) 260px, 200px"
          loading="eager"
          fetchPriority="low"
          className="h-auto w-[200px] opacity-90 sm:w-[260px]"
        />
      </div>

      <div className="container-page grid gap-12 border-t border-white/10 py-12 md:grid-cols-[1fr_1fr] lg:py-14">
        <div className="flex flex-col gap-2 text-sm text-text-gray">
          <p className="label-condensed text-[0.66rem] text-text-white">Curitiba · PR</p>
          <p className="label-condensed text-[0.66rem]">20 de junho de 2027 (previsão)</p>
          <a
            href={event.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="label-condensed mt-2 w-fit text-[0.66rem] transition-colors hover:text-accent-red"
          >
            @meiainternacionalcuritiba
          </a>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title} className="md:justify-self-end">
            <p className="label-condensed text-[0.66rem] text-text-gray">{group.title}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-text-white/85 transition-colors hover:text-accent-red">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 text-xs text-text-gray">
          {/* Ano corrente, não event.year: o aviso de direitos vale para a publicação. */}
          <p>
            © {new Date().getFullYear()} {event.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
