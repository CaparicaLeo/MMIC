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
   * A data ainda não foi definida.
   *
   * Quando for, preencha `date` com um ISO 8601 (ex.: "2027-09-12T06:00:00-03:00")
   * e o <Countdown /> passa a renderizar automaticamente, sem mudar componente.
   * Enquanto `date` for null, nada de data/contador aparece na página.
   */
  date: null as string | null,
  dateLabel: "Data em breve",

  distances: ["5 KM", "10 KM", "21 KM"],

  /**
   * Marca do evento. PNG com fundo transparente — o lettering é branco e o
   * "DE CURITIBA" vermelho, então ela só funciona sobre superfície escura.
   * Se um dia entrar uma seção clara, é preciso uma variante invertida.
   */
  logo: {
    src: "/images/mmic-logo.png",
    alt: "Meia Maratona Internacional de Curitiba",
    width: 950,
    height: 242,
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
