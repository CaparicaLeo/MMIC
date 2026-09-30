import type {
  AudienceProfile,
  BrandsPage,
  Media,
  Option,
  PageCta,
  SectionIntro,
} from "./types";
import { event } from "./event";

/**
 * Página /marcas — o que o evento oferece a uma marca e como falar com o time
 * comercial.
 *
 * A página institucional (`/for-business`) é a referência de estrutura e de
 * funil, mas o texto é desta edição: aqui se vende a Meia Maratona
 * Internacional de Curitiba, não uma produtora. Nenhuma promessa abaixo depende
 * de um número que não esteja em `event.ts`, `distances.ts` ou `stats.ts` — se
 * um dado mudar lá, ele muda aqui.
 */

/**
 * Objetivo que a marca quer alcançar com o patrocínio.
 *
 * O valor é o slug estável; o rótulo é o que aparece na tela. São duas coisas
 * de propósito: renomear o texto de uma opção não pode invalidar o lead de
 * quem já mandou, e o CRM agrupa por slug, não por texto.
 */
const objectives: Option[] = [
  { value: "visibilidade", label: "Visibilidade" },
  { value: "experiencia", label: "Experiência" },
  { value: "leads-dados", label: "Leads & Dados" },
  { value: "conteudo", label: "Conteúdo" },
  { value: "relacionamento", label: "Relacionamento" },
  { value: "naming-rights", label: "Branding & Naming Rights" },
  {
    value: "evento-especifico",
    label: "Participação em um evento específico",
  },
  { value: "nao-sei", label: "Não sei ainda — me ajudem a definir" },
  { value: "outro", label: "Outro" },
];

/**
 * "Não sei ainda" é a única opção que não combina com as outras: é a resposta
 * de quem ainda não tem objetivo definido, e marcar "Visibilidade" junto
 * contradiz isso. Por isso ela substitui a lista inteira em vez de se somar.
 * A exclusividade é do slug — o estado guarda o slug, e é ele que o CRM
 * conhece.
 */
const objectiveExclusiveValue = "nao-sei";

/** Onde a marca quer aparecer. A capital do Paraná e o litoral são os dois extremos de público. */
const regions: Option[] = [
  { value: "curitiba", label: "Curitiba" },
  { value: "rmc", label: "Região Metropolitana de Curitiba" },
  { value: "litoral", label: "Litoral do Paraná" },
  { value: "interior", label: "Interior do Paraná" },
  { value: "nacional", label: "Fora do Paraná" },
  { value: "outra", label: "Outra região" },
];

/**
 * Faixa de investimento. Não é o preço da cota: é a faixa que a marca pretende
 * colocar no ano do evento, e é o que permite a equipe filtrar a conversa por
 * porte antes do primeiro contato.
 */
const investments: Option[] = [
  { value: "ate-20", label: "Até R$ 20 mil" },
  { value: "20-50", label: "R$ 20 mil a R$ 50 mil" },
  { value: "50-100", label: "R$ 50 mil a R$ 100 mil" },
  { value: "acima-100", label: "Acima de R$ 100 mil" },
];

/**
 * Perfil de público. Vive fora de `brands` porque as opções do formulário são
 * derivadas dele — as duas surfaces não podem divergir: o rótulo que a pessoa
 * lê no formulário é o que o CRM vai receber como slug.
 */
const audienceProfiles = [
  {
    id: "premium",
    title: "Consumidores Premium",
    description:
      "Público com estilo de vida ativo, renda alta e abertura a novas marcas.",
  },
  {
    id: "esporte-lifestyle",
    title: "Esporte + Lifestyle",
    description:
      "Quem vive o esporte dentro e fora das provas, com recorrência de consumo.",
  },
  {
    id: "familias",
    title: "Famílias",
    description:
      "Crianças, pais e adultos que acompanham os atletas em um dia de lazer.",
  },
  {
    id: "regional",
    title: "Capilaridade Regional",
    description:
      "Participantes de várias cidades e estados, com forte presença da Região Sul.",
  },
  {
    id: "torcedores",
    title: "Torcedores",
    description:
      "Fãs envolvidos e engajados com os clubes e camisas parceiros — e com o show ao vivo.",
  },
  {
    id: "corporativo",
    title: "Público Corporativo",
    description:
      "Profissionais, executivos e empresas que participam em grupo.",
  },
] satisfies AudienceProfile[];

const audienceOptions: Option[] = [
  ...audienceProfiles.map((profile) => ({
    value: profile.id,
    label: profile.title,
  })),
  { value: "a-definir", label: "Ainda não sei definir" },
];

