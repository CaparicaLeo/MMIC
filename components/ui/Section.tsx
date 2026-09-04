import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionTone = "dark" | "darker" | "light";

const toneClasses: Record<SectionTone, string> = {
  dark: "bg-bg-dark text-text-white",
  /** Um degrau acima do preto para separar blocos sem usar borda. */
  darker: "bg-[#060606] text-text-white",
  light: "bg-bg-light text-text-dark",
};

/**
 * Wrapper de seção: cuida de âncora, tom de fundo, ritmo vertical e container.
 * Toda seção da LP — e das próximas páginas — deve passar por aqui, para que
 * o espaçamento do site fique num lugar só.
 */
export function Section({
  id,
  tone = "dark",
  children,
  className,
  containerClassName,
  as: Component = "section",
  bleed = false,
}: {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div" | "footer";
  /** `true` remove o container (usado por faixas de largura total). */
  bleed?: boolean;
}) {
  return (
    <Component
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 sm:py-28 lg:py-36",
        toneClasses[tone],
        className,
      )}
    >
      {bleed ? children : <div className={cn("container-page", containerClassName)}>{children}</div>}
    </Component>
  );
}
