import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { event, footerNav } from "@/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#060606]">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr] lg:py-20">
        <div>
          <p className="headline text-3xl sm:text-4xl">
            Meia Maratona <span className="text-accent-red">CWB</span>
          </p>
          <p className="label-condensed mt-2 text-[0.7rem] text-text-gray">
            {event.edition} · {event.year} · {event.location}
          </p>

          <Badge tone="outline" className="mt-6">
            {event.dateLabel}
          </Badge>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-text-gray">
            {event.name}. Uma experiência urbana que começa correndo e termina
            em festival.
          </p>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="label-condensed text-[0.7rem] text-text-gray">
              {group.title}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-white/85 transition-colors hover:text-accent-red"
                  >
                    {item.label}
                    {item.comingSoon ? (
                      <span className="label-condensed ml-2 text-[0.55rem] text-text-gray">
                        em breve
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-text-gray sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {event.year} {event.name}. Todos os direitos reservados.
          </p>
          <p className="label-condensed text-[0.65rem]">
            Curitiba é rock. Curitiba corre.
          </p>
        </div>
      </div>
    </footer>
  );
}
