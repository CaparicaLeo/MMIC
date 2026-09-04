"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { RegisterButton } from "@/components/registration/RegisterButton";
import { event, mainNav } from "@/content";
import { cn } from "@/lib/cn";

const headerCta = {
  label: "Inscrever-se",
  action: "register" as const,
  pendingLabel: "Abrindo…",
};

/**
 * Header do site (compartilhado por todas as páginas via app/(site)/layout.tsx).
 * Fica transparente sobre o hero e ganha fundo ao sair dele.
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
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link
          href="/"
          className="flex flex-col leading-none"
          aria-label={`${event.name} ${event.year}`}
        >
          <span className="headline text-lg sm:text-xl">
            Meia Maratona <span className="text-accent-red">CWB</span>
          </span>
          <span className="label-condensed text-[0.6rem] text-text-gray">
            {event.edition} · {event.year}
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label-condensed text-[0.7rem] text-text-gray transition-colors hover:text-text-white"
                >
                  {item.label}
                  {item.comingSoon ? (
                    <span className="ml-1.5 align-super text-[0.55rem] text-accent-red">
                      breve
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <RegisterButton
            cta={headerCta}
            source="header"
            size="md"
            animateIn={false}
            className="hidden sm:inline-flex"
          />

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            className="label-condensed cursor-pointer border border-white/20 px-4 py-2.5 text-[0.7rem] lg:hidden"
          >
            {isMenuOpen ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!isMenuOpen}
        className="border-t border-white/10 bg-bg-dark lg:hidden"
      >
        <nav aria-label="Navegação principal (mobile)" className="container-page py-6">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="headline block py-3 text-2xl text-text-white"
                >
                  {item.label}
                  {item.comingSoon ? (
                    <span className="label-condensed ml-2 align-middle text-[0.6rem] text-accent-red">
                      em breve
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>

          <RegisterButton
            cta={headerCta}
            source="header-mobile"
            className="mt-5 w-full sm:hidden"
            animateIn={false}
          />
        </nav>
      </div>
    </header>
  );
}
