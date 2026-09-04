"use client";

import { ComingSoonModal } from "@/components/ui/ComingSoonModal";
import { registrationModal } from "@/content";

import { useRegistration } from "./RegistrationProvider";

/**
 * Modal de inscrição. Só liga o estado global do fluxo à casca compartilhada
 * em <ComingSoonModal> — o comportamento (foco, Escape, scroll) mora lá.
 */
export function RegistrationModal() {
  const { isOpen, close } = useRegistration();

  return (
    <ComingSoonModal isOpen={isOpen} onClose={close} content={registrationModal} />
  );
}
