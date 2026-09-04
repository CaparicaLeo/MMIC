import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { SectionIntro } from "@/content/types";

/**
 * Cabeçalho padrão de seção (kicker + título + descrição).
 *
 * Marca os próprios elementos com `data-reveal` para que a seção pai possa
 * animá-los em stagger sem precisar conhecer a estrutura interna.
 */
export function SectionHeader({
  intro,
  align = "left",
  className,
  children,
  titleClassName,
}: {
  intro: SectionIntro;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}) {
  return (
    <header
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {intro.kicker ? (
        <Badge className="w-fit" data-reveal>
          {intro.kicker}
        </Badge>
      ) : null}

      <h2
        data-reveal
        className={cn(
          "headline text-4xl sm:text-5xl lg:text-6xl",
          titleClassName,
        )}
      >
        {intro.title}
      </h2>

      {intro.description ? (
        <p
          data-reveal
          className="max-w-2xl text-base leading-relaxed text-text-gray sm:text-lg"
        >
          {intro.description}
        </p>
      ) : null}

      {children}
    </header>
  );
}
