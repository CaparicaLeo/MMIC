"use client";

import { useEffect, useRef } from "react";

import { registrationModal } from "@/content";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Badge } from "@/components/ui/Badge";

import { useRegistration } from "./RegistrationProvider";

export function RegistrationModal() {
  const { isOpen, close } = useRegistration();
  const prefersReducedMotion = useReducedMotion();

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Escape + trava de scroll do body + devolução de foco.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (eventKey: KeyboardEvent) => {
      if (eventKey.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen, close]);

  // Entrada animada. Não há animação de saída: o modal desmonta na hora,
  // o que mantém o comportamento previsível com o React.
  useEffect(() => {
    if (!isOpen || prefersReducedMotion) return;

    const context = gsap.context(() => {
      gsap.from(overlayRef.current, { opacity: 0, duration: 0.25 });
      gsap.from(panelRef.current, {
        opacity: 0,
        y: 24,
        scale: 0.97,
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
        if (clickEvent.target === clickEvent.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-modal-title"
        aria-describedby="registration-modal-description"
        className="grain relative w-full max-w-lg overflow-hidden border border-white/10 bg-[#111] p-7 sm:p-9"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-accent-red"
        />

        <Badge>{registrationModal.kicker}</Badge>

        <h2
          id="registration-modal-title"
          className="headline mt-5 text-4xl text-text-white sm:text-5xl"
        >
          {registrationModal.title}
        </h2>

        <p
          id="registration-modal-description"
          className="mt-4 text-sm leading-relaxed text-text-gray sm:text-base"
        >
          {registrationModal.description}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-text-gray">
          {registrationModal.note}
        </p>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          className="label-condensed mt-7 w-full border border-white/20 px-6 py-3 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red"
        >
          {registrationModal.dismissLabel}
        </button>
      </div>
    </div>
  );
}
