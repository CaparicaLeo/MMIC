"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { useGsapScroll } from "@/lib/hooks/useGsapScroll";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  /** Único lugar onde o vermelho vira área sólida grande. */
  primary: "bg-accent-red text-text-white",
  outline: "border border-white/25 text-text-white",
  ghost: "text-text-white",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3.5 text-xs",
  lg: "px-8 py-4.5 text-sm",
};

export type CTAButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Se informado, renderiza um <Link>; senão, um <button>. */
  href?: string;
  onClick?: () => void;
  /** Texto exibido no estado de transição depois do clique. */
  pendingLabel?: string;
  /** Pulso sutil de urgência — reserve para o CTA principal da seção. */
  pulse?: boolean;
  /** Entrada animada ao entrar no viewport. */
  animateIn?: boolean;
  ariaLabel?: string;
};

/**
 * CTA do projeto.
 *
 * Cobre os três estados exigidos pela identidade:
 *  1. entrada animada ao entrar no viewport;
 *  2. hover/focus com micro-interação (elevação + brilho vermelho);
 *  3. estado de clique/loading, com o rótulo trocando para `pendingLabel`.
 *
 * Tudo em `transform`/`opacity` e via `gsap.quickTo`, que reaproveita o mesmo
 * tween a cada evento em vez de criar um novo — é o que mantém o hover fluido
 * mesmo com vários CTAs na página.
 */
export function CTAButton({
  children,
  variant = "primary",
  size = "lg",
  className,
  href,
  onClick,
  pendingLabel,
  pulse = false,
  animateIn = true,
  ariaLabel,
}: CTAButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const pendingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const root = useGsapScroll<HTMLDivElement>(({ scope, prefersReducedMotion, gsap: g }) => {
    const target = scope.querySelector("[data-cta-target]");
    const glow = scope.querySelector("[data-cta-glow]");
    if (!target) return;

    if (prefersReducedMotion) return;

    if (animateIn) {
      g.from(scope, {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: scope, start: "top 92%", once: true },
      });
    }

    // Pulso de urgência: escala mínima e contínua, só no halo — nunca no
    // texto, para não causar reflow nem cansar a leitura.
    if (pulse && glow) {
      g.to(glow, {
        opacity: 0.55,
        scale: 1.12,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    const moveY = g.quickTo(target, "y", { duration: 0.35, ease: "power3.out" });
    const scaleTo = g.quickTo(target, "scale", { duration: 0.35, ease: "power3.out" });
    const glowTo = glow
      ? g.quickTo(glow, "opacity", { duration: 0.4, ease: "power2.out" })
      : null;

    const enter = () => {
      moveY(-3);
      scaleTo(1.02);
      glowTo?.(0.75);
    };
    const leave = () => {
      moveY(0);
      scaleTo(1);
      glowTo?.(pulse ? 0.35 : 0);
    };
    const press = () => scaleTo(0.97);

    scope.addEventListener("pointerenter", enter);
    scope.addEventListener("pointerleave", leave);
    scope.addEventListener("pointerdown", press);
    scope.addEventListener("pointerup", enter);
    scope.addEventListener("focusin", enter);
    scope.addEventListener("focusout", leave);

    return () => {
      scope.removeEventListener("pointerenter", enter);
      scope.removeEventListener("pointerleave", leave);
      scope.removeEventListener("pointerdown", press);
      scope.removeEventListener("pointerup", enter);
      scope.removeEventListener("focusin", enter);
      scope.removeEventListener("focusout", leave);
    };
  }, [animateIn, pulse]);

  useEffect(
    () => () => {
      if (pendingTimeout.current) clearTimeout(pendingTimeout.current);
    },
    [],
  );

  const handleClick = useCallback(() => {
    if (!pendingLabel) {
      onClick?.();
      return;
    }

    setIsPending(true);
    pendingTimeout.current = setTimeout(() => {
      setIsPending(false);
      onClick?.();
    }, 420);
  }, [onClick, pendingLabel]);

  const label = isPending && pendingLabel ? pendingLabel : children;

  const inner = (
    <>
      {variant === "primary" ? (
        <span
          aria-hidden
          data-cta-glow
          className="pointer-events-none absolute -inset-3 -z-10 bg-accent-red/45 opacity-0 blur-2xl"
          style={{ opacity: pulse ? 0.35 : 0 }}
        />
      ) : null}
      <span
        data-cta-target
        className={cn(
          "label-condensed relative inline-flex w-full items-center justify-center gap-3 will-change-transform",
          sizeClasses[size],
          variantClasses[variant],
          variant === "outline" && "transition-colors hover:border-accent-red",
          isPending && "opacity-80",
        )}
      >
        {label}
        <span aria-hidden className="text-base leading-none">
          →
        </span>
      </span>
    </>
  );

  const wrapperClass = cn(
    "relative isolate inline-flex w-fit cursor-pointer select-none",
    className,
  );

  if (href) {
    return (
      <div ref={root} className={wrapperClass}>
        <Link
          href={href}
          aria-label={ariaLabel}
          className="relative inline-flex w-full focus-visible:outline-offset-4"
        >
          {inner}
        </Link>
      </div>
    );
  }

  return (
    <div ref={root} className={wrapperClass}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-busy={isPending || undefined}
        className="relative inline-flex w-full cursor-pointer focus-visible:outline-offset-4"
      >
        {inner}
      </button>
    </div>
  );
}
