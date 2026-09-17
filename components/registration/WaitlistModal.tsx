"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { waitlist, waitlistUrl } from "@/content";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

import { WaitlistForm } from "./WaitlistForm";

/**
 * Modal da lista de avisos.
 *
 * Mesma casca do <ComingSoonModal> (overlay, foco, Escape, trava de scroll e
 * entrada animada), mas com dois estados: o formulário e o sucesso — que
 * entrega o link do canal de avisos, mantendo a promessa do CTA.
 */
export function WaitlistModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [view, setView] = useState<"form" | "success">("form");

  /* Reabrir sempre volta no formulário — sucesso é do envio anterior.
     Ajuste de estado durante a renderização (padrão do React para
     sincronizar estado com prop), não num effect. */
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (isOpen) setView("form");
  }

  const prefersReducedMotion = useReducedMotion();

  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (eventKey: KeyboardEvent) => {
      if (eventKey.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || prefersReducedMotion) return;

    const context = gsap.context(() => {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.25 });
      gsap.from(panelRef.current, {
        opacity: 0,
        y: 24,
        scaleX: 0.97,
        scaleY: 0.97,
        duration: 0.45,
        ease: "power3.out",
      });
    });

    return () => context.revert();
  }, [isOpen, prefersReducedMotion]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-end justify-center bg-bg-dark/85 p-4 backdrop-blur-sm sm:items-center"
      role="presentation"
      onClick={(clickEvent) => {
        if (clickEvent.target === clickEvent.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="grain relative w-full max-w-lg overflow-hidden border border-white/10 bg-[#111] p-7 sm:p-9"
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-accent-red" />

        <Badge>{waitlist.kicker}</Badge>

        {view === "form" ? (
          <>
            <h2
              id={titleId}
              className="headline mt-5 text-4xl text-text-white sm:text-5xl"
            >
              {waitlist.title}
            </h2>

            <p
              id={descriptionId}
              className="mt-4 text-sm leading-relaxed text-text-gray sm:text-base"
            >
              {waitlist.description}
            </p>

            <WaitlistForm onSuccess={() => setView("success")} />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="label-condensed mt-5 w-full border border-white/20 px-6 py-3 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red"
            >
              {waitlist.success.dismissLabel}
            </button>
          </>
        ) : (
          <>
            <h2
              id={titleId}
              className="headline mt-5 text-4xl text-text-white sm:text-5xl"
            >
              {waitlist.success.title}
            </h2>

            <p
              id={descriptionId}
              className="mt-4 text-sm leading-relaxed text-text-gray sm:text-base"
            >
              {waitlist.success.description}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-text-gray">
              {waitlist.success.note}
            </p>

            <div className="mt-7">
              <CTAButton href={waitlistUrl} animateIn={false}>
                {waitlist.success.ctaLabel}
              </CTAButton>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="label-condensed mt-3 w-full border border-white/20 px-6 py-3 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red"
            >
              {waitlist.success.dismissLabel}
            </button>
          </>
        )}
      </div>
    </div>
  );
}