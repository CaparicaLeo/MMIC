"use client";

import { WaitlistModal } from "./WaitlistModal";

import { useRegistration } from "./RegistrationProvider";

/**
 * Modal de inscrição. Só liga o estado global do fluxo à casca da lista de
 * avisos — o comportamento (foco, Escape, scroll) mora no <WaitlistModal>.
 */
export function RegistrationModal() {
  const { isOpen, close } = useRegistration();

  return <WaitlistModal isOpen={isOpen} onClose={close} />;
}