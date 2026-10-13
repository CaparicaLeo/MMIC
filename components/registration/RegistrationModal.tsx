"use client";

import { BackstageModal } from "./BackstageModal";
import { useRegistration } from "./RegistrationProvider";

export function RegistrationModal() {
  const { isOpen, close } = useRegistration();

  return <BackstageModal isOpen={isOpen} onClose={close} />;
}