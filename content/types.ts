/**
 * Tipos compartilhados da camada de conteúdo.
 *
 * Todo texto da LP vive em /content — os componentes só recebem dados.
 * Isso mantém a edição de copy longe do JSX e deixa o caminho aberto para
 * i18n (basta um `content/pt-BR/*` + `content/en/*` com os mesmos tipos).
 */

/** Rótulo de imagem. `src` aponta para um placeholder até a arte final chegar. */
export type Media = {
  src: string;
  alt: string;
  /** Proporção usada para reservar espaço e evitar layout shift. */
  width: number;
  height: number;
};

export type CtaAction = "register" | "link";

export type Cta = {
  label: string;
  /** `register` abre um modal de "em breve"; `link` navega. */
  action: CtaAction;
  href?: string;
  /** Texto exibido durante o estado de loading do botão. */
  pendingLabel?: string;
};

/** Copy de um modal de "ainda não abriu". Só o texto muda entre eles. */
export type PlaceholderModal = {
  kicker: string;
  title: string;
  description: string;
  note: string;
  dismissLabel: string;
};

export type SectionIntro = {
  /** Kicker curto exibido como tarja vermelha. */
  kicker?: string;
  title: string;
  description?: string;
};

export type TimelineItem = {
  id: string;
  time: string;
  title: string;
  description: string;
};

export type StatItem = {
  id: string;
  /** Valor final do contador. */
  value: number;
  /**
   * Tarja curta acima do número. Existe para qualificar o dado ANTES de ele
   * ser lido: sem ela, um número de meta é lido como número realizado, e a
   * ressalva só aparecia na nota abaixo, depois do estrago.
   */
  kicker?: string;
  prefix?: string;
  suffix?: string;
  /** Casas decimais na contagem (ex.: 43,5%). */
  decimals?: number;
  label: string;
  note?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type DistanceItem = {
  id: string;
  /** Ex.: "21" */
  distance: string;
  unit: string;
  name: string;
  description: string;
  /** Bullets curtos exibidos no card. */
  highlights: string[];
  cta: Cta;
  featured?: boolean;
};

export type FeatureItem = {
  id: string;
  /** Chave do ícone resolvida em components/ui/Icon.tsx */
  icon: string;
  title: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** Rotas já criadas mas ainda sem conteúdo definitivo. */
  comingSoon?: boolean;
};

export type GrowthPoint = {
  year: string;
  value: number;
  /** Marca a edição ainda não realizada (meta, não histórico). */
  projected?: boolean;
};
