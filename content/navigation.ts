import type { NavItem } from "./types";

/**
 * Navegação do site. As rotas marcadas com `comingSoon` já existem no App
 * Router como stubs — conforme o evento se aproxima, cada uma recebe conteúdo
 * e o flag cai.
 */
export const mainNav: NavItem[] = [
  { label: "A experiência", href: "/#conceito" },
  { label: "Distâncias", href: "/#distancias" },
  { label: "O dia", href: "/#o-dia" },
  { label: "Cronograma", href: "/cronograma", comingSoon: true },
  { label: "Marcas", href: "/marcas", comingSoon: true },
  { label: "Imprensa", href: "/imprensa", comingSoon: true },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Evento",
    items: [
      { label: "A experiência", href: "/#conceito" },
      { label: "Como funciona o dia", href: "/#o-dia" },
      { label: "Distâncias", href: "/#distancias" },
      { label: "Estrutura", href: "/#estrutura" },
      { label: "Dúvidas", href: "/#faq" },
    ],
  },
  {
    /**
     * Sem `comingSoon` nos itens de propósito: o título da coluna já é
     * "Em breve" e o selo em cada item repetia a expressão cinco vezes no
     * mesmo bloco. No `mainNav` o selo continua, porque lá não há título.
     */
    title: "Em breve",
    items: [
      { label: "Inscrição", href: "/inscricao" },
      { label: "Cronograma", href: "/cronograma" },
      { label: "Marcas", href: "/marcas" },
      { label: "Imprensa", href: "/imprensa" },
    ],
  },
];
