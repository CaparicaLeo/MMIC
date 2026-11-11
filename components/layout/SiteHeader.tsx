"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { event, mainNav } from "@/content";
import { cn } from "@/lib/cn";

/**
 * Cabeçalho do site. Fica transparente sobre o hero e ganha fundo ao rolar.
 * O botão "Inscreva-se" leva à página de inscrição, onde ficam os lotes.
 */
export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isScrolled || isMenuOpen
          ? "border-b border-white/10 bg-bg-dark/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-5 lg:h-20">
        <Link href="/" className="flex shrink-0 leading-none" aria-label={`${event.name} ${event.year}`}>
          {/* alt vazio: o nome do evento já é anunciado pelo aria-label do link. */}
          <Image
            src={event.logo.src}
            alt=""
            width={event.logo.width}
            height={event.logo.height}
            sizes="(min-width: 640px) 178px, 148px"
            loading="eager"
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden xl:block">
          <ul className="flex items-center gap-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label-condensed whitespace-nowrap text-[0.66rem] text-text-white/80 transition-colors hover:text-accent-red"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/inscricao"
            className="label-condensed hidden shrink-0 whitespace-nowrap bg-accent-red px-5 py-3 text-xs text-text-white transition-colors hover:bg-[#ef2a32] xl:inline-flex"
          >
            Inscreva-se
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            className="label-condensed cursor-pointer border border-white/20 px-4 py-2.5 text-[0.7rem] xl:hidden"
          >
            {isMenuOpen ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      <div id="menu-mobile" hidden={!isMenuOpen} className="border-t border-white/10 bg-bg-dark xl:hidden">
        <nav aria-label="Navegação principal (mobile)" className="container-page py-6">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="headline block py-2.5 text-2xl text-text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/inscricao"
            onClick={() => setIsMenuOpen(false)}
            className="label-condensed mt-6 inline-flex w-full items-center justify-center bg-accent-red px-6 py-4 text-xs text-text-white"
          >
            Inscreva-se
          </Link>
        </nav>
      </div>
    </header>
  );
}
