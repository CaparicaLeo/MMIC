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
 * Placeholder do fluxo de inscrição.
 *
 * Hoje sem gatilho: desde que existe o canal de avisos, todo CTA de inscrição
 * é `action: "link"` e navega para `waitlistUrl` em vez de abrir modal. O
 * provider continua montado porque é ele que sustenta o ramo `register` de
 * <RegisterButton> — é para cá que a página volta se o link sair do conteúdo,
 * e é aqui que o checkout real entra quando existir.
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
