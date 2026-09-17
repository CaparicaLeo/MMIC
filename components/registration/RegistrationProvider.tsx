"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { RegistrationModal } from "./RegistrationModal";

type RegistrationContextValue = {
  isOpen: boolean;
  /** `source` identifica qual CTA abriu o modal (útil para analytics depois). */
  open: (source?: string) => void;
  close: () => void;
  source: string | null;
};

const RegistrationContext = createContext<RegistrationContextValue | null>(null);

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration precisa estar dentro de <RegistrationProvider>.");
  }
  return context;
}

/**
 * Fluxo de inscrição.
 *
 * Todo CTA de inscrição é `action: "register"` e chega aqui via
 * <RegisterButton>: o provider abre o <WaitlistModal>. O formulário registra
 * o lead no backend e, no sucesso, entrega o link do canal de avisos.
 * Se um dia houver checkout real, a troca acontece no modal, sem tocar os CTA.
 */
export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null);

  const open = useCallback((nextSource?: string) => {
    setSource(nextSource ?? "desconhecido");
  }, []);

  const close = useCallback(() => setSource(null), []);

  const value = useMemo<RegistrationContextValue>(
    () => ({ isOpen: source !== null, open, close, source }),
    [source, open, close],
  );

  return (
    <RegistrationContext.Provider value={value}>
      {children}
      <RegistrationModal />
    </RegistrationContext.Provider>
  );
}
