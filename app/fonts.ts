import { Anton, Barlow_Condensed, Inter } from "next/font/google";

/**
 * Tipografia do projeto, auto-hospedada por next/font (sem request para o
 * Google e sem layout shift).
 *
 * As variáveis CSS usam o prefixo `--ff-*` de propósito: os tokens de fonte do
 * Tailwind (`--font-sans`, `--font-display`, `--font-condensed`, definidos em
 * globals.css) apontam para elas. Se as duas camadas usassem o mesmo nome, a
 * declaração do next/font sobrescreveria o token do tema no <html>.
 */

/** Headlines em estilo cartaz: condensada, pesada, caixa alta. */
export const displayFont = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--ff-display",
  display: "swap",
});

/** Corpo de texto. */
export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--ff-body",
  display: "swap",
});

/** Rótulos, horários, badges e números — condensada com pesos variados. */
export const condensedFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-condensed",
  display: "swap",
});

export const fontVariables = [
  displayFont.variable,
  bodyFont.variable,
  condensedFont.variable,
].join(" ");
