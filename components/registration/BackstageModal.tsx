"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { waitlist, waitlistUrl } from "@/content";
import { track } from "@/lib/analytics";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

import { BackstageForm } from "./BackstageForm";
import { useRegistration } from "./RegistrationProvider";

/**
 * Modal do Backstage 21K.
 *
 * Mesma casca do <ComingSoonModal> (overlay, foco, Escape, trava de scroll e
 * entrada animada), com três estados: os dois caminhos de entrada, o formulário
 * e o sucesso.
 *
 * Os dois caminhos ficam lado a lado desde o começo, e não o formulário com um
 * link secundário no rodapé: entrar pelo Instagram custa um clique e não pede
 * nada, então escondê-lo atrás de um campo de formulário joga fora a
 * conversão mais barata que existe. Quem chegar por ela cai direto na tela de
 * sucesso, sem formulário no meio.
 */
export function BackstageModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [view, setView] = useState<"channels" | "form" | "success">("channels");
  const { source, distance } = useRegistration();

  /* Reabrir sempre volta nos canais — sucesso é do envio anterior.
     Ajuste de estado durante a renderização (padrão do React para
     sincronizar estado com prop), não num effect. */
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (isOpen) setView("channels");
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
        className="grain relative max-h-[92dvh] w-full max-w-lg overflow-y-auto border border-white/10 bg-[#111] p-7 sm:p-9"
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-accent-red" />

        <Badge>{waitlist.kicker}</Badge>

        {view !== "success" ? (
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
          </>
        ) : null}

        {/* Distância pré-marcada pelo card de distância que abriu o modal. */}
        {distance && view !== "success" ? (
          <p className="label-condensed mt-4 w-fit border border-accent-red/60 px-2.5 py-1 text-[0.6rem] text-accent-red">
            Distância marcada: {distance.toUpperCase()}
          </p>
        ) : null}

        {view === "channels" ? (
          <div className="mt-7 grid gap-3">
            {/*
              O caminho do Instagram é o mesmo link que a tela de sucesso
              entregava, e continua sendo rastreado: sem ele, a conversão mais
              barata do modal não deixaria rastro nenhum.
            */}
            <CTAButton
              href={withInstagramTracking(waitlistUrl)}
              onClick={() =>
                track("backstage_lead", {
                  canal: "instagram",
                  distancia: distance ?? "nenhuma",
                  origem_bloco: source ?? "desconhecido",
                })
              }
              animateIn={false}
            >
              {waitlist.channels[0].label}
            </CTAButton>

            <p className="text-xs text-text-gray/70">
              {waitlist.channels[0].hint}
            </p>

            <button
              type="button"
              onClick={() => setView("form")}
              className="label-condensed mt-2 w-full border border-white/20 px-6 py-3.5 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red"
            >
              {waitlist.channels[1].label}
            </button>

            <p className="text-xs text-text-gray/70">{waitlist.channels[1].hint}</p>
          </div>
        ) : null}

        {view === "form" ? (
          <>
            <BackstageForm onSuccess={() => setView("success")} />

            {/*
              Voltar para os canais importa: quem escolheu o formulário por
              engano (ou quer sair rápido) precisa encontrar a saída de um
              clique, sem fechar o modal e perder a distância marcada.
            */}
            <button
              type="button"
              onClick={() => setView("channels")}
              className="label-condensed mt-4 w-full border border-white/15 px-6 py-3 text-xs text-text-gray transition-colors hover:border-white/40 hover:text-text-white"
            >
              Voltar para as opções
            </button>
          </>
        ) : null}

        {view === "success" ? (
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
              <CTAButton href={withInstagramTracking(waitlistUrl)} animateIn={false}>
                {waitlist.success.ctaLabel}
              </CTAButton>
            </div>
          </>
        ) : null}

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className={`label-condensed w-full border border-white/20 px-6 py-3 text-xs text-text-white transition-colors hover:border-accent-red hover:bg-accent-red ${view === "channels" ? "mt-7" : "mt-5"}`}
        >
          {waitlist.success.dismissLabel}
        </button>
      </div>
    </div>
  );
}

/**
 * UTM no link do canal do Instagram.
 *
 * O destino é um convite de canal (link externo), então a origem do clique se
 * perde no redirect do Instagram: sem o parâmetro, não há como saber qual
 * bloco gerou a entrada. `utm_source` distingue o site, `utm_medium` fixa o
 * canal de conversão e `utm_content` carrega o bloco e a distância.
 *
 * O destino é montado em `lib/tracking.ts` (§8) junto dos demais; aqui só
 * falta a origem do bloco, que o modal não conhece sozinho.
 */
function withInstagramTracking(url: string): string {
  if (typeof window === "undefined") return url;

  try {
    const current = new URL(url);
    current.searchParams.set("utm_source", "site");
    current.searchParams.set("utm_medium", "backstage");
    return current.toString();
  } catch {
    return url;
  }
}