export const brands = {
  hero: {
    kicker: "Marcas",
    /**
     * A última linha fica inteira numa linha, como no hero da home: partida ao
     * meio, a frase de efeito perdia a força — e é a mais longa, então é ela
     * que calibra o tamanho mínimo da headline.
     */
    headlineLines: ["Sua marca no palco.", "Com quem corre", "e com quem assiste."],
    description:
      "A Meia Maratona Internacional de Curitiba não é só uma prova. É um dia em que o esporte e o rock dividem a mesma arena, e a sua marca entra no meio deles: no percurso, na chegada, no palco e no público que acompanha tudo de pertinho.",
    cta: {
      label: "Quero conectar a minha marca",
      action: "link",
      href: "#lead",
    } satisfies PageCta,
    /**
     * Mesma arte do hero da home, pelo motivo que já vale para o concurso: é a
     * única foto do MMIC com corredores e público no mesmo quadro, que é
     * literalmente o argumento da página. A troca por uma arte própria é
     * editar só este bloco — a proporção vem daqui, não do componente.
     */
    image: {
      src: "/images/hero-palco.jpg",
      alt: "Corredores atravessam o palco entre a banda tocando e o público, no fim da tarde",
      width: 2560,
      height: 1429,
    } satisfies Media,
  },

  activations: {
    intro: {
      kicker: "Onde a sua marca aparece",
      title: "A sua marca dentro da experiência",
      description:
        "Três frentes de presença, do logotipo impresso à ativação em que a pessoa conversa com a marca. Você escolhe até onde quer ir.",
    } satisfies SectionIntro,
    categories: [
      {
        id: "branding",
        title: "Branding",
        lead: "A sua marca presente o dia todo.",
        items: [
          "Naming rights das provas",
          "Identidade visual no percurso",
          "Palcos, pórticos e marcações de marca",
        ],
      },
      {
        id: "presenca-fisica",
        title: "Presença física",
        lead: "Seu espaço, do início ao fim.",
        items: [
          "Tendas e estandes",
          "Feira de parceiros",
          "Pontos de entrega e ativação na arena",
        ],
      },
      {
        id: "ativacoes",
        title: "Ativações",
        lead: "Interação de verdade com quem corre.",
        items: [
          "Distribuição de brindes",
          "Experiências e jogos no percurso",
          "Ações com influenciadores e atletas",
        ],
      },
    ],
    closingLine: "Logotipo aparece. Experiência é lembrada.",
  },

  method: {
    intro: {
      kicker: "Como funciona",
      title: "Não começamos pela cota. Começamos pelo objetivo.",
      description:
        "Nenhuma proposta sai pronta. O caminho tem cinco etapas, e cada uma define o que a marca entrega e o que recebe de volta.",
    } satisfies SectionIntro,
    steps: [
      {
        id: "audiencia",
        title: "Audiência",
        question: "Para quem a marca quer falar?",
        description:
          "Definimos o público exato que cada ativação precisa atingir.",
      },
      {
        id: "presenca",
        title: "Presença",
        question: "Onde essa presença precisa estar?",
        description:
          "Escolhemos os pontos do evento com maior aderência ao público.",
      },
      {
        id: "experiencia",
        title: "Experiência",
        question: "Como fazer o público viver a marca?",
        description:
          "Desenhamos ativações com interação real e memorável.",
      },
      {
        id: "conversao",
        title: "Conversão",
        question: "Como transformar interação em oportunidade?",
        description:
          "Definimos as entregas: leads, dados, vendas ou relacionamento.",
      },
      {
        id: "mensuracao",
        title: "Mensuração",
        question: "Como provar o resultado?",
        description:
          "Métricas e relatórios que mostram o impacto real do investimento.",
      },
    ],
  },

  tiers: {
    intro: {
      kicker: "Cotas comerciais",
      title: "Três caminhos. Um objetivo: a sua marca no centro.",
      description:
        "Cada cota resolve um tipo de objetivo. É possível combinar mais de uma, e a combinação é o que constrói a presença completa.",
    } satisfies SectionIntro,
    tiers: [
      {
        id: "brand",
        title: "Cota Brand",
        tagline: "Para ser vista.",
        description:
          "A porta de entrada para marcas que querem a exposição tradicional sem abrir mão do público certo.",
        items: [
          "Exposição de marca no evento",
          "Logo em materiais oficiais",
          "Presença digital nas redes do evento",
        ],
        goal: "visibilidade",
      },
      {
        id: "experience",
        title: "Cota Experience",
        tagline: "Para ser vivida.",
        description:
          "Para quem quer ir além do logotipo: um espaço físico, estrutura e contato direto com o público.",
        items: [
          "Tenda no evento",
          "Ativações presenciais",
          "Staff e material de apoio",
          "Conteúdo e registros da ativação",
        ],
        goal: "experiência",
      },
      {
        id: "lead-generation",
        title: "Cota Lead Generation",
        tagline: "Para transformar interação em oportunidade.",
        description:
          "A cota completa: captação de dados, qualificação e relacionamento com o participante.",
        items: [
          "Captação de leads qualificados no evento",
          "Mensuração e relatório de resultados",
          "Todos os benefícios da Cota Experience",
        ],
        goal: "leads e dados",
        featured: true,
      },
    ],
    ctaLabel: "Quero saber mais",
    note: "* A Cota Experience pode incluir tenda piramidal, conforme a estrutura do evento disponível para a data.",
    evolution: ["Brand", "Experience", "Lead Generation"],
    closingLine: "Essa é a evolução que propomos para as marcas parceiras.",
  },

  audience: {
    intro: {
      kicker: "Perfil do público",
      title: "Encontre o público certo",
      description:
        "A Rock Edition junta perfis que quase não se cruzam em nenhum outro lugar da cidade: quem corre, quem acompanha, quem só assiste ao show e quem chega de fora para os dois.",
    } satisfies SectionIntro,
    profiles: audienceProfiles,
    cta: {
      label: "Quero encontrar o meu público",
      action: "link",
      href: "#lead",
    } satisfies PageCta,
  },

  lead: {
    intro: {
      kicker: "Vamos conversar",
      title: "Conte sobre a sua marca.",
      description:
        "O time comercial responde pelo e-mail informado. Quanto mais contexto vier, mais a conversa começa adiantada.",
    } satisfies SectionIntro,
    form: {
      objectives: {
        label: "Quais os objetivos da sua marca?",
        hint: "Pode marcar mais de um.",
        options: objectives,
        exclusiveValue: objectiveExclusiveValue,
      },
      company: {
        label: "Empresa ou marca",
        placeholder: "Nome da empresa ou da marca",
      },
      audience: {
        label: "Público que você quer atingir",
        options: audienceOptions,
      },
      region: {
        label: "Região de interesse",
        options: regions,
      },
      investment: {
        label: "Faixa de investimento",
        options: investments,
      },
      name: {
        label: "Nome",
        placeholder: "Com quem podemos falar",
      },
      email: {
        label: "E-mail corporativo",
        placeholder: "voce@empresa.com.br",
      },
      whatsapp: {
        label: "WhatsApp",
        placeholder: "(41) 99999-9999",
      },
      submit: {
        label: "Quero conversar com o time comercial",
        pendingLabel: "Enviando…",
      },
    },
    success: {
      title: "Contato recebido.",
      description:
        "O time comercial da Meia Maratona de Curitiba entra em contato pelo e-mail informado.",
    },
    notices: {
      rateLimited:
        "Muitas mensagens em pouco tempo. Aguarde um instante e tente novamente.",
    },
    errors: {
      required: "Preencha este campo.",
      invalidEmail: "Digite um e-mail válido.",
      objectives: "Escolha ao menos um objetivo para a sua marca.",
      internal:
        "Não foi possível enviar neste momento. Tente novamente em alguns instantes.",
    },
  },

  pillars: {
    intro: {
      kicker: "Por que este evento",
      title: "Seis razões para a sua marca estar aqui",
      description:
        "A prova e o show ocupam o mesmo dia e a mesma arena. Isso coloca a sua marca diante de um público que nenhum outro evento da cidade reúne.",
    } satisfies SectionIntro,
    pillars: [
      {
        id: "dois-eventos",
        title: "Dois eventos, um dia",
        description:
          "Prova e show ao vivo no mesmo lugar: a marca aparece para quem corre e para quem só assiste.",
      },
      {
        id: "tres-distancias",
        title: "Três distâncias",
        description:
          "5 km, 10 km e 21 km: do primeiro treino ao atleta de meia maratona, no mesmo domingo.",
      },
      {
        id: "escala",
        title: "Escala",
        description:
          "Meta de 10 mil atletas e até 30 mil pessoas em circulação na edição 2027.",
      },
      {
        id: "crescimento",
        title: "Crescimento",
        description:
          "Três edições e +43% de inscritos de 2026 para 2027. A operação só aumenta.",
      },
      {
        id: "cenario",
        title: "Cenário",
        description:
          "Rua fechada na capital do Paraná, com percurso internacional homologado e cronometragem oficial.",
      },
      {
        id: "alcance",
        title: "Alcance",
        description:
          "Prova internacional: quem vem de fora leva a marca para a cidade de onde partiu.",
      },
    ],
    closingLine:
      "A corrida é o ponto de encontro. O que acontece a partir dela é estratégia.",
  },

  finalCta: {
    intro: {
      kicker: `${event.edition} · ${event.year}`,
      title: "O próximo case pode ser da sua marca.",
      description:
        "Conte o que a sua marca quer alcançar e o time comercial desenha o resto com você.",
    } satisfies SectionIntro,
    cta: {
      label: "Falar com o time comercial",
      action: "link",
      href: "#lead",
    } satisfies PageCta,
  },
} satisfies BrandsPage;
