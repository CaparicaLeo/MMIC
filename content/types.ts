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
  /** Legenda exibida abaixo da imagem. */
  caption?: string;
};

export type CtaAction = "register" | "link";

export type Cta = {
  label: string;
  /** `register` abre o modal de lista de avisos; `link` navega. */
  action: CtaAction;
  href?: string;
  /** Texto exibido durante o estado de loading do botão. */
  pendingLabel?: string;
};

/**
 * CTA que só navega. Tem `action` e `href` obrigatórios, então o componente
 * pode passar o `href` direto para <CTAButton> sem o desvio de "e se o
 * `action` for register?".
 */
export type PageCta = Cta & { action: "link"; href: string };

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

/** Card de premiação do concurso de camisetas. */
export type PrizeItem = {
  id: string;
  /** Ex.: "1º lugar" */
  place: string;
  /** Ex.: "R$ 3.000" */
  value: string;
  label: string;
  /** O 1º lugar ganha destaque vermelho. */
  featured?: boolean;
};

/** Card genérico de regra/critério/informação. */
export type RuleItem = {
  id: string;
  title: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** Rotas já criadas mas ainda sem conteúdo definitivo. */
  comingSoon?: boolean;
};

/** Opção do select de motivo do formulário de contato. */
export type ContactTypeOption = {
  /** Valor enviado ao backend (`type`), em minúsculo. */
  value: string;
  label: string;
};

/** Tipos que o backend aceita em `type`. */
export type ContactPage = {
  intro: SectionIntro;
  form: {
    email: { label: string; placeholder: string };
    name: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    age: { label: string; placeholder: string };
    gender: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
    type: { label: string; options: ContactTypeOption[] };
    submit: { label: string; pendingLabel: string };
    success: { title: string; description: string };
  };
  notices: {
    /** Exibido abaixo do envio bem-sucedido (traz o id da oportunidade). */
    received: string;
    /** Exibido quando o backend bate no limite de mensagens. */
    rateLimited: string;
  };
  errors: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    /** Falha transitória (rede/backend indisponível). */
    internal: string;
    /** Token/não autorizado — nunca revelar o que falhou. */
    auth: string;
    tooLarge: string;
  };
};

export type GrowthPoint = {
  year: string;
  value: number;
  /** Marca a edição ainda não realizada (meta, não histórico). */
  projected?: boolean;
};

/** Copy do formulário de lista de avisos, aberto pelos CTAs de inscrição. */
export type WaitlistContent = {
  kicker: string;
  title: string;
  description: string;
  form: {
    email: { label: string; placeholder: string };
    name: { label: string; placeholder: string };
    whatsapp: { label: string; placeholder: string };
    instagram: { label: string; placeholder: string };
  };
  submit: { label: string; pendingLabel: string };
  success: {
    title: string;
    description: string;
    note: string;
    ctaLabel: string;
    dismissLabel: string;
  };
  notices: { rateLimited: string };
  errors: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    internal: string;
  };
};

/** Opção de select e de caixa de marcar: valor técnico + rótulo visível. */
export type Option = {
  value: string;
  label: string;
};

/** Bloco de onde a marca aparece (branding, presença física, ativações). */
export type BrandCategory = {
  id: string;
  title: string;
  /** Chamada curta que abre o bloco. */
  lead: string;
  items: string[];
};

/** Etapa do método comercial, revelada uma a uma pelo scroll. */
export type MethodStep = {
  id: string;
  title: string;
  /** A pergunta que a etapa responde — é ela que dá o tom de método. */
  question: string;
  description: string;
};

/** Cota comercial. `featured` é a cota completa, que recebe destaque. */
export type BrandTier = {
  id: string;
  title: string;
  /** Frase curta que resume a promessa da cota. */
  tagline: string;
  description: string;
  items: string[];
  /** Objetivo que a cota serve — usado no rodapé do card. */
  goal: string;
  featured?: boolean;
};

/** Perfil de público que a marca quer atingir. */
export type AudienceProfile = {
  id: string;
  title: string;
  description: string;
};

/** Capacidade que o evento oferece à marca. */
export type BrandPillar = {
  id: string;
  title: string;
  description: string;
};

/**
 * Página /marcas: opportunities comerciais.
 *
 * A lead é um funil (objetivos, empresa, público, região, investimento), mas
 * o backend aceita oito campos e o resto é descartado em silêncio — então
 * <BrandLeadForm> monta tudo num resumo rotulado dentro de `message`. O tipo
 * documenta o formulário inteiro mesmo assim, porque é o formulário que a
 * pessoa preenche, não o payload.
 */
export type BrandsPage = {
  hero: {
    kicker: string;
    /**
     * A headline inteira, já quebrada em linhas. Não existe um campo `headline`
     * separado de propósito: duas fontes para a mesma frase é onde nasce a
     * divergência entre o que o leitor vê e o que o leitor de tela lê.
     */
    headlineLines: string[];
    description: string;
    cta: PageCta;
    /** Camada de fundo, com parallax. Os degradês ficam no componente. */
    image: Media;
  };

  activations: {
    intro: SectionIntro;
    categories: BrandCategory[];
    /** Fecho da seção — chega depois dos cards, no tempo só dela. */
    closingLine: string;
  };

  method: { intro: SectionIntro; steps: MethodStep[] };

  tiers: {
    intro: SectionIntro;
    tiers: BrandTier[];
    /** Rótulo do botão de cada card. */
    ctaLabel: string;
    /** Ressalva de execução (ex.: tipo de estrutura, conforme o espaço). */
    note: string;
    /** Progressão das cotas, lida da esquerda para a direita. */
    evolution: string[];
    closingLine: string;
  };

  audience: { intro: SectionIntro; profiles: AudienceProfile[]; cta: PageCta };

  lead: {
    intro: SectionIntro;
    form: {
      objectives: {
        label: string;
        hint: string;
        options: Option[];
        /**
         * Slug da opção que substitui todas as outras em vez de se somar
         * a elas. Guardado como dado — quem exclusivo é o dado, não a
         * comparação no componente.
         */
        exclusiveValue: string;
      };
      company: { label: string; placeholder: string };
      audience: { label: string; options: Option[] };
      region: { label: string; options: Option[] };
      investment: { label: string; options: Option[] };
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      whatsapp: { label: string; placeholder: string };
      submit: { label: string; pendingLabel: string };
    };
    success: { title: string; description: string };
    notices: { rateLimited: string };
    errors: {
      required: string;
      invalidEmail: string;
      /** Grupo de caixas sem nenhuma marcada. */
      objectives: string;
      internal: string;
    };
  };

  pillars: {
    intro: SectionIntro;
    pillars: BrandPillar[];
    closingLine: string;
  };

  finalCta: { intro: SectionIntro; cta: PageCta };
};
