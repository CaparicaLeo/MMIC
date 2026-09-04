import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type BadgeTone = "red" | "outline" | "light";

const toneClasses: Record<BadgeTone, string> = {
  /** Tarja vermelha sólida — o uso canônico do accent na identidade. */
  red: "bg-accent-red text-text-white",
  outline: "border border-white/20 text-text-white",
  light: "bg-bg-light text-text-dark",
};

type BadgeProps<T extends ElementType> = {
  as?: T;
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Tarja/badge. Junto com <Highlight>, é o lugar autorizado para o vermelho.
 * Se você está prestes a escrever `text-accent-red` num parágrafo, use um
 * destes dois componentes.
 */
export function Badge<T extends ElementType = "span">({
  as,
  tone = "red",
  children,
  className,
  ...rest
}: BadgeProps<T>) {
  const Component = (as ?? "span") as ElementType;

  return (
    <Component
      className={cn(
        "label-condensed inline-flex items-center gap-2 px-3 py-1.5 text-[0.7rem] leading-none",
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
