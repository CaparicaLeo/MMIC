import type { Media } from "./types";

/**
 * Dados canônicos do evento. Qualquer página futura (inscrição, cronograma,
 * imprensa) lê daqui — não duplique nome, cidade ou ano em outro lugar.
 */
export const event = {
  name: "Meia Maratona Internacional de Curitiba",
  edition: "Rock Edition",
  year: "2027",
  city: "Curitiba",
  state: "PR",
  location: "Curitiba (PR)",

  /**
   * A data do evento ainda não foi definida.
   *
   * Quando for, preencha `date` com um ISO 8601 (ex.: "2027-09-12T06:00:00-03:00")
   * e o <Countdown /> passa a renderizar automaticamente, sem mudar componente.
   * Enquanto `date` for null, nada de data/contador aparece na página.
   */
  date: null as string | null,

  /**
   * Abertura das inscrições — a data concreta que o site pode anunciar hoje.
   *
   * É este o alvo do <Countdown /> do hero e do bloco de oferta: um prazo que
   * existe é melhor que "data em breve". Fuso explícito no ISO para o relógio
   * não depender do fuso da máquina de quem renders.
   *
   * A hora é 00:00 de propósito: só a data foi confirmada, e usar a meia-noite
   * como alvo faz o contador terminar no início do dia anunciado, sem afirmar
   * uma hora que ninguém confirmou. Se a produção informar o horário, é só
   * trocar este valor e o `dateLabel`/`registrationLabel` continuam válidos.
   */
  // TODO(confirmar): horário exato de abertura com a produção.
  registrationOpensAt: "2026-11-15T00:00:00-03:00" as string | null,

  /**
   * Texto curto do prazo, usado no rodapé, no hero e nas páginas "em breve".
   *
   * É o fallback para quem não vê o <Countdown /> (sem JavaScript, movimento
   * reduzido, ou renderização de servidor): a informação tem de existir em
   * texto, não só em dígitos animados. Mantido em dia à mão — se
   * `registrationOpensAt` mudar, este campo muda junto.
   */
  // TODO(confirmar): mesmo prazo de `registrationOpensAt`.
  dateLabel: "Inscrições em 15/11/2026" as string,

  /**
   * Versão em caixa alta do prazo, para o marquee do hero.
   *
   * O marquee é a única tira de texto com fundo vermelho da home; "DATA EM
   * BREVE" ocupava esse espaço e não dizia nada. A data concreta ocupa melhor
   * e é o que a pessoa precisa ler duas vezes por rolagem.
   */
  // TODO(confirmar): mesmo prazo de `registrationOpensAt`.
  registrationLabel: "INSCRIÇÕES 15/11" as string,

  distances: ["5 KM", "10 KM", "21 KM"],

  /**
   * Marca do evento. PNG com fundo transparente — o símbolo e o lettering são
   * brancos, o "DE CURITIBA" vermelho e a linha "ROCK EDITION - 2027" cáqui,
   * então ela só funciona sobre superfície escura. Se um dia entrar uma seção
   * clara, é preciso uma variante invertida.
   *
   * A edição e o ano já estão na arte: não repita `edition`/`year` em texto
   * colado à logo.
   */
  logo: {
    src: "/images/mmic-logo-rock-edition.png",
    alt: "Meia Maratona Internacional de Curitiba · Rock Edition 2027",
    width: 1078,
    height: 292,
  } satisfies Media,

  /** Usado em metadata/OG. Trocar quando a arte final existir. */
  ogImage: {
    src: "/images/placeholders/og.svg",
    alt: "Meia Maratona Internacional de Curitiba 2027 · Rock Edition",
    width: 1200,
    height: 630,
  } satisfies Media,

  social: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
};

/**
 * Canal do evento no Instagram, entregue após preencher a lista de avisos
 * (<WaitlistModal>). O formulário captura o lead; este link confirma o
 * acompanhamento no canal, onde os anúncios saem primeiro.
 */
export const waitlistUrl = "https://ig.me/j/t5la8vc57GKOevuM/";

/**
 * Descrição canônica do evento. Fonte única: alimenta a `description` do
 * metadata (e, por herança, Open Graph e Twitter) e o JSON-LD. Mantida abaixo
 * de 155 caracteres para não ser truncada no resultado de busca.
 */
export const seoDescription =
  "Meia Maratona Internacional de Curitiba 2027 · Rock Edition. Corra 5 km, 10 km ou 21 km em Curitiba (PR) e termine em festival com show ao vivo.";

/**
 * Domínio de produção. O fallback precisa estar correto porque é ele que
 * alimenta `metadataBase`, Open Graph, canonical, sitemap.xml e robots.txt —
 * um valor errado aqui propaga para todos de uma vez.
 *
 * Em produção, prefira definir NEXT_PUBLIC_SITE_URL (ver .env.example): a
 * variável permite apontar previews e staging para o próprio host sem
 * recompilar com o domínio de produção cravado.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.meiadecuritiba.com.br";
