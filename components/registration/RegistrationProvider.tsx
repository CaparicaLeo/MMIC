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

export type BackstageDistance = "5km" | "10km" | "21km";

type RegistrationContextValue = {
  isOpen: boolean;
  /**
   * `source` identifica qual CTA abriu o modal. É o que vira o `source` do lead
   * gravado no backend e o parâmetro `origem_bloco` do evento de conversão.
   */
  open: (source?: string, distance?: BackstageDistance | null) => void;
  close: () => void;
  source: string | null;
  /**
   * Distância pré-marcada pelo card de distância que abriu o modal.
   *
   * Precisa chegar ao lead gravado, não só ao formulário: é o que permite
   * responder "quantos entram pelo 21 km" sem pedir nada a quem já preencheu.
   */
  distance: BackstageDistance | null;
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
 * Fluxo do Backstage 21K.
 *
 * Todo CTA principal do site é `action: "register"` e chega aqui via
 * <BackstageCta>: o provider abre o <BackstageModal>, que oferece os dois
 * caminhos de entrada — o canal do Instagram e o formulário curto.
 *
 * `distance` mora no provider, e não no card de distância, porque o modal é
 * montado uma única vez na raiz: se o estado ficasse no CTA, a distância se
 * perderia na hora em que o modal abre por outro caminho.
 */
export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null);
  const [distance, setDistance] = useState<BackstageDistance | null>(null);

  const open = useCallback(
    (nextSource?: string, nextDistance?: BackstageDistance | null) => {
      setSource(nextSource ?? "desconhecido");
      setDistance(nextDistance ?? null);
    },
    [],
  );

  const close = useCallback(() => setSource(null), []);

  const value = useMemo<RegistrationContextValue>(
    () => ({ isOpen: source !== null, open, close, source, distance }),
    [source, distance, open, close],
  );

  return (
    <RegistrationContext.Provider value={value}>
      {children}
      <RegistrationModal />
    </RegistrationContext.Provider>
  );
}